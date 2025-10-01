import { describe, it, expect, beforeEach, afterEach } from 'vitest';

interface PerformanceMetrics {
  duration: number;
  memory?: number;
  iterations: number;
}

describe('Performance Regression Tests', () => {
  let startTime: number;
  let startMemory: number;

  beforeEach(() => {
    startTime = performance.now();
    if (typeof process !== 'undefined' && process.memoryUsage) {
      startMemory = process.memoryUsage().heapUsed;
    }
  });

  afterEach(() => {
    // Cleanup
  });

  const measurePerformance = (fn: () => void, iterations = 1000): PerformanceMetrics => {
    const start = performance.now();

    for (let i = 0; i < iterations; i++) {
      fn();
    }

    const duration = performance.now() - start;

    return {
      duration,
      iterations,
      memory: typeof process !== 'undefined' ? process.memoryUsage().heapUsed - startMemory : undefined,
    };
  };

  describe('Array Operations', () => {
    it('should complete array filtering within threshold', () => {
      const testData = Array.from({ length: 10000 }, (_, i) => i);

      const metrics = measurePerformance(() => {
        testData.filter(n => n % 2 === 0);
      }, 100);

      expect(metrics.duration).toBeLessThan(100); // 100ms threshold
    });

    it('should complete array mapping within threshold', () => {
      const testData = Array.from({ length: 10000 }, (_, i) => i);

      const metrics = measurePerformance(() => {
        testData.map(n => n * 2);
      }, 100);

      expect(metrics.duration).toBeLessThan(100);
    });

    it('should complete array reduction within threshold', () => {
      const testData = Array.from({ length: 10000 }, (_, i) => i);

      const metrics = measurePerformance(() => {
        testData.reduce((acc, n) => acc + n, 0);
      }, 100);

      expect(metrics.duration).toBeLessThan(100);
    });
  });

  describe('Object Operations', () => {
    it('should complete object creation within threshold', () => {
      const metrics = measurePerformance(() => {
        const obj = {
          id: Math.random(),
          name: 'Test',
          data: Array.from({ length: 100 }, (_, i) => i),
        };
      }, 1000);

      expect(metrics.duration).toBeLessThan(50);
    });

    it('should complete object cloning within threshold', () => {
      const original = {
        id: 1,
        data: Array.from({ length: 100 }, (_, i) => ({ value: i })),
      };

      const metrics = measurePerformance(() => {
        const clone = JSON.parse(JSON.stringify(original));
      }, 1000);

      expect(metrics.duration).toBeLessThan(100);
    });

    it('should complete object merging within threshold', () => {
      const obj1 = { a: 1, b: 2, c: 3 };
      const obj2 = { d: 4, e: 5, f: 6 };

      const metrics = measurePerformance(() => {
        const merged = { ...obj1, ...obj2 };
      }, 10000);

      expect(metrics.duration).toBeLessThan(50);
    });
  });

  describe('String Operations', () => {
    it('should complete string concatenation within threshold', () => {
      const metrics = measurePerformance(() => {
        let result = '';
        for (let i = 0; i < 100; i++) {
          result += 'test';
        }
      }, 1000);

      expect(metrics.duration).toBeLessThan(100);
    });

    it('should complete string templating within threshold', () => {
      const metrics = measurePerformance(() => {
        const name = 'Test';
        const value = 123;
        const result = `Name: ${name}, Value: ${value}`;
      }, 10000);

      expect(metrics.duration).toBeLessThan(50);
    });

    it('should complete regex matching within threshold', () => {
      const text = 'The quick brown fox jumps over the lazy dog';
      const pattern = /\b\w{4,}\b/g;

      const metrics = measurePerformance(() => {
        text.match(pattern);
      }, 10000);

      expect(metrics.duration).toBeLessThan(100);
    });
  });

  describe('Redux Store Operations', () => {
    it('should complete state updates within threshold', () => {
      const mockState = {
        value: 0,
        items: [] as number[],
      };

      const metrics = measurePerformance(() => {
        mockState.value += 1;
        mockState.items = [...mockState.items, mockState.value];
      }, 1000);

      expect(metrics.duration).toBeLessThan(50);
    });

    it('should handle large state objects efficiently', () => {
      const largeState = {
        users: Array.from({ length: 1000 }, (_, i) => ({
          id: i,
          name: `User ${i}`,
          email: `user${i}@test.com`,
        })),
      };

      const metrics = measurePerformance(() => {
        const updated = {
          ...largeState,
          users: [...largeState.users, { id: 1001, name: 'New User', email: 'new@test.com' }],
        };
      }, 100);

      expect(metrics.duration).toBeLessThan(200);
    });
  });

  describe('Memory Usage', () => {
    it('should not leak memory during repeated operations', () => {
      if (typeof process === 'undefined') {
        return; // Skip in browser environment
      }

      const initialMemory = process.memoryUsage().heapUsed;

      for (let i = 0; i < 1000; i++) {
        const temp = Array.from({ length: 100 }, (_, j) => j);
        temp.filter(n => n % 2 === 0);
      }

      global.gc?.(); // Force garbage collection if available

      const finalMemory = process.memoryUsage().heapUsed;
      const memoryIncrease = finalMemory - initialMemory;

      // Allow 10MB increase
      expect(memoryIncrease).toBeLessThan(10 * 1024 * 1024);
    });
  });

  describe('Benchmark Reporting', () => {
    it('should report performance metrics', () => {
      const metrics = measurePerformance(() => {
        Array.from({ length: 1000 }, (_, i) => i * 2);
      }, 100);

      console.log('Performance Metrics:', {
        duration: `${metrics.duration.toFixed(2)}ms`,
        iterations: metrics.iterations,
        avgPerIteration: `${(metrics.duration / metrics.iterations).toFixed(4)}ms`,
      });

      expect(metrics.duration).toBeGreaterThan(0);
    });
  });
});
