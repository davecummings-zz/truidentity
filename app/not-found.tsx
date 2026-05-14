import Link from 'next/link'

export default function RootNotFound() {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif', background: '#fff' }}>
        <div style={{ padding: '6rem 1rem', textAlign: 'center' }}>
          <p style={{ fontSize: '5rem', fontWeight: 800, color: 'rgba(27,58,92,0.1)', marginBottom: '1rem' }}>
            404
          </p>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#1B3A5C', marginBottom: '1rem' }}>
            Page Not Found
          </h1>
          <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
            The page you&apos;re looking for doesn&apos;t exist.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/en"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.75rem 1.5rem', background: '#1B3A5C', color: '#fff',
                fontWeight: 600, borderRadius: '0.75rem', textDecoration: 'none',
              }}
            >
              English
            </Link>
            <Link
              href="/es"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.75rem 1.5rem', background: '#1B3A5C', color: '#fff',
                fontWeight: 600, borderRadius: '0.75rem', textDecoration: 'none',
              }}
            >
              Español
            </Link>
          </div>
        </div>
      </body>
    </html>
  )
}
