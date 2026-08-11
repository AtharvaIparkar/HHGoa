import { GeneratorState, ThemeConfig } from "@/types";
import { THEMES } from "./themes";

export function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
  fill = false,
  stroke = false
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  if (fill) ctx.fill();
  if (stroke) ctx.stroke();
}

export function drawFittedText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  maxFontSize = 32,
  minFontSize = 14,
  fontFamily = '"Plus Jakarta Sans", sans-serif',
  color = "#FFFFFF",
  textAlign: CanvasTextAlign = "left",
  fontWeight = "800"
) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.textAlign = textAlign;

  let currentFontSize = maxFontSize;
  ctx.font = `${fontWeight} ${currentFontSize}px ${fontFamily}`;

  while (ctx.measureText(text).width > maxWidth && currentFontSize > minFontSize) {
    currentFontSize -= 1;
    ctx.font = `${fontWeight} ${currentFontSize}px ${fontFamily}`;
  }

  ctx.fillText(text, x, y);
  ctx.restore();
}

export function drawDevanagariGoaMark(
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

export function drawBarcode(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  height: number,
  code: string,
  theme: ThemeConfig
) {
  ctx.save();
  ctx.fillStyle = theme.colors.text || "#FFFFFF";
  let currentX = x;
  const pattern = [4, 2, 8, 3, 10, 2, 6, 4, 12, 3, 5, 2, 8, 4, 14, 2, 6, 4, 10];
  for (let i = 0; i < pattern.length; i++) {
    const w = pattern[i];
    if (i % 2 === 0) {
      ctx.fillRect(currentX, y, w, height);
    }
    currentX += w + 3;
  }

  ctx.font = "bold 16px 'Space Mono', monospace";
  ctx.fillStyle = theme.colors.accentGlow || theme.colors.secondaryAccent;
  ctx.textAlign = "center";
  ctx.fillText(code, x + (currentX - x) / 2, y + height + 24);
  ctx.restore();
}

export function drawDefaultAvatar(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  isDark: boolean
) {
  ctx.save();
  ctx.fillStyle = isDark ? "#1D2A22" : "#E2E8F0";
  ctx.fillRect(x, y, w, h);

  const cx = x + w / 2;
  const cy = y + h / 2;
  const iconColor = isDark ? "#3E5045" : "#94A3B8";
  ctx.fillStyle = iconColor;

  const headRadius = Math.min(w, h) * 0.18;
  ctx.beginPath();
  ctx.arc(cx, cy - headRadius * 0.5, headRadius, 0, Math.PI * 2);
  ctx.fill();

  const shoulderRadius = Math.min(w, h) * 0.32;
  ctx.beginPath();
  ctx.arc(cx, cy + shoulderRadius * 1.35, shoulderRadius, Math.PI, 0, false);
  ctx.fill();

  ctx.restore();
}

export function applyPhotoFilter(ctx: CanvasRenderingContext2D, filter: string) {
  if (filter === "sunset") {
    ctx.filter = "contrast(1.15) saturate(1.35) sepia(0.25)";
  } else if (filter === "cyber") {
    ctx.filter = "hue-rotate(150deg) saturate(1.5) contrast(1.1)";
  } else if (filter === "bw") {
    ctx.filter = "grayscale(100%) contrast(1.4)";
  } else {
    ctx.filter = "none";
  }
}

export function renderPfpFrame(
  targetCanvas: HTMLCanvasElement,
  targetCtx: CanvasRenderingContext2D,
  state: GeneratorState
) {
  const size = targetCanvas.width;
  const theme = THEMES[state.theme] || THEMES.signal;
  const isDark = theme.isDark;

  // 1. Draw background
  targetCtx.fillStyle = theme.colors.bg;
  targetCtx.fillRect(0, 0, size, size);

  // 2. Profile Photo Window
  const centerX = size / 2;
  const centerY = size / 2 - 40;
  const radius = 340;

  targetCtx.save();
  targetCtx.beginPath();
  targetCtx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  targetCtx.closePath();
  targetCtx.clip();

  if (state.photoImg) {
    applyPhotoFilter(targetCtx, state.filter);

    const imgW = state.photoImg.width;
    const imgH = state.photoImg.height;
    const scale = Math.max((radius * 2) / imgW, (radius * 2) / imgH) * state.zoom;

    const drawW = imgW * scale;
    const drawH = imgH * scale;

    const drawX = centerX - drawW / 2 + state.panX;
    const drawY = centerY - drawH / 2 + state.panY;

    targetCtx.drawImage(state.photoImg, drawX, drawY, drawW, drawH);
  } else {
    drawDefaultAvatar(targetCtx, centerX - radius, centerY - radius, radius * 2, radius * 2, isDark);
  }
  targetCtx.restore();

  // 3. Theme-specific procedural overlays
  targetCtx.save();

  // Bottom gradient wave block
  const waveGrad = targetCtx.createLinearGradient(0, size - 280, 0, size);
  waveGrad.addColorStop(0, "rgba(0, 0, 0, 0)");
  waveGrad.addColorStop(0.45, theme.colors.bg);
  waveGrad.addColorStop(1, theme.colors.bg);

  targetCtx.fillStyle = waveGrad;
  targetCtx.fillRect(0, size - 320, size, 320);

  // Theme Accent Rim Stroke
  const rimGrad = targetCtx.createLinearGradient(0, 0, size, size);
  rimGrad.addColorStop(0, theme.colors.accent);
  rimGrad.addColorStop(0.5, theme.colors.secondaryAccent);
  rimGrad.addColorStop(1, theme.colors.accentGlow || theme.colors.secondaryAccent);

  targetCtx.strokeStyle = rimGrad;
  targetCtx.lineWidth = 16;
  roundRect(targetCtx, 24, 24, size - 48, size - 48, 36, false, true);

  // Photo Ring Light
  targetCtx.lineWidth = 8;
  targetCtx.strokeStyle = theme.colors.secondaryAccent;
  targetCtx.beginPath();
  targetCtx.arc(centerX, centerY, radius + 6, 0, Math.PI * 2);
  targetCtx.stroke();

  // Devanagari Gold Linework Mark
  drawDevanagariGoaMark(targetCtx, 60, size - 130, theme.colors.secondaryAccent, 0.95);

  // Brand Typography
  targetCtx.font = "900 36px 'Plus Jakarta Sans', sans-serif";
  targetCtx.fillStyle = theme.colors.text;
  targetCtx.textAlign = "left";
  targetCtx.fillText("HH GOA 2026", 210, size - 100);

  targetCtx.font = "bold 16px 'Space Mono', monospace";
  targetCtx.fillStyle = theme.colors.accentGlow || theme.colors.secondaryAccent;
  targetCtx.fillText("LESS NOISE. MORE SIGNAL.", 210, size - 72);

  // Location Metadata on Right
  targetCtx.font = "600 18px 'Space Mono', monospace";
  targetCtx.fillStyle = theme.colors.text;
  targetCtx.textAlign = "right";
  targetCtx.fillText(state.xHandle ? state.xHandle : "ANJUNA BEACH • 15.5869° N", size - 60, size - 96);

  targetCtx.font = "500 14px 'Space Mono', monospace";
  targetCtx.fillStyle = theme.colors.secondaryAccent;
  targetCtx.fillText("OCTOBER 2026", size - 60, size - 72);

  targetCtx.restore();
}

export function renderBuilderCard(
  targetCanvas: HTMLCanvasElement,
  targetCtx: CanvasRenderingContext2D,
  state: GeneratorState
) {
  const width = targetCanvas.width;
  const height = targetCanvas.height;

  const theme = THEMES[state.theme] || THEMES.signal;
  const isDark = theme.isDark;

  // 1. Background
  targetCtx.fillStyle = theme.colors.bg;
  targetCtx.fillRect(0, 0, width, height);

  // 2. Card Container Outer Border
  targetCtx.strokeStyle = theme.colors.border;
  targetCtx.lineWidth = 4;
  roundRect(targetCtx, 40, 40, width - 80, height - 80, 36, false, true);

  // 3. Perforated Header Divider Line (y = 180) with circular notch cutouts
  targetCtx.save();
  targetCtx.strokeStyle = theme.colors.border;
  targetCtx.lineWidth = 3;
  targetCtx.setLineDash([14, 14]);
  targetCtx.beginPath();
  targetCtx.moveTo(40, 180);
  targetCtx.lineTo(width - 40, 180);
  targetCtx.stroke();

  // Notch cutouts
  targetCtx.fillStyle = theme.colors.bg;
  targetCtx.beginPath();
  targetCtx.arc(40, 180, 24, 0, Math.PI * 2);
  targetCtx.arc(width - 40, 180, 24, 0, Math.PI * 2);
  targetCtx.fill();

  targetCtx.strokeStyle = theme.colors.secondaryAccent;
  targetCtx.lineWidth = 2;
  targetCtx.setLineDash([]);
  targetCtx.beginPath();
  targetCtx.arc(40, 180, 24, -Math.PI / 2, Math.PI / 2);
  targetCtx.arc(width - 40, 180, 24, Math.PI / 2, -Math.PI / 2);
  targetCtx.stroke();
  targetCtx.restore();

  // 4. Header: Devanagari Gold Linework + English Wordmark
  drawDevanagariGoaMark(targetCtx, 80, 120, theme.colors.secondaryAccent, 0.85);

  targetCtx.font = "900 38px 'Plus Jakarta Sans', sans-serif";
  targetCtx.fillStyle = theme.colors.text;
  targetCtx.fillText("HH GOA 2026", 215, 115);

  targetCtx.font = "bold 14px 'Space Mono', monospace";
  targetCtx.fillStyle = theme.colors.accentGlow || theme.colors.secondaryAccent;
  targetCtx.fillText("OFFICIAL BUILDER PASS", 215, 138);

  const badgeId = `#GOA-${state.builderId.split("-").pop() || "2026"}`;
  targetCtx.font = "bold 24px 'Space Mono', monospace";
  targetCtx.fillStyle = theme.colors.secondaryAccent;
  targetCtx.textAlign = "end";
  targetCtx.fillText(badgeId, width - 80, 124);
  targetCtx.textAlign = "start";

  // 5. Photo Window with Transformed Photo & Rim Light
  const photoX = 80;
  const photoY = 230;
  const photoW = width - 160;
  const photoH = 610;

  targetCtx.save();
  roundRect(targetCtx, photoX, photoY, photoW, photoH, 28, false, false);
  targetCtx.clip();

  if (state.photoImg) {
    applyPhotoFilter(targetCtx, state.filter);

    const imgW = state.photoImg.width;
    const imgH = state.photoImg.height;
    const scale = Math.max(photoW / imgW, photoH / imgH) * state.zoom;

    const drawW = imgW * scale;
    const drawH = imgH * scale;

    const drawX = photoX + photoW / 2 - drawW / 2 + state.panX;
    const drawY = photoY + photoH / 2 - drawH / 2 + state.panY;

    targetCtx.drawImage(state.photoImg, drawX, drawY, drawW, drawH);
  } else {
    drawDefaultAvatar(targetCtx, photoX, photoY, photoW, photoH, isDark);
  }
  targetCtx.restore();

  // Photo border rim light
  const photoRim = targetCtx.createLinearGradient(photoX, photoY, photoX + photoW, photoY + photoH);
  photoRim.addColorStop(0, theme.colors.secondaryAccent);
  photoRim.addColorStop(0.5, theme.colors.accent);
  photoRim.addColorStop(1, theme.colors.accentGlow || theme.colors.secondaryAccent);

  targetCtx.strokeStyle = photoRim;
  targetCtx.lineWidth = 6;
  roundRect(targetCtx, photoX, photoY, photoW, photoH, 28, false, true);

  // 6. Perforated Bottom Divider Line (y = 890)
  targetCtx.save();
  targetCtx.strokeStyle = theme.colors.border;
  targetCtx.lineWidth = 3;
  targetCtx.setLineDash([14, 14]);
  targetCtx.beginPath();
  targetCtx.moveTo(40, 890);
  targetCtx.lineTo(width - 40, 890);
  targetCtx.stroke();

  targetCtx.fillStyle = theme.colors.bg;
  targetCtx.beginPath();
  targetCtx.arc(40, 890, 24, 0, Math.PI * 2);
  targetCtx.arc(width - 40, 890, 24, 0, Math.PI * 2);
  targetCtx.fill();

  targetCtx.strokeStyle = theme.colors.secondaryAccent;
  targetCtx.lineWidth = 2;
  targetCtx.setLineDash([]);
  targetCtx.beginPath();
  targetCtx.arc(40, 890, 24, -Math.PI / 2, Math.PI / 2);
  targetCtx.arc(width - 40, 890, 24, Math.PI / 2, -Math.PI / 2);
  targetCtx.stroke();
  targetCtx.restore();

  // 7. Builder Details Section
  const displayName = state.userName && state.userName.trim() ? state.userName.trim() : "GOA BUILDER";
  const displayTitleText = state.builderTitle && state.builderTitle.trim() ? state.builderTitle.trim() : "GOA BUILDER";
  const displayStack =
    state.stackLocation && state.stackLocation.trim()
      ? state.stackLocation.trim()
      : state.selectedBadges.length > 0
      ? state.selectedBadges.join(" • ")
      : "GOA BUILDER";

  // BUILDER NAME
  targetCtx.font = "bold 16px 'Space Mono', monospace";
  targetCtx.fillStyle = theme.colors.secondaryAccent;
  targetCtx.fillText("BUILDER NAME", 80, 950);

  drawFittedText(
    targetCtx,
    displayName.toUpperCase(),
    80,
    1000,
    width - 440,
    46,
    22,
    '"Plus Jakarta Sans", sans-serif',
    theme.colors.text,
    "left",
    "900"
  );

  // X Handle if provided
  if (state.xHandle && state.xHandle.trim()) {
    targetCtx.font = "bold 18px 'Space Mono', monospace";
    targetCtx.fillStyle = theme.colors.accentGlow || theme.colors.secondaryAccent;
    targetCtx.fillText(state.xHandle.trim(), 80, 1030);
  }

  // TITLE / ROLE
  const fullTitle = `${displayTitleText} • ${state.role}`;
  targetCtx.font = "bold 15px 'Space Mono', monospace";
  targetCtx.fillStyle = theme.colors.textSecondary || theme.colors.text;
  targetCtx.fillText("TITLE / ROLE", 80, 1070);

  drawFittedText(
    targetCtx,
    fullTitle.toUpperCase(),
    80,
    1105,
    width - 440,
    28,
    15,
    '"Space Mono", monospace',
    theme.colors.accentGlow || theme.colors.secondaryAccent,
    "left",
    "800"
  );

  // STACK & LOCATION
  targetCtx.font = "bold 15px 'Space Mono', monospace";
  targetCtx.fillStyle = theme.colors.textSecondary || theme.colors.text;
  targetCtx.fillText("STACK & LOCATION", 80, 1160);

  const locationLine = `ANJUNA BEACH • ${displayStack}`;
  drawFittedText(
    targetCtx,
    locationLine.toUpperCase(),
    80,
    1195,
    width - 440,
    20,
    12,
    '"Plus Jakarta Sans", sans-serif',
    theme.colors.text,
    "left",
    "600"
  );

  // 8. Barcode Rendering on Bottom Right
  drawBarcode(targetCtx, width - 320, 1110, 75, "HH-GOA-2026", theme);
}
