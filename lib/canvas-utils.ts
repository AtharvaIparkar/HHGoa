import { THEMES, type ThemeConfig, type ThemeId } from "./themes";
import { type PhotoTransform } from "./store";

export interface BuilderData {
  name: string;
  xHandle?: string;
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

/** Draws `img` into `ctx` covering the target rect with zoom, pan, and rotation transforms. */
export function drawTransformedPhoto(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  w: number,
  h: number,
  transform?: PhotoTransform,
  borderRadius = 0
) {
  ctx.save();
  if (borderRadius > 0) {
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, borderRadius);
    ctx.clip();
  }

  const zoom = transform ? transform.zoom / 100 : 1;
  const panX = transform ? transform.pan.x * (w / 600) : 0;
  const panY = transform ? transform.pan.y * (h / 600) : 0;
  const rotation = transform ? transform.rotation : 0;

  // Center pivot for rect
  const centerX = x + w / 2 + panX;
  const centerY = y + h / 2 + panY;

  ctx.translate(centerX, centerY);
  if (rotation !== 0) {
    ctx.rotate((rotation * Math.PI) / 180);
  }

  const imgRatio = img.width / img.height;
  const boxRatio = w / h;
  let drawW = w * zoom;
  let drawH = h * zoom;

  if (imgRatio > boxRatio) {
    drawW = drawH * imgRatio;
  } else {
    drawH = drawW / imgRatio;
  }

  ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
  ctx.restore();
}

/** Helper to draw Devanagari गोवा in thin gold linework */
function drawDevanagariGoaMark(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  color = "#FFC24B",
  scale = 1
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);

  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 3.5;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  // Shirorekha (Top bar)
  ctx.beginPath();
  ctx.moveTo(4, 0);
  ctx.lineTo(120, 0);
  ctx.stroke();

  // 'ग' (Ga)
  ctx.beginPath();
  ctx.moveTo(18, 0);
  ctx.lineTo(18, 22);
  ctx.arc(14, 22, 4, 0, Math.PI, false);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(34, 0);
  ctx.lineTo(34, 38);
  ctx.stroke();

  // Matra 'ो' (O matra for Ga -> Go)
  ctx.beginPath();
  ctx.moveTo(50, 0);
  ctx.lineTo(50, 38);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(50, 0);
  ctx.quadraticCurveTo(42, -14, 28, -12);
  ctx.stroke();

  // 'व' (Va)
  ctx.beginPath();
  ctx.moveTo(85, 0);
  ctx.lineTo(85, 38);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(73, 20, 12, 0, Math.PI * 2);
  ctx.stroke();

  // Matra 'ा' (Aa matra for Va -> Va/Vaa)
  ctx.beginPath();
  ctx.moveTo(105, 0);
  ctx.lineTo(105, 38);
  ctx.stroke();

  ctx.restore();
}


/** Helper to draw barcode lines on canvas */
function drawBarcode(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  height: number,
  code: string,
  theme: ThemeConfig
) {
  ctx.save();
  ctx.fillStyle = theme.colors.text;
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
  ctx.fillStyle = theme.colors.accentGlow;
  ctx.textAlign = "center";
  ctx.fillText(code, x + (currentX - x) / 2, y + height + 24);
  ctx.restore();
}

/** Composites PFP Frame (1080x1080) with Theme & Transform */
export async function compositePFPFrame(opts: {
  photoSrc: string;
  transform?: PhotoTransform;
  themeId?: ThemeId;
  frameOverlaySrc?: string;
}): Promise<Blob> {
  const size = 1080;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  const theme = THEMES[opts.themeId || "signal"] || THEMES.signal;
  const photo = await loadImage(opts.photoSrc);

  // 1. Draw background
  ctx.fillStyle = theme.colors.bg;
  ctx.fillRect(0, 0, size, size);

  // 2. Draw transformed photo
  drawTransformedPhoto(ctx, photo, 0, 0, size, size, opts.transform);

  // 3. Theme-specific procedural overlays
  ctx.save();

  // Bottom gradient wave block
  const waveGrad = ctx.createLinearGradient(0, size - 280, 0, size);
  waveGrad.addColorStop(0, "rgba(0, 0, 0, 0)");
  waveGrad.addColorStop(0.4, theme.colors.bg);
  waveGrad.addColorStop(1, theme.colors.bg);

  ctx.fillStyle = waveGrad;
  ctx.fillRect(0, size - 320, size, 320);

  // Theme Accent Rim Stroke
  const rimGrad = ctx.createLinearGradient(0, 0, size, size);
  rimGrad.addColorStop(0, theme.colors.accent);
  rimGrad.addColorStop(0.5, theme.colors.secondaryAccent);
  rimGrad.addColorStop(1, theme.colors.accentGlow);

  ctx.strokeStyle = rimGrad;
  ctx.lineWidth = 16;
  ctx.beginPath();
  ctx.roundRect(24, 24, size - 48, size - 48, 36);
  ctx.stroke();

  // Devanagari Gold Linework Mark
  drawDevanagariGoaMark(ctx, 60, size - 130, theme.colors.secondaryAccent, 0.9);

  // Brand Typography
  ctx.font = "900 36px 'Archivo Black', sans-serif";
  ctx.fillStyle = theme.colors.text;
  ctx.textAlign = "left";
  ctx.fillText("HH GOA 2026", 210, size - 100);

  ctx.font = "bold 16px 'JetBrains Mono', monospace";
  ctx.fillStyle = theme.colors.accentGlow;
  ctx.fillText("LESS NOISE. MORE SIGNAL.", 210, size - 72);

  // Location Metadata on Right
  ctx.font = "600 18px 'JetBrains Mono', monospace";
  ctx.fillStyle = theme.colors.text;
  ctx.textAlign = "right";
  ctx.fillText("ANJUNA BEACH • 15.5869° N", size - 60, size - 96);

  ctx.font = "500 14px 'JetBrains Mono', monospace";
  ctx.fillStyle = theme.colors.secondaryAccent;
  ctx.fillText("MARCH 2026", size - 60, size - 72);

  ctx.restore();

  return new Promise((resolve) =>
    canvas.toBlob((blob) => resolve(blob!), "image/png", 0.95)
  );
}

/** Composites Builder ID Card Ticket (1080x1350) with Theme & Transform */
export async function compositeBuilderCard(opts: {
  photoSrc: string;
  builder: BuilderData;
  transform?: PhotoTransform;
  themeId?: ThemeId;
}): Promise<Blob> {
  const width = 1080;
  const height = 1350;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;

  const theme = THEMES[opts.themeId || "signal"] || THEMES.signal;
  const photo = await loadImage(opts.photoSrc);

  // 1. Background
  ctx.fillStyle = theme.colors.bg;
  ctx.fillRect(0, 0, width, height);

  // 2. Card Container Outer Border
  ctx.strokeStyle = theme.colors.border;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.roundRect(40, 40, width - 80, height - 80, 36);
  ctx.stroke();

  // 3. Perforated Header Divider with circular notch cutouts
  ctx.save();
  ctx.strokeStyle = theme.colors.border;
  ctx.lineWidth = 3;
  ctx.setLineDash([14, 14]);
  ctx.beginPath();
  ctx.moveTo(40, 180);
  ctx.lineTo(width - 40, 180);
  ctx.stroke();

  // Notch cutouts
  ctx.fillStyle = theme.colors.bg;
  ctx.beginPath();
  ctx.arc(40, 180, 24, 0, Math.PI * 2);
  ctx.arc(width - 40, 180, 24, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = theme.colors.secondaryAccent;
  ctx.lineWidth = 2;
  ctx.setLineDash([]);
  ctx.beginPath();
  ctx.arc(40, 180, 24, -Math.PI / 2, Math.PI / 2);
  ctx.arc(width - 40, 180, 24, Math.PI / 2, -Math.PI / 2);
  ctx.stroke();
  ctx.restore();

  // 4. Header: Devanagari Gold Linework + English Wordmark
  drawDevanagariGoaMark(ctx, 80, 120, theme.colors.secondaryAccent, 0.85);

  ctx.font = "900 38px 'Archivo Black', sans-serif";
  ctx.fillStyle = theme.colors.text;
  ctx.fillText("HH GOA 2026", 215, 115);

  ctx.font = "bold 14px 'JetBrains Mono', monospace";
  ctx.fillStyle = theme.colors.accentGlow;
  ctx.fillText("OFFICIAL BUILDER PASS", 215, 138);

  const badgeId = opts.builder.idNumber || `#GOA-${Math.floor(1000 + Math.random() * 9000)}`;
  ctx.font = "bold 24px 'JetBrains Mono', monospace";
  ctx.fillStyle = theme.colors.secondaryAccent;
  ctx.textAlign = "end";
  ctx.fillText(badgeId, width - 80, 124);
  ctx.textAlign = "start";

  // 5. Photo Window with Transformed Photo & Rim Light
  const photoX = 80;
  const photoY = 230;
  const photoW = width - 160;
  const photoH = 610;

  drawTransformedPhoto(ctx, photo, photoX, photoY, photoW, photoH, opts.transform, 28);

  // Photo border rim light
  const photoRim = ctx.createLinearGradient(photoX, photoY, photoX + photoW, photoY + photoH);
  photoRim.addColorStop(0, theme.colors.secondaryAccent);
  photoRim.addColorStop(0.5, theme.colors.accent);
  photoRim.addColorStop(1, theme.colors.accentGlow);

  ctx.strokeStyle = photoRim;
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.roundRect(photoX, photoY, photoW, photoH, 28);
  ctx.stroke();

  // 6. Perforated Bottom Divider
  ctx.save();
  ctx.strokeStyle = theme.colors.border;
  ctx.lineWidth = 3;
  ctx.setLineDash([14, 14]);
  ctx.beginPath();
  ctx.moveTo(40, 890);
  ctx.lineTo(width - 40, 890);
  ctx.stroke();

  ctx.fillStyle = theme.colors.bg;
  ctx.beginPath();
  ctx.arc(40, 890, 24, 0, Math.PI * 2);
  ctx.arc(width - 40, 890, 24, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = theme.colors.secondaryAccent;
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
  ctx.fillStyle = theme.colors.secondaryAccent;
  ctx.fillText("BUILDER NAME", 80, 950);

  ctx.font = "900 46px 'Archivo Black', sans-serif";
  ctx.fillStyle = theme.colors.text;
  ctx.fillText(builderName, 80, 1000);

  // X Handle if provided
  if (opts.builder.xHandle) {
    ctx.font = "bold 18px 'JetBrains Mono', monospace";
    ctx.fillStyle = theme.colors.accentGlow;
    ctx.fillText(opts.builder.xHandle, 80, 1030);
  }

  // Title
  const title = (opts.builder.builderTitle || "ARAMBOL ARCHITECT").toUpperCase();
  ctx.font = "bold 15px 'JetBrains Mono', monospace";
  ctx.fillStyle = theme.colors.textSecondary;
  ctx.fillText("TITLE / ROLE", 80, 1070);

  ctx.font = "bold 28px 'JetBrains Mono', monospace";
  ctx.fillStyle = theme.colors.accentGlow;
  ctx.fillText(title, 80, 1105);

  // Stack & Location
  const stackText = (opts.builder.stack || "NEXT.JS • TYPESCRIPT • TAILWIND").toUpperCase();
  ctx.font = "bold 15px 'JetBrains Mono', monospace";
  ctx.fillStyle = theme.colors.textSecondary;
  ctx.fillText("STACK & LOCATION", 80, 1160);

  ctx.font = "600 20px 'Inter', sans-serif";
  ctx.fillStyle = theme.colors.text;
  ctx.fillText(`ANJUNA BEACH • ${stackText}`, 80, 1195);

  // 8. Barcode Rendering on Bottom Right
  drawBarcode(ctx, width - 320, 1110, 75, "HH-GOA-2026", theme);

  return new Promise((resolve) =>
    canvas.toBlob((blob) => resolve(blob!), "image/png", 0.95)
  );
}

/** Unified compositing dispatcher */
export async function compositeFrame(opts: {
  photoSrc: string;
  format?: "pfp-frame" | "builder-card";
  transform?: PhotoTransform;
  themeId?: ThemeId;
  frameSrc?: string;
  builder?: BuilderData;
}): Promise<Blob> {
  if (opts.format === "builder-card" && opts.builder) {
    return compositeBuilderCard({
      photoSrc: opts.photoSrc,
      builder: opts.builder,
      transform: opts.transform,
      themeId: opts.themeId
    });
  }
  return compositePFPFrame({
    photoSrc: opts.photoSrc,
    transform: opts.transform,
    themeId: opts.themeId,
    frameOverlaySrc: opts.frameSrc
  });
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


