import React from 'react';

export interface SkipLink {
  id: string;
  label: string;
  targetId: string;
}

interface SkipLinksProps {
  links: SkipLink[];
  className?: string;
}

/**
 * SkipLinks Component
 *
 * Provides skip navigation links for keyboard users to bypass repetitive content.
 * Links are visually hidden until focused.
 *
 * WCAG 2.1 Success Criteria:
 * - 2.4.1 Bypass Blocks (Level A)
 * - 2.1.1 Keyboard (Level A)
 */
export const SkipLinks: React.FC<SkipLinksProps> = ({ links, className = '' }) => {
  const handleSkipClick = (event: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    event.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.focus();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav aria-label="Skip navigation" className={`skip-links ${className}`}>
      {links.map((link) => (
        <a
          key={link.id}
          href={`#${link.targetId}`}
          className="skip-link"
          onClick={(e) => handleSkipClick(e, link.targetId)}
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
};

/**
 * Default skip links for common page sections
 */
export const defaultSkipLinks: SkipLink[] = [
  {
    id: 'skip-to-main',
    label: 'Skip to main content',
    targetId: 'main-content',
  },
  {
    id: 'skip-to-nav',
    label: 'Skip to navigation',
    targetId: 'main-navigation',
  },
  {
    id: 'skip-to-footer',
    label: 'Skip to footer',
    targetId: 'footer',
  },
];

export default SkipLinks;
