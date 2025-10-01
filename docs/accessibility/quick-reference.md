# ARIA Quick Reference Guide

## Components Import

```tsx
import {
  ScreenReaderAnnouncer,
  useScreenReaderAnnouncer,
  FocusTrap,
  SkipLinks,
  defaultSkipLinks,
  KeyboardNavigationIndicator,
  RouteAnnouncer,
} from '@/components/accessibility';

import {
  generateAriaId,
  createAriaLabel,
  createAriaDialog,
  announceToScreenReader,
  getFocusableElements,
} from '@/utils/accessibility';
```

## Quick Setup

### 1. Add to Root App Component

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

### 2. Add CSS

```tsx
import '@/styles/accessibility-aria.css';
```

### 3. Add Target IDs

```tsx
<nav id="main-navigation">...</nav>
<main id="main-content" tabIndex={-1}>...</main>
<footer id="footer" tabIndex={-1}>...</footer>
```

## Common Patterns

### Announcements

```tsx
// In component
const { announcements, announcePolite, announceAssertive } = useScreenReaderAnnouncer();

// Render announcer
<ScreenReaderAnnouncer announcements={announcements} />

// Make announcements
announcePolite('Success message');
announceAssertive('Error message');
```

### Modal Dialog

```tsx
<FocusTrap active={isOpen} onEscape={onClose}>
  <div role="dialog" aria-modal="true" aria-labelledby="title">
    <h2 id="title">Dialog Title</h2>
    <button onClick={onClose}>Close</button>
  </div>
</FocusTrap>
```

### Form with Validation

```tsx
<label htmlFor="email">Email *</label>
<input
  id="email"
  type="email"
  aria-invalid={!!error}
  aria-describedby={error ? 'email-error' : undefined}
/>
{error && <div id="email-error" role="alert">{error}</div>}
```

### Tabs

```tsx
// Tab list
<div role="tablist" aria-label="Sections">
  <button
    role="tab"
    aria-selected={active === 0}
    aria-controls="panel-0"
    tabIndex={active === 0 ? 0 : -1}
  >
    Tab 1
  </button>
</div>

// Tab panel
<div
  role="tabpanel"
  id="panel-0"
  aria-labelledby="tab-0"
  hidden={active !== 0}
>
  Content
</div>
```

### Menu

```tsx
<button
  aria-haspopup="menu"
  aria-expanded={isOpen}
  aria-controls="menu-1"
>
  Menu
</button>

<ul role="menu" id="menu-1">
  <li role="none">
    <button role="menuitem">Action</button>
  </li>
</ul>
```

### Button States

```tsx
// Toggle button
<button aria-pressed={isPressed}>Toggle</button>

// Disabled button
<button aria-disabled={true}>Disabled</button>

// Expanded/collapsed
<button aria-expanded={isExpanded}>Expand</button>
```

### Progress Bar

```tsx
<div
  role="progressbar"
  aria-valuenow={50}
  aria-valuemin={0}
  aria-valuemax={100}
  aria-label="Upload progress"
/>
```

### Combobox

```tsx
<input
  role="combobox"
  aria-expanded={isOpen}
  aria-controls="listbox-1"
  aria-activedescendant={activeId}
/>

<ul role="listbox" id="listbox-1">
  <li role="option" aria-selected={isSelected}>Option</li>
</ul>
```

## Helper Functions

### ARIA Attributes

```tsx
// Label
const labelProps = createAriaLabel('Button label');
<button {...labelProps}>Click</button>

// Dialog
const dialogProps = createAriaDialog('dialog', 'title-id');
<div {...dialogProps}>...</div>

// Live region
announceToScreenReader('Message', 'polite');
```

### Focus Management

```tsx
import {
  focusElement,
  focusFirstElement,
  FocusManager,
  RovingTabindexManager,
  createFocusTrap,
} from '@/utils/accessibility';

// Focus element
focusElement(buttonRef.current);

// Focus first in container
focusFirstElement(containerRef.current);

// Save/restore focus
const manager = new FocusManager();
manager.push(); // Save current focus
manager.pop();  // Restore focus

// Roving tabindex
const rover = new RovingTabindexManager(containerRef.current);
rover.focusNext();
rover.focusPrevious();

// Create focus trap
const cleanup = createFocusTrap(containerRef.current, onEscape);
// Later: cleanup();
```

## ARIA Roles Reference

### Landmark Roles
- `main` - Main content
- `navigation` - Navigation
- `search` - Search
- `complementary` - Complementary content
- `contentinfo` - Footer

### Widget Roles
- `button` - Button
- `checkbox` - Checkbox
- `radio` - Radio button
- `tab` - Tab
- `tabpanel` - Tab panel
- `menuitem` - Menu item
- `option` - Select option

### Document Roles
- `article` - Article
- `dialog` - Dialog
- `alert` - Alert
- `status` - Status
- `tooltip` - Tooltip

## ARIA Properties

### States
- `aria-expanded` - Expanded/collapsed state
- `aria-selected` - Selection state
- `aria-pressed` - Toggle button state
- `aria-checked` - Checkbox/radio state
- `aria-disabled` - Disabled state
- `aria-hidden` - Hidden from AT
- `aria-invalid` - Validation state
- `aria-current` - Current item

### Relationships
- `aria-labelledby` - Label reference
- `aria-describedby` - Description reference
- `aria-controls` - Controls relationship
- `aria-activedescendant` - Active descendant
- `aria-owns` - Ownership

### Live Regions
- `aria-live="polite"` - Polite updates
- `aria-live="assertive"` - Assertive updates
- `aria-atomic="true"` - Read entire region
- `aria-relevant` - What changes to announce

## Keyboard Support

### Standard Keys
- `Tab` - Next focusable element
- `Shift+Tab` - Previous focusable element
- `Enter` - Activate
- `Space` - Activate (buttons, checkboxes)
- `Escape` - Close/cancel

### Arrow Keys
- `ArrowUp/ArrowDown` - Vertical navigation
- `ArrowLeft/ArrowRight` - Horizontal navigation
- `Home` - First item
- `End` - Last item

### Component-Specific
- **Tabs**: Arrow keys to navigate, Enter to activate
- **Menu**: Arrow keys to navigate, Enter to select
- **Combobox**: Arrow keys for options, Enter to select
- **Dialog**: Escape to close

## Testing Checklist

### Keyboard Testing
- [ ] All interactive elements reachable via Tab
- [ ] Focus visible for keyboard users
- [ ] Skip links work
- [ ] Modal traps focus
- [ ] Escape closes modals
- [ ] Arrow keys work in menus/tabs

### Screen Reader Testing
- [ ] Route changes announced
- [ ] Form errors announced
- [ ] Dynamic content announced
- [ ] Labels read correctly
- [ ] Button states conveyed
- [ ] Landmarks identified

### Automated Testing
- [ ] Run accessibility tests
- [ ] Check ARIA attributes
- [ ] Verify focus management
- [ ] Check color contrast

## Common Mistakes

### ❌ Don't Do This

```tsx
// Missing label
<button><Icon /></button>

// Redundant ARIA
<button role="button">Click</button>

// Incorrect role
<div role="button" onClick={...}>Click</div>

// Missing live region
{message && <div>{message}</div>}

// No keyboard support
<div onClick={...}>Click</div>
```

### ✅ Do This Instead

```tsx
// Proper label
<button aria-label="Close"><Icon /></button>

// Use semantic HTML
<button>Click</button>

// Proper button
<button onClick={...}>Click</button>

// Live region
{message && <div role="status" aria-live="polite">{message}</div>}

// Keyboard support
<button onClick={...}>Click</button>
```

## Resources

- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA APG](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM](https://webaim.org/)
- [A11y Project](https://www.a11yproject.com/)

## Get Help

1. Check documentation: `/docs/accessibility/aria-implementation.md`
2. Review examples: `/examples/accessibility/`
3. Run tests: `npm run test:accessibility`
4. Test with screen readers
5. File issue with details
