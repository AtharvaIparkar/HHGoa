/* ==========================================================================
   HH GOA 2026 - DYNAMIC HALFTONE DITHER SHADER & 2-FORMAT ENGINE
   ========================================================================== */

(function () {
  'use strict';

  // --- STATE ---
  const state = {
    currentPage: 1,
    isPreloading: true,
    format: 'pfp', // Default: Format A (PFP Frame/Overlay)
    photoImg: null,
    panX: 0,
    panY: 0,
    zoom: 1.0,
    filter: 'none',
    isDragging: false,
    dragStartX: 0,
    dragStartY: 0,
    userName: '',
    xHandle: '',
    selectedBadges: ['Next.js', 'Solana', 'Rust', 'TypeScript', 'Tailwind'],
    role: 'FULLSTACK DEVELOPER',
    builderTitle: '',
    stackLocation: '',
    perks: ['HIGH-SPEED FIBER', '24/7 CAFFEINE', 'OCEAN BREEZE', 'RED BULL & BITES'],
    theme: 'signal',
    builderId: generateRandomId(),
    soundMuted: false,
  };

  // --- ASSETS ---
  const bgImg = new Image();
  bgImg.src = 'assets/badge_bg.png';

  const stampImg = new Image();
  stampImg.src = 'assets/logo_stamp.png';

  // --- 6 INTEGRATED THEME PALETTES (FROM ATTACHED FORM SYSTEM) ---
  const THEMES = {
    signal: {
      id: "signal",
      name: "Signal",
      subtitle: "HH Goa Official Identity",
      isDark: true,
      colors: {
        bg: "#013D22",
        cardBg: "rgba(1, 45, 25, 0.95)",
        text: "#FFFFFF",
        textSecondary: "#FFC233",
        accent: "#00874E",
        accentGlow: "#7CFF6B",
        secondaryAccent: "#FFC233",
        border: "rgba(255, 194, 51, 0.7)",
        focus: "#7CFF6B",
        rimLight: "#FFC233",
        stepperActive: "#7CFF6B"
      }
    },
    terminal: {
      id: "terminal",
      name: "Terminal Midnight",
      subtitle: "Developer Hacker Culture",
      isDark: true,
      colors: {
        bg: "#080C0A",
        cardBg: "rgba(10, 16, 12, 0.9)",
        text: "#7CFF6B",
        textSecondary: "rgba(124, 255, 107, 0.7)",
        accent: "#00FF66",
        accentGlow: "#00FF66",
        secondaryAccent: "#33FF99",
        border: "rgba(0, 255, 102, 0.4)",
        focus: "#00FF66",
        rimLight: "#00FF66",
        stepperActive: "#00FF66"
      }
    },
    monsoon: {
      id: "monsoon",
      name: "Monsoon Neon",
      subtitle: "Anjuna Night Rain",
      isDark: true,
      colors: {
        bg: "#0E0B16",
        cardBg: "rgba(22, 17, 36, 0.85)",
        text: "#E2F1FF",
        textSecondary: "rgba(226, 241, 255, 0.7)",
        accent: "#00E5FF",
        accentGlow: "#FF007A",
        secondaryAccent: "#FF007A",
        border: "rgba(0, 229, 255, 0.4)",
        focus: "#00E5FF",
        rimLight: "#FF007A",
        stepperActive: "#00E5FF"
      }
    },
    vintage: {
      id: "vintage",
      name: "Vintage Boarding",
      subtitle: "Retro Goan Stamp",
      isDark: false,
      colors: {
        bg: "#F4EFE6",
        cardBg: "rgba(255, 252, 247, 0.95)",
        text: "#2C1810",
        textSecondary: "rgba(44, 24, 16, 0.8)",
        accent: "#A83220",
        accentGlow: "#801B0E",
        secondaryAccent: "#B45309",
        border: "rgba(168, 50, 32, 0.45)",
        focus: "#A83220",
        rimLight: "#D4AF37",
        stepperActive: "#A83220"
      }
    },
    sakura: {
      id: "sakura",
      name: "Sakura Drift",
      subtitle: "Sunrise Blossom",
      isDark: false,
      colors: {
        bg: "#FDF2F4",
        cardBg: "rgba(255, 245, 247, 0.95)",
        text: "#4A2E35",
        textSecondary: "rgba(74, 46, 53, 0.8)",
        accent: "#E86A92",
        accentGlow: "#C92A54",
        secondaryAccent: "#D97706",
        border: "rgba(201, 42, 84, 0.45)",
        focus: "#E86A92",
        rimLight: "#F7B267",
        stepperActive: "#C92A54"
      }
    },
    synthwave: {
      id: "synthwave",
      name: "Synthwave Tide",
      subtitle: "80s Anjuna Cyber-Beach",
      isDark: true,
      colors: {
        bg: "#120024",
        cardBg: "rgba(30, 5, 55, 0.9)",
        text: "#FF77A9",
        textSecondary: "rgba(255, 119, 169, 0.75)",
        accent: "#00F0FF",
        accentGlow: "#FF0055",
        secondaryAccent: "#FFE600",
        border: "rgba(255, 0, 85, 0.5)",
        focus: "#00F0FF",
        rimLight: "#00F0FF",
        stepperActive: "#FF0055"
      }
    }
  };

  // --- SEED-BASED SMART TITLE GENERATOR ---
  const TITLE_PREFIXES = ["ARAMBOL", "ANJUNA", "VAGATOR", "PALOLEM", "MORJIM", "SHIRODA", "CHAPORA", "CALANGUTE"];
  const TITLE_SUFFIXES = ["ARCHITECT", "SHAMAN", "VALIDATOR", "KERNEL", "ALCHEMIST", "ENGINEER", "CYPHERPUNK", "SOLVER"];

  function generateClientSideTitle(name, stack) {
    const seed = (name + stack).split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const prefix = TITLE_PREFIXES[seed % TITLE_PREFIXES.length];
    const suffix = TITLE_SUFFIXES[(seed + 3) % TITLE_SUFFIXES.length];
    return `${prefix} ${suffix}`;
  }

  // --- WEB AUDIO SYNTHESIZER ---
  let audioCtx = null;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) audioCtx = new AudioContext();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playClickSound() {
    if (state.soundMuted) return;
    initAudio();
    if (!audioCtx) return;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, audioCtx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.05);
  }

  function playSweepSound() {
    if (state.soundMuted) return;
    initAudio();
    if (!audioCtx) return;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(300, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(900, audioCtx.currentTime + 0.15);

    gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.15);
  }

  function playFanfareSound() {
    if (state.soundMuted) return;
    initAudio();
    if (!audioCtx) return;

    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, idx) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      const startTime = audioCtx.currentTime + idx * 0.08;

      gain.gain.setValueAtTime(0.2, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.3);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.3);
    });
  }

  // --- DYNAMIC HALFTONE DITHER SHADER CANVAS ENGINE ---
  const halftoneCanvas = document.getElementById('halftoneCanvas');
  const hCtx = halftoneCanvas ? halftoneCanvas.getContext('2d') : null;
  let animationTime = 0;

  function initHalftoneShader() {
    if (!halftoneCanvas || !hCtx) return;

    function resize() {
      halftoneCanvas.width = window.innerWidth;
      halftoneCanvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function renderHalftone() {
      if (!state.isPreloading) {
        return; // Stop rendering when splash screen hides
      }

      animationTime += 0.015;
      const w = halftoneCanvas.width;
      const h = halftoneCanvas.height;

      hCtx.clearRect(0, 0, w, h);

      drawPalmMotif(hCtx, 90, h * 0.28, 1.4, false);
      drawPalmMotif(hCtx, 160, h * 0.55, 1.1, false);
      drawPalmMotif(hCtx, w - 90, h * 0.28, 1.4, true);
      drawPalmMotif(hCtx, w - 160, h * 0.55, 1.1, true);

      requestAnimationFrame(renderHalftone);
    }

    renderHalftone();
  }

  // --- DOM ELEMENTS ---
  const page1 = document.getElementById('page1');
  const page2 = document.getElementById('page2');
  const page3 = document.getElementById('page3');

  const formCanvas = document.getElementById('formRenderCanvas');
  const showcaseCanvas = document.getElementById('showcaseCanvas');
  const canvas3dWrapper = document.getElementById('canvas3dWrapper');

  const fileInput = document.getElementById('fileInput');
  const dropzone = document.getElementById('dropzone');
  const sampleAvatarBtn = document.getElementById('sampleAvatarBtn');
  const zoomSlider = document.getElementById('zoomSlider');
  const zoomVal = document.getElementById('zoomVal');
  const filterSelect = document.getElementById('filterSelect');
  const resetTransformBtn = document.getElementById('resetTransformBtn');
  const userNameInput = document.getElementById('userNameInput');
  const roleSelect = document.getElementById('roleSelect');
  const titleInput = document.getElementById('titleInput');
  const locationInput = document.getElementById('locationInput');
  const rerollTitleBtn = document.getElementById('rerollTitleBtn');
  const themeSelect = document.getElementById('themeSelect');
  const formatBFields = document.getElementById('formatBFields');
  const formatTabs = document.getElementById('formatTabs');

  const logoHomeBtn = document.getElementById('logoHomeBtn');
  const headerBuildBtn = document.getElementById('headerBuildBtn');
  const startBuilderBtn = document.getElementById('startBuilderBtn');
  const generateCardBtn = document.getElementById('generateCardBtn');
  const downloadBtn = document.getElementById('downloadBtn');
  const shareBtn = document.getElementById('shareBtn');
  const backToEditBtn = document.getElementById('backToEditBtn');

  const shareModal = document.getElementById('shareModal');
  const closeShareBtn = document.getElementById('closeShareBtn');
  const copyAndOpenTweetBtn = document.getElementById('copyAndOpenTweetBtn');
  const checkHypeBtn = document.getElementById('checkHypeBtn');
  const hypeModal = document.getElementById('hypeModal');
  const closeHypeBtn = document.getElementById('closeHypeBtn');
  const soundToggleBtn = document.getElementById('soundToggleBtn');
  const preloader = document.getElementById('preloader');
  const preloaderBar = document.getElementById('preloaderBar');

  function applyThemeToUI(themeId) {
    const theme = THEMES[themeId] || THEMES.signal;
    const isDark = theme.isDark;
    const root = document.documentElement;

    root.style.setProperty('--theme-bg', theme.colors.bg);
    root.style.setProperty('--theme-card-bg', theme.colors.cardBg);
    root.style.setProperty('--theme-text', isDark ? (theme.colors.text || '#E8F3EC') : '#1A0C06');
    root.style.setProperty('--theme-text-muted', isDark ? (theme.colors.textSecondary || 'rgba(232, 243, 236, 0.75)') : '#4A3428');
    root.style.setProperty('--theme-input-bg', isDark ? 'rgba(0, 0, 0, 0.45)' : 'rgba(255, 255, 255, 0.95)');
    root.style.setProperty('--theme-input-text', isDark ? (theme.colors.text || '#E8F3EC') : '#1A0C06');
    root.style.setProperty('--theme-accent', theme.colors.accent);
    root.style.setProperty('--theme-accent-glow', theme.colors.accentGlow);
    root.style.setProperty('--theme-secondary-accent', theme.colors.secondaryAccent || theme.colors.accentGlow);
    root.style.setProperty('--theme-border', theme.colors.border);

    document.body.setAttribute('data-theme', themeId);
  }

  // --- INITIALIZATION ---
  function init() {
    runPreloader();
    initHalftoneShader();
    applyThemeToUI(state.theme);

    bgImg.onload = () => renderAllCanvases();
    stampImg.onload = () => renderAllCanvases();

    setupEventListeners();
    setup3DTilt();
    renderAllCanvases();
  }

  // --- SPA PAGE ROUTER ---
  function goToPage(pageNum) {
    state.currentPage = pageNum;
    page1.classList.remove('active');
    page2.classList.remove('active');
    page3.classList.remove('active');

    if (pageNum === 1) {
      page1.classList.add('active');
    } else if (pageNum === 2) {
      page2.classList.add('active');
      renderAllCanvases();
    } else if (pageNum === 3) {
      page3.classList.add('active');
      renderAllCanvases();
      playFanfareSound();
      launchConfetti();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // --- PRELOADER ---
  function runPreloader() {
    let progress = 0;
    // Slow down to ~3.5 seconds
    const interval = setInterval(() => {
      progress += Math.random() * 3 + 1.5;
      if (progress > 100) progress = 100;
      preloaderBar.style.width = progress + '%';

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          preloader.classList.add('hidden');
          // Wait for CSS fade out transition (0.8s) before hiding preloader element completely
          setTimeout(() => {
            state.isPreloading = false;
            if (preloader) preloader.style.display = 'none';
          }, 800);
        }, 400);
      }
    }, 100);
  }

  function generateRandomId() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 4; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `HHG26-${Math.floor(1000 + Math.random() * 9000)}-${code}`;
  }

  function setup3DTilt() {
    if (!canvas3dWrapper) return;

    canvas3dWrapper.addEventListener('mousemove', (e) => {
      const rect = canvas3dWrapper.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -12;
      const rotateY = ((x - centerX) / centerX) * 12;

      canvas3dWrapper.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    canvas3dWrapper.addEventListener('mouseleave', () => {
      canvas3dWrapper.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  }

  // --- EVENT LISTENERS ---
  function setupEventListeners() {
    logoHomeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      playClickSound();
      goToPage(1);
    });

    if (headerBuildBtn) {
      headerBuildBtn.addEventListener('click', () => {
        playClickSound();
        goToPage(2);
      });
    }

    startBuilderBtn.addEventListener('click', () => {
      playClickSound();
      goToPage(2);
    });

    generateCardBtn.addEventListener('click', () => {
      playClickSound();
      goToPage(3);
    });

    backToEditBtn.addEventListener('click', () => {
      playClickSound();
      goToPage(2);
    });

    soundToggleBtn.addEventListener('click', () => {
      state.soundMuted = !state.soundMuted;
      soundToggleBtn.textContent = state.soundMuted ? 'MUTED' : 'SOUND ON';
      playClickSound();
    });

    const hypeVideo = document.getElementById('hypeVideo');

    checkHypeBtn.addEventListener('click', () => {
      playClickSound();
      hypeModal.classList.add('active');
      if (hypeVideo) {
        hypeVideo.currentTime = 0;
        hypeVideo.play().catch(() => {});
      }
    });

    const closeHypeHandler = () => {
      playClickSound();
      hypeModal.classList.remove('active');
      if (hypeVideo) {
        hypeVideo.pause();
      }
    };

    closeHypeBtn.addEventListener('click', closeHypeHandler);
    const closeHypeIconBtn = document.getElementById('closeHypeIconBtn');
    if (closeHypeIconBtn) {
      closeHypeIconBtn.addEventListener('click', closeHypeHandler);
    }

    // Strictly 2 Format Switcher (Format A & Format B)
    formatTabs.querySelectorAll('.tab-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        playClickSound();
        formatTabs.querySelectorAll('.tab-btn').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        state.format = btn.dataset.format;

        formatBFields.style.display = state.format === 'builder' ? 'flex' : 'none';

        state.panX = 0;
        state.panY = 0;
        state.zoom = 1.0;
        zoomSlider.value = 1.0;
        zoomVal.textContent = '1.0x';
        renderAllCanvases();
      });
    });

    // Dropzone
    dropzone.addEventListener('click', () => {
      playClickSound();
      fileInput.click();
    });
    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropzone.style.borderColor = 'var(--color-pink)';
    });
    dropzone.addEventListener('dragleave', () => {
      dropzone.style.borderColor = 'var(--color-green)';
    });
    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzone.style.borderColor = 'var(--color-green)';
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFileSelect(e.dataTransfer.files[0]);
      }
    });

    fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        handleFileSelect(e.target.files[0]);
      }
    });

    zoomSlider.addEventListener('input', (e) => {
      state.zoom = parseFloat(e.target.value);
      zoomVal.textContent = state.zoom.toFixed(1) + 'x';
      renderAllCanvases();
    });

    filterSelect.addEventListener('change', (e) => {
      playClickSound();
      state.filter = e.target.value;
      renderAllCanvases();
    });

    resetTransformBtn.addEventListener('click', () => {
      playClickSound();
      state.panX = 0;
      state.panY = 0;
      state.zoom = 1.0;
      zoomSlider.value = 1.0;
      zoomVal.textContent = '1.0x';
      renderAllCanvases();
    });

    const xHandleInput = document.getElementById('xHandleInput');
    if (xHandleInput) {
      xHandleInput.addEventListener('input', (e) => {
        state.xHandle = e.target.value;
        renderAllCanvases();
      });
    }

    function updateStackLocationAndTitle() {
      const stackStr = state.selectedBadges.join(' • ');
      state.stackLocation = `ANJUNA BEACH • ${stackStr}`.toUpperCase();
      if (locationInput) locationInput.value = state.stackLocation;
      const autoTitle = generateClientSideTitle(state.userName || 'GOA', stackStr || 'BUILDER');
      state.builderTitle = autoTitle;
      if (titleInput) titleInput.value = autoTitle;
      renderAllCanvases();
    }

    userNameInput.addEventListener('input', (e) => {
      state.userName = e.target.value || 'Satoshi Nakamoto';
      updateStackLocationAndTitle();
    });

    roleSelect.addEventListener('change', (e) => {
      playClickSound();
      state.role = e.target.value;
      renderAllCanvases();
    });

    titleInput.addEventListener('input', (e) => {
      state.builderTitle = e.target.value.toUpperCase();
      renderAllCanvases();
    });

    if (locationInput) {
      locationInput.addEventListener('input', (e) => {
        state.stackLocation = e.target.value.toUpperCase();
        renderAllCanvases();
      });
    }

    const stackBadgesGrid = document.getElementById('stackBadgesGrid');
    if (stackBadgesGrid) {
      stackBadgesGrid.addEventListener('click', (e) => {
        const btn = e.target.closest('.badge-btn');
        if (!btn) return;
        playClickSound();
        const tech = btn.dataset.tech;
        if (state.selectedBadges.includes(tech)) {
          state.selectedBadges = state.selectedBadges.filter((t) => t !== tech);
          btn.classList.remove('active');
        } else {
          state.selectedBadges.push(tech);
          btn.classList.add('active');
        }
        updateStackLocationAndTitle();
      });
    }

    const customSkillInput = document.getElementById('customSkillInput');
    const addCustomSkillBtn = document.getElementById('addCustomSkillBtn');

    function handleAddCustomSkill() {
      if (!customSkillInput) return;
      const val = customSkillInput.value.trim();
      if (!val) return;
      playClickSound();
      if (!state.selectedBadges.includes(val)) {
        state.selectedBadges.push(val);
        const newBtn = document.createElement('button');
        newBtn.type = 'button';
        newBtn.className = 'badge-btn active';
        newBtn.dataset.tech = val;
        newBtn.textContent = val;
        if (stackBadgesGrid) stackBadgesGrid.appendChild(newBtn);
      }
      customSkillInput.value = '';
      updateStackLocationAndTitle();
    }

    if (addCustomSkillBtn) {
      addCustomSkillBtn.addEventListener('click', handleAddCustomSkill);
    }
    if (customSkillInput) {
      customSkillInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          handleAddCustomSkill();
        }
      });
    }

    rerollTitleBtn.addEventListener('click', () => {
      playSweepSound();
      const randomTitle = generateClientSideTitle(
        Math.random().toString(36).substring(7),
        state.selectedBadges.join(' • ') || 'GOA'
      );
      state.builderTitle = randomTitle;
      titleInput.value = randomTitle;
      renderAllCanvases();
    });

    const themeSwatchGrid = document.getElementById('themeSwatchGrid');
    if (themeSwatchGrid) {
      themeSwatchGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.theme-swatch-card');
        if (!card) return;
        playClickSound();
        themeSwatchGrid.querySelectorAll('.theme-swatch-card').forEach((c) => c.classList.remove('active'));
        card.classList.add('active');
        state.theme = card.dataset.theme;
        applyThemeToUI(state.theme);
        renderAllCanvases();
      });
    }

    document.querySelectorAll('.perk-checkbox-label input').forEach((chk) => {
      chk.addEventListener('change', () => {
        playClickSound();
        state.perks = Array.from(document.querySelectorAll('.perk-checkbox-label input:checked')).map(
          (c) => c.value
        );
        renderAllCanvases();
      });
    });

    // Drag photo
    [formCanvas, showcaseCanvas].forEach((c) => {
      c.addEventListener('mousedown', (e) => {
        state.isDragging = true;
        state.dragStartX = e.clientX - state.panX;
        state.dragStartY = e.clientY - state.panY;
      });

      c.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
          state.isDragging = true;
          state.dragStartX = e.touches[0].clientX - state.panX;
          state.dragStartY = e.touches[0].clientY - state.panY;
        }
      });
    });

    window.addEventListener('mousemove', (e) => {
      if (!state.isDragging) return;
      state.panX = e.clientX - state.dragStartX;
      state.panY = e.clientY - state.dragStartY;
      renderAllCanvases();
    });

    window.addEventListener('mouseup', () => {
      state.isDragging = false;
    });

    window.addEventListener('touchmove', (e) => {
      if (!state.isDragging || e.touches.length !== 1) return;
      state.panX = e.touches[0].clientX - state.dragStartX;
      state.panY = e.touches[0].clientY - state.dragStartY;
      renderAllCanvases();
    });

    window.addEventListener('touchend', () => {
      state.isDragging = false;
    });

    downloadBtn.addEventListener('click', () => {
      playFanfareSound();
      launchConfetti();
      exportImage();
    });

    shareBtn.addEventListener('click', () => {
      playFanfareSound();
      launchConfetti();
      shareModal.classList.add('active');
    });

    const closeShareHandler = () => {
      playClickSound();
      shareModal.classList.remove('active');
    };

    closeShareBtn.addEventListener('click', closeShareHandler);
    const closeShareIconBtn = document.getElementById('closeShareIconBtn');
    if (closeShareIconBtn) {
      closeShareIconBtn.addEventListener('click', closeShareHandler);
    }

    copyAndOpenTweetBtn.addEventListener('click', () => {
      playClickSound();
      const tweetText = `Building the future at @hhgoa 🌴 Check out my official Builder Card for Hacker House Goa 2026! 🚀 #FrameInGoa`;
      navigator.clipboard.writeText(tweetText).catch(() => {});
      const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
      window.open(tweetUrl, '_blank');
      shareModal.classList.remove('active');
    });
  }

  function handleFileSelect(file) {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        state.photoImg = img;
        state.panX = 0;
        state.panY = 0;
        state.zoom = 1.0;
        zoomSlider.value = 1.0;
        zoomVal.textContent = '1.0x';
        renderAllCanvases();
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }

  function launchConfetti() {
    const activeCanvas = showcaseCanvas;
    const activeCtx = activeCanvas.getContext('2d');
    const confettiCount = 90;
    const particles = [];
    const colors = ['#FEE101', '#FF007A', '#00F0FF', '#FFFFFF', '#026834'];

    for (let i = 0; i < confettiCount; i++) {
      particles.push({
        x: activeCanvas.width / 2,
        y: activeCanvas.height / 2,
        vx: (Math.random() - 0.5) * 26,
        vy: (Math.random() - 0.7) * 26,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 14 + 6,
        life: 1,
      });
    }

    function animateConfetti() {
      drawCanvasContent(activeCanvas, activeCtx);
      let active = false;

      particles.forEach((p) => {
        if (p.life <= 0) return;
        active = true;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.45;
        p.life -= 0.02;

        activeCtx.save();
        activeCtx.fillStyle = p.color;
        activeCtx.globalAlpha = Math.max(p.life, 0);
        activeCtx.fillRect(p.x, p.y, p.size, p.size);
        activeCtx.restore();
      });

      if (active) requestAnimationFrame(animateConfetti);
    }

    animateConfetti();
  }

  // --- DUAL CANVAS RENDERER ---
  function renderAllCanvases() {
    [formCanvas, showcaseCanvas].forEach((c) => {
      if (state.format === 'pfp') {
        c.width = 1024;
        c.height = 1024; // 1:1 Square Ratio
      } else {
        c.width = 1024;
        c.height = 1280; // 4:5 Reduced Height Ratio
      }
      drawCanvasContent(c, c.getContext('2d'));
    });
  }

  function drawCanvasContent(targetCanvas, targetCtx) {
    if (state.format === 'pfp') {
      renderPfpFrame(targetCanvas, targetCtx);
    } else {
      renderBuilderCard(targetCanvas, targetCtx);
    }
  }

  function applyPhotoFilter(cCtx) {
    if (state.filter === 'warm') {
      cCtx.filter = 'sepia(0.35) contrast(1.1) brightness(1.05) saturate(1.3)';
    } else if (state.filter === 'cyber') {
      cCtx.filter = 'hue-rotate(140deg) saturate(1.4) contrast(1.1)';
    } else if (state.filter === 'bw') {
      cCtx.filter = 'grayscale(1) contrast(1.3) brightness(0.95)';
    } else {
      cCtx.filter = 'none';
    }
  }

  // --- CANVAS HELPER UTILITIES ---
  function drawFittedText(ctx, text, x, y, maxWidth, maxFontSize, minFontSize, fontFamily, color, align = 'left', weight = '900') {
    ctx.save();
    ctx.fillStyle = color;
    ctx.textAlign = align;
    let fontSize = maxFontSize;
    ctx.font = `${weight} ${fontSize}px ${fontFamily}`;
    
    while (ctx.measureText(text).width > maxWidth && fontSize > minFontSize) {
      fontSize -= 1;
      ctx.font = `${weight} ${fontSize}px ${fontFamily}`;
    }
    
    ctx.fillText(text, x, y);
    ctx.restore();
    return fontSize;
  }

  function drawBarcode(ctx, x, y, width, height, color = '#026834') {
    ctx.save();
    ctx.fillStyle = color;
    const bars = [3, 1, 4, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 1, 4, 2, 1, 3, 4, 1, 2, 3, 1, 2];
    let currentX = x;
    const totalWeight = bars.reduce((a, b) => a + b, 0);
    const unitWidth = width / totalWeight;

    bars.forEach((b, idx) => {
      if (idx % 2 === 0) {
        ctx.fillRect(currentX, y, b * unitWidth, height);
      }
      currentX += b * unitWidth;
    });
    ctx.restore();
  }

  function drawPalmMotif(ctx, x, y, scale = 1, flipX = false, color = '#026834') {
    ctx.save();
    ctx.translate(x, y);
    if (flipX) ctx.scale(-1, 1);
    ctx.scale(scale, scale);
    
    ctx.strokeStyle = color;
    ctx.lineWidth = 3.5;
    
    ctx.beginPath();
    ctx.quadraticCurveTo(20, -30, 40, -60);
    ctx.stroke();

    const fronds = [[10, -15], [20, -30], [30, -45], [38, -55]];
    fronds.forEach(([fx, fy]) => {
      ctx.beginPath();
      ctx.quadraticCurveTo(fx + 20, fy - 8, fx + 32, fy + 10);
      ctx.stroke();
      ctx.beginPath();
      ctx.quadraticCurveTo(fx - 20, fy - 8, fx - 32, fy + 10);
      ctx.stroke();
    });
    ctx.restore();
  }

  function drawDefaultAvatar(ctx, x, y, w, h, isDark) {
    ctx.save();
    // Neutral Background fill
    ctx.fillStyle = isDark ? '#1D2A22' : '#E2E8F0';
    ctx.fillRect(x, y, w, h);

    const cx = x + w / 2;
    const cy = y + h / 2;
    const iconColor = isDark ? '#3E5045' : '#94A3B8';
    ctx.fillStyle = iconColor;

    // Head
    const headRadius = Math.min(w, h) * 0.18;
    ctx.beginPath();
    ctx.arc(cx, cy - headRadius * 0.5, headRadius, 0, Math.PI * 2);
    ctx.fill();

    // Body/Shoulders
    const shoulderRadius = Math.min(w, h) * 0.32;
    ctx.beginPath();
    ctx.arc(cx, cy + shoulderRadius * 1.35, shoulderRadius, Math.PI, 0, false);
    ctx.fill();

    ctx.restore();
  }

  // --- DEVANAGARI GOA GOLD LINEWORK MARK ---
  function drawDevanagariGoaMark(ctx, x, y, color = "#FFC24B", scale = 1) {
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

  // --- VECTOR BARCODE DRAWING ---
  function drawBarcode(ctx, x, y, height, code, theme) {
    ctx.save();
    ctx.fillStyle = theme.colors.text || '#FFFFFF';
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

  // --- FORMAT A: PFP FRAME OVERLAY (1:1 CLEAN & COMPOSITED) ---
  function renderPfpFrame(targetCanvas, targetCtx) {
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
      applyPhotoFilter(targetCtx);

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

  // --- FORMAT B: BUILDER PASS TICKET (1080x1350 COMPOSITED) ---
  function renderBuilderCard(targetCanvas, targetCtx) {
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

    const badgeId = `#GOA-${state.builderId.split('-').pop() || '2026'}`;
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
      applyPhotoFilter(targetCtx);

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
    const displayName = (state.userName && state.userName.trim()) ? state.userName.trim() : 'GOA BUILDER';
    const displayTitleText = (state.builderTitle && state.builderTitle.trim()) ? state.builderTitle.trim() : 'GOA BUILDER';
    const displayStack = (state.stackLocation && state.stackLocation.trim()) ? state.stackLocation.trim() : (state.selectedBadges.length > 0 ? state.selectedBadges.join(' • ') : 'GOA BUILDER');

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
      'left',
      '900'
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
      'left',
      '800'
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
      'left',
      '600'
    );

    // 8. Barcode Rendering on Bottom Right
    drawBarcode(targetCtx, width - 320, 1110, 75, "HH-GOA-2026", theme);
  }

  function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
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

  function exportImage() {
    renderAllCanvases();
    const link = document.createElement('a');
    link.download = `HH-Goa-2026-${state.format.toUpperCase()}-Pass.png`;
    link.href = showcaseCanvas.toDataURL('image/png');
    link.click();
  }

  window.addEventListener('DOMContentLoaded', init);

})();
