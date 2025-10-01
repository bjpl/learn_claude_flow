import { describe, it, expect } from 'vitest';
import { render } from '../utils/test-utils';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

// Mock components for accessibility testing
const MockButton = () => (
  <button aria-label="Test button">Click me</button>
);

const MockForm = () => (
  <form>
    <label htmlFor="username">Username</label>
    <input id="username" type="text" />

    <label htmlFor="email">Email</label>
    <input id="email" type="email" />

    <button type="submit">Submit</button>
  </form>
);

const MockNavigation = () => (
  <nav aria-label="Main navigation">
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/study">Study</a></li>
      <li><a href="/challenge">Challenge</a></li>
    </ul>
  </nav>
);

const MockHeadings = () => (
  <div>
    <h1>Main Title</h1>
    <section>
      <h2>Section Title</h2>
      <p>Content</p>
      <h3>Subsection</h3>
      <p>More content</p>
    </section>
  </div>
);

const MockImage = () => (
  <img src="/test.jpg" alt="Test image description" />
);

describe('Accessibility Tests', () => {
  it('should have no violations in button component', async () => {
    const { container } = render(<MockButton />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have no violations in form component', async () => {
    const { container } = render(<MockForm />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have no violations in navigation component', async () => {
    const { container } = render(<MockNavigation />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have no violations in headings hierarchy', async () => {
    const { container } = render(<MockHeadings />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have no violations in image component', async () => {
    const { container } = render(<MockImage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should detect missing alt text', async () => {
    const BadImage = () => <img src="/test.jpg" />;
    const { container } = render(<BadImage />);
    const results = await axe(container);
    expect(results.violations.length).toBeGreaterThan(0);
  });

  it('should detect missing form labels', async () => {
    const BadForm = () => (
      <form>
        <input type="text" />
        <button type="submit">Submit</button>
      </form>
    );
    const { container } = render(<BadForm />);
    const results = await axe(container);
    expect(results.violations.length).toBeGreaterThan(0);
  });

  it('should detect insufficient color contrast', async () => {
    const LowContrast = () => (
      <div style={{ background: '#fff', color: '#eee' }}>
        Low contrast text
      </div>
    );
    const { container } = render(<LowContrast />);
    const results = await axe(container, {
      rules: {
        'color-contrast': { enabled: true },
      },
    });
    expect(results.violations.length).toBeGreaterThan(0);
  });

  it('should handle keyboard navigation', async () => {
    const { getByRole } = render(<MockButton />);
    const button = getByRole('button');

    expect(button).toHaveAttribute('aria-label');
    button.focus();
    expect(document.activeElement).toBe(button);
  });

  it('should have proper ARIA landmarks', async () => {
    const LandmarksComponent = () => (
      <div>
        <header role="banner">Header</header>
        <nav role="navigation">Navigation</nav>
        <main role="main">Main content</main>
        <footer role="contentinfo">Footer</footer>
      </div>
    );

    const { container } = render(<LandmarksComponent />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
