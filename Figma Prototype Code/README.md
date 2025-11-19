# Interactive Story - Cafe Theme

An interactive narrative experience with branching paths and smooth transitions.

## Features Implemented

### Core Functionality
- **Frame-based navigation** with smooth fade transitions
- **Multiple story branches** with different endings
- **Keyboard navigation** for accessibility
- **Mobile touch support** for responsive interaction
- **Transition locking** to prevent double-clicks
- **Image preloading** for smoother experience

### Visual Enhancements
- Staggered entrance animations for choice buttons
- Smooth fade-in effects for text elements
- Animated question marks with rotation and scale
- Hover effects with subtle shadows and transforms
- Pulsing restart button with shimmer effect
- Gradient overlays on large choice buttons
- Page load fade-in animation

### Keyboard Shortcuts
- **Space/Enter**: Advance through frames (where applicable)
- **R**: Restart from beginning
- **A, B, C** or **1, 2, 3**: Select choices on choice screens

## Story Flow

```
frame-1 (Opening Scene)
  → frame-1-5 ("What can I get for you?")
    → frame-2 (Choice: warm/sweet/strong)
      → frame-4a ("warm… like last time")
        → frame-5a ("The warmth fills you...")
          → frame-5c ("it always does")
            → frame-6 ("so… why are you back?")
              → frame-7 (Final Choice: quiet/not alone)
                → frame-7a ("i needed quiet")
                  → frame-7-5a (Quiet Ending)
                → frame-7b ("i didn't want to be alone")
                  → frame-7-5b (Together Ending)

      → frame-4b ("sweet… soft as always")
        → frame-5b ("The sweetness lingers...")
          → frame-5c ("it always does")
            → [continues to frame-6...]

      → frame-4c ("strong… still shielding yourself")
        → frame-4-5 ("that's enough for now...")
          → frame-1 (Back to start)
```

## Technical Details

### Files
- `index.html` - HTML structure with all story frames
- `styles.css` - Styling with animations and responsive design
- `script.js` - Interactive navigation logic and effects

### Interaction Logic
1. **Transition Management**: Prevents navigation during frame transitions
2. **Entrance Animations**: Elements animate in when frame becomes active
3. **Visual Feedback**: Buttons respond to hover, click, and keyboard input
4. **Error Handling**: Console logging for debugging navigation issues
5. **Accessibility**: Full keyboard navigation and focus management

## Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers with touch support
- Requires JavaScript enabled

## Usage
Simply open `index.html` in a web browser or serve via local server:
```bash
python3 -m http.server 8000
```

Then navigate to `http://localhost:8000/index.html`
