/**
 * Client-side compositing engine for HH Goa 2026.
 * Zero server compute, near-instant 60fps rendering, high-DPI crisp PNG exports.
 * Supports PFP Frame (1080x1080) and Builder ID Card (1080x1350) with perforated wristband motif.
 */

export interface BuilderData {
  name: string;
  stack: string;
  builderTitle: string;
  idNumber?: string;
}

export async function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
    img.src = src;
  });
}

/** Draws `img` into `ctx` covering the target rect, cropping like CSS object-fit: cover. */
export function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  w: number,
  h: number,
  borderRadius = 0
) {
  ctx.save();
  if (borderRadius > 0) {
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, borderRadius);
    ctx.clip();
  }

  const imgRatio = img.width / img.height;
  const boxRatio = w / h;
  let sx = 0,
    sy = 0,
    sw = img.width,
    sh = img.height;

  if (imgRatio > boxRatio) {
    sw = img.height * boxRatio;
    sx = (img.width - sw) / 2;
  } else {
    sh = img.width / boxRatio;
    sy = (img.height - sh) / 2;
  }

  ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
  ctx.restore();
}

/** Helper to draw barcode lines on canvas */
function drawBarcode(ctx: CanvasRenderingContext2D, x: number, y: number, height: number, code: string) {
  ctx.save();
  ctx.fillStyle = "#EFE3C8";
  let currentX = x;
  const pattern = [4, 2, 8, 3, 10, 2, 6, 4, 12, 3, 5, 2, 8, 4, 14, 2, 6, 4, 10];
  for (let i = 0; i < pattern.length; i++) {
    const w = pattern[i]!;
    if (i % 2 === 0) {
      ctx.fillRect(currentX, y, w, height);
    }
    currentX += w + 3;
  }

  ctx.font = "bold 16px 'JetBrains Mono', monospace";
  ctx.fillStyle = "#C6FF3D";
  ctx.textAlign = "center";
  ctx.fillText(code, x + (currentX - x) / 2, y + height + 24);
  ctx.restore();
}

/** Composites PFP Frame (1080x1080) */
export async function compositePFPFrame(opts: {
  photoSrc: string;
  frameOverlaySrc?: string;
}): Promise<Blob> {
  const size = 1080;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  const photo = await loadImage(opts.photoSrc);

  // 1. Draw cover cropped photo
  drawCover(ctx, photo, 0, 0, size, size);

  // 2. Try drawing overlay SVG/PNG if provided
  if (opts.frameOverlaySrc) {
    try {
      const overlay = await loadImage(opts.frameOverlaySrc);
      ctx.drawImage(overlay, 0, 0, size, size);
    } catch {
      // Fallback to procedural vector overlay
    }
  }

  // 3. Procedural Bioluminescent Wave Overlay Guarantee
  ctx.save();
  // Bottom gradient wave block
  const waveGrad = ctx.createLinearGradient(0, size - 220, 0, size);
  waveGrad.addColorStop(0, "rgba(8, 32, 30, 0)");
  waveGrad.addColorStop(0.4, "rgba(8, 32, 30, 0.75)");
  waveGrad.addColorStop(1, "rgba(8, 32, 30, 0.95)");

  ctx.fillStyle = waveGrad;
  ctx.fillRect(0, size - 260, size, 260);

  // Bioluminescent wave arc
  const arcGrad = ctx.createLinearGradient(0, 0, size, 0);
  arcGrad.addColorStop(0, "#C6FF3D");
  arcGrad.addColorStop(0.5, "#FF6B4A");
  arcGrad.addColorStop(1, "#0B3D3A");

  ctx.strokeStyle = arcGrad;
  ctx.lineWidth = 16;
  ctx.beginPath();
  ctx.roundRect(20, 20, size - 40, size - 40, 40);
  ctx.stroke();

  // Bioluminescent particles
  const points = [
    { x: 100, y: 980, r: 8 },
    { x: 260, y: 960, r: 5 },
    { x: 420, y: 1000, r: 10 },
    { x: 740, y: 950, r: 7 },
    { x: 920, y: 990, r: 6 }
  ];

  ctx.fillStyle = "#C6FF3D";
  for (const p of points) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Typography
  ctx.font = "bold 32px 'JetBrains Mono', monospace";
  ctx.fillStyle = "#C6FF3D";
  ctx.fillText("HH GOA 2026", 60, size - 60);

  ctx.font = "500 24px 'JetBrains Mono', monospace";
  ctx.fillStyle = "#EFE3C8";
  ctx.textAlign = "end";
  ctx.fillText("ANJUNA BEACH", size - 60, size - 60);

  ctx.restore();

  return new Promise((resolve) =>
    canvas.toBlob((blob) => resolve(blob!), "image/png", 0.95)
  );
}

/** Composites Builder ID Card Ticket (1080x1350) */
export async function compositeBuilderCard(opts: {
  photoSrc: string;
  builder: BuilderData;
}): Promise<Blob> {
  const width = 1080;
  const height = 1350;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;

  const photo = await loadImage(opts.photoSrc);

  // 1. Background — monsoon deep teal gradient
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, "#0B3D3A");
  bgGrad.addColorStop(1, "#08201E");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // 2. Card Container Border
  ctx.strokeStyle = "rgba(239, 227, 200, 0.35)";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.roundRect(40, 40, width - 80, height - 80, 40);
  ctx.stroke();

  // 3. Perforated Header Divider
  ctx.save();
  ctx.strokeStyle = "rgba(239, 227, 200, 0.35)";
  ctx.lineWidth = 3;
  ctx.setLineDash([16, 16]);
  ctx.beginPath();
  ctx.moveTo(40, 180);
  ctx.lineTo(width - 40, 180);
  ctx.stroke();

  // Perforated edge circles
  ctx.fillStyle = "#0B3D3A";
  ctx.beginPath();
  ctx.arc(40, 180, 24, 0, Math.PI * 2);
  ctx.arc(width - 40, 180, 24, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // 4. Header Text
  ctx.font = "bold 44px 'Clash Display', sans-serif";
  ctx.fillStyle = "#EFE3C8";
  ctx.fillText("HH GOA 2026", 80, 120);

  const badgeId = opts.builder.idNumber || `#GOA-${Math.floor(1000 + Math.random() * 9000)}`;
  ctx.font = "bold 24px 'JetBrains Mono', monospace";
  ctx.fillStyle = "#C6FF3D";
  ctx.textAlign = "end";
  ctx.fillText(badgeId, width - 80, 120);
  ctx.textAlign = "start";

  // 5. Photo Window with Cover Crop & Glow Ring
  const photoX = 80;
  const photoY = 230;
  const photoW = width - 160; // 920
  const photoH = 620;

  drawCover(ctx, photo, photoX, photoY, photoW, photoH, 28);

  // Photo border glow ring
  const photoGlow = ctx.createLinearGradient(photoX, photoY, photoX + photoW, photoY + photoH);
  photoGlow.addColorStop(0, "#C6FF3D");
  photoGlow.addColorStop(0.5, "#FF6B4A");
  photoGlow.addColorStop(1, "#0B3D3A");

  ctx.strokeStyle = photoGlow;
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.roundRect(photoX, photoY, photoW, photoH, 28);
  ctx.stroke();

  // 6. Perforated Bottom Divider
  ctx.save();
  ctx.strokeStyle = "rgba(239, 227, 200, 0.35)";
  ctx.lineWidth = 3;
  ctx.setLineDash([16, 16]);
  ctx.beginPath();
  ctx.moveTo(40, 900);
  ctx.lineTo(width - 40, 900);
  ctx.stroke();

  ctx.fillStyle = "#0B3D3A";
  ctx.beginPath();
  ctx.arc(40, 900, 24, 0, Math.PI * 2);
  ctx.arc(width - 40, 900, 24, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // 7. Builder Info Details
  // Name
  const builderName = (opts.builder.name || "GOA BUILDER").toUpperCase();
  ctx.font = "bold 20px 'JetBrains Mono', monospace";
  ctx.fillStyle = "rgba(239, 227, 200, 0.6)";
  ctx.fillText("BUILDER NAME", 80, 960);

  ctx.font = "bold 44px 'Clash Display', sans-serif";
  ctx.fillStyle = "#EFE3C8";
  ctx.fillText(builderName, 80, 1010);

  // Title
  const title = (opts.builder.builderTitle || "ARAMBOL ARCHITECT").toUpperCase();
  ctx.font = "bold 18px 'JetBrains Mono', monospace";
  ctx.fillStyle = "rgba(239, 227, 200, 0.6)";
  ctx.fillText("TITLE", 80, 1070);

  ctx.font = "bold 32px 'Clash Display', sans-serif";
  ctx.fillStyle = "#C6FF3D";
  ctx.fillText(title, 80, 1115);

  // Stack & Location
  const stackText = (opts.builder.stack || "NEXT.JS • TYPESCRIPT • TAILWIND").toUpperCase();
  ctx.font = "bold 18px 'JetBrains Mono', monospace";
  ctx.fillStyle = "rgba(239, 227, 200, 0.6)";
  ctx.fillText("LOCATION & STACK", 80, 1175);

  ctx.font = "bold 22px 'JetBrains Mono', monospace";
  ctx.fillStyle = "#EFE3C8";
  ctx.fillText(`ANJUNA BEACH • ${stackText}`, 80, 1215);

  // 8. Barcode Rendering on Bottom Right
  drawBarcode(ctx, width - 300, 1120, 80, "HH-GOA-2026");

  return new Promise((resolve) =>
    canvas.toBlob((blob) => resolve(blob!), "image/png", 0.95)
  );
}

/** Unified compositing dispatcher */
export async function compositeFrame(opts: {
  photoSrc: string;
  format?: "pfp-frame" | "builder-card";
  frameSrc?: string;
  builder?: BuilderData;
}): Promise<Blob> {
  if (opts.format === "builder-card" && opts.builder) {
    return compositeBuilderCard({ photoSrc: opts.photoSrc, builder: opts.builder });
  }
  return compositePFPFrame({ photoSrc: opts.photoSrc, frameOverlaySrc: opts.frameSrc });
}

/** iPhone HEIC → JPEG, lazy-loaded so non-Safari/non-iPhone users never pay this cost. */
export async function normalizeToJpeg(file: File): Promise<File> {
  const isHeic =
    file.type === "image/heic" ||
    file.type === "image/heif" ||
    /\.heic$/i.test(file.name);

  if (!isHeic) return file;

  try {
    const heic2any = (await import("heic2any")).default;
    const converted = (await heic2any({
      blob: file,
      toType: "image/jpeg",
      quality: 0.9
    })) as Blob;

    return new File([converted], file.name.replace(/\.heic$/i, ".jpg"), {
      type: "image/jpeg"
    });
  } catch (err) {
    console.warn("HEIC normalization failed, returning original file", err);
    return file;
  }
}
