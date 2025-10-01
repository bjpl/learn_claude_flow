# Styling Quick Reference Guide

## Key Tailwind Classes Used

### Layout Classes
```css
/* Container Structure */
h-screen              /* Full viewport height */
h-full                /* 100% height */
flex                  /* Flexbox display */
flex-col              /* Column direction */
flex-1                /* Flex grow */
flex-shrink-0         /* Prevent shrinking */
min-h-0               /* Enable proper scrolling */
min-w-0               /* Enable proper text truncation */

/* Overflow & Scrolling */
overflow-hidden       /* Hide overflow */
overflow-y-auto       /* Vertical scroll when needed */
scrollbar-thin        /* Custom scrollbar utility */
```

### Spacing Classes
```css
/* Padding */
p-2, p-3, p-4, p-6, p-8    /* Uniform padding */
px-4, py-2                  /* Horizontal/Vertical padding */
pl-3, pl-6, pl-9, pl-12     /* Left padding (tree indentation) */

/* Margin */
mb-2, mb-3, mb-4, mb-6      /* Bottom margin */
mt-4, mt-6, mt-8            /* Top margin */
mx-auto                     /* Center horizontally */
ml-4, ml-8                  /* Left margin (ToC indentation) */

/* Gap */
gap-2, gap-3, gap-4         /* Flexbox gap */
space-y-1, space-y-2        /* Vertical spacing between children */
```

### Typography Classes
```css
/* Font Sizes */
text-xs, text-sm            /* Small text (12px, 14px) */
text-base                   /* Default (16px) */
text-lg, text-xl            /* Large (18px, 20px) */
text-2xl, text-3xl          /* Headings (24px, 30px) */

/* Font Weights */
font-normal                 /* 400 */
font-medium                 /* 500 */
font-semibold              /* 600 */
font-bold                  /* 700 */

/* Font Families */
font-sans                  /* Inter */
font-mono                  /* JetBrains Mono */
```

### Color Classes
```css
/* Background Colors */
bg-white                   /* #ffffff */
bg-gray-50, bg-gray-100    /* Light gray backgrounds */
bg-gray-900                /* Dark code blocks */
bg-blue-100, bg-blue-600   /* Primary blue accents */

/* Text Colors */
text-gray-500, text-gray-600, text-gray-700, text-gray-900
text-blue-600, text-blue-900    /* Links and accents */
text-red-600                    /* Inline code */

/* Border Colors */
border-gray-200, border-gray-300    /* Subtle borders */
border-blue-500                     /* Focus/Active states */
```

### Interactive States
```css
/* Hover */
hover:bg-gray-100          /* Subtle hover background */
hover:bg-gray-200          /* Stronger hover (buttons) */
hover:text-gray-700        /* Hover text color change */
hover:underline            /* Underline on hover (links) */

/* Focus */
focus:outline-none         /* Remove default outline */
focus:ring-2               /* Add custom focus ring */
focus:ring-blue-500        /* Blue focus ring */
focus:border-transparent   /* Remove border on focus */

/* Active/Selected */
bg-blue-100 text-blue-900 font-medium    /* Selected state */
```

### Responsive Classes
```css
/* Breakpoints */
lg:block                   /* Show on large screens (≥1024px) */
lg:hidden                  /* Hide on large screens */
md:grid-cols-2             /* 2 columns on medium (≥768px) */

/* Mobile-First Approach */
hidden lg:block            /* Hidden on mobile, visible on desktop */
block lg:hidden            /* Visible on mobile, hidden on desktop */
```

### Borders & Shadows
```css
/* Borders */
border                     /* 1px solid border */
border-b, border-l, border-r    /* Specific sides */
border-gray-200            /* Border color */
rounded-lg                 /* Large border radius */
rounded-full               /* Fully rounded (pills) */

/* Shadows */
shadow-sm                  /* Subtle shadow */
shadow-base, shadow-md     /* Medium shadows */
```

### Transitions & Animations
```css
/* Transitions */
transition-colors          /* Smooth color transitions */
transition-all             /* All properties transition */
duration-150, duration-300 /* Animation duration */

/* Animations */
animate-spin               /* Loading spinner */
animate-fade-in            /* Fade in animation */
```

## Custom Utility Classes

### Scrollbar (index.css)
```css
.scrollbar-thin {
  scrollbar-width: thin;                    /* Firefox */
  scrollbar-color: #cbd5e1 #f1f5f9;       /* Track & thumb */
}

.scrollbar-thin::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: #f1f5f9;                     /* Light gray */
  border-radius: 4px;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background: #cbd5e1;                     /* Medium gray */
  border-radius: 4px;
  transition: background 150ms ease;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;                     /* Darker on hover */
}
```

## Prose Typography Plugin

### Usage
```jsx
<div className="prose prose-slate prose-lg max-w-none">
  {/* Markdown content */}
</div>
```

### Modifiers
```css
prose                      /* Base prose styles */
prose-slate                /* Slate color scheme */
prose-lg                   /* Larger text (18px base) */
max-w-none                 /* Remove max-width constraint */

/* Element-specific modifiers */
prose-headings:font-bold   /* Bold headings */
prose-a:text-blue-600      /* Blue links */
prose-code:text-red-600    /* Red inline code */
prose-code:bg-gray-100     /* Gray code background */
prose-pre:bg-gray-900      /* Dark code blocks */
prose-pre:text-gray-100    /* Light code text */
```

## Common Patterns

### Three-Panel Layout
```jsx
<div className="h-screen flex flex-col">
  {/* Header */}
  <header className="flex-shrink-0 border-b">...</header>

  {/* Content */}
  <div className="flex-1 flex min-h-0">
    {/* Left Sidebar */}
    <aside className="w-80 flex-shrink-0 overflow-y-auto scrollbar-thin">
      ...
    </aside>

    {/* Main Content */}
    <main className="flex-1 overflow-y-auto scrollbar-thin">
      ...
    </main>

    {/* Right Sidebar */}
    <aside className="w-64 flex-shrink-0 overflow-y-auto scrollbar-thin">
      ...
    </aside>
  </div>
</div>
```

### Tree Navigation Item
```jsx
<button className={`
  w-full flex items-center gap-2 py-2 rounded-lg text-left
  transition-colors duration-150
  ${getPaddingClass(level)}
  ${isSelected
    ? 'bg-blue-100 text-blue-900 font-medium'
    : 'hover:bg-gray-100 text-gray-700'
  }
`}>
  {/* Content */}
</button>
```

### Search Input
```jsx
<div className="relative">
  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
  <input
    type="text"
    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg
               focus:outline-none focus:ring-2 focus:ring-blue-500
               focus:border-transparent text-sm"
    placeholder="Search..."
  />
</div>
```

### Loading Spinner
```jsx
<div className="flex items-center justify-center h-full">
  <div className="text-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
    <p className="text-gray-600">Loading...</p>
  </div>
</div>
```

### Card Component
```jsx
<div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm
                hover:shadow-md transition-shadow">
  <h3 className="text-xl font-semibold text-gray-900 mb-2">Title</h3>
  <p className="text-gray-600">Description</p>
</div>
```

## Important Rules

### ❌ Don't Do This (Won't Work)
```jsx
// Dynamic class construction
<div className={`ml-${level * 4}`} />  // ❌ Tailwind can't purge this

// Inline styles for things that should be classes
<div style={{ paddingLeft: `${level}rem` }} />  // ❌ Not consistent

// Template literals for colors
<div className={`bg-${color}-500`} />  // ❌ Won't be purged correctly
```

### ✅ Do This Instead
```jsx
// Predefined class mapping
const getPaddingClass = (level: number): string => {
  const map: Record<number, string> = {
    0: 'pl-3',
    1: 'pl-6',
    2: 'pl-9',
  };
  return map[level] || map[0];
};

// Use the mapping
<div className={getPaddingClass(level)} />  // ✅ Works perfectly
```

## Color Palette Reference

```css
/* Primary (Blue) */
primary-50  → #f0f9ff
primary-100 → #e0f2fe
primary-500 → #0ea5e9
primary-600 → #0284c7
primary-900 → #0c4a6e

/* Neutral (Gray) */
neutral-50  → #fafafa
neutral-100 → #f5f5f5
neutral-500 → #737373
neutral-700 → #404040
neutral-900 → #171717

/* Semantic */
success-500 → #22c55e  (green)
warning-500 → #f59e0b  (amber)
error-500   → #ef4444  (red)
```

## Tips & Tricks

1. **Always use `min-h-0` with flex containers** that need scrolling
2. **Apply `scrollbar-thin`** to all scrollable containers for consistency
3. **Use `flex-shrink-0`** on headers/footers to prevent collapse
4. **Combine responsive classes** for mobile-first design
5. **Use `prose` plugin** for markdown content instead of manual styling
6. **Group hover states** with other interactive states for clarity
7. **Leverage Tailwind's JIT mode** - all classes are available
8. **Test with different content sizes** to ensure proper scrolling

## Debugging

### Layout Issues
```bash
# Check for:
- Missing min-h-0 on flex containers
- Missing overflow-y-auto on scrollable areas
- Missing flex-shrink-0 on fixed-size elements
- Conflicting width/height constraints
```

### Styling Not Applied
```bash
# Verify:
- Class names are exact (no typos)
- No dynamic class construction
- Tailwind config includes your files
- Dev server restarted after config changes
```

### Build Issues
```bash
# Common fixes:
npm run build          # Test production build
npm install -D @tailwindcss/typography  # Missing plugin
```

---

**Last Updated:** 2025-09-30
**Tailwind Version:** 3.4.15
**Plugin:** @tailwindcss/typography 0.5.19
