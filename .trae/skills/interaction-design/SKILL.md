---
name: "interaction-design"
description: "Designs and implements user interaction patterns including micro-interactions, state transitions, gesture feedback, and motion design. Invoke when user wants to add or improve interactions, animations, hover effects, click feedback, or user flow optimization."
---

# Interaction Design

A skill focused on crafting delightful, intuitive user interactions for web applications.

## When to Use

Invoke this skill when:
- User wants to add hover/click/focus interaction effects
- User wants to implement micro-interactions or animations
- User wants to improve user flow or operation steps
- User wants to add state feedback (loading, success, error, empty)
- User wants to implement drag-and-drop, swipe, or gesture-based interactions
- User wants to optimize transition effects between pages or sections
- User asks for "交互设计" or "动效" or "交互体验"

## Core Principles

### 1. Micro-interactions
- **Trigger**: What causes the interaction (hover, click, focus, scroll)
- **Rules**: What happens during the interaction
- **Feedback**: Visual/audio response to user action
- **Loops & Modes**: Repetition and state variations

### 2. State Design
Every interactive element should have clear states:
- **Default**: Resting state
- **Hover**: Mouse over (subtle scale 1.02-1.05, color shift, shadow)
- **Active/Pressed**: Clicking (scale down 0.96-0.98, darker shade)
- **Focus**: Keyboard navigation (outline ring, accent border)
- **Disabled**: Reduced opacity (opacity-50), no pointer events
- **Loading**: Spinner, skeleton, or shimmer
- **Error**: Red accent, shake animation, inline message
- **Success**: Green accent, checkmark, brief confirmation

### 3. Transition Patterns

#### CSS Transitions (TailwindCSS)
```css
/* Basic hover feedback */
.transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg

/* Color transition */
.transition-colors duration-200 hover:bg-accent hover:text-white

/* Transform with spring-like feel */
.transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]
```

#### Keyframe Animations
```css
/* Fade in up */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Shake (error feedback) */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-8px); }
  75% { transform: translateX(8px); }
}

/* Pulse (attention) */
@keyframes pulse-soft {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}
```

### 4. Scroll Interactions
- **IntersectionObserver**: Reveal elements on scroll into view
- **Parallax**: Subtle depth on scroll (translateY based on scrollY)
- **Sticky elements**: Navigation, sidebar, progress bar
- **Scroll-to-top**: Appear after threshold (e.g., 600px scroll)

### 5. Gesture & Input
- **Click/Tap**: Primary action, button feedback
- **Hover**: Desktop enhancement (tooltip, preview, scale)
- **Focus**: Keyboard accessibility (focus ring, tab order)
- **Drag**: Reorder, slide, carousel
- **Keyboard**: ESC to close, Enter to submit, Arrow navigation

### 6. Motion Guidelines
- Duration: 150-300ms for UI feedback, 300-500ms for scene transitions
- Easing: `ease-out` for entering, `ease-in` for exiting, `ease-in-out` for moving
- Stagger: 50-100ms delay between sequential items
- Respect `prefers-reduced-motion`: Disable non-essential animations
- 60fps: Use transform/opacity only, avoid layout-triggering properties

## Implementation Patterns (React + TailwindCSS)

### Hover Card with Elevation
```tsx
<div className="transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-xl">
  {/* content */}
</div>
```

### Button with Press Feedback
```tsx
<button className="transition-all duration-200 active:scale-95 hover:bg-accent">
  Click me
</button>
```

### Modal with Backdrop Blur
```tsx
<div className="fixed inset-0 bg-black/50 backdrop-blur-sm animate-fadeIn">
  <div className="animate-scaleIn rounded-2xl bg-card p-8">
    {/* modal content */}
  </div>
</div>
```

### Scroll Reveal
```tsx
const ref = useRef<HTMLElement>(null)
const [visible, setVisible] = useState(false)
useEffect(() => {
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) setVisible(true)
  })
  if (ref.current) observer.observe(ref.current)
  return () => observer.disconnect()
}, [])
// className: transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
```

### Toast Notification
```tsx
// Slide in from top-right, auto dismiss after 3s
<div className="fixed top-4 right-4 animate-slideIn">
  {/* toast content */}
</div>
```

## Checklist

Before shipping interactions:
- [ ] Works on mobile (touch events, no hover-only)
- [ ] Keyboard accessible (tab, enter, esc)
- [ ] Respects `prefers-reduced-motion`
- [ ] No layout jank (use transform/opacity only)
- [ ] Clear focus states for accessibility
- [ ] Loading and error states defined
- [ ] Touch targets >= 44x44px on mobile
