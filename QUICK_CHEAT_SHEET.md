# ⚡ Premium UI System - Quick Cheat Sheet

## Components

### Card
```jsx
<Card>Basic</Card>
<Card glass>Glassmorphic</Card>
<Card glass animated>With animation</Card>
<Card onClick={fn}>Clickable</Card>
```

### Button
```jsx
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="success">Success</Button>
<Button variant="danger">Danger</Button>
<Button variant="warning">Warning</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>

<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

<Button fullWidth>Full Width</Button>
<Button loading>Loading...</Button>
<Button disabled>Disabled</Button>
```

### StatCard
```jsx
<StatCard
  icon="📊"
  label="Label"
  value="123"
  gradient="bg-gradient-primary"
  trend={{ positive: true, value: 5, label: 'this week' }}
/>
```

### ChartCard
```jsx
<ChartCard title="Title" subtitle="Subtitle">
  {/* Chart content */}
</ChartCard>
```

---

## Animations

| Class | Effect | Duration |
|-------|--------|----------|
| `animate-fade-in` | Opacity fade | 500ms |
| `animate-fade-in-down` | Top entrance | 500ms |
| `animate-fade-in-up` | Bottom entrance | 500ms |
| `animate-fade-in-left` | Left entrance | 500ms |
| `animate-fade-in-right` | Right entrance | 500ms |
| `animate-slide-down` | Slide down | 400ms |
| `animate-slide-up` | Slide up | 400ms |
| `animate-scale-in` | Scale appear | 300ms |
| `animate-float` | Float up/down | 3s infinite |
| `animate-pulse-glow` | Pulsing glow | 2s infinite |

**Stagger pattern:**
```jsx
style={{ animationDelay: `${idx * 0.1}s` }}
```

---

## Colors & Gradients

| Class | Colors |
|-------|--------|
| `bg-gradient-primary` | Indigo → Purple |
| `bg-gradient-accent` | Purple → Pink |
| `bg-gradient-success` | Green → Emerald |
| `bg-gradient-warning` | Amber → Orange |
| `bg-gradient-danger` | Red → Crimson |
| `bg-gradient-cyan` | Cyan → Blue |

**Text gradient:**
```jsx
<p className="text-gradient">Gradient text</p>
```

---

## Dark Mode

### Manual check:
```jsx
const { isDark } = useTheme()

<div className={isDark ? 'bg-slate-900' : 'bg-white'}>
```

### Auto with Tailwind:
```jsx
<div className="bg-white dark:bg-slate-900">
```

**Dark colors:**
```
bg-slate-950   → Darkest background
bg-slate-900   → Dark background
bg-slate-800   → Dark cards
bg-slate-700   → Dark borders
text-white     → Light text
text-gray-300  → Secondary text
```

---

## Effects

| Class | Effect |
|-------|--------|
| `glass` | Frosted glass |
| `glass-dark` | Dark glass |
| `text-gradient` | Gradient text |
| `hover-lift` | Hover elevation |
| `shadow-glass` | Soft shadow |
| `shadow-glow` | Indigo glow |
| `shadow-glow-pink` | Pink glow |
| `shadow-glow-purple` | Purple glow |

---

## Spacing Scale

```
p-4   → 16px
p-6   → 24px (standard)
p-8   → 32px
gap-6 → 24px between items
my-8  → 32px vertical margin
```

---

## Common Patterns

### Page Header
```jsx
<div className={isDark ? 'bg-slate-900' : 'bg-white'}>
  <div className="animate-fade-in-down">
    <h1 className="text-5xl font-bold">Title</h1>
    <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
      Subtitle
    </p>
  </div>
</div>
```

### Card Grid
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {items.map((item, idx) => (
    <div
      key={item.id}
      className="animate-fade-in-up"
      style={{ animationDelay: `${idx * 0.1}s` }}
    >
      <Card glass>{item.content}</Card>
    </div>
  ))}
</div>
```

### Button Group
```jsx
<div className="flex gap-4">
  <Button variant="primary">Save</Button>
  <Button variant="ghost">Cancel</Button>
</div>
```

### Dark Mode Safe
```jsx
<div className={`
  transition-colors duration-300
  ${isDark ? 'bg-slate-800 text-white' : 'bg-white text-gray-900'}
`}>
  {/* Content */}
</div>
```

---

## Hover Effects

```jsx
<div className="hover:scale-105">Scale up</div>
<div className="hover:shadow-lg">Add shadow</div>
<div className="hover:-translate-y-1">Move up</div>
<div className="hover:bg-gray-100 dark:hover:bg-slate-800">BG change</div>
```

---

## Responsive

```jsx
<div className="px-4 md:px-8 lg:px-16">Padding</div>
<div className="text-2xl md:text-3xl lg:text-4xl">Text size</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">Grid</div>
<div className="hidden md:flex">Hidden on mobile</div>
<div className="block lg:hidden">Hidden on desktop</div>
```

---

## Performance Tips

✅ **Do:**
- Use gradient buttons everywhere
- Add glass effect to cards
- Use `dark:` prefix over ternaries
- Animate with transform/opacity
- Limit animations per page

❌ **Don't:**
- Animate width/height (layout shift)
- Use arbitrary colors
- Hardcode light-only colors
- Over-animate (distraction)
- Ignore dark mode

---

## File Quick Access

```
Configuration:
├─ tailwind.config.js   (Colors, animations)
└─ src/index.css        (Global styles)

Components:
├─ Button.jsx           (Premium buttons)
├─ Card.jsx             (Premium cards)
├─ StatCard.jsx         (Metrics)
├─ ChartCard.jsx        (Charts)
└─ Navbar.jsx           (Navigation)

Context:
└─ ThemeContext.jsx     (Dark mode)

Docs:
├─ PREMIUM_UI_SYSTEM.md
├─ UI_UPGRADE_IMPLEMENTATION.md
├─ UI_ANIMATIONS_VISUAL_GUIDE.md
└─ UI_UPGRADE_SUMMARY.md
```

---

## Dark Mode Toggle

```jsx
import { useTheme } from '../context/ThemeContext'

function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme()
  return (
    <button onClick={toggleTheme}>
      {isDark ? '☀️ Light' : '🌙 Dark'}
    </button>
  )
}
```

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Animation not showing | Check class name: `animate-fade-in` |
| Button not gradient | Use `<Button>` component |
| Dark mode not working | Import useTheme, check ThemeProvider |
| Colors wrong | Check `dark:` prefix in className |
| Card not glass | Add `glass` prop to `<Card>` |
| Mobile broken | Check responsive classes: `md:`, `lg:` |

---

## Import Statements

```jsx
// Components
import Card from '../components/Card'
import Button from '../components/Button'
import StatCard from '../components/StatCard'
import ChartCard from '../components/ChartCard'

// Context
import { useTheme } from '../context/ThemeContext'

// Icons (if using)
import { Menu, X, ChevronDown } from 'lucide-react'
```

---

## Class Name Templates

**Page Wrapper:**
```jsx
<div className={`
  min-h-screen transition-colors duration-300
  ${isDark ? 'bg-slate-950' : 'bg-white'}
`}>
```

**Section:**
```jsx
<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
```

**Heading:**
```jsx
<h1 className={`
  text-5xl font-bold
  ${isDark ? 'text-white' : 'text-gray-900'}
`}>
```

**Paragraph:**
```jsx
<p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
```

---

## Remember

- 🎨 Colors: Use gradients not single colors
- ⚡ Animations: Smooth 300-500ms transitions
- 🌙 Dark mode: Always provide both themes
- 📱 Mobile: Test at 320px, 768px, 1024px
- ♿ Accessibility: Proper contrast, touch targets
- 🔧 Consistency: Follow established patterns

---

**Keep this handy when building!** 📌
