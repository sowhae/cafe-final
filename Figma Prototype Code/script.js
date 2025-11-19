// Navigation and interaction logic

// Keep track of the current frame and transition state
let currentFrame = 'frame-1';
let isTransitioning = false;

// Function to navigate between frames
function goToFrame(targetFrameId) {
    // Prevent navigation during transition
    if (isTransitioning) {
        return;
    }

    // Get current and target frames
    const current = document.getElementById(currentFrame);
    const target = document.getElementById(targetFrameId);

    if (!target) {
        console.error('Target frame not found:', targetFrameId);
        return;
    }

    // Lock transitions
    isTransitioning = true;

    // Remove active class from current frame
    if (current) {
        current.classList.remove('active');
    }

    // Small delay to ensure smooth transition
    setTimeout(() => {
        // Add active class to target frame
        target.classList.add('active');

        // Update current frame reference
        currentFrame = targetFrameId;

        // Add entrance animations to elements
        addEntranceAnimations(target);

        // Log for debugging
        console.log('Navigated to:', targetFrameId);

        // Unlock transitions after animation completes
        setTimeout(() => {
            isTransitioning = false;
        }, 800); // Match CSS transition duration
    }, 50);
}

// Add entrance animations to frame elements
function addEntranceAnimations(frame) {
    // Animate choice buttons with stagger effect
    const choiceButtons = frame.querySelectorAll('.choice-btn, .choice-btn-large');
    choiceButtons.forEach((btn, index) => {
        btn.style.opacity = '0';
        btn.style.transform = 'translateY(20px)';

        setTimeout(() => {
            btn.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            btn.style.opacity = '1';
            btn.style.transform = 'translateY(0)';
        }, 200 + (index * 100));
    });

    // Fade in response text
    const responseTexts = frame.querySelectorAll('.response-text, .response-text-centered, .final-response, .final-response-right');
    responseTexts.forEach((text) => {
        text.style.opacity = '0';
        setTimeout(() => {
            text.style.transition = 'opacity 1s ease';
            text.style.opacity = '1';
        }, 300);
    });

    // Animate question mark with rotation
    const questionMarks = frame.querySelectorAll('.question-mark');
    questionMarks.forEach((qm) => {
        qm.style.opacity = '0';
        qm.style.transform = 'translateY(-50%) rotate(0deg) scale(0.8)';
        setTimeout(() => {
            qm.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
            qm.style.opacity = '1';
            const rotation = qm.classList.contains('rotated') || qm.classList.contains('rotated-alt') ? 'rotate(15deg)' : 'rotate(0deg)';
            qm.style.transform = `translateY(-50%) ${rotation} scale(1)`;
        }, 400);
    });
}

// Keyboard navigation
document.addEventListener('keydown', function(event) {
    // Skip keyboard input during transitions
    if (isTransitioning) {
        return;
    }

    // Press Spacebar or Enter to advance through frames with single paths
    if (event.code === 'Space' || event.code === 'Enter') {
        const currentFrameElement = document.getElementById(currentFrame);
        const clickOverlay = currentFrameElement?.querySelector('.overlay-click');

        if (clickOverlay) {
            event.preventDefault();
            clickOverlay.click();
        }
    }

    // Press R to restart from beginning
    if (event.code === 'KeyR') {
        const restartBtn = document.querySelector('.restart-btn');
        if (restartBtn) {
            restartBtn.click();
        } else {
            goToFrame('frame-1');
        }
    }

    // Number keys and letter keys for choices in Frame 2
    if (currentFrame === 'frame-2') {
        if (event.code === 'Digit1' || event.code === 'Numpad1' || event.code === 'KeyA') {
            goToFrame('frame-4a');
        } else if (event.code === 'Digit2' || event.code === 'Numpad2' || event.code === 'KeyB') {
            goToFrame('frame-4b');
        } else if (event.code === 'Digit3' || event.code === 'Numpad3' || event.code === 'KeyC') {
            goToFrame('frame-4c');
        }
    }

    // Number keys and letter keys for choices in Frame 7
    if (currentFrame === 'frame-7') {
        if (event.code === 'Digit1' || event.code === 'Numpad1' || event.code === 'KeyA') {
            goToFrame('frame-7a');
        } else if (event.code === 'Digit2' || event.code === 'Numpad2' || event.code === 'KeyB') {
            goToFrame('frame-7b');
        }
    }
});

// Add hover effects and click prevention for interactive elements
document.addEventListener('DOMContentLoaded', function() {
    const clickableElements = document.querySelectorAll('.overlay-click, .choice-btn, .choice-btn-large, .restart-btn');

    clickableElements.forEach(element => {
        // Prevent clicks during transitions
        element.addEventListener('click', function(e) {
            if (isTransitioning && !element.classList.contains('restart-btn')) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }

            // Visual feedback for buttons (not overlays)
            if (!element.classList.contains('overlay-click')) {
                const originalTransform = getComputedStyle(this).transform;
                this.style.transform = 'scale(0.95)';

                setTimeout(() => {
                    this.style.transform = originalTransform !== 'none' ? originalTransform : '';
                }, 150);
            }
        }, true); // Use capture phase to catch clicks early

        // Enhanced hover effects for buttons
        if (element.classList.contains('choice-btn') || element.classList.contains('choice-btn-large')) {
            element.addEventListener('mouseenter', function() {
                if (!isTransitioning) {
                    this.style.cursor = 'pointer';
                }
            });

            element.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        }
    });

    // Add subtle cursor indication for overlay clicks
    const overlays = document.querySelectorAll('.overlay-click');
    overlays.forEach(overlay => {
        overlay.addEventListener('mouseenter', function() {
            if (!isTransitioning) {
                document.body.style.cursor = 'pointer';
            }
        });

        overlay.addEventListener('mouseleave', function() {
            document.body.style.cursor = 'default';
        });
    });

    // Log initial state
    console.log('Interactive story loaded. Current frame:', currentFrame);
    console.log('Keyboard shortcuts:');
    console.log('- Space/Enter: Advance (where applicable)');
    console.log('- R: Restart from beginning');
    console.log('- A/B/C or 1/2/3: Select choices (on choice screens)');
});

// Save progress (optional feature for future enhancement)
function saveProgress() {
    localStorage.setItem('storyProgress', currentFrame);
}

// Load progress (optional feature for future enhancement)
function loadProgress() {
    const savedFrame = localStorage.getItem('storyProgress');
    if (savedFrame && document.getElementById(savedFrame)) {
        goToFrame(savedFrame);
    }
}

// Add touch/swipe support for mobile
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', function(event) {
    touchStartX = event.changedTouches[0].screenX;
    touchStartY = event.changedTouches[0].screenY;
});

document.addEventListener('touchend', function(event) {
    const touchEndX = event.changedTouches[0].screenX;
    const touchEndY = event.changedTouches[0].screenY;
    
    const diffX = touchStartX - touchEndX;
    const diffY = touchStartY - touchEndY;
    
    // Detect horizontal swipe
    if (Math.abs(diffX) > Math.abs(diffY)) {
        // Swipe left or right could be used for navigation if desired
        // Currently not implemented to avoid interfering with choice selection
    }
});

// Preload images for smoother transitions
function preloadImages() {
    const images = [
        'https://www.figma.com/api/mcp/asset/b0b62627-4d9c-44cf-a160-8b9efcc98a0c',
        'https://www.figma.com/api/mcp/asset/25af6e34-79d3-40b5-8dee-001d8d96e817',
        'https://www.figma.com/api/mcp/asset/2581de70-5fda-43de-a85f-ee147139f876',
        'https://www.figma.com/api/mcp/asset/b5b40a2c-33ad-4c57-bd03-e082639c1a21',
        'https://www.figma.com/api/mcp/asset/95d1ae58-5e3d-4018-8ece-a9bfa4f9477e'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize
preloadImages();

// Export functions for use in HTML onclick attributes
window.goToFrame = goToFrame;
window.saveProgress = saveProgress;
window.loadProgress = loadProgress;
