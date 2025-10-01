/**
 * URL State Management Hook
 * Manages state persistence in URL parameters
 */

import { useSearchParams } from 'react-router-dom';
import { useCallback } from 'react';

export function useUrlState<T extends Record<string, any>>() {
  const [searchParams, setSearchParams] = useSearchParams();

  const getState = useCallback(
    (key: string, defaultValue?: any) => {
      const value = searchParams.get(key);
      if (!value) return defaultValue;

      // Try to parse as JSON, fallback to string
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    },
    [searchParams]
  );

  const setState = useCallback(
    (updates: Partial<T>) => {
      const newParams = new URLSearchParams(searchParams);

      Object.entries(updates).forEach(([key, value]) => {
        if (value === undefined || value === null) {
          newParams.delete(key);
        } else {
          newParams.set(key, JSON.stringify(value));
        }
      });

      setSearchParams(newParams, { replace: true });
    },
    [searchParams, setSearchParams]
  );

  return { getState, setState };
}
