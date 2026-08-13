'use client';

// Root layout has thrown, so no app styles or fonts are available here.
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang='en'>
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'grid',
          placeItems: 'center',
          background: '#f8f2e7',
          color: '#14100a',
          fontFamily: 'system-ui, sans-serif',
          padding: '24px',
          textAlign: 'center',
        }}
      >
        <div>
          <h1 style={{ fontSize: '32px', margin: '0 0 12px' }}>Something went badly wrong</h1>
          <p style={{ color: '#4e4535', margin: '0 0 24px' }}>
            The whole page failed to load. Reloading usually fixes it.
          </p>
          <button
            onClick={reset}
            style={{
              background: '#c2401a',
              color: '#fff4ee',
              border: 0,
              borderRadius: '100px',
              padding: '12px 24px',
              fontSize: '15px',
              cursor: 'pointer',
            }}
          >
            Reload
          </button>
          {error.digest && <p style={{ marginTop: '24px', fontSize: '12px', color: '#6e6250' }}>Reference {error.digest}</p>}
        </div>
      </body>
    </html>
  );
}
