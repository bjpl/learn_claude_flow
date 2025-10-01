# Accessibility Examples

This directory contains comprehensive examples demonstrating ARIA implementation for WCAG 2.1 Level AA compliance.

## Contents

### AccessibleApp.tsx

Complete application example showing:

1. **Screen Reader Announcements**
   - Route change announcements
   - Form submission feedback
   - Menu selection feedback
   - Tab change announcements

2. **Focus Management**
   - Focus trapping in modals
   - Focus restoration after modal close
   - Keyboard navigation in menus
   - Tab panel keyboard navigation

3. **Skip Navigation**
   - Skip to main content
   - Skip to navigation
   - Skip to footer

4. **Keyboard Indicators**
   - Visible focus rings for keyboard users
   - Hidden focus for mouse users

5. **ARIA Patterns Implemented**
   - Dialog/Modal
   - Tabs
   - Menu
   - Forms with validation

## Running the Examples

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run accessibility tests
npm run test:accessibility
```

## Testing the Examples

### Keyboard Navigation

1. Use Tab to navigate through interactive elements
2. Use Shift+Tab to navigate backwards
3. Use Enter/Space to activate buttons
4. Use Escape to close modals
5. Use Arrow keys in menus and tabs

### Screen Reader Testing

#### NVDA (Windows)
1. Download and install NVDA
2. Start NVDA (Ctrl+Alt+N)
3. Navigate with Tab and arrow keys
4. Listen for route announcements
5. Test form validation announcements

#### VoiceOver (macOS)
1. Enable VoiceOver (Cmd+F5)
2. Navigate with VO+arrow keys
3. Listen for route announcements
4. Test form validation announcements

#### JAWS (Windows)
1. Start JAWS
2. Navigate with Tab and arrow keys
3. Listen for route announcements
4. Test form validation announcements

### Browser Testing

Test in multiple browsers:
- Chrome with ChromeVox extension
- Firefox with screen reader
- Safari with VoiceOver
- Edge with Narrator

## Key Features Demonstrated

### 1. Screen Reader Announcements

```tsx
const { announcements, announcePolite, announceAssertive } = useScreenReaderAnnouncer();

// Polite announcement (non-interrupting)
announcePolite('Form submitted successfully!');

// Assertive announcement (interrupts)
announceAssertive('Form has errors. Please correct them.');
```

### 2. Focus Trap (Modals)

```tsx
<FocusTrap active={isOpen} onEscape={onClose} returnFocus={true}>
  <div role="dialog" aria-modal="true">
    {/* Modal content */}
  </div>
</FocusTrap>
```

### 3. Skip Links

```tsx
<SkipLinks links={defaultSkipLinks} />

{/* Target elements need proper IDs */}
<main id="main-content" tabIndex={-1}>...</main>
<nav id="main-navigation">...</nav>
<footer id="footer" tabIndex={-1}>...</footer>
```

### 4. Keyboard Navigation Indicator

```tsx
<KeyboardNavigationIndicator showOnlyOnKeyboard={true} />

{/* Or use the hook */}
const usingKeyboard = useKeyboardNavigation();
```

### 5. Route Announcements

```tsx
<BrowserRouter>
  <RouteAnnouncer />
  {/* Routes */}
</BrowserRouter>
```

## WCAG Compliance Checklist

- [x] 1.3.1 Info and Relationships (Level A)
- [x] 2.1.1 Keyboard (Level A)
- [x] 2.1.2 No Keyboard Trap (Level A)
- [x] 2.4.1 Bypass Blocks (Level A)
- [x] 2.4.2 Page Titled (Level A)
- [x] 2.4.3 Focus Order (Level A)
- [x] 2.4.7 Focus Visible (Level AA)
- [x] 4.1.3 Status Messages (Level AA)
- [x] 1.4.11 Non-text Contrast (Level AA)

## Common Patterns

### Accessible Form

```tsx
<form aria-label="Contact form">
  <label htmlFor="name">Name *</label>
  <input
    id="name"
    aria-invalid={hasError}
    aria-describedby={hasError ? 'name-error' : undefined}
  />
  {hasError && <div id="name-error" role="alert">Error message</div>}
</form>
```

### Accessible Tabs

```tsx
<div role="tablist">
  <button
    role="tab"
    aria-selected={isSelected}
    aria-controls="panel-id"
    tabIndex={isSelected ? 0 : -1}
  >
    Tab Label
  </button>
</div>
<div
  role="tabpanel"
  id="panel-id"
  hidden={!isSelected}
>
  Panel content
</div>
```

### Accessible Menu

```tsx
<button
  aria-haspopup="menu"
  aria-expanded={isOpen}
  aria-controls="menu-id"
>
  Menu
</button>
<ul role="menu" id="menu-id">
  <li role="none">
    <button role="menuitem">Menu Item</button>
  </li>
</ul>
```

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM ARIA Guide](https://webaim.org/articles/aria/)
- [MDN ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA)

## Troubleshooting

### Focus Not Visible
- Check if `KeyboardNavigationIndicator` is mounted
- Verify CSS is imported
- Check browser DevTools for applied styles

### Announcements Not Working
- Verify `ScreenReaderAnnouncer` is mounted
- Check browser console for errors
- Test with actual screen reader

### Skip Links Not Working
- Verify target elements have correct IDs
- Check if targets have `tabIndex={-1}`
- Test focus programmatically

### Modal Focus Not Trapped
- Verify `FocusTrap` has `active={true}`
- Check if modal has focusable elements
- Test keyboard navigation manually

## Support

For issues or questions:
1. Check the documentation
2. Review test files
3. Test with screen readers
4. File an issue with reproduction steps
