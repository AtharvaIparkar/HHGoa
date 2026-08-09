/**
 * Client-side compositing engine for HH Goa 2026 — Sunrise Signal Edition.
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

/** Helper to draw Devanagari गोवा in thin gold linework alongside English wordmark */
function drawDevanagariGoaMark(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  scale = 1
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);

  // Thin gold linework styling (#FFC24B)
  ctx.strokeStyle = "#FFC24B";
  ctx.fillStyle = "#FFC24B";
  ctx.lineWidth = 3;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  // Top Shirorekha (horizontal bar over Devanagari गोवा)
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(130, 0);
  ctx.stroke();

  // 'ग' (Ga)
  ctx.beginPath();
  ctx.moveTo(15, 0);
  ctx.lineTo(15, 28);
  ctx.arc(22, 28, 7, Math.PI, 0, false);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(38, 0);
  ctx.lineTo(38, 42);
  ctx.stroke();

  // 'ो' (Matra O) & 'व' (Va)
  ctx.beginPath();
  ctx.moveTo(70, 0);
  ctx.lineTo(70, 42);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(58, 24, 12, 0, Math.PI * 2);
  ctx.stroke();

  // Matra bar
  ctx.beginPath();
  ctx.moveTo(92, 0);
  ctx.lineTo(92, 42);
  ctx.stroke();

  // Top Matra stroke
  ctx.beginPath();
  ctx.moveTo(92, 0);
  ctx.quadraticCurveTo(80, -20, 72, -18);
  ctx.stroke();

  ctx.restore();
}

/** Helper to draw barcode lines on canvas */
function drawBarcode(ctx: CanvasRenderingContext2D, x: number, y: number, height: number, code: string) {
  ctx.save();
  ctx.fillStyle = "#E8F3EC";
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
  ctx.fillStyle = "#7CFF6B";
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
      // Procedural render fallback
    }
  }

  // 3. Sunrise Signal Procedural Overlay
  ctx.save();

  // Bottom gradient wave block (deep-tide transition)
  const waveGrad = ctx.createLinearGradient(0, size - 280, 0, size);
  waveGrad.addColorStop(0, "rgba(6, 43, 31, 0)");
  waveGrad.addColorStop(0.35, "rgba(6, 43, 31, 0.82)");
  waveGrad.addColorStop(1, "rgba(6, 43, 31, 0.98)");

  ctx.fillStyle = waveGrad;
  ctx.fillRect(0, size - 320, size, 320);

  // Signal-green & Sunrise Gold Rim stroke
  const rimGrad = ctx.createLinearGradient(0, 0, size, size);
  rimGrad.addColorStop(0, "#0B6839");
  rimGrad.addColorStop(0.5, "#FFC24B");
  rimGrad.addColorStop(1, "#FF6F4C");

  ctx.strokeStyle = rimGrad;
  ctx.lineWidth = 16;
  ctx.beginPath();
  ctx.roundRect(24, 24, size - 48, size - 48, 36);
  ctx.stroke();

  // Thin gold inner accent border
  ctx.strokeStyle = "rgba(255, 194, 75, 0.4)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(36, 36, size - 72, size - 72, 28);
  ctx.stroke();

  // Bioluminescent signal dots
  const points = [
    { x: 120, y: 990, r: 6, color: "#7CFF6B" },
    { x: 280, y: 970, r: 4, color: "#FFC24B" },
    { x: 440, y: 1010, r: 8, color: "#0B6839" },
    { x: 780, y: 960, r: 5, color: "#FF6F4C" },
    { x: 940, y: 1000, r: 6, color: "#7CFF6B" }
  ];

  for (const p of points) {
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Devanagari गोवा Thin Gold Linework Mark (never without English)
  drawDevanagariGoaMark(ctx, 60, size - 130, 0.9);

  // Brand Typography — English Wordmark
  ctx.font = "900 36px 'Archivo Black', sans-serif";
  ctx.fillStyle = "#E8F3EC";
  ctx.textAlign = "left";
  ctx.fillText("HH GOA 2026", 210, size - 100);

  ctx.font = "bold 16px 'JetBrains Mono', monospace";
  ctx.fillStyle = "#7CFF6B";
  ctx.fillText("LESS NOISE. MORE SIGNAL.", 210, size - 72);

  // Location Metadata on Right
  ctx.font = "600 18px 'JetBrains Mono', monospace";
  ctx.fillStyle = "#E8F3EC";
  ctx.textAlign = "right";
  ctx.fillText("ANJUNA BEACH • 15.5869° N", size - 60, size - 96);

  ctx.font = "500 14px 'JetBrains Mono', monospace";
  ctx.fillStyle = "#FFC24B";
  ctx.fillText("MARCH 2026", size - 60, size - 72);

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

  // 1. Background — deep-tide green gradient
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, "#062B1F");
  bgGrad.addColorStop(0.5, "#083829");
  bgGrad.addColorStop(1, "#041B13");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Subtle background palm silhouette linework accent
  ctx.save();
  ctx.strokeStyle = "rgba(11, 104, 57, 0.25)";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(width - 100, 200, 180, 0, Math.PI);
  ctx.stroke();
  ctx.restore();

  // 2. Card Container Outer Border with Sunrise Accent
  const cardGlow = ctx.createLinearGradient(0, 0, width, height);
  cardGlow.addColorStop(0, "rgba(255, 194, 75, 0.4)");
  cardGlow.addColorStop(0.5, "rgba(11, 104, 57, 0.6)");
  cardGlow.addColorStop(1, "rgba(255, 111, 76, 0.4)");

  ctx.strokeStyle = cardGlow;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.roundRect(40, 40, width - 80, height - 80, 36);
  ctx.stroke();

  // 3. Perforated Header Divider with circular notch cutouts
  ctx.save();
  ctx.strokeStyle = "rgba(232, 243, 236, 0.3)";
  ctx.lineWidth = 3;
  ctx.setLineDash([14, 14]);
  ctx.beginPath();
  ctx.moveTo(40, 180);
  ctx.lineTo(width - 40, 180);
  ctx.stroke();

  // Perforated notch cutouts on edges
  ctx.fillStyle = "#062B1F";
  ctx.beginPath();
  ctx.arc(40, 180, 24, 0, Math.PI * 2);
  ctx.arc(width - 40, 180, 24, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "#FFC24B";
  ctx.lineWidth = 2;
  ctx.setLineDash([]);
  ctx.beginPath();
  ctx.arc(40, 180, 24, -Math.PI / 2, Math.PI / 2);
  ctx.arc(width - 40, 180, 24, Math.PI / 2, -Math.PI / 2);
  ctx.stroke();
  ctx.restore();

  // 4. Header: Devanagari Gold Linework + English Wordmark
  drawDevanagariGoaMark(ctx, 80, 120, 0.85);

  ctx.font = "900 38px 'Archivo Black', sans-serif";
  ctx.fillStyle = "#E8F3EC";
  ctx.fillText("HH GOA 2026", 215, 115);

  ctx.font = "bold 14px 'JetBrains Mono', monospace";
  ctx.fillStyle = "#7CFF6B";
  ctx.fillText("OFFICIAL BUILDER PASS", 215, 138);

  const badgeId = opts.builder.idNumber || `#GOA-${Math.floor(1000 + Math.random() * 9000)}`;
  ctx.font = "bold 24px 'JetBrains Mono', monospace";
  ctx.fillStyle = "#FFC24B";
  ctx.textAlign = "end";
  ctx.fillText(badgeId, width - 80, 124);
  ctx.textAlign = "start";

  // 5. Photo Window with Cover Crop & Sunrise Rim Light
  const photoX = 80;
  const photoY = 230;
  const photoW = width - 160; // 920
  const photoH = 610;

  drawCover(ctx, photo, photoX, photoY, photoW, photoH, 28);

  // Photo border rim light
  const photoRim = ctx.createLinearGradient(photoX, photoY, photoX + photoW, photoY + photoH);
  photoRim.addColorStop(0, "#FFC24B");
  photoRim.addColorStop(0.5, "#0B6839");
  photoRim.addColorStop(1, "#FF6F4C");

  ctx.strokeStyle = photoRim;
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.roundRect(photoX, photoY, photoW, photoH, 28);
  ctx.stroke();

  // 6. Perforated Bottom Divider
  ctx.save();
  ctx.strokeStyle = "rgba(232, 243, 236, 0.3)";
  ctx.lineWidth = 3;
  ctx.setLineDash([14, 14]);
  ctx.beginPath();
  ctx.moveTo(40, 890);
  ctx.lineTo(width - 40, 890);
  ctx.stroke();

  ctx.fillStyle = "#062B1F";
  ctx.beginPath();
  ctx.arc(40, 890, 24, 0, Math.PI * 2);
  ctx.arc(width - 40, 890, 24, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "#FFC24B";
  ctx.lineWidth = 2;
  ctx.setLineDash([]);
  ctx.beginPath();
  ctx.arc(40, 890, 24, -Math.PI / 2, Math.PI / 2);
  ctx.arc(width - 40, 890, 24, Math.PI / 2, -Math.PI / 2);
  ctx.stroke();
  ctx.restore();

  // 7. Builder Details Section
  const builderName = (opts.builder.name || "GOA BUILDER").toUpperCase();
  ctx.font = "bold 16px 'JetBrains Mono', monospace";
  ctx.fillStyle = "#FFC24B";
  ctx.fillText("BUILDER NAME", 80, 950);

  ctx.font = "900 46px 'Archivo Black', sans-serif";
  ctx.fillStyle = "#E8F3EC";
  ctx.fillText(builderName, 80, 1000);

  // Title
  const title = (opts.builder.builderTitle || "ARAMBOL ARCHITECT").toUpperCase();
  ctx.font = "bold 15px 'JetBrains Mono', monospace";
  ctx.fillStyle = "rgba(232, 243, 236, 0.6)";
  ctx.fillText("TITLE / ROLE", 80, 1055);

  ctx.font = "bold 28px 'JetBrains Mono', monospace";
  ctx.fillStyle = "#7CFF6B";
  ctx.fillText(title, 80, 1095);

  // Stack & Location
  const stackText = (opts.builder.stack || "NEXT.JS • TYPESCRIPT • TAILWIND").toUpperCase();
  ctx.font = "bold 15px 'JetBrains Mono', monospace";
  ctx.fillStyle = "rgba(232, 243, 236, 0.6)";
  ctx.fillText("STACK & LOCATION", 80, 1155);

  ctx.font = "600 20px 'Inter', sans-serif";
  ctx.fillStyle = "#E8F3EC";
  ctx.fillText(`ANJUNA BEACH • ${stackText}`, 80, 1195);

  // 8. Barcode Rendering on Bottom Right
  drawBarcode(ctx, width - 320, 1110, 75, "HH-GOA-2026");

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

