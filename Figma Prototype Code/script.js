// Navigation and interaction logic

// Keep track of the current frame
let currentFrame = 'frame-1';

// Function to navigate between frames
function goToFrame(targetFrameId) {
    // Get current and target frames
    const current = document.getElementById(currentFrame);
    const target = document.getElementById(targetFrameId);
    
    if (!target) {
        console.error('Target frame not found:', targetFrameId);
        return;
    }
    
    // Remove active class from current frame
    if (current) {
        current.classList.remove('active');
    }
    
    // Add active class to target frame
    target.classList.add('active');
    
    // Update current frame reference
    currentFrame = targetFrameId;
    
    // Log for debugging
    console.log('Navigated to:', targetFrameId);
}

// Keyboard navigation
document.addEventListener('keydown', function(event) {
    // Press Spacebar or Enter to advance through frames with single paths
    if (event.code === 'Space' || event.code === 'Enter') {
        const currentFrameElement = document.getElementById(currentFrame);
        const clickOverlay = currentFrameElement.querySelector('.overlay-click');
        
        if (clickOverlay) {
            event.preventDefault();
            clickOverlay.click();
        }
    }
    
    // Press R to restart from beginning
    if (event.code === 'KeyR') {
        goToFrame('frame-1');
    }
    
    // Number keys for choices in Frame 2
    if (currentFrame === 'frame-2') {
        if (event.code === 'Digit1' || event.code === 'Numpad1') {
            goToFrame('frame-4a');
        } else if (event.code === 'Digit2' || event.code === 'Numpad2') {
            goToFrame('frame-4b');
        } else if (event.code === 'Digit3' || event.code === 'Numpad3') {
            goToFrame('frame-4c');
        }
    }
    
    // Number keys for choices in Frame 7
    if (currentFrame === 'frame-7') {
        if (event.code === 'Digit1' || event.code === 'Numpad1') {
            goToFrame('frame-7a');
        } else if (event.code === 'Digit2' || event.code === 'Numpad2') {
            goToFrame('frame-7b');
        }
    }
});

// Add hover effects for interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Add click sound effect (optional)
    const clickableElements = document.querySelectorAll('.overlay-click, .choice-btn, .choice-btn-large, .restart-btn');
    
    clickableElements.forEach(element => {
        element.addEventListener('click', function() {
            // Visual feedback
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 100);
        });
    });
    
    // Log initial state
    console.log('Interactive story loaded. Current frame:', currentFrame);
    console.log('Keyboard shortcuts:');
    console.log('- Space/Enter: Advance (where applicable)');
    console.log('- R: Restart from beginning');
    console.log('- 1/2/3: Select choices (on choice screens)');
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
