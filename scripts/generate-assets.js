import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const framesDir = path.join(__dirname, "..", "public", "assets", "frames");
const publicDir = path.join(__dirname, "..", "public", "assets");

if (!fs.existsSync(framesDir)) {
  fs.mkdirSync(framesDir, { recursive: true });
}

// 1. PFP Frame SVG
const pfpFrameSvg = `
<svg width="1080" height="1080" viewBox="0 0 1080 1080" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="tideGradient" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#C6FF3D" stop-opacity="0.9" />
      <stop offset="50%" stop-color="#FF6B4A" stop-opacity="0.8" />
      <stop offset="100%" stop-color="#0B3D3A" stop-opacity="0.9" />
    </linearGradient>
    <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#C6FF3D" stop-opacity="0.7" />
      <stop offset="100%" stop-color="#FF6B4A" stop-opacity="0.9" />
    </linearGradient>
  </defs>

  <rect x="24" y="24" width="1032" height="1032" rx="48" fill="none" stroke="url(#tideGradient)" stroke-width="24" />
  <rect x="48" y="48" width="984" height="984" rx="36" fill="none" stroke="#EFE3C8" stroke-width="4" stroke-opacity="0.3" />

  <path d="M 48 880 Q 270 820, 540 890 T 1032 840 L 1032 1032 L 48 1032 Z" fill="#08201E" fill-opacity="0.85" />
  <path d="M 48 910 Q 270 850, 540 920 T 1032 870 L 1032 1032 L 48 1032 Z" fill="url(#waveGradient)" fill-opacity="0.5" />

  <circle cx="120" cy="940" r="8" fill="#C6FF3D" />
  <circle cx="280" cy="920" r="5" fill="#C6FF3D" />
  <circle cx="450" cy="960" r="10" fill="#C6FF3D" />
  <circle cx="720" cy="910" r="7" fill="#C6FF3D" />
  <circle cx="920" cy="950" r="6" fill="#C6FF3D" />

  <text x="80" y="990" font-family="'JetBrains Mono', monospace" font-size="28" font-weight="700" fill="#C6FF3D" letter-spacing="4">HH GOA 2026</text>
  <text x="1000" y="990" font-family="'JetBrains Mono', monospace" font-size="24" font-weight="500" fill="#EFE3C8" text-anchor="end" opacity="0.8">ANJUNA BEACH</text>

  <g transform="translate(80, 80)">
    <rect x="0" y="0" width="180" height="44" rx="22" fill="#0B3D3A" stroke="#C6FF3D" stroke-width="2" />
    <text x="90" y="28" font-family="'JetBrains Mono', monospace" font-size="16" font-weight="700" fill="#C6FF3D" text-anchor="middle" letter-spacing="2">BUILDER</text>
  </g>
</svg>
`;

fs.writeFileSync(path.join(framesDir, "pfp-frame.svg"), pfpFrameSvg.trim());

// 2. Builder Card SVG
const builderCardSvg = `
<svg width="1080" height="1350" viewBox="0 0 1080 1350" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="cardBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0B3D3A" />
      <stop offset="100%" stop-color="#08201E" />
    </linearGradient>
    <linearGradient id="tideGlow" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#C6FF3D" />
      <stop offset="100%" stop-color="#FF6B4A" />
    </linearGradient>
  </defs>

  <rect x="36" y="36" width="1008" height="1278" rx="40" fill="url(#cardBg)" stroke="#EFE3C8" stroke-width="4" stroke-opacity="0.3" />

  <path d="M 36 180 L 1044 180" stroke="#EFE3C8" stroke-width="3" stroke-dasharray="12 12" stroke-opacity="0.4" />
  <circle cx="36" cy="180" r="24" fill="#0B3D3A" />
  <circle cx="1044" cy="180" r="24" fill="#0B3D3A" />

  <text x="80" y="115" font-family="'Clash Display', sans-serif" font-size="48" font-weight="700" fill="#EFE3C8">HH GOA 2026</text>
  <text x="1000" y="115" font-family="'JetBrains Mono', monospace" font-size="22" fill="#C6FF3D" text-anchor="end" letter-spacing="2">PASS #GOA-8842</text>

  <!-- Photo Area Cutout Frame -->
  <rect x="80" y="230" width="920" height="640" rx="28" fill="none" stroke="url(#tideGlow)" stroke-width="6" />

  <!-- Bottom Details Stub -->
  <path d="M 36 930 L 1044 930" stroke="#EFE3C8" stroke-width="3" stroke-dasharray="12 12" stroke-opacity="0.4" />
  <circle cx="36" cy="930" r="24" fill="#0B3D3A" />
  <circle cx="1044" cy="930" r="24" fill="#0B3D3A" />

  <text x="80" y="1010" font-family="'JetBrains Mono', monospace" font-size="20" fill="#EFE3C8" opacity="0.6">BUILDER TITLE</text>
  <text x="80" y="1060" font-family="'Clash Display', sans-serif" font-size="42" font-weight="700" fill="#C6FF3D">ARAMBOL ARCHITECT</text>

  <text x="80" y="1140" font-family="'JetBrains Mono', monospace" font-size="20" fill="#EFE3C8" opacity="0.6">LOCATION &amp; STACK</text>
  <text x="80" y="1185" font-family="'JetBrains Mono', monospace" font-size="26" fill="#EFE3C8">ANJUNA BEACH • NEXT.JS • SOLANA</text>

  <!-- Barcode Overlay Bottom Right -->
  <g transform="translate(760, 1100)">
    <rect x="0" y="0" width="8" height="80" fill="#EFE3C8" />
    <rect x="14" y="0" width="4" height="80" fill="#EFE3C8" />
    <rect x="24" y="0" width="12" height="80" fill="#EFE3C8" />
    <rect x="42" y="0" width="6" height="80" fill="#EFE3C8" />
    <rect x="54" y="0" width="16" height="80" fill="#EFE3C8" />
    <rect x="76" y="0" width="4" height="80" fill="#EFE3C8" />
    <rect x="86" y="0" width="10" height="80" fill="#EFE3C8" />
    <rect x="102" y="0" width="14" height="80" fill="#EFE3C8" />
    <rect x="122" y="0" width="6" height="80" fill="#EFE3C8" />
    <rect x="134" y="0" width="18" height="80" fill="#EFE3C8" />
    <rect x="158" y="0" width="4" height="80" fill="#EFE3C8" />
    <rect x="168" y="0" width="10" height="80" fill="#EFE3C8" />
    <rect x="184" y="0" width="12" height="80" fill="#EFE3C8" />
    <text x="96" y="105" font-family="'JetBrains Mono', monospace" font-size="16" fill="#C6FF3D" text-anchor="middle">HH-GOA-2026</text>
  </g>
</svg>
`;

fs.writeFileSync(path.join(framesDir, "builder-card.svg"), builderCardSvg.trim());

// 3. Default OG Image SVG
const defaultOgSvg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#0B3D3A" />
  <circle cx="1000" cy="150" r="300" fill="#FF6B4A" opacity="0.15" />
  <circle cx="200" cy="500" r="250" fill="#C6FF3D" opacity="0.1" />

  <rect x="60" y="60" width="1080" height="510" rx="32" fill="#08201E" fill-opacity="0.7" stroke="#EFE3C8" stroke-width="2" stroke-opacity="0.2" />

  <text x="120" y="160" font-family="'JetBrains Mono', monospace" font-size="24" fill="#C6FF3D" letter-spacing="4">HH GOA 2026</text>
  <text x="120" y="260" font-family="'Clash Display', sans-serif" font-size="72" font-weight="700" fill="#EFE3C8">BUILD YOUR FRAME</text>
  <text x="120" y="330" font-family="'General Sans', sans-serif" font-size="32" fill="#EFE3C8" opacity="0.8">Beach hackathon builder cards &amp; avatar badges</text>

  <g transform="translate(120, 420)">
    <rect x="0" y="0" width="280" height="56" rx="28" fill="#FF6B4A" />
    <text x="140" y="36" font-family="'Clash Display', sans-serif" font-size="20" font-weight="700" fill="#08201E" text-anchor="middle" letter-spacing="2">CREATE YOURS →</text>
  </g>
</svg>
`;

fs.writeFileSync(path.join(publicDir, "og-default.svg"), defaultOgSvg.trim());

console.log("SVG frame & default OG assets generated successfully.");
