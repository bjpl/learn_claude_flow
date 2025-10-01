import React, { useEffect, useState } from 'react';

interface KeyboardNavigationIndicatorProps {
  showOnlyOnKeyboard?: boolean;
  className?: string;
}

/**
 * KeyboardNavigationIndicator Component
 *
 * Provides visual indicators for keyboard navigation.
 * Shows focus rings only when user is navigating with keyboard.
 *
 * WCAG 2.1 Success Criteria:
 * - 2.4.7 Focus Visible (Level AA)
 * - 1.4.11 Non-text Contrast (Level AA)
 */
export const KeyboardNavigationIndicator: React.FC<KeyboardNavigationIndicatorProps> = ({
  showOnlyOnKeyboard = true,
  className = '',
}) => {
  const [usingKeyboard, setUsingKeyboard] = useState(false);

  useEffect(() => {
    let keydownDetected = false;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Tab' || event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        keydownDetected = true;
        setUsingKeyboard(true);
      }
    };

    const handleMouseDown = () => {
      if (keydownDetected) {
        keydownDetected = false;
        setUsingKeyboard(false);
      }
    };

    const handlePointerDown = () => {
      if (keydownDetected) {
        keydownDetected = false;
        setUsingKeyboard(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, []);

  useEffect(() => {
    if (showOnlyOnKeyboard) {
      if (usingKeyboard) {
        document.body.classList.add('keyboard-navigation');
        document.body.classList.remove('mouse-navigation');
      } else {
        document.body.classList.remove('keyboard-navigation');
        document.body.classList.add('mouse-navigation');
      }
    }
  }, [usingKeyboard, showOnlyOnKeyboard]);

  return null; // This component doesn't render anything visible
};

/**
 * Hook for tracking keyboard navigation state
 */
export const useKeyboardNavigation = () => {
  const [usingKeyboard, setUsingKeyboard] = useState(false);

  useEffect(() => {
    let keydownDetected = false;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Tab' || event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        keydownDetected = true;
        setUsingKeyboard(true);
      }
    };

    const handleMouseDown = () => {
      if (keydownDetected) {
        keydownDetected = false;
        setUsingKeyboard(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return usingKeyboard;
};

export default KeyboardNavigationIndicator;
