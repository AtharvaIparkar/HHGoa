import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HH Goa 2026 — Build Your Frame",
  description: "Turn your photo into an on-brand HH Goa 2026 graphic in seconds.",
  openGraph: {
    title: "HH Goa 2026 — Build Your Frame",
    images: ["/assets/og-default.png"]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-monsoon text-sand font-body antialiased">
        {children}
      </body>
    </html>
  );
}
