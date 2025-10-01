import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../../App';

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
    // App title is "Learn Claude Flow"
    expect(screen.getByText(/Learn Claude Flow/i)).toBeInTheDocument();
  });

  it('displays welcome message when no document is selected', () => {
    render(<App />);
    expect(screen.getByText(/No document selected/i)).toBeInTheDocument();
  });
});
