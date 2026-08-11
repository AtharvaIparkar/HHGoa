import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Hacker House Goa 2026 — PFP Frame & Builder Pass Generator',
  description: 'Generate your official PFP Frame & Builder Pass for Hacker House Goa 2026. Less Noise. More Signal.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Plus+Jakarta+Sans:wght@700;800;900&family=Rozha+One&family=Space+Mono:ital,wght@0,400;0,700;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
