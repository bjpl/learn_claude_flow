import React, { useEffect, useState } from 'react';

interface ProgressiveSkeletonProps {
  children: React.ReactNode;
  skeleton: React.ReactNode;
  delay?: number;
  minDisplayTime?: number;
  fallback?: React.ReactNode;
}

/**
 * Progressive Skeleton Component
 * Manages smooth transitions between loading skeleton and actual content
 * with configurable delays and minimum display times for better UX
 */
export const ProgressiveSkeleton: React.FC<ProgressiveSkeletonProps> = ({
  children,
  skeleton,
  delay = 0,
  minDisplayTime = 500,
  fallback = null,
}) => {
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [contentReady, setContentReady] = useState(false);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    if (delay > 0) {
      // Delay showing skeleton to avoid flash for fast loads
      timeoutId = setTimeout(() => {
        setShowSkeleton(true);
      }, delay);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [delay]);

  useEffect(() => {
    // Check if content is ready
    setContentReady(true);
  }, [children]);

  useEffect(() => {
    if (contentReady) {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, minDisplayTime - elapsed);

      // Ensure skeleton is shown for minimum time
      const timeoutId = setTimeout(() => {
        setShowSkeleton(false);
      }, remaining);

      return () => clearTimeout(timeoutId);
    }
  }, [contentReady, minDisplayTime, startTime]);

  if (!contentReady && !showSkeleton) {
    return <>{fallback}</>;
  }

  if (showSkeleton) {
    return <>{skeleton}</>;
  }

  return <>{children}</>;
};

interface LazySkeletonProps {
  component: () => Promise<{ default: React.ComponentType<any> }>;
  skeleton: React.ReactNode;
  props?: Record<string, any>;
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

/**
 * Lazy Skeleton Component
 * Wraps React lazy loading with skeleton states
 */
export const LazySkeleton: React.FC<LazySkeletonProps> = ({
  component,
  skeleton,
  props = {},
  onLoad,
  onError,
}) => {
  const [Component, setComponent] = useState<React.ComponentType<any> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    component()
      .then((module) => {
        if (mounted) {
          setComponent(() => module.default);
          setLoading(false);
          onLoad?.();
        }
      })
      .catch((err) => {
        if (mounted) {
          setError(err);
          setLoading(false);
          onError?.(err);
        }
      });

    return () => {
      mounted = false;
    };
  }, [component, onLoad, onError]);

  if (error) {
    return (
      <div className="skeleton-error" role="alert">
        <p>Failed to load component</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  if (loading || !Component) {
    return <>{skeleton}</>;
  }

  return <Component {...props} />;
};

interface SkeletonTransitionProps {
  show: boolean;
  children: React.ReactNode;
  skeleton: React.ReactNode;
  duration?: number;
}

/**
 * Skeleton Transition Component
 * Provides smooth fade transitions between skeleton and content
 */
export const SkeletonTransition: React.FC<SkeletonTransitionProps> = ({
  show,
  children,
  skeleton,
  duration = 300,
}) => {
  const [displaySkeleton, setDisplaySkeleton] = useState(show);
  const [opacity, setOpacity] = useState(show ? 1 : 0);

  useEffect(() => {
    if (show) {
      setDisplaySkeleton(true);
      requestAnimationFrame(() => {
        setOpacity(1);
      });
    } else {
      setOpacity(0);
      const timeout = setTimeout(() => {
        setDisplaySkeleton(false);
      }, duration);
      return () => clearTimeout(timeout);
    }
  }, [show, duration]);

  return (
    <div style={{ position: 'relative', minHeight: '100px' }}>
      {displaySkeleton && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            opacity,
            transition: `opacity ${duration}ms ease-in-out`,
            pointerEvents: show ? 'auto' : 'none',
          }}
        >
          {skeleton}
        </div>
      )}
      <div
        style={{
          opacity: show ? 0 : 1,
          transition: `opacity ${duration}ms ease-in-out`,
        }}
      >
        {children}
      </div>
    </div>
  );
};
