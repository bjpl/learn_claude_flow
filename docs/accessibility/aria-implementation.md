# ARIA Implementation Guide

## Overview

This document describes the comprehensive ARIA (Accessible Rich Internet Applications) implementation for achieving 95%+ WCAG 2.1 Level AA compliance in the Learn Claude Flow application.

## Components

### 1. ScreenReaderAnnouncer

**Purpose**: Provides ARIA live regions for announcing dynamic content changes to screen readers.

**WCAG Success Criteria**:
- 4.1.3 Status Messages (Level AA)
- 1.3.1 Info and Relationships (Level A)

**Features**:
- Polite announcements for non-critical updates
- Assertive announcements for critical updates
- Automatic message cleanup after configurable timeout
- Hook for easy integration: `useScreenReaderAnnouncer()`

**Usage**:
```tsx
import { ScreenReaderAnnouncer, useScreenReaderAnnouncer } from '@/components/accessibility';

function MyComponent() {
  const { announcements, announcePolite, announceAssertive } = useScreenReaderAnnouncer();

  const handleAction = () => {
    announcePolite('Action completed successfully');
  };

  return (
    <>
      <ScreenReaderAnnouncer announcements={announcements} />
      <button onClick={handleAction}>Do Something</button>
    </>
  );
}
```

### 2. FocusTrap

**Purpose**: Traps keyboard focus within a container, essential for modal dialogs.

**WCAG Success Criteria**:
- 2.1.2 No Keyboard Trap (Level A) - Provides escape mechanism
- 2.4.3 Focus Order (Level A)
- 2.4.7 Focus Visible (Level AA)

**Features**:
- Automatic focus trapping when active
- Escape key support
- Focus restoration to previous element
- Configurable initial focus

**Usage**:
```tsx
import { FocusTrap } from '@/components/accessibility';

function Modal({ isOpen, onClose }) {
  return (
    <FocusTrap active={isOpen} onEscape={onClose}>
      <div role="dialog" aria-modal="true">
        <h2>Modal Title</h2>
        <button onClick={onClose}>Close</button>
      </div>
    </FocusTrap>
  );
}
```

### 3. SkipLinks

**Purpose**: Provides skip navigation links for keyboard users to bypass repetitive content.

**WCAG Success Criteria**:
- 2.4.1 Bypass Blocks (Level A)
- 2.1.1 Keyboard (Level A)

**Features**:
- Visually hidden until focused
- Smooth scrolling to target
- Configurable link list
- Default links provided

**Usage**:
```tsx
import { SkipLinks, defaultSkipLinks } from '@/components/accessibility';

function App() {
  return (
    <>
      <SkipLinks links={defaultSkipLinks} />
      <nav id="main-navigation">...</nav>
      <main id="main-content">...</main>
      <footer id="footer">...</footer>
    </>
  );
}
```

### 4. KeyboardNavigationIndicator

**Purpose**: Provides visual indicators for keyboard navigation, showing focus only when using keyboard.

**WCAG Success Criteria**:
- 2.4.7 Focus Visible (Level AA)
- 1.4.11 Non-text Contrast (Level AA)

**Features**:
- Detects keyboard vs mouse navigation
- Adds class to body for CSS targeting
- Hook for component-level keyboard detection

**Usage**:
```tsx
import { KeyboardNavigationIndicator, useKeyboardNavigation } from '@/components/accessibility';

function App() {
  return (
    <>
      <KeyboardNavigationIndicator />
      {/* Rest of app */}
    </>
  );
}

// Or use the hook
function MyComponent() {
  const usingKeyboard = useKeyboardNavigation();

  return (
    <button className={usingKeyboard ? 'keyboard-focus' : ''}>
      Click me
    </button>
  );
}
```

### 5. RouteAnnouncer

**Purpose**: Announces route changes to screen readers in single-page applications.

**WCAG Success Criteria**:
- 4.1.3 Status Messages (Level AA)
- 2.4.2 Page Titled (Level A)

**Features**:
- Automatic announcement on route change
- Updates document title
- Configurable page title formatting
- Delayed announcement for DOM updates

**Usage**:
```tsx
import { BrowserRouter } from 'react-router-dom';
import { RouteAnnouncer } from '@/components/accessibility';

function App() {
  return (
    <BrowserRouter>
      <RouteAnnouncer />
      {/* Routes */}
    </BrowserRouter>
  );
}
```

## Utility Functions

### ARIA Helpers (`ariaHelpers.ts`)

Provides utility functions for creating ARIA attributes:

- `generateAriaId()` - Generate unique IDs
- `createAriaLabel()` - Label attributes
- `createAriaLive()` - Live region attributes
- `createAriaDialog()` - Dialog attributes
- `createAriaButton()` - Button attributes
- `createAriaMenu()` - Menu attributes
- `createAriaTabList()` - Tab attributes
- `createAriaProgressBar()` - Progress bar attributes
- `createAriaCombobox()` - Combobox attributes
- `announceToScreenReader()` - Dynamic announcements
- `isFocusable()` - Check if element is focusable
- `getFocusableElements()` - Get all focusable elements

### Focus Management (`focusManagement.ts`)

Provides utilities for managing keyboard focus:

- `focusElement()` - Focus with options
- `focusFirstElement()` - Focus first in container
- `focusLastElement()` - Focus last in container
- `FocusManager` - Save and restore focus
- `RovingTabindexManager` - Roving tabindex pattern
- `createFocusTrap()` - Programmatic focus trap

## CSS Support

Add these CSS classes for proper styling:

```css
/* Screen reader only content */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* Skip links */
.skip-links {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
}

.skip-link {
  position: absolute;
  left: -9999px;
  padding: 0.5rem 1rem;
  background: #000;
  color: #fff;
  text-decoration: none;
  font-weight: bold;
}

.skip-link:focus {
  left: 0;
}

/* Keyboard navigation indicators */
body.mouse-navigation *:focus {
  outline: none;
}

body.keyboard-navigation *:focus {
  outline: 2px solid #0066cc;
  outline-offset: 2px;
}

/* Focus visible utility */
[data-focus-visible="true"] {
  outline: 2px solid #0066cc;
  outline-offset: 2px;
}
```

## Testing

### Automated Testing

Run the comprehensive test suite:

```bash
npm run test:accessibility
```

Tests cover:
- ARIA attribute generation
- Focus management
- Keyboard navigation
- Screen reader announcements
- Component behavior

### Manual Testing

1. **Keyboard Navigation**:
   - Tab through all interactive elements
   - Verify focus is visible
   - Test skip links
   - Verify focus trapping in modals

2. **Screen Reader Testing**:
   - Test with NVDA (Windows) or VoiceOver (Mac)
   - Verify route announcements
   - Check live region announcements
   - Verify all labels are read correctly

3. **Browser Testing**:
   - Chrome with ChromeVox extension
   - Firefox with screen reader
   - Safari with VoiceOver
   - Edge with Narrator

## Integration Checklist

- [ ] Add `ScreenReaderAnnouncer` to root component
- [ ] Add `RouteAnnouncer` inside `BrowserRouter`
- [ ] Add `KeyboardNavigationIndicator` to root
- [ ] Add `SkipLinks` at top of app
- [ ] Wrap modals/dialogs with `FocusTrap`
- [ ] Add CSS classes for screen readers and skip links
- [ ] Test all components with keyboard
- [ ] Test with screen readers
- [ ] Run automated accessibility tests

## WCAG Compliance Matrix

| Success Criterion | Level | Component/Utility |
|------------------|-------|------------------|
| 1.3.1 Info and Relationships | A | ScreenReaderAnnouncer, ARIA Helpers |
| 2.1.1 Keyboard | A | SkipLinks, FocusTrap |
| 2.1.2 No Keyboard Trap | A | FocusTrap |
| 2.4.1 Bypass Blocks | A | SkipLinks |
| 2.4.2 Page Titled | A | RouteAnnouncer |
| 2.4.3 Focus Order | A | FocusTrap, Focus Management |
| 2.4.7 Focus Visible | AA | KeyboardNavigationIndicator |
| 4.1.3 Status Messages | AA | ScreenReaderAnnouncer, RouteAnnouncer |
| 1.4.11 Non-text Contrast | AA | KeyboardNavigationIndicator |

## Performance Considerations

1. **Announcement Debouncing**: Avoid rapid-fire announcements
2. **Focus Restoration**: Only restore when element still exists in DOM
3. **Event Listeners**: Clean up properly in useEffect hooks
4. **Memory Leaks**: Clear timeouts and intervals

## Best Practices

1. Always provide escape mechanism for focus traps
2. Use polite announcements for non-critical updates
3. Use assertive announcements sparingly
4. Keep announcement messages concise and clear
5. Test with actual assistive technology
6. Provide skip links for long content
7. Ensure all interactive elements are keyboard accessible
8. Maintain logical focus order
9. Restore focus after dialogs close
10. Use semantic HTML when possible

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Screen Reader Testing](https://webaim.org/articles/screenreader_testing/)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)

## Support

For issues or questions about accessibility implementation:
1. Check automated test results
2. Review WCAG guidelines
3. Test with screen readers
4. Consult ARIA authoring practices
5. File an issue with reproduction steps
