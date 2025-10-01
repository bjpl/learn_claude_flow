/**
 * Focus Management Utilities
 *
 * Provides utilities for managing keyboard focus in complex UIs.
 * Ensures proper focus order and restoration.
 */

interface FocusOptions {
  preventScroll?: boolean;
  focusVisible?: boolean;
}

/**
 * Focus element with enhanced options
 */
export const focusElement = (
  element: HTMLElement | null,
  options: FocusOptions = {}
): void => {
  if (!element) return;

  element.focus({ preventScroll: options.preventScroll });

  if (options.focusVisible) {
    element.setAttribute('data-focus-visible', 'true');
  }
};

/**
 * Focus the first focusable element in a container
 */
export const focusFirstElement = (
  container: HTMLElement,
  options: FocusOptions = {}
): boolean => {
  const focusableElements = getFocusableElements(container);
  if (focusableElements.length > 0) {
    focusElement(focusableElements[0], options);
    return true;
  }
  return false;
};

/**
 * Focus the last focusable element in a container
 */
export const focusLastElement = (
  container: HTMLElement,
  options: FocusOptions = {}
): boolean => {
  const focusableElements = getFocusableElements(container);
  if (focusableElements.length > 0) {
    focusElement(focusableElements[focusableElements.length - 1], options);
    return true;
  }
  return false;
};

/**
 * Get all focusable elements in a container
 */
const getFocusableElements = (container: HTMLElement): HTMLElement[] => {
  const focusableSelectors = [
    'a[href]',
    'area[href]',
    'input:not([disabled]):not([type="hidden"])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'button:not([disabled])',
    'iframe',
    'object',
    'embed',
    '[contenteditable]',
    '[tabindex]:not([tabindex="-1"])',
  ].join(',');

  return Array.from(
    container.querySelectorAll<HTMLElement>(focusableSelectors)
  ).filter((element) => {
    return (
      element.offsetWidth > 0 &&
      element.offsetHeight > 0 &&
      !element.hasAttribute('aria-hidden')
    );
  });
};

/**
 * Focus Manager Class
 * Manages focus state and restoration for complex components
 */
export class FocusManager {
  private focusStack: HTMLElement[] = [];

  /**
   * Save the currently focused element
   */
  push(): void {
    const activeElement = document.activeElement as HTMLElement;
    if (activeElement && activeElement !== document.body) {
      this.focusStack.push(activeElement);
    }
  }

  /**
   * Restore the most recently saved focus
   */
  pop(options: FocusOptions = {}): boolean {
    const element = this.focusStack.pop();
    if (element && document.body.contains(element)) {
      focusElement(element, options);
      return true;
    }
    return false;
  }

  /**
   * Clear the focus stack
   */
  clear(): void {
    this.focusStack = [];
  }

  /**
   * Get the size of the focus stack
   */
  size(): number {
    return this.focusStack.length;
  }
}

/**
 * Global focus manager instance
 */
export const globalFocusManager = new FocusManager();

/**
 * Create a roving tabindex manager for keyboard navigation
 */
export class RovingTabindexManager {
  private container: HTMLElement;
  private items: HTMLElement[] = [];
  private currentIndex: number = 0;

  constructor(container: HTMLElement) {
    this.container = container;
    this.updateItems();
  }

  /**
   * Update the list of items
   */
  updateItems(): void {
    this.items = getFocusableElements(this.container);
    this.updateTabindices();
  }

  /**
   * Update tabindex attributes
   */
  private updateTabindices(): void {
    this.items.forEach((item, index) => {
      item.setAttribute('tabindex', index === this.currentIndex ? '0' : '-1');
    });
  }

  /**
   * Focus the next item
   */
  focusNext(): void {
    if (this.items.length === 0) return;
    this.currentIndex = (this.currentIndex + 1) % this.items.length;
    this.updateTabindices();
    this.items[this.currentIndex].focus();
  }

  /**
   * Focus the previous item
   */
  focusPrevious(): void {
    if (this.items.length === 0) return;
    this.currentIndex = this.currentIndex === 0 ? this.items.length - 1 : this.currentIndex - 1;
    this.updateTabindices();
    this.items[this.currentIndex].focus();
  }

  /**
   * Focus the first item
   */
  focusFirst(): void {
    if (this.items.length === 0) return;
    this.currentIndex = 0;
    this.updateTabindices();
    this.items[this.currentIndex].focus();
  }

  /**
   * Focus the last item
   */
  focusLast(): void {
    if (this.items.length === 0) return;
    this.currentIndex = this.items.length - 1;
    this.updateTabindices();
    this.items[this.currentIndex].focus();
  }

  /**
   * Set focus to a specific index
   */
  focusIndex(index: number): void {
    if (index >= 0 && index < this.items.length) {
      this.currentIndex = index;
      this.updateTabindices();
      this.items[this.currentIndex].focus();
    }
  }

  /**
   * Get the current index
   */
  getCurrentIndex(): number {
    return this.currentIndex;
  }

  /**
   * Get the total number of items
   */
  getItemCount(): number {
    return this.items.length;
  }
}

/**
 * Create focus trap for modal dialogs
 */
export const createFocusTrap = (
  container: HTMLElement,
  onEscape?: () => void
): (() => void) => {
  const focusableElements = getFocusableElements(container);
  if (focusableElements.length === 0) {
    return () => {}; // No cleanup needed
  }

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  // Store previously focused element
  const previouslyFocused = document.activeElement as HTMLElement;

  // Focus first element
  firstElement.focus();

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && onEscape) {
      event.preventDefault();
      onEscape();
      return;
    }

    if (event.key === 'Tab') {
      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    }
  };

  document.addEventListener('keydown', handleKeyDown);

  // Return cleanup function
  return () => {
    document.removeEventListener('keydown', handleKeyDown);
    if (previouslyFocused && document.body.contains(previouslyFocused)) {
      previouslyFocused.focus();
    }
  };
};
