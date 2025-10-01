/**
 * LoadingBar Component
 * Visual indicator for route transitions
 */

import { useNavigation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function LoadingBar() {
  const navigation = useNavigation();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (navigation.state === 'loading') {
      setProgress(30);

      const timer = setTimeout(() => setProgress(70), 200);
      return () => clearTimeout(timer);
    } else {
      setProgress(100);

      const timer = setTimeout(() => setProgress(0), 300);
      return () => clearTimeout(timer);
    }
  }, [navigation.state]);

  if (progress === 0) return null;

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-blue-200 z-50">
      <div
        className="h-full bg-blue-600 transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
