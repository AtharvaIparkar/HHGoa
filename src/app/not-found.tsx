import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', textAlign: 'center', padding: 20 }}>
      <h2 style={{ fontSize: '2rem', marginBottom: 12 }}>Page Not Found</h2>
      <p style={{ marginBottom: 20 }}>Could not find requested resource.</p>
      <Link href="/" style={{ color: '#FEE101', fontWeight: 800 }}>Return Home</Link>
    </div>
  );
}
