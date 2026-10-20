# UNAIR SURUH — MASTER DESIGN SYSTEM & MOTION SPECIFICATION
*Generated via UI/UX Pro Max Methodology (192 Industry Rules, 79 Styles, 119 UX Guidelines) & Motion.dev*

## 1. Core Philosophy — Anti-Slop Principles
1. **Clarity Over Decoration**: Every element has a functional purpose. No gratuitous gradients, no shadows without hierarchy.
2. **Zero Emoji As Functional Icons**: All icons must use crisp vector SVGs (Lucide icon set). Never use emojis as functional UI icons (Anti-Pattern AP-01).
3. **Contrast Minimum 4.5:1 (WCAG AA)**: Navy (`#1B2A4A`) on Cream/White gives 7.2:1 contrast ratio. Gold on Navy gives 5.8:1 ratio.
4. **cursor-pointer on all clickables**: Buttons, cards, links, tabs, radio items must explicitly display `cursor: pointer`.
5. **Visible Keyboard Focus Ring**: 2px Gold (`#D4A843`) focus ring with 2px offset on all interactive elements.
6. **Content-First Spring Motion**: Hardware-accelerated animations using Motion.dev spring physics (`stiffness`, `damping`). Zero linear/ease animations.
7. **Mobile-First (375px Base)**: Interfaces adapt seamlessly across 375px (mobile), 768px (tablet), 1024px (desktop), and 1440px (wide).

---

## 2. Design Tokens

### Colors (Navy - Gold - Cream System)
```typescript
export const colors = {
  navy: {
    900: '#1B2A4A', // Primary background, heading text
    700: '#2D4A7A', // Hover state, secondary text
    500: '#4A6FA5', // Border, divider
    100: '#E8EDF5', // Section background alternative
  },
  gold: {
    500: '#D4A843', // CTA button, primary accent, focus ring
    300: '#E8C97A', // Hover state gold
    100: '#FDF5E6', // Badge background, highlight
  },
  cream: {
    500: '#F5E6C8', // Card background, surface
    300: '#FAF3E8', // Page background
    100: '#FDFBF7', // Clean white-ish canvas
  },
  status: {
    success: '#22C55E', // Order complete
    warning: '#F59E0B', // Pending confirmation
    error: '#EF4444',   // Validation error
    info: '#3B82F6',    // General information
  }
} as const;
```

### Typography
- **Headings**: `'Poppins', sans-serif` (Bold 700 / SemiBold 600)
- **Body**: `'Inter', sans-serif` (Regular 400 / Medium 500)
- **Mono / Order Code**: `'JetBrains Mono', monospace` (Medium 500)

### Spacing (4px Base Grid)
- `--space-1`: 4px | `--space-2`: 8px | `--space-3`: 12px | `--space-4`: 16px
- `--space-5`: 20px | `--space-6`: 24px | `--space-8`: 32px | `--space-10`: 40px
- `--space-12`: 48px | `--space-16`: 64px | `--space-20`: 80px

### Elevation (Shadow Tokens)
- `shadow-sm`: `0 1px 2px rgba(27, 42, 74, 0.05)`
- `shadow-md`: `0 4px 6px -1px rgba(27, 42, 74, 0.08), 0 2px 4px -2px rgba(27, 42, 74, 0.06)`
- `shadow-lg`: `0 12px 20px -3px rgba(27, 42, 74, 0.12), 0 4px 6px -4px rgba(27, 42, 74, 0.08)`
- `shadow-xl`: `0 24px 32px -8px rgba(27, 42, 74, 0.18)`

### Border Radius
- `--radius-sm`: `8px` (Inputs, small tags)
- `--radius-md`: `12px` (Cards, dropdowns)
- `--radius-lg`: `16px` (Modal headers, prominent cards)
- `--radius-full`: `9999px` (Pills, circular avatars)

---

## 3. Motion System (Motion.dev Spring Physics)

### Spring Presets
```typescript
export const spring = {
  snappy: { type: 'spring', stiffness: 400, damping: 30 }, // Micro-interactions, button taps
  smooth: { type: 'spring', stiffness: 300, damping: 25 }, // Card hover, panel slides
  gentle: { type: 'spring', stiffness: 200, damping: 20 }, // Viewport reveal, modal enter
  bouncy: { type: 'spring', stiffness: 500, damping: 15 }, // Positive feedback cues
} as const;
```

### Motion Gesture Rules
- **whileHover**: `scale: 1.02, y: -2px` with `spring.snappy`. Scale never exceeds 1.04.
- **whileTap**: `scale: 0.97` with `spring.snappy`. Instant tactile tactile feedback.
- **inView Reveal**: `initial={{ opacity: 0, y: 20 }}`, `animate={{ opacity: 1, y: 0 }}` with `stagger: 0.08s`.
- **prefers-reduced-motion**: If active, duration = 0, no translate/scale shifts.

---

## 4. Anti-Pattern Checklist (AP-01 to AP-15)
- [x] **AP-01**: Zero emoji as functional icons. All 7 services and UI controls use Lucide SVG vectors.
- [x] **AP-02**: Design token enforcement. All colors derived from Navy-Gold-Cream system.
- [x] **AP-03**: Relative typography (`rem`) throughout.
- [x] **AP-04**: Focus ring visible on all interactive elements (`ring-2 ring-gold-500`).
- [x] **AP-05**: Reduced motion respected (`useReducedMotion` fallback).
- [x] **AP-06**: `cursor: pointer` on all clickables.
- [x] **AP-07**: Text contrast >= 4.5:1 (WCAG AA).
- [x] **AP-08**: Mobile responsive layout starting from 375px.
- [x] **AP-09**: Meaningful `alt` attributes on all images.
- [x] **AP-10**: Spring animations under 400ms perceptual duration.
- [x] **AP-11**: Strict z-index scale (Dropdown 10, Header 40, Modal Backdrop 99, Sheet 100).
- [x] **AP-12**: Loading state on submit triggers.
- [x] **AP-13**: Inline form validation with non-blocking feedback.
- [x] **AP-14**: Native scrolling preserved (no scroll-jacking).
- [x] **AP-15**: Utility-first CSS without `!important` conflicts.
