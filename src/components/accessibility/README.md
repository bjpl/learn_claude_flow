# Accessibility Components

ARIA-compliant React components for achieving WCAG 2.1 Level AA compliance.

## Components

### ScreenReaderAnnouncer
Announces dynamic content changes to screen readers using ARIA live regions.

**Import:**
```tsx
import { ScreenReaderAnnouncer, useScreenReaderAnnouncer } from '@/components/accessibility';
```

**Usage:**
```tsx
const { announcements, announcePolite, announceAssertive } = useScreenReaderAnnouncer();

return (
  <>
    <ScreenReaderAnnouncer announcements={announcements} />
    <button onClick={() => announcePolite('Action completed')}>
      Click Me
    </button>
  </>
);
```

### FocusTrap
Traps keyboard focus within a container for modal dialogs.

**Import:**
```tsx
import { FocusTrap } from '@/components/accessibility';
```

**Usage:**
```tsx
<FocusTrap active={isOpen} onEscape={onClose} returnFocus={true}>
  <div role="dialog" aria-modal="true">
    <h2>Modal Title</h2>
    <button onClick={onClose}>Close</button>
  </div>
</FocusTrap>
```

### SkipLinks
Provides skip navigation links for keyboard users.

**Import:**
```tsx
import { SkipLinks, defaultSkipLinks } from '@/components/accessibility';
```

**Usage:**
```tsx
<SkipLinks links={defaultSkipLinks} />

{/* Ensure targets exist */}
<main id="main-content" tabIndex={-1}>...</main>
```

### KeyboardNavigationIndicator
Shows focus indicators only when navigating with keyboard.

**Import:**
```tsx
import { KeyboardNavigationIndicator, useKeyboardNavigation } from '@/components/accessibility';
```

**Usage:**
```tsx
// As component
<KeyboardNavigationIndicator showOnlyOnKeyboard={true} />

// Or as hook
const usingKeyboard = useKeyboardNavigation();
```

### RouteAnnouncer
Announces route changes to screen readers in SPAs.

**Import:**
```tsx
import { RouteAnnouncer } from '@/components/accessibility';
```

**Usage:**
```tsx
<BrowserRouter>
  <RouteAnnouncer />
  {/* Routes */}
</BrowserRouter>
```

## Quick Start

1. Import CSS:
```tsx
import '@/styles/accessibility-aria.css';
```

2. Add to root component:
```tsx
function App() {
  return (
    <BrowserRouter>
      <KeyboardNavigationIndicator />
      <RouteAnnouncer />
      <SkipLinks links={defaultSkipLinks} />
      {/* Your app */}
    </BrowserRouter>
  );
}
```

3. Add required IDs to targets:
```tsx
<nav id="main-navigation">...</nav>
<main id="main-content" tabIndex={-1}>...</main>
<footer id="footer" tabIndex={-1}>...</footer>
```

## Documentation

- [Full Implementation Guide](../../../docs/accessibility/aria-implementation.md)
- [Quick Reference](../../../docs/accessibility/quick-reference.md)
- [Examples](../../../examples/accessibility/)

## Testing

Run accessibility tests:
```bash
npm run test:a11y
```

## WCAG Compliance

These components help achieve:
- ✅ Level A: All criteria
- ✅ Level AA: 95%+ criteria

## Support

- Check documentation in `/docs/accessibility/`
- Review examples in `/examples/accessibility/`
- Run verification: `node scripts/verify-aria-implementation.js`
