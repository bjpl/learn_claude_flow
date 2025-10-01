import React, { useEffect, useRef, useState } from 'react';

export type AnnouncementPriority = 'polite' | 'assertive' | 'off';

export interface Announcement {
  id: string;
  message: string;
  priority: AnnouncementPriority;
  timestamp: number;
}

interface ScreenReaderAnnouncerProps {
  announcements?: Announcement[];
  clearAfter?: number;
}

/**
 * ScreenReaderAnnouncer Component
 *
 * Provides ARIA live regions for screen reader announcements.
 * Supports both polite and assertive announcements.
 *
 * WCAG 2.1 Success Criteria:
 * - 4.1.3 Status Messages (Level AA)
 * - 1.3.1 Info and Relationships (Level A)
 */
export const ScreenReaderAnnouncer: React.FC<ScreenReaderAnnouncerProps> = ({
  announcements = [],
  clearAfter = 5000,
}) => {
  const [politeMessages, setPoliteMessages] = useState<string[]>([]);
  const [assertiveMessages, setAssertiveMessages] = useState<string[]>([]);
  const processedIds = useRef<Set<string>>(new Set());

  useEffect(() => {
    announcements.forEach((announcement) => {
      if (!processedIds.current.has(announcement.id)) {
        processedIds.current.add(announcement.id);

        if (announcement.priority === 'polite') {
          setPoliteMessages((prev) => [...prev, announcement.message]);
          setTimeout(() => {
            setPoliteMessages((prev) => prev.filter((msg) => msg !== announcement.message));
          }, clearAfter);
        } else if (announcement.priority === 'assertive') {
          setAssertiveMessages((prev) => [...prev, announcement.message]);
          setTimeout(() => {
            setAssertiveMessages((prev) => prev.filter((msg) => msg !== announcement.message));
          }, clearAfter);
        }
      }
    });
  }, [announcements, clearAfter]);

  return (
    <>
      {/* Polite announcements - for non-critical updates */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {politeMessages.map((message, index) => (
          <div key={`polite-${index}`}>{message}</div>
        ))}
      </div>

      {/* Assertive announcements - for critical updates */}
      <div
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        className="sr-only"
      >
        {assertiveMessages.map((message, index) => (
          <div key={`assertive-${index}`}>{message}</div>
        ))}
      </div>
    </>
  );
};

/**
 * Hook for managing screen reader announcements
 */
export const useScreenReaderAnnouncer = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  const announce = (message: string, priority: AnnouncementPriority = 'polite') => {
    const announcement: Announcement = {
      id: `${Date.now()}-${Math.random()}`,
      message,
      priority,
      timestamp: Date.now(),
    };
    setAnnouncements((prev) => [...prev, announcement]);
  };

  const announcePolite = (message: string) => announce(message, 'polite');
  const announceAssertive = (message: string) => announce(message, 'assertive');

  return {
    announcements,
    announce,
    announcePolite,
    announceAssertive,
  };
};

export default ScreenReaderAnnouncer;
