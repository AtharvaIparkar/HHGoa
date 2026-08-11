import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HH GOA 2026 — Official PFP Frame & Builder Pass Generator",
  description: "Less noise. More signal. Official PFP Frame & Builder Pass Generator for Hacker House Goa 2026 by 2:47PM Studio.",
  openGraph: {
    title: "HH GOA 2026 — Builder Pass Generator",
    description: "Build your official PFP Frame and Builder Pass for Hacker House Goa 2026.",
    images: ["/assets/poster_bg.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
