import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HH Goa 2026 — Official PFP Frame & Builder Pass Generator",
  description: "Generate your official Hacker House Goa 2026 PFP Frame and Builder Pass. 500 Elite Builders. October 28–31, 2026.",
  keywords: ["Hacker House Goa", "HH Goa 2026", "Builder Pass", "PFP Frame", "Solana", "Web3", "Goa"],
  authors: [{ name: "2:47PM Studio" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="goa-vector-backdrop">
          <svg
            viewBox="0 0 1440 900"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          >
            <rect width="1440" height="900" fill="#026834" />
            <path
              className="wave-svg-path"
              d="M-100,520 Q350,470 720,530 Q1100,480 1600,520 L1600,900 L-100,900 Z"
              fill="#01361B"
            />
            <path
              className="wave-svg-path"
              d="M-100,590 Q350,550 720,600 Q1100,540 1600,590 L1600,900 L-100,900 Z"
              fill="#011B0E"
            />
            <path
              d="M-100,670 Q350,640 720,675 Q1100,640 1600,670 L1600,900 L-100,900 Z"
              fill="#FFF8EB"
              opacity="0.12"
            />
          </svg>
          <div className="poster-texture-overlay" />
        </div>

        {children}
      </body>
    </html>
  );
}
