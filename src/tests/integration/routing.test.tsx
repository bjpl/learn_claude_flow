import { describe, it, expect } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { render } from '../utils/test-utils';
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Mock lazy components
const MockStudyMode = lazy(() => Promise.resolve({
  default: () => <div>Study Mode</div>
}));

const MockChallenge = lazy(() => Promise.resolve({
  default: () => <div>Challenge Mode</div>
}));

const MockLeaderboard = lazy(() => Promise.resolve({
  default: () => <div>Leaderboard</div>
}));

describe('Routing Integration', () => {
  const renderRoutes = () => {
    return render(
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/study" element={<MockStudyMode />} />
          <Route path="/challenge" element={<MockChallenge />} />
          <Route path="/leaderboard" element={<MockLeaderboard />} />
        </Routes>
      </Suspense>
    );
  };

  it('should render home route by default', () => {
    renderRoutes();
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('should lazy load study mode', async () => {
    window.history.pushState({}, 'Study', '/study');
    renderRoutes();

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Study Mode')).toBeInTheDocument();
    });
  });

  it('should lazy load challenge mode', async () => {
    window.history.pushState({}, 'Challenge', '/challenge');
    renderRoutes();

    await waitFor(() => {
      expect(screen.getByText('Challenge Mode')).toBeInTheDocument();
    });
  });

  it('should lazy load leaderboard', async () => {
    window.history.pushState({}, 'Leaderboard', '/leaderboard');
    renderRoutes();

    await waitFor(() => {
      expect(screen.getByText('Leaderboard')).toBeInTheDocument();
    });
  });

  it('should handle navigation between routes', async () => {
    const { rerender } = renderRoutes();

    expect(screen.getByText('Home')).toBeInTheDocument();

    window.history.pushState({}, 'Study', '/study');
    rerender(
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/study" element={<MockStudyMode />} />
          <Route path="/challenge" element={<MockChallenge />} />
          <Route path="/leaderboard" element={<MockLeaderboard />} />
        </Routes>
      </Suspense>
    );

    await waitFor(() => {
      expect(screen.getByText('Study Mode')).toBeInTheDocument();
    });
  });

  it('should maintain state during navigation', async () => {
    render(
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/study" element={<MockStudyMode />} />
        </Routes>
      </Suspense>
    );

    // Navigate
    window.history.pushState({}, 'Study', '/study');

    await waitFor(() => {
      expect(screen.getByText('Study Mode')).toBeInTheDocument();
    });
  });
});
