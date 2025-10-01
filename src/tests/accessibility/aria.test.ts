import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import {
  ScreenReaderAnnouncer,
  useScreenReaderAnnouncer,
  FocusTrap,
  SkipLinks,
  defaultSkipLinks,
  KeyboardNavigationIndicator,
  RouteAnnouncer,
} from '../../components/accessibility';
import {
  generateAriaId,
  createAriaLabel,
  createAriaLive,
  createAriaDialog,
  createAriaButton,
  announceToScreenReader,
  isFocusable,
  getFocusableElements,
} from '../../utils/accessibility/ariaHelpers';
import {
  focusElement,
  focusFirstElement,
  focusLastElement,
  FocusManager,
  RovingTabindexManager,
  createFocusTrap,
} from '../../utils/accessibility/focusManagement';

describe('ARIA Helper Utilities', () => {
  describe('generateAriaId', () => {
    it('should generate unique IDs with prefix', () => {
      const id1 = generateAriaId('test');
      const id2 = generateAriaId('test');

      expect(id1).toMatch(/^test-[a-z0-9]+$/);
      expect(id2).toMatch(/^test-[a-z0-9]+$/);
      expect(id1).not.toBe(id2);
    });
  });

  describe('createAriaLabel', () => {
    it('should create aria-label attribute', () => {
      const props = createAriaLabel('Test Label');
      expect(props['aria-label']).toBe('Test Label');
    });

    it('should create aria-labelledby attribute', () => {
      const props = createAriaLabel(undefined, 'label-id');
      expect(props['aria-labelledby']).toBe('label-id');
    });

    it('should create aria-describedby attribute', () => {
      const props = createAriaLabel(undefined, undefined, 'desc-id');
      expect(props['aria-describedby']).toBe('desc-id');
    });

    it('should combine all label attributes', () => {
      const props = createAriaLabel('Label', 'label-id', 'desc-id');
      expect(props['aria-label']).toBe('Label');
      expect(props['aria-labelledby']).toBe('label-id');
      expect(props['aria-describedby']).toBe('desc-id');
    });
  });

  describe('createAriaLive', () => {
    it('should create polite live region by default', () => {
      const props = createAriaLive();
      expect(props['aria-live']).toBe('polite');
      expect(props['aria-atomic']).toBe(true);
    });

    it('should create assertive live region', () => {
      const props = createAriaLive('assertive');
      expect(props['aria-live']).toBe('assertive');
    });

    it('should set aria-relevant attribute', () => {
      const props = createAriaLive('polite', true, 'additions text');
      expect(props['aria-relevant']).toBe('additions text');
    });
  });

  describe('createAriaDialog', () => {
    it('should create dialog attributes', () => {
      const props = createAriaDialog();
      expect(props.role).toBe('dialog');
      expect(props['aria-modal']).toBe(true);
    });

    it('should create alertdialog attributes', () => {
      const props = createAriaDialog('alertdialog', 'title-id', 'desc-id');
      expect(props.role).toBe('alertdialog');
      expect(props['aria-labelledby']).toBe('title-id');
      expect(props['aria-describedby']).toBe('desc-id');
    });
  });

  describe('createAriaButton', () => {
    it('should create basic button attributes', () => {
      const props = createAriaButton();
      expect(Object.keys(props).length).toBe(0);
    });

    it('should set aria-pressed for toggle buttons', () => {
      const props = createAriaButton(true);
      expect(props['aria-pressed']).toBe(true);
    });

    it('should set aria-disabled and tabindex for disabled buttons', () => {
      const props = createAriaButton(undefined, true);
      expect(props['aria-disabled']).toBe(true);
      expect(props.tabIndex).toBe(-1);
    });
  });

  describe('announceToScreenReader', () => {
    it('should create and remove announcement element', async () => {
      announceToScreenReader('Test announcement');

      await waitFor(() => {
        const announcements = document.querySelectorAll('[role="status"]');
        expect(announcements.length).toBeGreaterThan(0);
      });

      await waitFor(() => {
        const announcements = document.querySelectorAll('[role="status"]');
        expect(announcements.length).toBe(0);
      }, { timeout: 1500 });
    });

    it('should create assertive announcement', async () => {
      announceToScreenReader('Critical announcement', 'assertive');

      await waitFor(() => {
        const alert = document.querySelector('[role="alert"]');
        expect(alert).toBeTruthy();
      });
    });
  });

  describe('isFocusable', () => {
    it('should identify focusable elements', () => {
      const button = document.createElement('button');
      document.body.appendChild(button);

      expect(isFocusable(button)).toBe(true);

      document.body.removeChild(button);
    });

    it('should reject disabled elements', () => {
      const button = document.createElement('button');
      button.disabled = true;
      document.body.appendChild(button);

      expect(isFocusable(button)).toBe(false);

      document.body.removeChild(button);
    });

    it('should reject hidden elements', () => {
      const button = document.createElement('button');
      button.setAttribute('aria-hidden', 'true');
      document.body.appendChild(button);

      expect(isFocusable(button)).toBe(false);

      document.body.removeChild(button);
    });
  });
});

describe('Focus Management Utilities', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    container.innerHTML = `
      <button id="btn1">Button 1</button>
      <input id="input1" type="text" />
      <a id="link1" href="#">Link 1</a>
      <button id="btn2">Button 2</button>
    `;
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  describe('focusElement', () => {
    it('should focus element', () => {
      const button = container.querySelector('#btn1') as HTMLElement;
      focusElement(button);
      expect(document.activeElement).toBe(button);
    });

    it('should handle null element', () => {
      expect(() => focusElement(null)).not.toThrow();
    });
  });

  describe('focusFirstElement', () => {
    it('should focus first focusable element', () => {
      const result = focusFirstElement(container);
      expect(result).toBe(true);
      expect(document.activeElement?.id).toBe('btn1');
    });
  });

  describe('focusLastElement', () => {
    it('should focus last focusable element', () => {
      const result = focusLastElement(container);
      expect(result).toBe(true);
      expect(document.activeElement?.id).toBe('btn2');
    });
  });

  describe('FocusManager', () => {
    it('should save and restore focus', () => {
      const manager = new FocusManager();
      const button1 = container.querySelector('#btn1') as HTMLElement;
      const button2 = container.querySelector('#btn2') as HTMLElement;

      button1.focus();
      manager.push();

      button2.focus();
      expect(document.activeElement).toBe(button2);

      manager.pop();
      expect(document.activeElement).toBe(button1);
    });

    it('should handle empty stack', () => {
      const manager = new FocusManager();
      const result = manager.pop();
      expect(result).toBe(false);
    });

    it('should clear stack', () => {
      const manager = new FocusManager();
      const button = container.querySelector('#btn1') as HTMLElement;

      button.focus();
      manager.push();
      expect(manager.size()).toBe(1);

      manager.clear();
      expect(manager.size()).toBe(0);
    });
  });

  describe('RovingTabindexManager', () => {
    it('should manage roving tabindex', () => {
      const manager = new RovingTabindexManager(container);

      expect(manager.getItemCount()).toBe(4);
      expect(manager.getCurrentIndex()).toBe(0);
    });

    it('should focus next item', () => {
      const manager = new RovingTabindexManager(container);
      manager.focusNext();

      expect(document.activeElement?.id).toBe('input1');
    });

    it('should focus previous item', () => {
      const manager = new RovingTabindexManager(container);
      manager.focusIndex(2); // Start at link1
      manager.focusPrevious();

      expect(document.activeElement?.id).toBe('input1');
    });

    it('should wrap around when focusing next from last item', () => {
      const manager = new RovingTabindexManager(container);
      manager.focusLast();
      manager.focusNext();

      expect(document.activeElement?.id).toBe('btn1');
    });
  });

  describe('createFocusTrap', () => {
    it('should trap focus within container', () => {
      const cleanup = createFocusTrap(container);

      const button1 = container.querySelector('#btn1') as HTMLElement;
      const button2 = container.querySelector('#btn2') as HTMLElement;

      expect(document.activeElement).toBe(button1);

      // Simulate Tab to last element
      button2.focus();

      // Simulate Tab from last element
      const tabEvent = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true });
      document.dispatchEvent(tabEvent);

      cleanup();
    });

    it('should call onEscape when Escape is pressed', () => {
      let escapeCalled = false;
      const cleanup = createFocusTrap(container, () => {
        escapeCalled = true;
      });

      const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true });
      document.dispatchEvent(escapeEvent);

      expect(escapeCalled).toBe(true);
      cleanup();
    });
  });
});

describe('Accessibility Components', () => {
  describe('ScreenReaderAnnouncer', () => {
    it('should render live regions', () => {
      render(React.createElement(ScreenReaderAnnouncer, { announcements: [] }));

      const politeRegion = screen.getByRole('status');
      expect(politeRegion).toBeTruthy();
      expect(politeRegion.getAttribute('aria-live')).toBe('polite');

      const assertiveRegion = screen.getByRole('alert');
      expect(assertiveRegion).toBeTruthy();
      expect(assertiveRegion.getAttribute('aria-live')).toBe('assertive');
    });

    it('should announce messages', async () => {
      const announcement = {
        id: 'test-1',
        message: 'Test announcement',
        priority: 'polite' as const,
        timestamp: Date.now(),
      };

      const { rerender } = render(
        React.createElement(ScreenReaderAnnouncer, { announcements: [] })
      );

      rerender(
        React.createElement(ScreenReaderAnnouncer, { announcements: [announcement] })
      );

      await waitFor(() => {
        const status = screen.getByRole('status');
        expect(status.textContent).toContain('Test announcement');
      });
    });
  });

  describe('SkipLinks', () => {
    it('should render skip links', () => {
      render(React.createElement(SkipLinks, { links: defaultSkipLinks }));

      const nav = screen.getByRole('navigation', { name: 'Skip navigation' });
      expect(nav).toBeTruthy();

      const mainLink = screen.getByText('Skip to main content');
      expect(mainLink).toBeTruthy();
    });

    it('should handle skip link click', async () => {
      const targetElement = document.createElement('div');
      targetElement.id = 'main-content';
      targetElement.setAttribute('tabindex', '-1');
      document.body.appendChild(targetElement);

      render(React.createElement(SkipLinks, { links: defaultSkipLinks }));

      const mainLink = screen.getByText('Skip to main content');
      await userEvent.click(mainLink);

      expect(document.activeElement).toBe(targetElement);

      document.body.removeChild(targetElement);
    });
  });
});
