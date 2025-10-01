/**
 * ARIA Helper Utilities
 *
 * Provides utility functions for managing ARIA attributes and relationships.
 * Ensures consistent and correct ARIA implementation across components.
 */

/**
 * Generate a unique ID for ARIA relationships
 */
export const generateAriaId = (prefix: string): string => {
  return `${prefix}-${Math.random().toString(36).substring(2, 9)}`;
};

/**
 * Create ARIA label attributes
 */
export interface AriaLabelProps {
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
}

export const createAriaLabel = (
  label?: string,
  labelledBy?: string,
  describedBy?: string
): AriaLabelProps => {
  const props: AriaLabelProps = {};

  if (label) props['aria-label'] = label;
  if (labelledBy) props['aria-labelledby'] = labelledBy;
  if (describedBy) props['aria-describedby'] = describedBy;

  return props;
};

/**
 * Create ARIA live region attributes
 */
export interface AriaLiveProps {
  'aria-live'?: 'polite' | 'assertive' | 'off';
  'aria-atomic'?: boolean;
  'aria-relevant'?: string;
}

export const createAriaLive = (
  live: 'polite' | 'assertive' | 'off' = 'polite',
  atomic: boolean = true,
  relevant?: string
): AriaLiveProps => {
  const props: AriaLiveProps = {
    'aria-live': live,
    'aria-atomic': atomic,
  };

  if (relevant) props['aria-relevant'] = relevant;

  return props;
};

/**
 * Create ARIA expanded/collapsed attributes
 */
export interface AriaExpandedProps {
  'aria-expanded': boolean;
  'aria-controls'?: string;
}

export const createAriaExpanded = (
  expanded: boolean,
  controls?: string
): AriaExpandedProps => {
  const props: AriaExpandedProps = {
    'aria-expanded': expanded,
  };

  if (controls) props['aria-controls'] = controls;

  return props;
};

/**
 * Create ARIA dialog attributes
 */
export interface AriaDialogProps {
  role: 'dialog' | 'alertdialog';
  'aria-modal': boolean;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
}

export const createAriaDialog = (
  type: 'dialog' | 'alertdialog' = 'dialog',
  labelledBy?: string,
  describedBy?: string
): AriaDialogProps => {
  return {
    role: type,
    'aria-modal': true,
    ...(labelledBy && { 'aria-labelledby': labelledBy }),
    ...(describedBy && { 'aria-describedby': describedBy }),
  };
};

/**
 * Create ARIA button attributes
 */
export interface AriaButtonProps {
  role?: 'button';
  'aria-pressed'?: boolean;
  'aria-disabled'?: boolean;
  tabIndex?: number;
}

export const createAriaButton = (
  pressed?: boolean,
  disabled?: boolean
): AriaButtonProps => {
  const props: AriaButtonProps = {};

  if (pressed !== undefined) props['aria-pressed'] = pressed;
  if (disabled) {
    props['aria-disabled'] = true;
    props.tabIndex = -1;
  }

  return props;
};

/**
 * Create ARIA menu attributes
 */
export interface AriaMenuProps {
  role: 'menu' | 'menubar';
  'aria-orientation'?: 'horizontal' | 'vertical';
  'aria-labelledby'?: string;
}

export const createAriaMenu = (
  type: 'menu' | 'menubar' = 'menu',
  orientation: 'horizontal' | 'vertical' = 'vertical',
  labelledBy?: string
): AriaMenuProps => {
  return {
    role: type,
    'aria-orientation': orientation,
    ...(labelledBy && { 'aria-labelledby': labelledBy }),
  };
};

/**
 * Create ARIA menuitem attributes
 */
export interface AriaMenuItemProps {
  role: 'menuitem' | 'menuitemcheckbox' | 'menuitemradio';
  'aria-checked'?: boolean;
  'aria-disabled'?: boolean;
  tabIndex: number;
}

export const createAriaMenuItem = (
  type: 'menuitem' | 'menuitemcheckbox' | 'menuitemradio' = 'menuitem',
  checked?: boolean,
  disabled?: boolean
): AriaMenuItemProps => {
  return {
    role: type,
    ...(checked !== undefined && { 'aria-checked': checked }),
    ...(disabled && { 'aria-disabled': true }),
    tabIndex: disabled ? -1 : 0,
  };
};

/**
 * Create ARIA tablist attributes
 */
export interface AriaTabListProps {
  role: 'tablist';
  'aria-orientation'?: 'horizontal' | 'vertical';
  'aria-labelledby'?: string;
}

export const createAriaTabList = (
  orientation: 'horizontal' | 'vertical' = 'horizontal',
  labelledBy?: string
): AriaTabListProps => {
  return {
    role: 'tablist',
    'aria-orientation': orientation,
    ...(labelledBy && { 'aria-labelledby': labelledBy }),
  };
};

/**
 * Create ARIA tab attributes
 */
export interface AriaTabProps {
  role: 'tab';
  'aria-selected': boolean;
  'aria-controls': string;
  tabIndex: number;
  id: string;
}

export const createAriaTab = (
  id: string,
  selected: boolean,
  controls: string
): AriaTabProps => {
  return {
    role: 'tab',
    'aria-selected': selected,
    'aria-controls': controls,
    tabIndex: selected ? 0 : -1,
    id,
  };
};

/**
 * Create ARIA tabpanel attributes
 */
export interface AriaTabPanelProps {
  role: 'tabpanel';
  'aria-labelledby': string;
  tabIndex: number;
  id: string;
}

export const createAriaTabPanel = (
  id: string,
  labelledBy: string
): AriaTabPanelProps => {
  return {
    role: 'tabpanel',
    'aria-labelledby': labelledBy,
    tabIndex: 0,
    id,
  };
};

/**
 * Create ARIA progressbar attributes
 */
export interface AriaProgressBarProps {
  role: 'progressbar';
  'aria-valuenow'?: number;
  'aria-valuemin'?: number;
  'aria-valuemax'?: number;
  'aria-valuetext'?: string;
  'aria-label'?: string;
}

export const createAriaProgressBar = (
  label: string,
  current?: number,
  min: number = 0,
  max: number = 100,
  valueText?: string
): AriaProgressBarProps => {
  return {
    role: 'progressbar',
    'aria-label': label,
    ...(current !== undefined && { 'aria-valuenow': current }),
    'aria-valuemin': min,
    'aria-valuemax': max,
    ...(valueText && { 'aria-valuetext': valueText }),
  };
};

/**
 * Create ARIA combobox attributes
 */
export interface AriaComboboxProps {
  role: 'combobox';
  'aria-expanded': boolean;
  'aria-controls': string;
  'aria-activedescendant'?: string;
  'aria-autocomplete'?: 'none' | 'inline' | 'list' | 'both';
}

export const createAriaCombobox = (
  expanded: boolean,
  controls: string,
  activeDescendant?: string,
  autocomplete: 'none' | 'inline' | 'list' | 'both' = 'list'
): AriaComboboxProps => {
  return {
    role: 'combobox',
    'aria-expanded': expanded,
    'aria-controls': controls,
    'aria-autocomplete': autocomplete,
    ...(activeDescendant && { 'aria-activedescendant': activeDescendant }),
  };
};

/**
 * Announce message to screen readers
 */
export const announceToScreenReader = (
  message: string,
  priority: 'polite' | 'assertive' = 'polite'
): void => {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', priority === 'assertive' ? 'alert' : 'status');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;

  document.body.appendChild(announcement);

  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

/**
 * Check if element is focusable
 */
export const isFocusable = (element: HTMLElement): boolean => {
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
  ];

  return (
    focusableSelectors.some(selector => element.matches(selector)) &&
    element.offsetWidth > 0 &&
    element.offsetHeight > 0 &&
    !element.hasAttribute('aria-hidden')
  );
};

/**
 * Get all focusable elements within a container
 */
export const getFocusableElements = (container: HTMLElement): HTMLElement[] => {
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
  ).filter(isFocusable);
};
