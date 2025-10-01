import React from 'react';

export const TestComponent: React.FC = () => {
  console.log('[TEST] TestComponent rendering');

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f0fdf4',
      fontFamily: 'sans-serif'
    }}>
      <div style={{
        textAlign: 'center',
        padding: '40px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ color: '#16a34a', fontSize: '48px', margin: '0 0 20px 0' }}>
          ✅ React is Working!
        </h1>
        <p style={{ color: '#666', fontSize: '18px', margin: '0 0 20px 0' }}>
          If you see this, React is rendering correctly.
        </p>
        <p style={{ color: '#999', fontSize: '14px' }}>
          Remove <code>?test</code> from URL to load the full app
        </p>
      </div>
    </div>
  );
};
