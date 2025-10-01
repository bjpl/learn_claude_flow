import { useState, useEffect, useCallback, useRef } from 'react';

interface SkeletonStateOptions {
  minDisplayTime?: number;
  delay?: number;
  onLoadStart?: () => void;
  onLoadEnd?: () => void;
}

interface SkeletonState {
  isLoading: boolean;
  showSkeleton: boolean;
  startLoading: () => void;
  stopLoading: () => void;
  resetLoading: () => void;
}

/**
 * Custom hook for managing skeleton loading states
 * Provides fine-grained control over loading states with configurable delays
 */
export const useSkeletonState = (
  initialLoading = true,
  options: SkeletonStateOptions = {}
): SkeletonState => {
  const {
    minDisplayTime = 500,
    delay = 0,
    onLoadStart,
    onLoadEnd,
  } = options;

  const [isLoading, setIsLoading] = useState(initialLoading);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const loadStartTimeRef = useRef<number>(0);
  const delayTimeoutRef = useRef<NodeJS.Timeout>();
  const minTimeTimeoutRef = useRef<NodeJS.Timeout>();

  const startLoading = useCallback(() => {
    loadStartTimeRef.current = Date.now();
    setIsLoading(true);
    onLoadStart?.();

    // Clear any existing timeouts
    if (delayTimeoutRef.current) {
      clearTimeout(delayTimeoutRef.current);
    }

    // Apply delay before showing skeleton
    if (delay > 0) {
      delayTimeoutRef.current = setTimeout(() => {
        setShowSkeleton(true);
      }, delay);
    } else {
      setShowSkeleton(true);
    }
  }, [delay, onLoadStart]);

  const stopLoading = useCallback(() => {
    const elapsed = Date.now() - loadStartTimeRef.current;
    const remaining = Math.max(0, minDisplayTime - elapsed);

    // Clear delay timeout if still pending
    if (delayTimeoutRef.current) {
      clearTimeout(delayTimeoutRef.current);
    }

    // Ensure minimum display time
    minTimeTimeoutRef.current = setTimeout(() => {
      setIsLoading(false);
      setShowSkeleton(false);
      onLoadEnd?.();
    }, remaining);
  }, [minDisplayTime, onLoadEnd]);

  const resetLoading = useCallback(() => {
    if (delayTimeoutRef.current) {
      clearTimeout(delayTimeoutRef.current);
    }
    if (minTimeTimeoutRef.current) {
      clearTimeout(minTimeTimeoutRef.current);
    }
    setIsLoading(false);
    setShowSkeleton(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (delayTimeoutRef.current) {
        clearTimeout(delayTimeoutRef.current);
      }
      if (minTimeTimeoutRef.current) {
        clearTimeout(minTimeTimeoutRef.current);
      }
    };
  }, []);

  return {
    isLoading,
    showSkeleton,
    startLoading,
    stopLoading,
    resetLoading,
  };
};

/**
 * Custom hook for data fetching with skeleton states
 */
export const useSkeletonFetch = <T>(
  fetchFn: () => Promise<T>,
  options: SkeletonStateOptions = {}
) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const skeletonState = useSkeletonState(true, options);

  const refetch = useCallback(async () => {
    skeletonState.startLoading();
    setError(null);

    try {
      const result = await fetchFn();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      skeletonState.stopLoading();
    }
  }, [fetchFn, skeletonState]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return {
    data,
    error,
    ...skeletonState,
    refetch,
  };
};

/**
 * Custom hook for intersection observer-based lazy loading with skeletons
 */
export const useLazyLoadSkeleton = (
  options: IntersectionObserverInit = {},
  skeletonOptions: SkeletonStateOptions = {}
) => {
  const elementRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const skeletonState = useSkeletonState(true, skeletonOptions);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          skeletonState.stopLoading();
        }
      },
      {
        threshold: 0.1,
        ...options,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [options, skeletonState]);

  return {
    elementRef,
    isVisible,
    ...skeletonState,
  };
};
