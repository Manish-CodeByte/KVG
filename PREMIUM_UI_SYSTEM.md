# 🎨 Premium UI System - Style Guide

## Overview

The Neurox application has been upgraded with a premium, professional design system featuring:

✨ **Smooth Animations**  
💎 **Glassmorphism Cards**  
🌈 **Gradient Buttons & Elements**  
🌙 **Complete Dark Mode Support**  
📱 **Full Mobile Responsiveness**  

---

## Color Palette

### Primary Colors
| Color | Usage |
|-------|-------|
| **Indigo** (`#6366f1`) | Primary brand color |
| **Purple** (`#a855f7`) | Secondary accent |
| **Pink** (`#ec4899`) | Accent highlights |

### Gradient Backgrounds
```css
.gradient-primary    /* Indigo → Purple */
.gradient-accent     /* Purple → Pink */
.gradient-success    /* Green → Emerald */
.gradient-warning    /* Amber → Orange */
.gradient-danger     /* Red → Crimson */
.gradient-cyan       /* Cyan → Blue */
```

### Dark Mode Colors
```
bg-slate-950    /* Darkest background */
bg-slate-900    /* Dark background */
bg-slate-800    /* Dark card background */
bg-slate-700    /* Dark borders */
```

---

## Animations

### Available Animations

| Animation | Duration | Use Case |
|-----------|----------|----------|
| `animate-fade-in` | 500ms | Page/element entrance |
| `animate-fade-in-down` | 500ms | Top-down entrance |
| `animate-fade-in-up` | 500ms | Bottom-up entrance |
| `animate-fade-in-left` | 500ms | Left-to-right entrance |
| `animate-fade-in-right` | 500ms | Right-to-left entrance |
| `animate-slide-down` | 400ms | Menu/dropdown open |
| `animate-slide-up` | 400ms | Modal entrance |
| `animate-scale-in` | 300ms | Element appear |
| `animate-float` | 3s | Floating effect |
| `animate-pulse-glow` | 2s | Attention draw |

### Usage Example

```jsx
// Page entrance animation
<div className="animate-fade-in-down">
  <h1>Your Content</h1>
</div>

// Staggered animations
<div className="animate-fade-in-up" style={{ animationDelay: '0s' }}>
  <Card />
</div>
<div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
  <Card />
</div>
```

---

## Components

### Card Component

**Base Usage:**
```jsx
import Card from './components/Card'

<Card>
  <h3>My Content</h3>
  <p>Description text</p>
</Card>
```

**With Properties:**
```jsx
// Glassmorphism style
<Card glass>
  <h3>Frosted Glass Card</h3>
</Card>

// With animation
<Card animated>
  <h3>Animated Card Entry</h3>
</Card>

// Interactive
<Card onClick={() => handleClick()}>
  <h3>Clickable Card</h3>
</Card>

// Dark mode automatic
// Renders differently in dark/light mode
```

**Styling Classes:**
- `glass` - Glassmorphism effect
- `animate-fade-in` - Entrance animation
- `hover-lift` - Smooth hover elevation

---

### Button Component

**Variants:**
```jsx
import Button from './components/Button'

// Primary (Indigo gradient)
<Button variant="primary">Sign In</Button>

// Secondary (Pink gradient)
<Button variant="secondary">Save Changes</Button>

// Success (Green gradient)
<Button variant="success">Confirm</Button>

// Danger (Red gradient)
<Button variant="danger">Delete</Button>

// Warning (Amber gradient)
<Button variant="warning">Proceed with Caution</Button>

// Outline (Border only)
<Button variant="outline">Learn More</Button>

// Ghost (Subtle)
<Button variant="ghost">Cancel</Button>
```

**Sizes:**
```jsx
<Button size="sm">Small</Button>
<Button size="md">Medium (default)</Button>
<Button size="lg">Large</Button>
```

**States:**
```jsx
// Full width
<Button fullWidth>Sign Up</Button>

// Loading
<Button loading>Processing...</Button>

// Disabled
<Button disabled>Not Available</Button>
```

**Example Usage:**
```jsx
<Button 
  variant="primary" 
  size="lg" 
  onClick={handleSubmit}
  className="mt-4"
>
  Submit Assessment
</Button>
```

---

### StatCard Component

**Purpose:** Display key metrics with visual gradients

```jsx
<StatCard
  icon="📊"
  label="Overall Completion"
  value="75%"
  subtext="of learning path"
  gradient="bg-gradient-primary"
  trend={{
    positive: true,
    value: 12,
    label: 'this week'
  }}
/>
```

**Features:**
- ✨ Glassmorphism overlay
- 🎨 Custom gradient backgrounds
- 📈 Trend indicators (up/down)
- ⚡ Smooth hover animations
- 🌙 Dark mode support

---

### ChartCard Component

**Purpose:** Container for charts with premium styling

```jsx
<ChartCard 
  title="Learning Trend"
  subtitle="Score progression over time"
>
  {/* Chart content here */}
</ChartCard>
```

**Features:**
- 🎨 Dark mode colors
- ✨ Glass morphism borders
- 📊 Perfect for Recharts integration
- ⚡ Smooth hover effects
- 📱 Fully responsive

---

## Spacing & Layout

### Standard Spacing Scale
```
xs -> 0.5rem (8px)
sm -> 1rem (16px)
md -> 1.5rem (24px)
lg -> 2rem (32px)
xl -> 3rem (48px)
2xl -> 4rem (64px)
```

### Consistent Patterns

**Page Sections:**
```jsx
<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
  {/* Content */}
</section>
```

**Card Padding:**
```jsx
<div className="p-6">  {/* 24px padding */}
  {/* Content */}
</div>
```

**Grid Spacing:**
```jsx
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  {/* 24px gap between items */}
</div>
```

---

## Typography

### Font Stack
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 
             'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 
             'Droid Sans', 'Helvetica Neue', sans-serif;
```

### Text Styles

**Headings:**
```jsx
<h1 className="text-5xl font-bold">Page Title</h1>
<h2 className="text-3xl font-bold">Section Title</h2>
<h3 className="text-xl font-bold">Subsection</h3>
```

**Body Text:**
```jsx
<p className="text-base">Regular paragraph</p>
<p className="text-sm">Small/secondary text</p>
<p className="text-xs">Extra small/tertiary text</p>
```

**Text Gradients:**
```jsx
<p className="text-gradient">
  Gradient text effect
</p>
```

---

## Dark Mode

### Implementation

Dark mode is **automatic** and controlled by the `ThemeContext`.

**How to use:**
```jsx
import { useTheme } from '../context/ThemeContext'

export function MyComponent() {
  const { isDark, toggleTheme } = useTheme()
  
  return (
    <div className={isDark ? 'bg-slate-900' : 'bg-white'}>
      <button onClick={toggleTheme}>
        {isDark ? '☀️ Light' : '🌙 Dark'}
      </button>
    </div>
  )
}
```

### Dark Mode Colors
```
Background:  bg-slate-950, bg-slate-900, bg-slate-800
Text:        text-white, text-gray-300, text-gray-400
Borders:     border-slate-700, border-slate-600
Hover:       hover:bg-slate-800, hover:border-slate-600
```

### Writing Dark Mode Safe CSS

**Good ✅:**
```jsx
<div className={isDark ? 'bg-slate-800 text-white' : 'bg-white text-gray-900'}>
  {/* Works in both modes */}
</div>
```

**Using Tailwind Dark Mode ✅:**
```jsx
<div className="bg-white dark:bg-slate-800 text-gray-900 dark:text-white">
  {/* Automatic dark mode support */}
</div>
```

---

## Hover Effects

### Available Hover Utilities

```jsx
// Lift effect (moves up + adds shadow)
<div className="hover-lift">
  <Card>Content</Card>
</div>

// Scale effect
<div className="hover:scale-105">
  Scale on hover
</div>

// Shadow glow
<div className="hover:shadow-lg hover:shadow-indigo-500/50">
  Glow on hover
</div>

// Translate effect
<div className="hover:-translate-y-1">
  Move up on hover
</div>
```

---

## Shadow System

### Box Shadows

```css
.shadow-glass         /* Soft, subtle shadow */
.shadow-glass-dark    /* Dark theme shadow */
.shadow-glow          /* Indigo glow */
.shadow-glow-pink     /* Pink glow */
.shadow-glow-purple   /* Purple glow */
```

### Usage:
```jsx
<div className="shadow-glass hover:shadow-glow transition-shadow">
  Hover for glow effect
</div>
```

---

## Responsive Design

### Breakpoints
```
sm  -> 640px
md  -> 768px
lg  -> 1024px
xl  -> 1280px
2xl -> 1536px
```

### Pattern Examples

**Responsive Grid:**
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {/* 1 col on mobile, 2 on tablet, 4 on desktop */}
</div>
```

**Responsive Padding:**
```jsx
<section className="px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
  {/* Smaller padding on mobile, larger on desktop */}
</section>
```

**Responsive Text:**
```jsx
<h1 className="text-3xl md:text-4xl lg:text-5xl">
  Responsive heading
</h1>
```

**Hidden Elements:**
```jsx
<div className="hidden md:flex">
  {/* Only visible on tablet+ */}
</div>
```

---

## Animation Patterns

### Staggered Animations
```jsx
{items.map((item, idx) => (
  <Card 
    key={item.id}
    className="animate-fade-in-up"
    style={{ animationDelay: `${idx * 0.1}s` }}
  >
    {item.content}
  </Card>
))}
```

### Loading States
```jsx
{loading ? (
  <div className="animate-pulse">
    <div className="h-12 bg-gray-200 rounded-lg"></div>
  </div>
) : (
  <QueryCard data={data} />
)}
```

### Transition Groups
```jsx
<div className="transition-all duration-300">
  {isVisible && (
    <div className="animate-fade-in">
      Content appears smoothly
    </div>
  )}
</div>
```

---

## Best Practices

### 1. Consistent Spacing ✅
```jsx
// Use tailwind scale
<div className="p-6">   {/* Good: 24px */}
  <div className="mb-4"> {/* Good: 16px */}
    Content
  </div>
</div>

// Avoid arbitrary spacing
<div style={{ padding: '23px' }}> {/* Bad */}
</div>
```

### 2. Color Consistency ✅
```jsx
// Use predefined gradients
<Button className="bg-gradient-primary">
  Consistent branding
</Button>

// Avoid custom colors
<Button className="bg-indigo-567"> {/* Bad */}
</Button>
```

### 3. Dark Mode Support ✅
```jsx
// Always provide dark mode
<div className="bg-white dark:bg-slate-800">
  {/* Works everywhere */}
</div>

// Don't hardcode light colors
<div className="bg-white"> {/* Bad for dark mode */}
</div>
```

### 4. Animation Moderation ✅
```jsx
// Use animations purposefully
<Card className="animate-fade-in">
  Important content
</Card>

// Don't over-animate
<div className="animate-bounce animate-pulse animate-spin">
  Too much movement
</div>
```

### 5. Responsive Design ✅
```jsx
// Plan for mobile first
<div className="px-4 md:px-8 lg:px-16">
  Works on all screens
</div>

// Don't assume desktop
<div className="px-20"> {/* Bad on mobile */}
</div>
```

---

## Quick Reference

### Common Patterns

**Premium Card:**
```jsx
<Card glass animated className="hover:shadow-lg">
  <h3 className="text-xl font-bold">Title</h3>
  <p className="text-gray-600 dark:text-gray-400">Description</p>
</Card>
```

**Gradient Button:**
```jsx
<Button 
  variant="primary" 
  size="lg"
  className="w-full"
>
  Click Me
</Button>
```

**Stat Display:**
```jsx
<StatCard
  icon="📊"
  label="Metric"
  value="123"
  gradient="bg-gradient-primary"
/>
```

**Dark Mode Text:**
```jsx
<p className="text-gray-900 dark:text-white">
  Works in both modes
</p>
```

**Responsive Grid:**
```jsx
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  <Card>Item 1</Card>
  <Card>Item 2</Card>
</div>
```

---

## Troubleshooting

### Dark Mode Not Working?
- Ensure `ThemeProvider` wraps your app
- Check `html.dark` class is being added
- Verify dark mode CSS is compiled

### Animations Too Fast/Slow?
- Adjust duration: `duration-300`, `duration-500`, `duration-1000`
- Check browser DevTools for performance issues

### Colors Look Wrong?
- Verify gradient class names match tailwind config
- Check if dark mode is affecting colors
- Use DevTools color picker to debug

### Spacing Looks Inconsistent?
- Use tailwind scale: p-4, p-6, p-8 (not arbitrary)
- Check for conflicting margin/padding
- Use consistent gap values in grids

---

## File References

| File | Purpose |
|------|---------|
| `tailwind.config.js` | Color, animation, gradient definitions |
| `src/index.css` | Global styles & utilities |
| `src/context/ThemeContext.jsx` | Dark mode implementation |
| `src/components/Card.jsx` | Reusable card component |
| `src/components/Button.jsx` | Reusable button component |
| `src/components/StatCard.jsx` | Stat display component |
| `src/components/ChartCard.jsx` | Chart container component |

---

## Next Steps

1. ✅ Import components from `src/components/`
2. ✅ Use the new `Button` component everywhere
3. ✅ Apply gradient backgrounds to pages
4. ✅ Add animations to improve UX
5. ✅ Test dark mode thoroughly
6. ✅ Check mobile responsiveness
7. ✅ Monitor performance with Lighthouse

---

**Your app is now premium, professional, and beautiful!** 🚀✨
