---
name: "ui-ux-pro-max"
description: "Optimizes UI/UX design for web pages including layout, color schemes, spacing, typography, interactions, and responsive design. Invoke when user wants to beautify pages, improve visual design, enhance user experience, or fix UI/UX issues."
---

# UI/UX Pro Max

A comprehensive UI/UX optimization skill that elevates web page design quality.

## When to Use

Invoke this skill when:
- User wants to beautify or polish a web page
- User asks for UI/UX improvements
- User wants to adjust layout, spacing, or alignment
- User wants to optimize color schemes or typography
- User wants to improve interaction feedback (hover, transition, animation)
- User wants responsive design adjustments
- User asks for visual consistency across components

## Design Principles

### 1. Layout & Spacing
- Use consistent spacing scale (4px / 8px / 12px / 16px / 24px / 32px / 48px / 64px)
- Maintain visual hierarchy through size, weight, and color contrast
- Align elements using a clear grid system
- Balance whitespace — not too cramped, not too sparse

### 2. Color & Contrast
- Use CSS variables for theme-aware colors
- Ensure WCAG AA contrast ratio (4.5:1 for normal text, 3:1 for large text)
- Limit color palette: 1 primary, 1-2 accents, neutrals
- Support dark mode with automatic variable switching

### 3. Typography
- Use `clamp()` for fluid responsive font sizes
- Limit font weights: regular (400), semibold (600), bold (700), black (900)
- Line height: 1.5-1.75 for body text, 1.1-1.3 for headings
- Use `tracking-tight` for large headings, `tracking-wide` for small caps

### 4. Interaction & Motion
- Transitions: 200-300ms with `ease-out` for UI feedback
- Hover states: subtle scale (1.02-1.05), color shift, or shadow
- Active states: scale down slightly (0.98) for tactile feedback
- Loading states: skeleton or shimmer, not spinners for content areas
- Respect `prefers-reduced-motion` for accessibility

### 5. Responsive Design
- Mobile-first approach with progressive enhancement
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch targets minimum 44x44px on mobile
- Hide non-essential elements on small screens
- Use `object-cover` for responsive images

### 6. Component Polish
- Cards: consistent border-radius, subtle shadows, hover elevation
- Buttons: clear primary/secondary/ghost hierarchy
- Forms: inline validation, clear error states, sufficient padding
- Navigation: sticky/fixed on scroll, active state indicator
- Modals: backdrop blur, max-height with scroll, close on ESC/backdrop click

## Workflow

1. **Analyze**: Read the current component code and identify improvement areas
2. **Plan**: Determine which design principles apply
3. **Implement**: Apply changes using TailwindCSS utility classes and CSS variables
4. **Verify**: Ensure responsive behavior and dark mode compatibility
5. **Iterate**: Refine based on user feedback

## TailwindCSS Patterns

```css
/* Fluid typography */
font-size: clamp(2.5rem, 8vw, 6.5rem);

/* Consistent card style */
.rounded-2xl bg-card p-8 shadow-sm transition-shadow hover:shadow-lg

/* Hover scale with transition */
.transition-transform duration-300 hover:scale-105

/* Surface variants */
.surface-card { @apply rounded-2xl bg-card border border-line; }
.surface-soft { @apply rounded-xl bg-soft; }
```
