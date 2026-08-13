'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

// ─────────────────────────────────────────────────────────────
// TYPES & CONSTANTS
// ─────────────────────────────────────────────────────────────

interface ThemeColors {
  bg: string;
  cardBg: string;
  text: string;
  textSecondary: string;
  accent: string;
  accentGlow: string;
  secondaryAccent: string;
  border: string;
  focus: string;
  rimLight: string;
  stepperActive: string;
}

interface Theme {
  id: string;
  name: string;
  subtitle: string;
  isDark: boolean;
  colors: ThemeColors;
}

const THEMES: Record<string, Theme> = {
  signal: {
    id: 'signal', name: 'Signal', subtitle: 'HH Goa Official Identity', isDark: true,
    colors: { bg: '#013D22', cardBg: 'rgba(1, 45, 25, 0.95)', text: '#FFFFFF', textSecondary: '#FFC233',
      accent: '#00874E', accentGlow: '#7CFF6B', secondaryAccent: '#FFC233',
      border: 'rgba(255, 194, 51, 0.7)', focus: '#7CFF6B', rimLight: '#FFC233', stepperActive: '#7CFF6B' }
  },
  terminal: {
    id: 'terminal', name: 'Terminal Midnight', subtitle: 'Developer Hacker Culture', isDark: true,
    colors: { bg: '#080C0A', cardBg: 'rgba(10, 16, 12, 0.9)', text: '#7CFF6B', textSecondary: 'rgba(124, 255, 107, 0.7)',
      accent: '#00FF66', accentGlow: '#00FF66', secondaryAccent: '#33FF99',
      border: 'rgba(0, 255, 102, 0.4)', focus: '#00FF66', rimLight: '#00FF66', stepperActive: '#00FF66' }
  },
  monsoon: {
    id: 'monsoon', name: 'Monsoon Neon', subtitle: 'Anjuna Night Rain', isDark: true,
    colors: { bg: '#0E0B16', cardBg: 'rgba(22, 17, 36, 0.85)', text: '#E2F1FF', textSecondary: 'rgba(226, 241, 255, 0.7)',
      accent: '#00E5FF', accentGlow: '#FF007A', secondaryAccent: '#FF007A',
      border: 'rgba(0, 229, 255, 0.4)', focus: '#00E5FF', rimLight: '#FF007A', stepperActive: '#00E5FF' }
  },
  vintage: {
    id: 'vintage', name: 'Vintage Boarding', subtitle: 'Retro Goan Stamp', isDark: false,
    colors: { bg: '#F4EFE6', cardBg: 'rgba(255, 252, 247, 0.95)', text: '#2C1810', textSecondary: 'rgba(44, 24, 16, 0.8)',
      accent: '#A83220', accentGlow: '#801B0E', secondaryAccent: '#B45309',
      border: 'rgba(168, 50, 32, 0.45)', focus: '#A83220', rimLight: '#D4AF37', stepperActive: '#A83220' }
  },
  sakura: {
    id: 'sakura', name: 'Sakura Drift', subtitle: 'Sunrise Blossom', isDark: false,
    colors: { bg: '#FDF2F4', cardBg: 'rgba(255, 245, 247, 0.95)', text: '#4A2E35', textSecondary: 'rgba(74, 46, 53, 0.8)',
      accent: '#E86A92', accentGlow: '#C92A54', secondaryAccent: '#D97706',
      border: 'rgba(201, 42, 84, 0.45)', focus: '#E86A92', rimLight: '#F7B267', stepperActive: '#C92A54' }
  },
  synthwave: {
    id: 'synthwave', name: 'Synthwave Tide', subtitle: '80s Anjuna Cyber-Beach', isDark: true,
    colors: { bg: '#120024', cardBg: 'rgba(30, 5, 55, 0.9)', text: '#FF77A9', textSecondary: 'rgba(255, 119, 169, 0.75)',
      accent: '#00F0FF', accentGlow: '#FF0055', secondaryAccent: '#FFE600',
      border: 'rgba(255, 0, 85, 0.5)', focus: '#00F0FF', rimLight: '#00F0FF', stepperActive: '#FF0055' }
  }
};

const TITLE_PREFIXES = ['ARAMBOL', 'ANJUNA', 'VAGATOR', 'PALOLEM', 'MORJIM', 'SHIRODA', 'CHAPORA', 'CALANGUTE'];
const TITLE_SUFFIXES = ['ARCHITECT', 'SHAMAN', 'VALIDATOR', 'KERNEL', 'ALCHEMIST', 'ENGINEER', 'CYPHERPUNK', 'SOLVER'];
const PRESET_TECHS = ['Next.js', 'Solana', 'Rust', 'AI / ML', 'TypeScript', 'Python', 'Tailwind', 'Move', 'Wasm'];

function generateClientSideTitle(name: string, stack: string) {
  const seed = (name + stack).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return `${TITLE_PREFIXES[seed % TITLE_PREFIXES.length]} ${TITLE_SUFFIXES[(seed + 3) % TITLE_SUFFIXES.length]}`;
}

function generateRandomId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 4; i++) code += chars.charAt(Math.floor(Math.random() * chars.length));
  return `HHG26-${Math.floor(1000 + Math.random() * 9000)}-${code}`;
}

// ─────────────────────────────────────────────────────────────
// CANVAS HELPERS
// ─────────────────────────────────────────────────────────────

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number, fill: boolean, stroke: boolean) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
  if (fill) ctx.fill();
  if (stroke) ctx.stroke();
}

function drawFittedText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, maxFont: number, minFont: number, family: string, color: string, align: CanvasTextAlign = 'left', weight = '900') {
  ctx.save();
  ctx.fillStyle = color;
  ctx.textAlign = align;
  let fontSize = maxFont;
  ctx.font = `${weight} ${fontSize}px ${family}`;
  while (ctx.measureText(text).width > maxWidth && fontSize > minFont) {
    fontSize -= 1;
    ctx.font = `${weight} ${fontSize}px ${family}`;
  }
  ctx.fillText(text, x, y);
  ctx.restore();
}

function drawBarcode(ctx: CanvasRenderingContext2D, x: number, y: number, height: number, code: string, theme: Theme) {
  ctx.save();
  ctx.fillStyle = theme.colors.text || '#FFFFFF';
  let currentX = x;
  const pattern = [4, 2, 8, 3, 10, 2, 6, 4, 12, 3, 5, 2, 8, 4, 14, 2, 6, 4, 10];
  for (let i = 0; i < pattern.length; i++) {
    const w = pattern[i];
    if (i % 2 === 0) ctx.fillRect(currentX, y, w, height);
    currentX += w + 3;
  }
  ctx.font = "bold 16px 'Space Mono', monospace";
  ctx.fillStyle = theme.colors.accentGlow || theme.colors.secondaryAccent;
  ctx.textAlign = 'center';
  ctx.fillText(code, x + (currentX - x) / 2, y + height + 24);
  ctx.restore();
}

function drawDevanagariGoaMark(ctx: CanvasRenderingContext2D, x: number, y: number, color = '#FFC24B', scale = 1) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 3.5;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  ctx.beginPath(); ctx.moveTo(4, 0); ctx.lineTo(120, 0); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(18, 0); ctx.lineTo(18, 22); ctx.arc(14, 22, 4, 0, Math.PI, false); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(34, 0); ctx.lineTo(34, 38); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(50, 0); ctx.lineTo(50, 38); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(50, 0); ctx.quadraticCurveTo(42, -14, 28, -12); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(85, 0); ctx.lineTo(85, 38); ctx.stroke();
  ctx.beginPath(); ctx.arc(73, 20, 12, 0, Math.PI * 2); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(105, 0); ctx.lineTo(105, 38); ctx.stroke();
  ctx.restore();
}

function drawPalmMotif(ctx: CanvasRenderingContext2D, x: number, y: number, scale = 1, flipX = false, color = '#026834') {
  ctx.save();
  ctx.translate(x, y);
  if (flipX) ctx.scale(-1, 1);
  ctx.scale(scale, scale);
  ctx.strokeStyle = color;
  ctx.lineWidth = 3.5;
  ctx.beginPath(); ctx.quadraticCurveTo(20, -30, 40, -60); ctx.stroke();
  const fronds: [number, number][] = [[10, -15], [20, -30], [30, -45], [38, -55]];
  fronds.forEach(([fx, fy]) => {
    ctx.beginPath(); ctx.quadraticCurveTo(fx + 20, fy - 8, fx + 32, fy + 10); ctx.stroke();
    ctx.beginPath(); ctx.quadraticCurveTo(fx - 20, fy - 8, fx - 32, fy + 10); ctx.stroke();
  });
  ctx.restore();
}

function drawDefaultAvatar(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, isDark: boolean) {
  ctx.save();
  ctx.fillStyle = isDark ? '#1D2A22' : '#E2E8F0';
  ctx.fillRect(x, y, w, h);
  const cx = x + w / 2;
  const cy = y + h / 2;
  const iconColor = isDark ? '#3E5045' : '#94A3B8';
  ctx.fillStyle = iconColor;
  const headRadius = Math.min(w, h) * 0.18;
  ctx.beginPath(); ctx.arc(cx, cy - headRadius * 0.5, headRadius, 0, Math.PI * 2); ctx.fill();
  const shoulderRadius = Math.min(w, h) * 0.32;
  ctx.beginPath(); ctx.arc(cx, cy + shoulderRadius * 1.35, shoulderRadius, Math.PI, 0, false); ctx.fill();
  ctx.restore();
}

// ─────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isPreloading, setIsPreloading] = useState(true);
  const [format, setFormat] = useState<'pfp' | 'builder'>('pfp');
  const [photoImg, setPhotoImg] = useState<HTMLImageElement | null>(null);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const [zoom, setZoom] = useState(1.0);
  const [filter, setFilter] = useState('none');
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [userName, setUserName] = useState('');
  const [xHandle, setXHandle] = useState('');
  const [selectedBadges, setSelectedBadges] = useState(['Next.js', 'Solana', 'Rust', 'TypeScript', 'Tailwind']);
  const [role, setRole] = useState('FULLSTACK DEVELOPER');
  const [builderTitle, setBuilderTitle] = useState('');
  const [stackLocation, setStackLocation] = useState('');
  const [perks, setPerks] = useState(['HIGH-SPEED FIBER', '24/7 CAFFEINE', 'OCEAN BREEZE', 'RED BULL & BITES']);
  const [theme, setTheme] = useState('signal');
  const [soundMuted, setSoundMuted] = useState(false);
  const [builderId] = useState(generateRandomId);
  const [hypeModalOpen, setHypeModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [customSkillVal, setCustomSkillVal] = useState('');
  const [customSkills, setCustomSkills] = useState<string[]>([]);
  const [preloaderProgress, setPreloaderProgress] = useState(0);

  const formCanvasRef = useRef<HTMLCanvasElement>(null);
  const showcaseCanvasRef = useRef<HTMLCanvasElement>(null);
  const halftoneCanvasRef = useRef<HTMLCanvasElement>(null);
  const hypeVideoRef = useRef<HTMLVideoElement>(null);
  const canvas3dWrapperRef = useRef<HTMLDivElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const animTimeRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const isPreloadingRef = useRef(true);
  const bgImgRef = useRef<HTMLImageElement | null>(null);
  const stampImgRef = useRef<HTMLImageElement | null>(null);

  // Keep refs in sync for canvas rendering
  const stateRef = useRef({ panX: 0, panY: 0, zoom: 1.0, filter: 'none', photoImg: null as HTMLImageElement | null, format: 'pfp' as 'pfp' | 'builder', theme: 'signal', userName: '', xHandle: '', selectedBadges: ['Next.js', 'Solana', 'Rust', 'TypeScript', 'Tailwind'], role: 'FULLSTACK DEVELOPER', builderTitle: '', stackLocation: '', perks: ['HIGH-SPEED FIBER', '24/7 CAFFEINE', 'OCEAN BREEZE', 'RED BULL & BITES'], builderId: '' });

  useEffect(() => { stateRef.current.panX = panX; }, [panX]);
  useEffect(() => { stateRef.current.panY = panY; }, [panY]);
  useEffect(() => { stateRef.current.zoom = zoom; }, [zoom]);
  useEffect(() => { stateRef.current.filter = filter; }, [filter]);
  useEffect(() => { stateRef.current.photoImg = photoImg; }, [photoImg]);
  useEffect(() => { stateRef.current.format = format; }, [format]);
  useEffect(() => { stateRef.current.theme = theme; }, [theme]);
  useEffect(() => { stateRef.current.userName = userName; }, [userName]);
  useEffect(() => { stateRef.current.xHandle = xHandle; }, [xHandle]);
  useEffect(() => { stateRef.current.selectedBadges = selectedBadges; }, [selectedBadges]);
  useEffect(() => { stateRef.current.role = role; }, [role]);
  useEffect(() => { stateRef.current.builderTitle = builderTitle; }, [builderTitle]);
  useEffect(() => { stateRef.current.stackLocation = stackLocation; }, [stackLocation]);
  useEffect(() => { stateRef.current.perks = perks; }, [perks]);
  useEffect(() => { stateRef.current.builderId = builderId; }, [builderId]);

  // ─── AUDIO ───
  function initAudio() {
    if (!audioCtxRef.current) {
      const AC = (window as typeof window & { webkitAudioContext?: typeof AudioContext }).AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (AC) audioCtxRef.current = new AC();
    }
    if (audioCtxRef.current?.state === 'suspended') audioCtxRef.current.resume();
  }

  const playClickSound = useCallback(() => {
    if (soundMuted) return;
    initAudio();
    const ctx = audioCtxRef.current;
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.05);
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start(); osc.stop(ctx.currentTime + 0.05);
  }, [soundMuted]);

  const playSweepSound = useCallback(() => {
    if (soundMuted) return;
    initAudio();
    const ctx = audioCtxRef.current;
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(300, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start(); osc.stop(ctx.currentTime + 0.15);
  }, [soundMuted]);

  const playFanfareSound = useCallback(() => {
    if (soundMuted) return;
    initAudio();
    const ctx = audioCtxRef.current;
    if (!ctx) return;
    [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      const startTime = ctx.currentTime + idx * 0.08;
      gain.gain.setValueAtTime(0.2, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.3);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(startTime); osc.stop(startTime + 0.3);
    });
  }, [soundMuted]);

  // ─── PRELOADER ───
  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 3 + 1.5;
      if (progress > 100) progress = 100;
      setPreloaderProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          isPreloadingRef.current = false;
          setIsPreloading(false);
        }, 1200);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // ─── HALFTONE SHADER ───
  useEffect(() => {
    const canvas = halftoneCanvasRef.current;
    if (!canvas) return;
    const hCtx = canvas.getContext('2d');
    if (!hCtx) return;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function renderHalftone() {
      if (!isPreloadingRef.current || !hCtx || !canvas) return;
      animTimeRef.current += 0.015;
      const w = canvas.width;
      const h = canvas.height;

      hCtx.clearRect(0, 0, w, h);

      drawPalmMotif(hCtx, 90, h * 0.28, 1.4, false);
      drawPalmMotif(hCtx, 160, h * 0.55, 1.1, false);
      drawPalmMotif(hCtx, w - 90, h * 0.28, 1.4, true);
      drawPalmMotif(hCtx, w - 160, h * 0.55, 1.1, true);

      rafRef.current = requestAnimationFrame(renderHalftone);
    }

    rafRef.current = requestAnimationFrame(renderHalftone);
    return () => {
      window.removeEventListener('resize', resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // ─── ASSETS ───
  useEffect(() => {
    const bg = new Image(); bg.src = '/assets/badge_bg.png';
    const stamp = new Image(); stamp.src = '/assets/logo_stamp.png';
    bgImgRef.current = bg;
    stampImgRef.current = stamp;
    bg.onload = () => renderAllCanvases();
    stamp.onload = () => renderAllCanvases();
  }, []);

  // ─── THEME CSS VARIABLES ───
  useEffect(() => {
    const t = THEMES[theme] || THEMES.signal;
    const isDark = t.isDark;
    const root = document.documentElement;
    root.style.setProperty('--theme-bg', t.colors.bg);
    root.style.setProperty('--theme-card-bg', t.colors.cardBg);
    root.style.setProperty('--theme-text', isDark ? (t.colors.text || '#E8F3EC') : '#1A0C06');
    root.style.setProperty('--theme-text-muted', isDark ? (t.colors.textSecondary || 'rgba(232, 243, 236, 0.75)') : '#4A3428');
    root.style.setProperty('--theme-input-bg', isDark ? 'rgba(0,0,0,0.45)' : 'rgba(255,255,255,0.95)');
    root.style.setProperty('--theme-input-text', isDark ? (t.colors.text || '#E8F3EC') : '#1A0C06');
    root.style.setProperty('--theme-accent', t.colors.accent);
    root.style.setProperty('--theme-accent-glow', t.colors.accentGlow);
    root.style.setProperty('--theme-secondary-accent', t.colors.secondaryAccent || t.colors.accentGlow);
    root.style.setProperty('--theme-border', t.colors.border);
    root.style.setProperty('--theme-subpanel-bg', isDark ? 'rgba(0,0,0,0.35)' : 'rgba(255,255,255,0.75)');
    root.style.setProperty('--theme-badge-bg', isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.07)');
    root.style.setProperty('--theme-accent-text', t.isDark ? '#000000' : '#FFFFFF');
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  // ─── CANVAS RENDERING ───
  const applyPhotoFilter = (ctx: CanvasRenderingContext2D, f: string) => {
    if (f === 'warm') ctx.filter = 'sepia(0.35) contrast(1.1) brightness(1.05) saturate(1.3)';
    else if (f === 'cyber') ctx.filter = 'hue-rotate(140deg) saturate(1.4) contrast(1.1)';
    else if (f === 'bw') ctx.filter = 'grayscale(1) contrast(1.3) brightness(0.95)';
    else ctx.filter = 'none';
  };

  const renderPfpFrame = useCallback((canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    const s = stateRef.current;
    const size = canvas.width;
    const th = THEMES[s.theme] || THEMES.signal;
    const isDark = th.isDark;

    ctx.fillStyle = th.colors.bg;
    ctx.fillRect(0, 0, size, size);

    const cx = size / 2;
    const cy = size / 2 - 40;
    const radius = 340;

    ctx.save();
    ctx.beginPath(); ctx.arc(cx, cy, radius, 0, Math.PI * 2); ctx.closePath(); ctx.clip();
    if (s.photoImg) {
      applyPhotoFilter(ctx, s.filter);
      const iw = s.photoImg.width, ih = s.photoImg.height;
      const sc = Math.max((radius * 2) / iw, (radius * 2) / ih) * s.zoom;
      ctx.drawImage(s.photoImg, cx - iw * sc / 2 + s.panX, cy - ih * sc / 2 + s.panY, iw * sc, ih * sc);
    } else {
      drawDefaultAvatar(ctx, cx - radius, cy - radius, radius * 2, radius * 2, isDark);
    }
    ctx.restore();

    ctx.save();
    const waveGrad = ctx.createLinearGradient(0, size - 280, 0, size);
    waveGrad.addColorStop(0, 'rgba(0,0,0,0)');
    waveGrad.addColorStop(0.45, th.colors.bg);
    waveGrad.addColorStop(1, th.colors.bg);
    ctx.fillStyle = waveGrad;
    ctx.fillRect(0, size - 320, size, 320);

    const rimGrad = ctx.createLinearGradient(0, 0, size, size);
    rimGrad.addColorStop(0, th.colors.accent);
    rimGrad.addColorStop(0.5, th.colors.secondaryAccent);
    rimGrad.addColorStop(1, th.colors.accentGlow || th.colors.secondaryAccent);
    ctx.strokeStyle = rimGrad; ctx.lineWidth = 16;
    roundRect(ctx, 24, 24, size - 48, size - 48, 36, false, true);

    ctx.lineWidth = 8; ctx.strokeStyle = th.colors.secondaryAccent;
    ctx.beginPath(); ctx.arc(cx, cy, radius + 6, 0, Math.PI * 2); ctx.stroke();

    drawDevanagariGoaMark(ctx, 60, size - 130, th.colors.secondaryAccent, 0.95);

    ctx.font = "900 36px 'Plus Jakarta Sans', sans-serif";
    ctx.fillStyle = th.colors.text; ctx.textAlign = 'left';
    ctx.fillText('HH GOA 2026', 210, size - 100);

    ctx.font = "bold 16px 'Space Mono', monospace";
    ctx.fillStyle = th.colors.accentGlow || th.colors.secondaryAccent;
    ctx.fillText('LESS NOISE. MORE SIGNAL.', 210, size - 72);

    ctx.font = "600 18px 'Space Mono', monospace";
    ctx.fillStyle = th.colors.text; ctx.textAlign = 'right';
    ctx.fillText(s.xHandle ? s.xHandle : 'ANJUNA BEACH • 15.5869° N', size - 60, size - 96);

    ctx.font = "500 14px 'Space Mono', monospace";
    ctx.fillStyle = th.colors.secondaryAccent;
    ctx.fillText('OCTOBER 2026', size - 60, size - 72);
    ctx.restore();
  }, []);

  const renderBuilderCard = useCallback((canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    const s = stateRef.current;
    const width = canvas.width;
    const height = canvas.height;
    const th = THEMES[s.theme] || THEMES.signal;
    const isDark = th.isDark;

    ctx.fillStyle = th.colors.bg; ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = th.colors.border; ctx.lineWidth = 4;
    roundRect(ctx, 40, 40, width - 80, height - 80, 36, false, true);

    // Top perforated divider
    ctx.save();
    ctx.strokeStyle = th.colors.border; ctx.lineWidth = 3; ctx.setLineDash([14, 14]);
    ctx.beginPath(); ctx.moveTo(40, 180); ctx.lineTo(width - 40, 180); ctx.stroke();
    ctx.fillStyle = th.colors.bg;
    ctx.beginPath(); ctx.arc(40, 180, 24, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(width - 40, 180, 24, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = th.colors.secondaryAccent; ctx.lineWidth = 2; ctx.setLineDash([]);
    ctx.beginPath(); ctx.arc(40, 180, 24, -Math.PI / 2, Math.PI / 2); ctx.stroke();
    ctx.beginPath(); ctx.arc(width - 40, 180, 24, Math.PI / 2, -Math.PI / 2); ctx.stroke();
    ctx.restore();

    // Header
    drawDevanagariGoaMark(ctx, 80, 120, th.colors.secondaryAccent, 0.85);
    ctx.font = "900 38px 'Plus Jakarta Sans', sans-serif";
    ctx.fillStyle = th.colors.text; ctx.textAlign = 'start';
    ctx.fillText('HH GOA 2026', 215, 115);
    ctx.font = "bold 14px 'Space Mono', monospace";
    ctx.fillStyle = th.colors.accentGlow || th.colors.secondaryAccent;
    ctx.fillText('OFFICIAL BUILDER PASS', 215, 138);

    const badgeId = `#GOA-${s.builderId.split('-').pop() || '2026'}`;
    ctx.font = "bold 24px 'Space Mono', monospace";
    ctx.fillStyle = th.colors.secondaryAccent; ctx.textAlign = 'end';
    ctx.fillText(badgeId, width - 80, 124); ctx.textAlign = 'start';

    // Photo
    const photoX = 80, photoY = 230, photoW = width - 160, photoH = 610;
    ctx.save();
    roundRect(ctx, photoX, photoY, photoW, photoH, 28, false, false); ctx.clip();
    if (s.photoImg) {
      applyPhotoFilter(ctx, s.filter);
      const iw = s.photoImg.width, ih = s.photoImg.height;
      const sc = Math.max(photoW / iw, photoH / ih) * s.zoom;
      ctx.drawImage(s.photoImg, photoX + photoW / 2 - iw * sc / 2 + s.panX, photoY + photoH / 2 - ih * sc / 2 + s.panY, iw * sc, ih * sc);
    } else {
      drawDefaultAvatar(ctx, photoX, photoY, photoW, photoH, isDark);
    }
    ctx.restore();

    const photoRim = ctx.createLinearGradient(photoX, photoY, photoX + photoW, photoY + photoH);
    photoRim.addColorStop(0, th.colors.secondaryAccent);
    photoRim.addColorStop(0.5, th.colors.accent);
    photoRim.addColorStop(1, th.colors.accentGlow || th.colors.secondaryAccent);
    ctx.strokeStyle = photoRim; ctx.lineWidth = 6;
    roundRect(ctx, photoX, photoY, photoW, photoH, 28, false, true);

    // Bottom perforated divider
    ctx.save();
    ctx.strokeStyle = th.colors.border; ctx.lineWidth = 3; ctx.setLineDash([14, 14]);
    ctx.beginPath(); ctx.moveTo(40, 890); ctx.lineTo(width - 40, 890); ctx.stroke();
    ctx.fillStyle = th.colors.bg;
    ctx.beginPath(); ctx.arc(40, 890, 24, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(width - 40, 890, 24, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = th.colors.secondaryAccent; ctx.lineWidth = 2; ctx.setLineDash([]);
    ctx.beginPath(); ctx.arc(40, 890, 24, -Math.PI / 2, Math.PI / 2); ctx.stroke();
    ctx.beginPath(); ctx.arc(width - 40, 890, 24, Math.PI / 2, -Math.PI / 2); ctx.stroke();
    ctx.restore();

    // Builder details
    const displayName = (s.userName && s.userName.trim()) ? s.userName.trim() : 'GOA BUILDER';
    const displayTitleText = (s.builderTitle && s.builderTitle.trim()) ? s.builderTitle.trim() : 'GOA BUILDER';
    const displayStack = (s.stackLocation && s.stackLocation.trim()) ? s.stackLocation.trim() : (s.selectedBadges.length > 0 ? s.selectedBadges.join(' • ') : 'GOA BUILDER');

    ctx.font = "bold 16px 'Space Mono', monospace";
    ctx.fillStyle = th.colors.secondaryAccent; ctx.textAlign = 'start';
    ctx.fillText('BUILDER NAME', 80, 950);
    drawFittedText(ctx, displayName.toUpperCase(), 80, 1000, width - 440, 46, 22, '"Plus Jakarta Sans", sans-serif', th.colors.text, 'left', '900');

    if (s.xHandle && s.xHandle.trim()) {
      ctx.font = "bold 18px 'Space Mono', monospace";
      ctx.fillStyle = th.colors.accentGlow || th.colors.secondaryAccent;
      ctx.fillText(s.xHandle.trim(), 80, 1030);
    }

    const fullTitle = `${displayTitleText} • ${s.role}`;
    ctx.font = "bold 15px 'Space Mono', monospace";
    ctx.fillStyle = th.colors.textSecondary || th.colors.text;
    ctx.fillText('TITLE / ROLE', 80, 1070);
    drawFittedText(ctx, fullTitle.toUpperCase(), 80, 1105, width - 440, 28, 15, '"Space Mono", monospace', th.colors.accentGlow || th.colors.secondaryAccent, 'left', '800');

    ctx.font = "bold 15px 'Space Mono', monospace";
    ctx.fillStyle = th.colors.textSecondary || th.colors.text;
    ctx.fillText('STACK & LOCATION', 80, 1160);
    drawFittedText(ctx, `ANJUNA BEACH • ${displayStack}`.toUpperCase(), 80, 1195, width - 440, 20, 12, '"Plus Jakarta Sans", sans-serif', th.colors.text, 'left', '600');

    drawBarcode(ctx, width - 320, 1110, 75, 'HH-GOA-2026', th);
  }, []);

  const renderAllCanvases = useCallback(() => {
    const s = stateRef.current;
    [formCanvasRef.current, showcaseCanvasRef.current].forEach((c) => {
      if (!c) return;
      c.width = 1024;
      c.height = s.format === 'pfp' ? 1024 : 1280;
      const ctx = c.getContext('2d');
      if (!ctx) return;
      if (s.format === 'pfp') renderPfpFrame(c, ctx);
      else renderBuilderCard(c, ctx);
    });
  }, [renderPfpFrame, renderBuilderCard]);

  // Re-render whenever key state changes
  useEffect(() => { renderAllCanvases(); }, [format, photoImg, panX, panY, zoom, filter, theme, userName, xHandle, selectedBadges, role, builderTitle, stackLocation, perks, renderAllCanvases]);

  // ─── CONFETTI ───
  const launchConfetti = useCallback(() => {
    const canvas = showcaseCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const particles: { x: number; y: number; vx: number; vy: number; color: string; size: number; life: number }[] = [];
    const colors = ['#FEE101', '#FF007A', '#00F0FF', '#FFFFFF', '#026834'];
    for (let i = 0; i < 90; i++) {
      particles.push({ x: canvas.width / 2, y: canvas.height / 2, vx: (Math.random() - 0.5) * 26, vy: (Math.random() - 0.7) * 26, color: colors[Math.floor(Math.random() * colors.length)], size: Math.random() * 14 + 6, life: 1 });
    }
    function animate() {
      if (!canvas || !ctx) return;
      const s = stateRef.current;
      canvas.width = 1024; canvas.height = s.format === 'pfp' ? 1024 : 1280;
      if (s.format === 'pfp') renderPfpFrame(canvas, ctx); else renderBuilderCard(canvas, ctx);
      let active = false;
      particles.forEach((p) => {
        if (p.life <= 0) return;
        active = true; p.x += p.vx; p.y += p.vy; p.vy += 0.45; p.life -= 0.02;
        ctx.save(); ctx.fillStyle = p.color; ctx.globalAlpha = Math.max(p.life, 0);
        ctx.fillRect(p.x, p.y, p.size, p.size); ctx.restore();
      });
      if (active) requestAnimationFrame(animate);
    }
    animate();
  }, [renderPfpFrame, renderBuilderCard]);

  // ─── 3D TILT ───
  useEffect(() => {
    const wrapper = canvas3dWrapperRef.current;
    if (!wrapper) return;
    const onMove = (e: MouseEvent) => {
      const rect = wrapper.getBoundingClientRect();
      const x = e.clientX - rect.left, y = e.clientY - rect.top;
      const cx = rect.width / 2, cy = rect.height / 2;
      wrapper.style.transform = `rotateX(${((y - cy) / cy) * -12}deg) rotateY(${((x - cx) / cx) * 12}deg) scale3d(1.02,1.02,1.02)`;
    };
    const onLeave = () => { wrapper.style.transform = 'rotateX(0) rotateY(0) scale3d(1,1,1)'; };
    wrapper.addEventListener('mousemove', onMove);
    wrapper.addEventListener('mouseleave', onLeave);
    return () => { wrapper.removeEventListener('mousemove', onMove); wrapper.removeEventListener('mouseleave', onLeave); };
  }, [currentPage]);

  // ─── DRAG PHOTO (MOUSE & TOUCH FOR MOBILE) ───
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!isDragging) return;
      setPanX(e.clientX - dragStart.x);
      setPanY(e.clientY - dragStart.y);
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || !e.touches[0]) return;
      setPanX(e.touches[0].clientX - dragStart.x);
      setPanY(e.touches[0].clientY - dragStart.y);
    };
    const onEnd = () => setIsDragging(false);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onEnd);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onEnd);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onEnd);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onEnd);
    };
  }, [isDragging, dragStart]);

  // ─── HELPERS ───
  const updateStackLocation = useCallback((badges: string[], name: string) => {
    const stackStr = badges.join(' • ');
    const loc = `ANJUNA BEACH • ${stackStr}`.toUpperCase();
    setStackLocation(loc);
    const autoTitle = generateClientSideTitle(name || 'GOA', stackStr || 'BUILDER');
    setBuilderTitle(autoTitle);
  }, []);

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => { setPhotoImg(img); setPanX(0); setPanY(0); setZoom(1.0); };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const exportImage = () => {
    renderAllCanvases();
    const canvas = showcaseCanvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `HH-Goa-2026-${format.toUpperCase()}-Pass.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const goToPage = (page: number) => {
    playClickSound();
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (page === 3) { setTimeout(() => { playFanfareSound(); launchConfetti(); }, 100); }
  };

  const themeList = Object.values(THEMES);
  const themeSwatchDots: Record<string, string[]> = {
    signal: ['#00874E', '#FFC233', '#7CFF6B'],
    terminal: ['#080C0A', '#00FF66', '#33FF99'],
    monsoon: ['#0E0B16', '#FF007A', '#00E5FF'],
    vintage: ['#F4EFE6', '#A83220', '#D4AF37'],
    sakura: ['#FDF2F4', '#C92A54', '#F7B267'],
    synthwave: ['#120024', '#FF0055', '#00F0FF'],
  };

  // ─────────────────────────────────────────────────────────────
  // JSX
  // ─────────────────────────────────────────────────────────────

  return (
    <>
      {/* ── PRELOADER ── */}
      <div className={`preloader${!isPreloading ? ' hidden' : ''}`} id="preloader">
        <div className="preloader-goa-backdrop">
          <div className="poster-texture-overlay" />
          <svg width="100%" height="100%" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
            <rect width="1440" height="900" fill="#026834" />
            <g className="villa-group" transform="translate(420, 220)">
              <rect x="80" y="220" width="440" height="200" fill="#FFF8EB" stroke="#011b0e" strokeWidth="5" />
              <rect x="70" y="340" width="460" height="80" fill="#FFF8EB" stroke="#011b0e" strokeWidth="5" />
              <path d="M90,340 L90,420 M140,340 L140,420 M190,340 L190,420 M240,340 L240,420 M360,340 L360,420 M410,340 L410,420 M460,340 L460,420 M510,340 L510,420" stroke="#011b0e" strokeWidth="4" />
              <rect x="260" y="310" width="80" height="110" fill="#FF007A" stroke="#011b0e" strokeWidth="5" />
              <rect x="270" y="320" width="28" height="90" fill="#FEE101" stroke="#011b0e" strokeWidth="3" />
              <rect x="302" y="320" width="28" height="90" fill="#FEE101" stroke="#011b0e" strokeWidth="3" />
              <rect x="110" y="315" width="60" height="70" fill="#FF007A" stroke="#011b0e" strokeWidth="4" />
              <rect x="120" y="325" width="40" height="50" fill="#026834" stroke="#011b0e" strokeWidth="3" />
              <rect x="430" y="315" width="60" height="70" fill="#FEE101" stroke="#011b0e" strokeWidth="4" />
              <rect x="440" y="325" width="40" height="50" fill="#026834" stroke="#011b0e" strokeWidth="3" />
              <rect x="130" y="130" width="340" height="100" fill="#FFF8EB" stroke="#011b0e" strokeWidth="5" />
              <rect x="230" y="150" width="50" height="60" fill="#FF007A" stroke="#011b0e" strokeWidth="4" />
              <rect x="320" y="150" width="50" height="60" fill="#FEE101" stroke="#011b0e" strokeWidth="4" />
              <polygon points="40,230 100,160 500,160 560,230" fill="#D9531E" stroke="#011b0e" strokeWidth="6" />
              <path d="M60,210 L540,210 M80,190 L520,190 M100,175 L500,175" stroke="#011b0e" strokeWidth="3" />
              <polygon points="100,130 160,50 440,50 500,130" fill="#D9531E" stroke="#011b0e" strokeWidth="6" />
              <path d="M120,110 L480,110 M140,90 L460,90 M160,70 L440,70" stroke="#011b0e" strokeWidth="3" />
            </g>

            {/* Animated Goa Water Layer in Foreground (Positioned in front of the house) */}
            <g className="splash-water-group">
              <g className="splash-water-wave-1">
                <path d="M 0,585 Q 180,570 360,585 T 720,585 T 1080,585 T 1440,585 Q 1620,570 1800,585 T 2160,585 T 2520,585 T 2880,585 L 2880,900 L 0,900 Z" fill="#014D33" stroke="#011b0e" strokeWidth="4" />
              </g>
              <g className="splash-water-wave-2">
                <path d="M 0,608 Q 180,622 360,608 T 720,608 T 1080,608 T 1440,608 Q 1620,622 1800,608 T 2160,608 T 2520,608 T 2880,608 L 2880,900 L 0,900 Z" fill="#00796B" stroke="#011b0e" strokeWidth="4" />
              </g>
              <g className="splash-water-wave-3">
                <path d="M 0,630 Q 180,615 360,630 T 720,630 T 1080,630 T 1440,630 Q 1620,615 1800,630 T 2160,630 T 2520,630 T 2880,630 L 2880,900 L 0,900 Z" fill="#00A896" stroke="#011b0e" strokeWidth="4" />
              </g>
              <g className="splash-water-ripple">
                <path d="M 0,632 Q 180,617 360,632 T 720,632 T 1080,632 T 1440,632 Q 1620,617 1800,632 T 2160,632 T 2520,632 T 2880,632" fill="none" stroke="#FFF8EB" strokeWidth="3.5" opacity="0.7" strokeLinecap="round" />
                <path d="M 0,660 Q 240,648 480,660 T 960,660 T 1440,660 Q 1680,648 1920,660 T 2400,660 T 2880,660" fill="none" stroke="#E0F2F1" strokeWidth="2.5" opacity="0.5" strokeLinecap="round" />
              </g>
            </g>
            <g className="palm-left-group">
              <path d="M60,900 Q120,550 180,220" stroke="#011b0e" strokeWidth="26" fill="none" strokeLinecap="round" />
              <path d="M60,900 Q120,550 180,220" stroke="#D9531E" strokeWidth="16" fill="none" strokeLinecap="round" />
              <g stroke="#011b0e" strokeWidth="6" fill="#026834">
                <path d="M180,220 Q60,140 -40,200 Q40,260 180,220 Z" />
                <path d="M180,220 Q120,50 30,20 Q100,140 180,220 Z" />
                <path d="M180,220 Q260,60 340,110 Q260,160 180,220 Z" />
                <path d="M180,220 Q300,200 380,280 Q260,280 180,220 Z" />
              </g>
              <path d="M180,900 Q240,600 280,300" stroke="#011b0e" strokeWidth="22" fill="none" />
              <path d="M180,900 Q240,600 280,300" stroke="#D9531E" strokeWidth="12" fill="none" />
              <g stroke="#011b0e" strokeWidth="5" fill="#037a3f">
                <path d="M280,300 Q180,220 90,260 Q180,330 280,300 Z" />
                <path d="M280,300 Q240,150 170,120 Q220,220 280,300 Z" />
                <path d="M280,300 Q360,160 440,210 Q360,260 280,300 Z" />
              </g>
            </g>
            <g className="palm-right-group">
              <path d="M1380,900 Q1320,550 1260,220" stroke="#011b0e" strokeWidth="26" fill="none" strokeLinecap="round" />
              <path d="M1380,900 Q1320,550 1260,220" stroke="#D9531E" strokeWidth="16" fill="none" strokeLinecap="round" />
              <g stroke="#011b0e" strokeWidth="6" fill="#026834">
                <path d="M1260,220 Q1380,140 1480,200 Q1400,260 1260,220 Z" />
                <path d="M1260,220 Q1320,50 1410,20 Q1340,140 1260,220 Z" />
                <path d="M1260,220 Q1180,60 1100,110 Q1180,160 1260,220 Z" />
                <path d="M1260,220 Q1140,200 1060,280 Q1180,280 1260,220 Z" />
              </g>
              <path d="M1260,900 Q1200,600 1160,300" stroke="#011b0e" strokeWidth="22" fill="none" />
              <path d="M1260,900 Q1200,600 1160,300" stroke="#D9531E" strokeWidth="12" fill="none" />
              <g stroke="#011b0e" strokeWidth="5" fill="#037a3f">
                <path d="M1160,300 Q1260,220 1350,260 Q1260,330 1160,300 Z" />
                <path d="M1160,300 Q1200,150 1270,120 Q1220,220 1160,300 Z" />
                <path d="M1160,300 Q1080,160 1000,210 Q1080,260 1160,300 Z" />
              </g>
            </g>
          </svg>
        </div>
        <canvas ref={halftoneCanvasRef} id="halftoneCanvas" />
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '14px', padding: '0 20px' }}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <div className="preloader-title-main">HACKER HOUSE</div>
            <div className="preloader-stamp-overlay">गोवा</div>
          </div>
          <div className="preloader-track">
            <div className="preloader-bar" style={{ width: `${preloaderProgress}%` }} />
          </div>
        </div>
      </div>

      {/* ── VECTOR BACKDROP ── */}
      <div className="goa-vector-backdrop">
        <svg width="100%" height="100%" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <rect width="1440" height="900" fill="#026834" />
          <circle cx="720" cy="450" r="280" fill="#FEE101" opacity="0.28" />
          <circle cx="720" cy="450" r="160" fill="#FF007A" opacity="0.22" />
          <path d="M-100,500 Q200,410 500,490 Q800,420 1100,490 Q1300,430 1600,500 L1600,900 L-100,900 Z" fill="#012b15" />
          <path d="M-100,540 Q300,460 650,530 Q1000,460 1600,550 L1600,900 L-100,900 Z" fill="#014120" />
          <path className="wave-svg-path" d="M-100,580 Q180,550 450,580 Q720,540 1000,580 Q1280,550 1600,580 L1600,900 L-100,900 Z" fill="#02562b" />
          <path className="wave-svg-path" style={{ animationDelay: '-3s' }} d="M-100,620 Q250,590 550,625 Q850,590 1150,625 Q1350,595 1600,620 L1600,900 L-100,900 Z" fill="#026834" />
          <path d="M-100,670 Q350,640 720,675 Q1100,640 1600,670 L1600,900 L-100,900 Z" fill="#FFF8EB" opacity="0.12" />
        </svg>
        <div className="poster-texture-overlay" />
      </div>

      {/* ── HEADER ── */}
      <header className="app-header">
        <div className="header-container">
          <a href="#" className="studio-logo" onClick={(e) => { e.preventDefault(); playClickSound(); setCurrentPage(1); }}>
            <span>2:47PM STUDIO</span>
            <span className="studio-subtitle">HH GOA 2026</span>
          </a>

          <div className="wordmark-lockup">
            <div className="wordmark-row">
              <span className="wordmark-goa">HACKER HOUSE</span>
              <div className="wordmark-goa-wrapper">
                <div className="wordmark-sticker-badge">
                  <span className="wordmark-stamp-text">गोवा</span>
                </div>
                <span className="wordmark-goa">GOA</span>
              </div>
            </div>
            <div className="wordmark-wave-wrapper">
              <svg viewBox="0 0 300 24" fill="none" className="wordmark-wave-svg">
                <path d="M 0 12 Q 37.5 2, 75 12 T 150 12 T 225 12 T 300 12" stroke="var(--theme-accent-glow)" strokeWidth="3.5" strokeLinecap="round" className="wordmark-wave-path" />
              </svg>
            </div>
          </div>

          <div className="header-nav">
            <button className="icon-btn-toggle" onClick={() => { setSoundMuted(!soundMuted); }}>
              {soundMuted ? 'MUTED' : 'SOUND ON'}
            </button>
            <button className="nav-link" onClick={() => { playClickSound(); setHypeModalOpen(true); }}>CHECK HYPE</button>
          </div>
        </div>
      </header>

      {/* ── PAGE 1: LANDING ── */}
      <div id="page1" className={`page-view${currentPage === 1 ? ' active' : ''}`}>
        <div className="hero-landing-container">
          <div className="hero-title-wrapper">
            <h1 className="hero-giant-title">HACKER HOUSE</h1>
            <div className="hero-floating-stamp">गोवा</div>
          </div>
          <div className="hero-subbar">
            <span>GOA, INDIA · 28 – 31 OCT 2026</span>
            <span>2:47 PM STUDIO</span>
          </div>
          <div className="hero-cta-wrapper">
            <button className="pattern-border-btn hero-cta-btn" onClick={() => goToPage(2)}>
              BUILD YOUR PFP FRAME / CARD
            </button>
          </div>
        </div>
      </div>

      {/* ── PAGE 2: FORM ── */}
      <div id="page2" className={`page-view${currentPage === 2 ? ' active' : ''}`}>
        <div className="step-indicator-bar">
          <span className="step-node completed">1. WELCOME</span>
          <span>•</span>
          <span className="step-node active">2. CUSTOMIZE GRAPHIC</span>
          <span>•</span>
          <span className="step-node">3. YOUR PASS</span>
        </div>

        <nav className="format-tabs-container">
          <button className={`tab-btn${format === 'pfp' ? ' active' : ''}`} onClick={() => { playClickSound(); setFormat('pfp'); setPanX(0); setPanY(0); setZoom(1.0); }}>
            <span>FORMAT A: PFP FRAME</span>
            <span className="tab-badge">1:1 X/PFP</span>
          </button>
          <button className={`tab-btn${format === 'builder' ? ' active' : ''}`} onClick={() => { playClickSound(); setFormat('builder'); setPanX(0); setPanY(0); setZoom(1.0); }}>
            <span>FORMAT B: BUILDER ID CARD</span>
            <span className="tab-badge">SOCIAL PASS</span>
          </button>
        </nav>

        <div className="app-grid">
          {/* Left: Form Controls */}
          <section className="panel-card">
            <div className="panel-header">
              <h2 className="panel-title">Customize Details</h2>
              <span className="form-hint">Near-Instant Preview</span>
            </div>

            {/* Photo Upload */}
            <div className="form-group">
              <label className="form-label">
                <span>1. Upload Photo</span>
                <span className="form-hint">JPG, PNG, WEBP</span>
              </label>
              <div
                className="dropzone"
                onClick={() => document.getElementById('fileInput')?.click()}
                onDragOver={(e) => { e.preventDefault(); (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--color-pink)'; }}
                onDragLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--color-green)'; }}
                onDrop={(e) => { e.preventDefault(); (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--color-green)'; if (e.dataTransfer.files[0]) handleFileSelect(e.dataTransfer.files[0]); }}
              >
                <div style={{ fontWeight: 800, fontSize: '0.98rem', marginBottom: 4 }}>Click or Drag &amp; Drop Photo Here</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>Supports off-center photos &amp; auto-crops cleanly</div>
                <input type="file" id="fileInput" accept="image/*" style={{ display: 'none' }} onChange={(e) => { if (e.target.files?.[0]) handleFileSelect(e.target.files[0]); }} />
              </div>
            </div>

            {/* Zoom & Filter */}
            <div className="controls-card">
              <div className="form-label">
                <span>Photo Zoom &amp; Filter</span>
                <button className="btn-icon-sm" onClick={() => { playClickSound(); setPanX(0); setPanY(0); setZoom(1.0); }}>Reset</button>
              </div>
              <div className="slider-row">
                <input type="range" className="range-slider" min="0.5" max="3" step="0.05" value={zoom} onChange={(e) => setZoom(parseFloat(e.target.value))} />
                <span style={{ fontSize: '0.82rem', fontWeight: 800 }}>{zoom.toFixed(1)}x</span>
              </div>
              <div className="form-group" style={{ marginTop: 4 }}>
                <label className="form-label" htmlFor="filterSelect">Photo Filter</label>
                <select id="filterSelect" className="form-select" value={filter} onChange={(e) => { playClickSound(); setFilter(e.target.value); }}>
                  <option value="none">Original Crisp</option>
                  <option value="warm">Warm Sunset Glow</option>
                  <option value="cyber">Cyber Matrix Cyan</option>
                  <option value="bw">B&amp;W Tech Contrast</option>
                </select>
              </div>
              <div style={{ fontSize: '0.76rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span>Drag photo directly on canvas to reposition.</span>
              </div>
            </div>

            {/* Builder-only fields */}
            {format === 'builder' && (
              <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div className="form-grid-2col">
                  <div className="form-group">
                    <label className="form-label" htmlFor="userNameInput">2. Builder Name / Handle</label>
                    <input type="text" id="userNameInput" className="form-input" value={userName} placeholder="e.g. Satoshi Nakamoto"
                      onChange={(e) => { setUserName(e.target.value); updateStackLocation(selectedBadges, e.target.value); }} />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="xHandleInput">X / Twitter Handle (Optional)</label>
                    <input type="text" id="xHandleInput" className="form-input" value={xHandle} placeholder="e.g. @satoshi"
                      onChange={(e) => setXHandle(e.target.value)} />
                  </div>
                </div>

                {/* Stack badges */}
                <div className="form-group">
                  <label className="form-label">
                    <span>3. Tech Stack &amp; Focus Area</span>
                    <span className="form-hint">Click badges to toggle</span>
                  </label>
                  <div className="stack-badges-grid">
                    {[...PRESET_TECHS, ...customSkills].map((tech) => (
                      <button key={tech} type="button" className={`badge-btn${selectedBadges.includes(tech) ? ' active' : ''}`} onClick={() => {
                        playClickSound();
                        const next = selectedBadges.includes(tech) ? selectedBadges.filter(t => t !== tech) : [...selectedBadges, tech];
                        setSelectedBadges(next);
                        updateStackLocation(next, userName);
                      }}>{tech}</button>
                    ))}
                  </div>
                  <div className="custom-skill-row">
                    <input type="text" className="form-input custom-skill-input" placeholder="Add custom skill (e.g. GraphQL, Go, ZK)..." value={customSkillVal}
                      onChange={(e) => setCustomSkillVal(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); if (customSkillVal.trim() && !selectedBadges.includes(customSkillVal.trim()) && !customSkills.includes(customSkillVal.trim())) { const v = customSkillVal.trim(); setCustomSkills([...customSkills, v]); const next = [...selectedBadges, v]; setSelectedBadges(next); updateStackLocation(next, userName); } setCustomSkillVal(''); } }} />
                    <button type="button" className="btn-add-skill" onClick={() => {
                      if (customSkillVal.trim() && !selectedBadges.includes(customSkillVal.trim()) && !customSkills.includes(customSkillVal.trim())) {
                        const v = customSkillVal.trim(); setCustomSkills([...customSkills, v]);
                        const next = [...selectedBadges, v]; setSelectedBadges(next); updateStackLocation(next, userName);
                      } setCustomSkillVal('');
                    }}>+ Add</button>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="roleSelect">4. Primary Role / Stack</label>
                  <select id="roleSelect" className="form-select" value={role} onChange={(e) => { playClickSound(); setRole(e.target.value); }}>
                    <option value="FULLSTACK DEVELOPER">FULLSTACK DEVELOPER</option>
                    <option value="SOLANA & WEB3 ARCHITECT">SOLANA &amp; WEB3 ARCHITECT</option>
                    <option value="AI / LLM ENGINEER">AI / LLM ENGINEER</option>
                    <option value="RUST & SYSTEMS DEV">RUST &amp; SYSTEMS DEV</option>
                    <option value="UI/UX DESIGNER & CREATOR">UI/UX DESIGNER &amp; CREATOR</option>
                    <option value="FOUNDER & PRODUCT MAKER">FOUNDER &amp; PRODUCT MAKER</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="titleInput">5. Generated Builder Title</label>
                  <div className="title-reroll-group">
                    <input type="text" id="titleInput" className="form-input" value={builderTitle} placeholder="e.g. ARAMBOL ARCHITECT"
                      onChange={(e) => setBuilderTitle(e.target.value.toUpperCase())} />
                    <button className="btn-reroll" onClick={() => { playSweepSound(); const t = generateClientSideTitle(Math.random().toString(36).substring(7), selectedBadges.join(' • ') || 'GOA'); setBuilderTitle(t); }}>Reroll</button>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="locationInput">6. Stack &amp; Location Line</label>
                  <input type="text" id="locationInput" className="form-input" value={stackLocation} placeholder="e.g. ANJUNA BEACH • NEXT.JS • TYPESCRIPT"
                    onChange={(e) => setStackLocation(e.target.value.toUpperCase())} />
                </div>

                <div className="form-group">
                  <label className="form-label">7. Beach Bag &amp; Perks</label>
                  <div className="perks-grid">
                    {['HIGH-SPEED FIBER', '24/7 CAFFEINE', 'OCEAN BREEZE', 'RED BULL & BITES'].map((perk) => (
                      <label key={perk} className="perk-checkbox-label">
                        <input type="checkbox" checked={perks.includes(perk)} onChange={() => {
                          playClickSound();
                          setPerks(perks.includes(perk) ? perks.filter(p => p !== perk) : [...perks, perk]);
                        }} />
                        {perk === 'HIGH-SPEED FIBER' ? 'Fiber WiFi' : perk === '24/7 CAFFEINE' ? '24/7 Caffeine' : perk === 'OCEAN BREEZE' ? 'Ocean Breeze' : 'Red Bull'}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Theme Palette */}
            <div className="form-group theme-swatch-panel">
              <div className="panel-sub-header">
                <span className="theme-panel-title">THEME PALETTES</span>
                <span className="theme-panel-subtitle">6 Styles • Live Preview</span>
              </div>
              <div className="theme-swatch-grid">
                {themeList.map((t) => (
                  <button key={t.id} type="button" className={`theme-swatch-card${theme === t.id ? ' active' : ''}`} onClick={() => { playClickSound(); setTheme(t.id); }}>
                    <div className="swatch-info">
                      <span className="swatch-name"><span className="swatch-check">✓</span> {t.name}</span>
                      <span className="swatch-sub">{t.subtitle}</span>
                    </div>
                    <div className="swatch-dots">
                      {(themeSwatchDots[t.id] || []).map((c, i) => (
                        <span key={i} className="dot" style={{ backgroundColor: c }} />
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <button className="pattern-border-btn" style={{ width: '100%', padding: 16, marginTop: 10 }} onClick={() => goToPage(3)}>
              GENERATE GRAPHIC
            </button>
          </section>

          {/* Right: Live Preview */}
          <section className="live-preview-section">
            <div className="canvas-preview-card">
              <canvas ref={formCanvasRef} id="formRenderCanvas"
                style={{ width: '100%', height: 'auto', display: 'block', cursor: 'grab', touchAction: 'none' }}
                onMouseDown={(e) => { setIsDragging(true); setDragStart({ x: e.clientX - panX, y: e.clientY - panY }); }}
                onTouchStart={(e) => { if (e.touches[0]) { setIsDragging(true); setDragStart({ x: e.touches[0].clientX - panX, y: e.touches[0].clientY - panY }); } }}
              />
            </div>
            <span className="live-preview-badge">Live Canvas Preview</span>
          </section>
        </div>
      </div>

      {/* ── PAGE 3: SHOWCASE ── */}
      <div id="page3" className={`page-view${currentPage === 3 ? ' active' : ''}`}>
        <div className="step-indicator-bar">
          <span className="step-node completed">1. WELCOME</span>
          <span>•</span>
          <span className="step-node completed">2. CUSTOMIZED</span>
          <span>•</span>
          <span className="step-node active">3. YOUR GRAPHIC READY</span>
        </div>

        <div className="showcase-stage-container">
          <div className="canvas-3d-container" ref={canvas3dWrapperRef}>
            <div className="canvas-wrapper">
              <div className="holographic-sheen" />
              <canvas ref={showcaseCanvasRef} id="showcaseCanvas"
                style={{ touchAction: 'none' }}
                onMouseDown={(e) => { setIsDragging(true); setDragStart({ x: e.clientX - panX, y: e.clientY - panY }); }}
                onTouchStart={(e) => { if (e.touches[0]) { setIsDragging(true); setDragStart({ x: e.touches[0].clientX - panX, y: e.touches[0].clientY - panY }); } }}
              />
            </div>
          </div>

          <div className="showcase-actions">
            <button className="btn-primary-large" onClick={() => { playFanfareSound(); launchConfetti(); exportImage(); }}>
              DOWNLOAD GRAPHIC (PNG)
            </button>
            <button className="btn-secondary-large" onClick={() => { playFanfareSound(); launchConfetti(); setShareModalOpen(true); }}>
              SHARE TO X (#FrameInGoa)
            </button>
            <button className="btn-outline-back" onClick={() => goToPage(2)}>
              EDIT / CREATE ANOTHER GRAPHIC
            </button>
          </div>
        </div>
      </div>

      {/* ── HYPE MODAL ── */}
      <div className={`modal-backdrop${hypeModalOpen ? ' active' : ''}`}>
        <div className="modal-card">
          <button className="modal-close-btn" aria-label="Close modal" onClick={() => { playClickSound(); setHypeModalOpen(false); hypeVideoRef.current?.pause(); }}>✕</button>
          <span className="tab-badge" style={{ marginBottom: 12, display: 'inline-block' }}>OFFICIAL TEASER</span>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--color-green-dark)', marginBottom: 14 }}>Hacker House Goa 2026 Hype</h3>
          <div className="video-container">
            <video ref={hypeVideoRef} controls muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 12, display: 'block' }}>
              <source src="/Prehype.mp4" type="video/mp4" />
              Your browser does not support HTML5 video.
            </video>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: 18 }}>
            500 Elite Builders. High-Speed Fiber. The Ocean at your doorstep. October 28–31, 2026.
          </p>
          <button className="pattern-border-btn" style={{ width: '100%', padding: 12 }} onClick={() => { playClickSound(); setHypeModalOpen(false); hypeVideoRef.current?.pause(); }}>
            CLOSE HYPE TEASER
          </button>
        </div>
      </div>

      {/* ── SHARE MODAL ── */}
      <div className={`modal-backdrop${shareModalOpen ? ' active' : ''}`}>
        <div className="modal-card">
          <button className="modal-close-btn" aria-label="Close modal" onClick={() => { playClickSound(); setShareModalOpen(false); }}>✕</button>
          <span className="tab-badge" style={{ background: '#e6f4ea', color: '#1b5e20', border: '1px solid #2e7d32', marginBottom: 12, display: 'inline-block' }}>
            GRAPHIC READY TO SHARE!
          </span>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--color-green-dark)', marginBottom: 12 }}>Post Your Pass on X</h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: 16 }}>
            Share your graphic on X with <strong>#FrameInGoa</strong> to get featured on the HH Goa Radar!
          </p>
          <div id="tweetTextPreview" style={{ background: 'var(--color-cream)', border: '1.5px solid rgba(2,104,52,0.25)', borderRadius: 14, padding: 14, textAlign: 'left', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--color-green-dark)', marginBottom: 18, lineHeight: 1.45 }}>
            Building the future at @hhgoa 🌴 Check out my official Builder Card for Hacker House Goa 2026! 🚀 #FrameInGoa
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <button className="btn-primary-large" onClick={() => {
              playClickSound();
              const tweetText = `Building the future at @hhgoa 🌴 Check out my official Builder Card for Hacker House Goa 2026! 🚀 #FrameInGoa`;
              navigator.clipboard.writeText(tweetText).catch(() => {});
              window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`, '_blank');
              setShareModalOpen(false);
            }}>COPY TWEET &amp; OPEN X</button>
            <button className="btn-icon-sm" style={{ padding: 10, fontWeight: 800 }} onClick={() => { playClickSound(); setShareModalOpen(false); }}>Close Modal</button>
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="app-footer">
        <p>© 2026 Hacker House Goa — HH Goa 2026 Shortlisting Task #1</p>
        <div className="footer-links">
          <a href="https://hhgoa.com/" target="_blank" rel="noopener noreferrer">hhgoa.com</a>
          <span>•</span>
          <a href="https://x.com/247pmstudio" target="_blank" rel="noopener noreferrer">@247pmstudio</a>
          <span>•</span>
          <span>#FrameInGoa</span>
        </div>
      </footer>
    </>
  );
}
