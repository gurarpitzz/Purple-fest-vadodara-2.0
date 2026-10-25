/**
 * PURPLE FEST VADODARA 2027 — MINIMALIST ARCHITECTURAL EXPERIENCE
 * Aligned with Viksit Bharat @ 2047
 * Features:
 * 1. Preserved Preloader (final.mp4 + Vector SVG fallback)
 * 2. Calm Tactile Braille & Acoustic Elevation Matrix Background
 * 3. Scroll-Highlighted Editorial Reading Lines ([data-scroll-line])
 * 4. Indian Paralympic Champions Interactive Dossier
 * 5. Complete 21 Benchmark Disabilities (RPwD Act, 2016) Statutory Ledger
 * 6. Separate Exhibition Stall Booking & ₹2,200 Delegate Registration with Razorpay API Placeholder
 */

const PFV_STATE = {
  motionEnabled: !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  viewMode: 'scroll', // 'scroll' | 'menu'
  activeRealm: 'hero',
  ttsActive: false,
  fontScale: 100
};

/**
 * RAZORPAY API CONFIGURATION PLACEHOLDER
 * Replace key_id with your live/test Razorpay Key when backend order creation is connected.
 */
const RAZORPAY_CONFIG = {
  key_id: 'rzp_test_PURPLEFEST2027_PLACEHOLDER',
  currency: 'INR',
  merchant_name: 'Purple Fest Vadodara 2027',
  delegate_fee_inr: 2200,
  delegate_fee_paise: 220000 // ₹2,200.00 in paise
};

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  init3DPurpleFestLogo();
  initTactileAccessibilityBackground();
  initScrollHighlightedReading();
  initDirectoryAndNavigation();
  initAccessibilityControls();
  initParalympiansExplorer();
  initBenchmarkDisabilitiesLedger();
  initZonesExplorer();
  initSchedule();
  initCountdown();
  initRegistrationAndRazorpay();
  initMitraAssistant();
});

/* =========================================================
   1. PRELOADER ENGINE (Video & Vector SVG Sync)
   PRESERVED 100% VERBATIM AS REQUESTED
   ========================================================= */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  const video = document.getElementById('preloader-video');
  const videoContainer = document.getElementById('video-container');
  const vectorContainer = document.getElementById('vector-container');
  const progressBar = document.getElementById('preloader-progress-bar');
  const timeDisplay = document.getElementById('preloader-time-display');
  const soundBtn = document.getElementById('preloader-sound-btn');
  const soundText = document.getElementById('sound-btn-text');
  const modeBtn = document.getElementById('preloader-mode-btn');
  const modeText = document.getElementById('mode-btn-text');
  const skipBtn = document.getElementById('preloader-skip-btn');
  
  // Replay buttons around the site
  const replayBtnNav = document.getElementById('btn-replay-preloader');
  const replayBtnCta = document.getElementById('cta-replay-btn');
  const replayBtnFooter = document.getElementById('footer-replay-btn');

  let currentMode = 'video'; // 'video' | 'vector'
  let isSoundActive = false;
  let isExited = false;
  let vectorTimer = null;
  let vectorElapsed = 0;
  const TOTAL_DURATION = 4.0; // 4 seconds duration of final.mp4

  // Initialize Canvas Heart Particles in background
  initPreloaderCanvas();

  // Try playing the video automatically
  function startPlayback() {
    isExited = false;
    document.body.classList.add('loading-state');
    preloader.classList.remove('preloader-exit');

    if (currentMode === 'video') {
      video.currentTime = 0;
      video.muted = !isSoundActive;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.log('Autoplay restriction handled. Playing muted.', err);
          video.muted = true;
          video.play();
        });
      }
    } else {
      startVectorAnimation();
    }
  }

  // Update progress bar based on video playback
  video.addEventListener('timeupdate', () => {
    if (currentMode !== 'video' || isExited) return;
    const current = video.currentTime;
    const dur = video.duration || TOTAL_DURATION;
    const pct = Math.min(100, (current / dur) * 100);
    
    if (progressBar) progressBar.style.width = `${pct}%`;
    if (timeDisplay) timeDisplay.textContent = `${current.toFixed(1)}s / ${dur.toFixed(1)}s`;

    // Trigger exit slightly before hard end or on end for ultra smooth transition
    if (current >= dur - 0.25 && !isExited) {
      exitPreloader();
    }
  });

  video.addEventListener('ended', () => {
    if (!isExited) exitPreloader();
  });

  // Sound Toggle Handler
  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      isSoundActive = !isSoundActive;
      video.muted = !isSoundActive;

      if (isSoundActive) {
        if (soundText) soundText.textContent = 'Sound: ON';
        soundBtn.classList.add('preloader-btn-primary');
        playGentleChime();
      } else {
        if (soundText) soundText.textContent = 'Sound: Muted';
        soundBtn.classList.remove('preloader-btn-primary');
      }
    });
  }

  // Mode Switcher (Video vs Vector SVG Mode)
  if (modeBtn) {
    modeBtn.addEventListener('click', () => {
      if (currentMode === 'video') {
        currentMode = 'vector';
        video.pause();
        videoContainer.classList.remove('active');
        vectorContainer.classList.add('active');
        if (modeText) modeText.textContent = 'Switch to Video Mode';
        startVectorAnimation();
      } else {
        currentMode = 'video';
        clearInterval(vectorTimer);
        vectorContainer.classList.remove('active');
        videoContainer.classList.add('active');
        if (modeText) modeText.textContent = 'Switch to Vector Mode';
        video.currentTime = 0;
        video.play();
      }
    });
  }

  function startVectorAnimation() {
    clearInterval(vectorTimer);
    vectorElapsed = 0;
    
    // Restart SVG CSS animations
    const svg = document.getElementById('vector-svg');
    const newSvg = svg.cloneNode(true);
    svg.parentNode.replaceChild(newSvg, svg);

    vectorTimer = setInterval(() => {
      vectorElapsed += 0.05;
      const pct = Math.min(100, (vectorElapsed / TOTAL_DURATION) * 100);
      if (progressBar) progressBar.style.width = `${pct}%`;
      if (timeDisplay) timeDisplay.textContent = `${vectorElapsed.toFixed(1)}s / ${TOTAL_DURATION.toFixed(1)}s`;

      if (vectorElapsed >= TOTAL_DURATION) {
        clearInterval(vectorTimer);
        exitPreloader();
      }
    }, 50);
  }

  // Skip Preloader
  function exitPreloader() {
    if (isExited) return;
    isExited = true;
    clearInterval(vectorTimer);
    if (progressBar) progressBar.style.width = '100%';
    
    preloader.classList.add('preloader-exit');
    document.body.classList.remove('loading-state');
    setTimeout(() => {
      video.pause();
    }, 800);
  }

  if (skipBtn) skipBtn.addEventListener('click', exitPreloader);
  if (preloader) preloader.addEventListener('click', exitPreloader);

  // Replay Triggers
  function replayIntro() {
    startPlayback();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (replayBtnNav) replayBtnNav.addEventListener('click', replayIntro);
  if (replayBtnCta) replayBtnCta.addEventListener('click', replayIntro);
  if (replayBtnFooter) replayBtnFooter.addEventListener('click', replayIntro);

  // Initial playback start
  startPlayback();
}

/**
 * Ambient Canvas Particle Animation (Floating hearts & sparkles)
 */
function initPreloaderCanvas() {
  const canvas = document.getElementById('preloader-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  // Create particles
  for (let i = 0; i < 35; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 12 + 6,
      speedY: Math.random() * 0.8 + 0.3,
      speedX: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.4 + 0.15,
      type: Math.random() > 0.5 ? 'heart' : 'orb',
      rotation: Math.random() * Math.PI,
      rotSpeed: (Math.random() - 0.5) * 0.02
    });
  }

  function drawHeart(ctx, x, y, size) {
    ctx.beginPath();
    const topCurveHeight = size * 0.3;
    ctx.moveTo(x, y + topCurveHeight);
    ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
    ctx.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2, x, y + (size + topCurveHeight) / 1.4, x, y + size);
    ctx.bezierCurveTo(x, y + (size + topCurveHeight) / 1.4, x + size / 2, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight);
    ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
    ctx.closePath();
    ctx.fill();
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.y -= p.speedY;
      p.x += p.speedX;
      p.rotation += p.rotSpeed;

      if (p.y < -20) {
        p.y = height + 20;
        p.x = Math.random() * width;
      }

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.fillStyle = `rgba(142, 36, 170, ${p.opacity})`;

      if (p.type === 'heart') {
        drawHeart(ctx, 0, 0, p.size);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 3, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    });

    requestAnimationFrame(render);
  }
  render();
}

/**
 * Web Audio API gentle celebratory chime
 */
function playGentleChime() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12);
      
      gain.gain.setValueAtTime(0.001, ctx.currentTime + idx * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + idx * 0.12 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.12 + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(ctx.currentTime + idx * 0.12);
      osc.stop(ctx.currentTime + idx * 0.12 + 0.7);
    });
  } catch (e) {
    // Audio context silently handled
  }
}

/* =========================================================
   2A. 3D SCULPTURAL PURPLE FEST VADODARA LOGO (THREE.JS)
   Builds the exact 3-Figure Continuous Loop + 3 Hearts in 3D
   ========================================================= */
function init3DPurpleFestLogo() {
  const canvas = document.getElementById('logo-3d-canvas');
  const stage = document.getElementById('hero-3d-logo-stage');
  if (!canvas || typeof THREE === 'undefined') return;

  try {
    const width = 360;
    const height = 240;
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.2, 13.2);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    if (stage) stage.classList.add('webgl-active');

    // Monochromatic Studio Lighting (Royal Purple Specular & Depth)
    const ambient = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambient);

    const dirLight1 = new THREE.DirectionalLight(0xf3e8ff, 1.35);
    dirLight1.position.set(6, 10, 9);
    scene.add(dirLight1);

    const dirLight2 = new THREE.PointLight(0x9d4edd, 1.6, 30);
    dirLight2.position.set(-7, -4, 6);
    scene.add(dirLight2);

    const logoGroup = new THREE.Group();
    scene.add(logoGroup);

    const purpleSculptMat = new THREE.MeshStandardMaterial({
      color: 0x49176d,
      emissive: 0x24053d,
      emissiveIntensity: 0.28,
      roughness: 0.24,
      metalness: 0.32
    });

    const heartSculptMat = new THREE.MeshStandardMaterial({
      color: 0x5b189a,
      emissive: 0x3b0d63,
      emissiveIntensity: 0.35,
      roughness: 0.18,
      metalness: 0.38
    });

    // Continuous 3-Figure Looping Ribbon (Matching the uploaded Purple Fest Logo)
    const loopPoints = [
      // Left figure W legs
      new THREE.Vector3(-2.65, -0.55, 0.1),
      new THREE.Vector3(-2.85, -1.95, 0.18),
      new THREE.Vector3(-2.35, -2.25, 0.12),
      new THREE.Vector3(-2.15, -1.25, 0.05),
      new THREE.Vector3(-1.62, -2.18, -0.05),
      new THREE.Vector3(-1.38, -1.85, -0.1),
      new THREE.Vector3(-1.68, -0.55, -0.12),
      // Left outer arm loop
      new THREE.Vector3(-2.45, 0.05, 0.22),
      new THREE.Vector3(-3.85, 0.15, 0.28),
      new THREE.Vector3(-4.15, -0.35, 0.15),
      new THREE.Vector3(-3.45, -0.68, 0.0),
      new THREE.Vector3(-2.35, -0.05, -0.1),
      // Arch from Left to Center figure
      new THREE.Vector3(-1.25, 1.05, 0.18),
      new THREE.Vector3(-0.15, 0.85, 0.25),
      new THREE.Vector3(0.68, -0.15, 0.12),
      // Center figure right leg & W loop
      new THREE.Vector3(0.82, -1.95, 0.05),
      new THREE.Vector3(0.45, -2.35, 0.15),
      new THREE.Vector3(0.0, -1.15, 0.22),
      new THREE.Vector3(-0.45, -2.35, 0.15),
      new THREE.Vector3(-0.82, -1.95, 0.05),
      new THREE.Vector3(-0.62, -0.15, -0.12),
      // Arch from Center to Right figure
      new THREE.Vector3(0.25, 0.78, -0.18),
      new THREE.Vector3(1.55, 0.72, 0.15),
      new THREE.Vector3(2.45, -0.05, 0.22),
      // Right outer arm loop
      new THREE.Vector3(3.45, -0.58, 0.05),
      new THREE.Vector3(4.15, -0.25, -0.1),
      new THREE.Vector3(3.75, 0.18, -0.2),
      new THREE.Vector3(2.45, 0.02, 0.1),
      // Right figure W legs
      new THREE.Vector3(1.62, -0.65, 0.15),
      new THREE.Vector3(1.38, -1.95, 0.08),
      new THREE.Vector3(1.68, -2.18, 0.0),
      new THREE.Vector3(2.15, -1.25, -0.08),
      new THREE.Vector3(2.38, -2.22, -0.12),
      new THREE.Vector3(2.82, -1.92, -0.05),
      new THREE.Vector3(2.65, -0.58, 0.1)
    ];

    const curve = new THREE.CatmullRomCurve3(loopPoints, false, 'catmullrom', 0.45);
    const tubeGeo = new THREE.TubeGeometry(curve, 220, 0.155, 16, false);
    const tubeMesh = new THREE.Mesh(tubeGeo, purpleSculptMat);
    logoGroup.add(tubeMesh);

    // Rounded End Caps
    const capGeo = new THREE.SphereGeometry(0.155, 16, 16);
    const capStart = new THREE.Mesh(capGeo, purpleSculptMat);
    capStart.position.copy(loopPoints[0]);
    const capEnd = new THREE.Mesh(capGeo, purpleSculptMat);
    capEnd.position.copy(loopPoints[loopPoints.length - 1]);
    logoGroup.add(capStart, capEnd);

    // 3D Extruded Bevelled Heart Builder
    function create3DHeart() {
      const s = new THREE.Shape();
      s.moveTo(0, -0.35);
      s.bezierCurveTo(-0.08, -0.25, -0.52, 0.02, -0.52, 0.32);
      s.bezierCurveTo(-0.52, 0.56, -0.26, 0.68, 0, 0.42);
      s.bezierCurveTo(0.26, 0.68, 0.52, 0.56, 0.52, 0.32);
      s.bezierCurveTo(0.52, 0.02, 0.08, -0.25, 0, -0.35);

      const geo = new THREE.ExtrudeGeometry(s, {
        depth: 0.22,
        bevelEnabled: true,
        bevelSegments: 4,
        steps: 1,
        bevelSize: 0.07,
        bevelThickness: 0.07
      });
      geo.center();
      return new THREE.Mesh(geo, heartSculptMat);
    }

    const heartLeft = create3DHeart();
    heartLeft.position.set(-2.55, 1.05, 0.25);
    heartLeft.rotation.z = 0.22;
    heartLeft.scale.set(0.95, 0.95, 0.95);

    const heartCenter = create3DHeart();
    heartCenter.position.set(-0.05, 1.72, 0.35);
    heartCenter.scale.set(1.12, 1.12, 1.12);

    const heartRight = create3DHeart();
    heartRight.position.set(2.55, 1.02, 0.25);
    heartRight.rotation.z = -0.22;
    heartRight.scale.set(0.95, 0.95, 0.95);

    logoGroup.add(heartLeft, heartCenter, heartRight);

    let targetRotX = 0;
    let targetRotY = 0;

    window.addEventListener('mousemove', (e) => {
      targetRotY = ((e.clientX / window.innerWidth) - 0.5) * 0.65;
      targetRotX = ((e.clientY / window.innerHeight) - 0.5) * 0.35;
    }, { passive: true });

    let clock = 0;
    function animateLogo() {
      if (PFV_STATE.motionEnabled) {
        clock += 0.025;
        logoGroup.rotation.y += (Math.sin(clock * 0.7) * 0.28 + targetRotY - logoGroup.rotation.y) * 0.06;
        logoGroup.rotation.x += (Math.cos(clock * 0.5) * 0.08 + targetRotX - logoGroup.rotation.x) * 0.06;

        heartLeft.position.y = 1.05 + Math.sin(clock * 1.6) * 0.11;
        heartCenter.position.y = 1.72 + Math.sin(clock * 1.6 + 0.8) * 0.13;
        heartRight.position.y = 1.02 + Math.sin(clock * 1.6 + 1.6) * 0.11;
      }
      renderer.render(scene, camera);
      requestAnimationFrame(animateLogo);
    }
    animateLogo();
  } catch (err) {
    // Fallback to 3D SVG layers automatically if WebGL context unavailable
  }
}

/* =========================================================
   2B. DICHROMATIC TACTILE DOT-MATRIX BACKGROUND
   Renders Purple dots on White sections & White dots on Purple Gradient sections
   ========================================================= */
function initTactileAccessibilityBackground() {
  const canvas = document.getElementById('tactile-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = 0;
  let height = 0;
  let dots = [];
  const SPACING = 46;
  const pointer = { x: -1000, y: -1000 };
  let scrollWaveY = 0;

  function buildGrid() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    dots = [];

    const cols = Math.ceil(width / SPACING);
    const rows = Math.ceil(height / SPACING);

    for (let r = 0; r <= rows; r++) {
      for (let c = 0; c <= cols; c++) {
        const isBrailleNode = ((r % 3 !== 0) && (c % 4 === 1 || c % 4 === 2)) && ((r + c) % 5 === 0);
        dots.push({
          x: c * SPACING,
          y: r * SPACING,
          baseR: isBrailleNode ? 1.65 : 1.05,
          isBrailleNode
        });
      }
    }
  }

  window.addEventListener('resize', buildGrid);
  buildGrid();

  window.addEventListener('mousemove', (e) => {
    pointer.x = e.clientX;
    pointer.y = e.clientY;
  }, { passive: true });

  window.addEventListener('scroll', () => {
    scrollWaveY = window.scrollY * 0.35;
  }, { passive: true });

  function draw() {
    ctx.clearRect(0, 0, width, height);

    const isHighContrast = document.body.classList.contains('high-contrast');
    const readingBandY = height * 0.42;

    // Collect vertical bounds of all Purple Gradient sections currently in viewport
    const purpleSections = document.querySelectorAll('.theme-band-purple');
    const purpleRanges = [];
    for (let s = 0; s < purpleSections.length; s++) {
      const sec = purpleSections[s];
      if (sec.offsetParent === null) continue;
      const rect = sec.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < height) {
        purpleRanges.push({ top: rect.top, bottom: rect.bottom });
      }
    }

    for (let i = 0; i < dots.length; i++) {
      const d = dots[i];
      let radius = d.baseR;

      // Determine if this dot's Y coordinate sits over a Purple Gradient section
      let onPurpleBand = false;
      for (let r = 0; r < purpleRanges.length; r++) {
        if (d.y >= purpleRanges[r].top && d.y <= purpleRanges[r].bottom) {
          onPurpleBand = true;
          break;
        }
      }

      let alpha = d.isBrailleNode ? (onPurpleBand ? 0.19 : 0.14) : (onPurpleBand ? 0.095 : 0.07);

      if (PFV_STATE.motionEnabled) {
        const dx = d.x - pointer.x;
        const dy = d.y - pointer.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150) {
          const factor = 1 - dist / 150;
          radius += factor * 1.9;
          alpha += factor * 0.25;
        }

        const bandDist = Math.abs(((d.y + scrollWaveY) % height) - readingBandY);
        if (bandDist < 70 && d.isBrailleNode) {
          const bandFactor = 1 - bandDist / 70;
          radius += bandFactor * 0.6;
          alpha += bandFactor * 0.09;
        }
      }

      const rgb = isHighContrast
        ? '253, 224, 71'
        : (onPurpleBand ? '253, 253, 249' : '75, 21, 117');

      ctx.beginPath();
      ctx.arc(d.x, d.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${rgb}, ${alpha.toFixed(3)})`;
      ctx.fill();
    }

    if (PFV_STATE.motionEnabled) {
      requestAnimationFrame(draw);
    }
  }

  draw();
  PFV_STATE.redrawBackground = draw;
}

/* =========================================================
   3. SCROLL-HIGHLIGHTED READING LINES & METRIC COUNTERS
   ========================================================= */
function initScrollHighlightedReading() {
  const scrollLines = Array.from(document.querySelectorAll('[data-scroll-line]'));

  function updateReadingFocus() {
    const vh = window.innerHeight;
    const focusTop = vh * 0.14;
    const focusBottom = vh * 0.78;

    scrollLines.forEach((line, idx) => {
      const rect = line.getBoundingClientRect();
      const lineMid = rect.top + rect.height / 2;

      if (window.scrollY < 60 && idx === 0) {
        line.classList.add('is-active');
        return;
      }

      if (lineMid >= focusTop && lineMid <= focusBottom) {
        line.classList.add('is-active');
      } else {
        line.classList.remove('is-active');
      }
    });

    const docHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const pct = Math.min(100, Math.max(6, (window.scrollY / docHeight) * 100));
    const fill = document.getElementById('dock-progress-fill');
    if (fill) fill.style.width = `${pct}%`;
  }

  window.addEventListener('scroll', updateReadingFocus, { passive: true });
  window.addEventListener('resize', updateReadingFocus);
  setTimeout(updateReadingFocus, 120);

  scrollLines.forEach((line) => {
    line.style.cursor = 'pointer';
    line.addEventListener('click', () => {
      line.classList.add('is-active');
    });
  });

  const counters = document.querySelectorAll('.counter-value');
  if ('IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target') || '0', 10);
        animateCounter(el, target);
        obs.unobserve(el);
      });
    }, { threshold: 0.35 });

    counters.forEach(c => counterObserver.observe(c));
  } else {
    counters.forEach(c => {
      c.textContent = Number(c.getAttribute('data-target') || 0).toLocaleString();
    });
  }
}

function animateCounter(el, target) {
  const duration = 1200;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - progress, 3);
    const val = Math.round(eased * target);
    el.textContent = val.toLocaleString();
    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      el.textContent = target.toLocaleString();
    }
  }
  requestAnimationFrame(tick);
}

/* =========================================================
   4. DIRECTORY OVERLAY & SECTION NAVIGATION
   ========================================================= */
function initDirectoryAndNavigation() {
  const menuOverlay = document.getElementById('spatial-menu-overlay');
  const openBtn = document.getElementById('btn-spatial-menu');
  const closeBtn = document.getElementById('btn-close-spatial-menu');
  const modeScrollBtn = document.getElementById('mode-scroll-btn');
  const modeMenuBtn = document.getElementById('mode-menu-btn');

  function openMenu() {
    if (!menuOverlay) return;
    menuOverlay.classList.add('open');
    menuOverlay.setAttribute('aria-hidden', 'false');
    if (openBtn) openBtn.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    if (!menuOverlay) return;
    menuOverlay.classList.remove('open');
    menuOverlay.setAttribute('aria-hidden', 'true');
    if (openBtn) openBtn.setAttribute('aria-expanded', 'false');
  }

  if (openBtn) {
    openBtn.addEventListener('click', () => {
      if (menuOverlay.classList.contains('open')) closeMenu();
      else openMenu();
    });
  }

  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuOverlay && menuOverlay.classList.contains('open')) {
      closeMenu();
    }
  });

  function navigateToSection(realmKey) {
    PFV_STATE.activeRealm = realmKey;

    document.querySelectorAll('[data-realm-link]').forEach(el => {
      el.classList.toggle('active', el.getAttribute('data-realm-link') === realmKey);
    });
    document.querySelectorAll('[data-realm-target]').forEach(el => {
      el.classList.toggle('active', el.getAttribute('data-realm-target') === realmKey);
    });
    document.querySelectorAll('[data-realm-jump]').forEach(el => {
      el.classList.toggle('active', el.getAttribute('data-realm-jump') === realmKey);
    });

    const targetSection = document.querySelector(`.editorial-section[data-realm="${realmKey}"]`) || document.getElementById(realmKey);

    if (PFV_STATE.viewMode === 'menu') {
      document.querySelectorAll('.editorial-section').forEach(sec => {
        sec.classList.toggle('active-realm', sec.getAttribute('data-realm') === realmKey);
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    closeMenu();
  }

  document.querySelectorAll('[data-realm-target]').forEach(row => {
    row.addEventListener('click', (e) => {
      e.preventDefault();
      navigateToSection(row.getAttribute('data-realm-target'));
    });
  });

  document.querySelectorAll('[data-realm-jump]').forEach(btn => {
    btn.addEventListener('click', () => {
      navigateToSection(btn.getAttribute('data-realm-jump'));
    });
  });

  document.querySelectorAll('[data-realm-link]').forEach(link => {
    link.addEventListener('click', (e) => {
      const realm = link.getAttribute('data-realm-link');
      if (PFV_STATE.viewMode === 'menu' && realm) {
        e.preventDefault();
        navigateToSection(realm);
      }
    });
  });

  function setViewMode(mode) {
    PFV_STATE.viewMode = mode;
    document.body.classList.toggle('menu-focus-mode', mode === 'menu');

    if (modeScrollBtn && modeMenuBtn) {
      modeScrollBtn.classList.toggle('active', mode === 'scroll');
      modeScrollBtn.setAttribute('aria-pressed', String(mode === 'scroll'));
      modeMenuBtn.classList.toggle('active', mode === 'menu');
      modeMenuBtn.setAttribute('aria-pressed', String(mode === 'menu'));
    }

    if (mode === 'menu') {
      document.querySelectorAll('.editorial-section').forEach(sec => {
        sec.classList.toggle('active-realm', sec.getAttribute('data-realm') === PFV_STATE.activeRealm);
      });
      showToast('Section Focus mode enabled.');
    } else {
      showToast('Continuous Scroll mode enabled.');
    }
  }

  if (modeScrollBtn) modeScrollBtn.addEventListener('click', () => setViewMode('scroll'));
  if (modeMenuBtn) modeMenuBtn.addEventListener('click', () => setViewMode('menu'));

  const sections = document.querySelectorAll('.editorial-section[data-realm]');
  if ('IntersectionObserver' in window) {
    const spy = new IntersectionObserver((entries) => {
      if (PFV_STATE.viewMode === 'menu') return;
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const r = entry.target.getAttribute('data-realm');
          PFV_STATE.activeRealm = r;
          document.querySelectorAll('[data-realm-jump]').forEach(b => {
            b.classList.toggle('active', b.getAttribute('data-realm-jump') === r);
          });
          document.querySelectorAll('.nav-link[data-realm-link]').forEach(l => {
            l.classList.toggle('active', l.getAttribute('data-realm-link') === r);
          });
        }
      });
    }, { threshold: 0.22 });

    sections.forEach(s => spy.observe(s));
  }
}

/* =========================================================
   5. ACCESSIBILITY CONTROLS
   ========================================================= */
function initAccessibilityControls() {
  const btnDec = document.getElementById('btn-font-decrease');
  const btnRes = document.getElementById('btn-font-reset');
  const btnInc = document.getElementById('btn-font-increase');
  const btnContrast = document.getElementById('btn-contrast');
  const btnDyslexia = document.getElementById('btn-dyslexia');
  const btnMotion = document.getElementById('btn-motion-toggle');
  const btnTts = document.getElementById('btn-tts-toggle');
  const ttsStatusText = document.getElementById('tts-status-text');

  function applyFontScale(scale) {
    PFV_STATE.fontScale = Math.max(85, Math.min(130, scale));
    document.documentElement.style.setProperty('--base-font-size', `${(16 * PFV_STATE.fontScale) / 100}px`);
  }

  if (btnDec) btnDec.addEventListener('click', () => applyFontScale(PFV_STATE.fontScale - 10));
  if (btnRes) btnRes.addEventListener('click', () => applyFontScale(100));
  if (btnInc) btnInc.addEventListener('click', () => applyFontScale(PFV_STATE.fontScale + 10));

  if (btnContrast) {
    btnContrast.addEventListener('click', () => {
      const active = document.body.classList.toggle('high-contrast');
      btnContrast.setAttribute('aria-pressed', String(active));
      if (PFV_STATE.redrawBackground) PFV_STATE.redrawBackground();
      showToast(active ? 'High Contrast AAA mode enabled' : 'Standard warm canvas restored');
    });
  }

  if (btnDyslexia) {
    btnDyslexia.addEventListener('click', () => {
      const active = document.body.classList.toggle('dyslexia-mode');
      btnDyslexia.setAttribute('aria-pressed', String(active));
      showToast(active ? 'Dyslexia-friendly spacing enabled' : 'Default typography restored');
    });
  }

  if (btnMotion) {
    btnMotion.addEventListener('click', () => {
      PFV_STATE.motionEnabled = !PFV_STATE.motionEnabled;
      document.body.classList.toggle('motion-paused', !PFV_STATE.motionEnabled);
      btnMotion.setAttribute('aria-pressed', String(!PFV_STATE.motionEnabled));
      btnMotion.textContent = PFV_STATE.motionEnabled ? 'Pause Motion' : 'Resume Motion';
      if (PFV_STATE.motionEnabled && PFV_STATE.redrawBackground) {
        PFV_STATE.redrawBackground();
      }
    });
  }

  if (btnTts) {
    btnTts.addEventListener('click', () => {
      PFV_STATE.ttsActive = !PFV_STATE.ttsActive;
      btnTts.setAttribute('aria-pressed', String(PFV_STATE.ttsActive));
      if (ttsStatusText) {
        ttsStatusText.textContent = PFV_STATE.ttsActive ? 'Voice Reader: On' : 'Voice Reader: Off';
      }
      if (!PFV_STATE.ttsActive && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        document.querySelectorAll('.tts-speaking-highlight').forEach(el => el.classList.remove('tts-speaking-highlight'));
      } else {
        showToast('Voice Reader active. Click any paragraph or row to hear it read aloud.');
      }
    });
  }

  document.addEventListener('click', (e) => {
    if (!PFV_STATE.ttsActive || !('speechSynthesis' in window)) return;
    const readable = e.target.closest('p, h1, h2, h3, .ledger-row, .coalition-row, .timetable-row');
    if (!readable || readable.closest('.a11y-toolbar')) return;

    window.speechSynthesis.cancel();
    document.querySelectorAll('.tts-speaking-highlight').forEach(el => el.classList.remove('tts-speaking-highlight'));

    readable.classList.add('tts-speaking-highlight');
    const utterance = new SpeechSynthesisUtterance(readable.innerText.trim());
    utterance.rate = 0.98;
    utterance.onend = () => readable.classList.remove('tts-speaking-highlight');
    window.speechSynthesis.speak(utterance);
  });

  document.querySelectorAll('.menu-a11y-trigger, .inline-a11y-proxy').forEach(proxy => {
    proxy.addEventListener('click', () => {
      const targetId = proxy.getAttribute('data-trigger') || proxy.getAttribute('data-proxy');
      const targetBtn = document.getElementById(targetId);
      if (targetBtn) targetBtn.click();
    });
  });
}

/* =========================================================
   6. INDIAN PARALYMPIC ICONS INTERACTIVE ROSTER
   ========================================================= */
const PARALYMPIANS_DATA = {
  avani: {
    classification: 'CLASSIFICATION: SH1 · RIFLE 10M & 50M',
    honours: 'Padma Shri · Major Dhyan Chand Khel Ratna',
    name: 'Avani Lekhara',
    bio: 'The first Indian woman in history to win two Paralympic Gold medals. Competing in the SH1 wheelchair shooting category, she set a new Paralympic Record of 249.7 in the R2 10m Air Rifle Standing SH1 at Paris 2024, defending her Tokyo 2020 crown with unmatched mechanical precision.',
    records: [
      'Gold Medal — Paris 2024 Paralympics (10m Air Rifle SH1 · PR 249.7)',
      'Gold Medal — Tokyo 2020 Paralympics (10m Air Rifle SH1 · WR Equalled)',
      'Bronze Medal — Tokyo 2020 Paralympics (50m Rifle 3 Positions SH1)',
      'Gold Medal — 2022 Asian Para Games, Hangzhou'
    ],
    session: 'Keynote Address on "Precision Biomechanics & Women in Para-Sports" + Live Adaptive Shooting & Laser-Target Demonstration at Zone 03 (MSU Sports Complex).'
  },
  sumit: {
    classification: 'CLASSIFICATION: F64 · JAVELIN THROW (PROSTHETIC)',
    honours: 'Padma Shri · Khel Ratna · Multiple World Record Holder',
    name: 'Sumit Antil',
    bio: 'India\'s dominant F64 Javelin powerhouse who broke his own Paralympic Record multiple times at Tokyo 2020 (68.55m) and Paris 2024 (70.59m), and holds the F64 World Record at 73.29m set at the Asian Para Games.',
    records: [
      'Gold Medal — Paris 2024 Paralympics (F64 Javelin · PR 70.59m)',
      'Gold Medal — Tokyo 2020 Paralympics (F64 Javelin · 68.55m)',
      'World Record Holder (73.29m) — Hangzhou Asian Para Games',
      '2× World Para Athletics Championship Gold Medalist (2023 & 2024)'
    ],
    session: 'Masterclass on "Carbon-Fibre Running & Throwing Blade Biomechanics" with MSU Baroda Engineering & GMERS Sports Medicine faculty.'
  },
  devendra: {
    classification: 'CLASSIFICATION: F46 · JAVELIN THROW · PRESIDENT, PCI',
    honours: 'Padma Bhushan · Major Dhyan Chand Khel Ratna · Arjuna Award',
    name: 'Devendra Jhajharia',
    bio: 'India\'s most decorated Paralympic pioneer and current President of the Paralympic Committee of India (PCI). First Indian to win two Paralympic Gold medals (Athens 2004 & Rio 2016) plus a Silver at Tokyo 2020 in the F46 Javelin category.',
    records: [
      'Gold Medal & World Record — Athens 2004 Paralympics (F44/46 Javelin)',
      'Gold Medal & World Record (63.97m) — Rio 2016 Paralympics',
      'Silver Medal — Tokyo 2020 Paralympics (Personal Best 64.35m)',
      'First Para-Athlete in Indian History conferred the Padma Bhushan (2022)'
    ],
    session: 'Inaugural Plenary: "Viksit Bharat @ 2047 — Building India\'s Grassroots Paralympic Pipeline for 2028 & 2036 Games".'
  },
  sheetal: {
    classification: 'CLASSIFICATION: OPEN COMPOUND PARA-ARCHERY',
    honours: 'Arjuna Award (2023) · World Para Archery Best Youth Athlete',
    name: 'Sheetal Devi',
    bio: 'Born with phocomelia, Sheetal Devi is the world\'s first armless female international para-archery champion. Shooting with a custom foot-and-shoulder mechanical release system, she scored a 703/720 ranking round at Paris 2024.',
    records: [
      'Bronze Medal — Paris 2024 Paralympics (Mixed Team Compound Open)',
      '2× Gold Medal — Hangzhou 2022 Asian Para Games (Individual & Mixed)',
      'Silver Medal — 2023 World Para Archery Championships, Plzeň',
      'World No. 1 Ranked Women\'s Compound Para-Archer (2023–24)'
    ],
    session: 'Live Adaptive Archery Mechanics & Youth Sports Demonstration at MSU Sports Complex.'
  },
  deepa: {
    classification: 'CLASSIFICATION: F53 · SHOT PUT, JAVELIN & MOTORSPORTS',
    honours: 'Padma Shri · Khel Ratna · Former President, PCI',
    name: 'Dr. Deepa Malik',
    bio: 'The first Indian woman to win a Paralympic medal (Silver in F53 Shot Put at Rio 2016) and a key architect of India\'s modern disability sports policy, adaptive motorsports, and Accessible India advocacy.',
    records: [
      'Silver Medal — Rio 2016 Paralympics (Shot Put F53 · 4.61m)',
      '4× Asian Para Games Medalist (Javelin, Shot Put & Swimming)',
      '58 National & 23 International Medals across Para-Athletics',
      'Limca World Record Holder in Hand-Controlled High-Altitude Rallying'
    ],
    session: 'Policy Roundtable: "Universal Urban Mobility, Women with Disabilities & Corporate DEI Leadership".'
  },
  bhavina: {
    classification: 'CLASSIFICATION: CLASS 4 · WHEELCHAIR TABLE TENNIS',
    honours: 'Arjuna Award · Proud Daughter of Gujarat (Mehsana / Ahmedabad)',
    name: 'Bhavina Patel',
    bio: 'Hailing from Gujarat, Bhavina Patel created history at Tokyo 2020 as the first Indian table tennis player ever to reach a Paralympic Final and win Silver, followed by Commonwealth Games 2022 Gold in Birmingham.',
    records: [
      'Silver Medal — Tokyo 2020 Paralympics (Women\'s Singles Class 4)',
      'Gold Medal — Birmingham 2022 Commonwealth Games (Para-Table Tennis)',
      'Bronze Medal — Hangzhou 2022 Asian Para Games',
      'Multiple International ITTF Para-Table Tennis Open Titles'
    ],
    session: 'Host State Spotlight: "Gujarat\'s Para-Sports Ecosystem & Live Wheelchair Table Tennis Exhibition Match" at Zone 03.'
  },
  mariyappan: {
    classification: 'CLASSIFICATION: T42 / T63 · HIGH JUMP',
    honours: 'Padma Shri · Major Dhyan Chand Khel Ratna · Arjuna Award',
    name: 'Mariyappan Thangavelu',
    bio: 'The first Indian para-athlete to win medals across three consecutive Paralympic Games — Gold at Rio 2016 (1.89m), Silver at Tokyo 2020 (1.86m), and Bronze at Paris 2024 (1.85m) in Men\'s High Jump.',
    records: [
      'Gold Medal — Rio 2016 Paralympics (High Jump T42 · 1.89m)',
      'Silver Medal — Tokyo 2020 Paralympics (High Jump T63 · 1.86m)',
      'Bronze Medal — Paris 2024 Paralympics (High Jump T63 · 1.85m)',
      'Consistent Elite Podium Finisher across 3 Olympiad Cycles (2016–2024)'
    ],
    session: 'High-Performance Athletics Clinic for School & University Physical Education Directors.'
  },
  praveen: {
    classification: 'CLASSIFICATION: T64 · HIGH JUMP',
    honours: 'Arjuna Award · Asian Record Holder (2.08m)',
    name: 'Praveen Kumar',
    bio: 'Upgrading his Tokyo 2020 Silver (2.07m) to Paralympic Gold at Paris 2024 with a new Asian Record leap of 2.08m in the Men\'s High Jump T64 classification.',
    records: [
      'Gold Medal & Asian Record (2.08m) — Paris 2024 Paralympics (T64)',
      'Silver Medal & Asian Record (2.07m) — Tokyo 2020 Paralympics',
      'Gold Medal — Hangzhou 2022 Asian Para Games (High Jump T64)',
      'Bronze Medal — 2023 World Para Athletics Championships, Paris'
    ],
    session: 'Biomechanics & High Jump Exhibition at MSU Baroda Athletics Track.'
  }
};

function initParalympiansExplorer() {
  const tabs = document.querySelectorAll('.para-tab');
  const classEl = document.getElementById('para-classification');
  const honoursEl = document.getElementById('para-honours');
  const nameEl = document.getElementById('para-name');
  const bioEl = document.getElementById('para-bio');
  const recordsEl = document.getElementById('para-records');
  const sessionEl = document.getElementById('para-session');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const key = tab.getAttribute('data-athlete');
      const data = PARALYMPIANS_DATA[key];
      if (!data) return;

      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      if (classEl) classEl.textContent = data.classification;
      if (honoursEl) honoursEl.textContent = data.honours;
      if (nameEl) nameEl.textContent = data.name;
      if (bioEl) bioEl.textContent = data.bio;
      if (sessionEl) sessionEl.textContent = data.session;
      if (recordsEl) {
        recordsEl.innerHTML = data.records.map(r => `<li>${r}</li>`).join('');
      }
    });
  });
}

/* =========================================================
   7. THE 21 BENCHMARK DISABILITIES (RPwD ACT, 2016)
   Complete Statutory Schedule (01 to 21)
   ========================================================= */
const RPWD_21_DISABILITIES = [
  { num: '01', cat: 'sensory', division: 'Visual Impairment', name: 'Blindness', spec: 'Visual acuity < 3/60 or < 10/200 (Snellen) in better eye with best correction, or field of vision < 10° · Tactile Braille & Audio Beacons provided.' },
  { num: '02', cat: 'sensory', division: 'Visual Impairment', name: 'Low-Vision', spec: 'Visual acuity not exceeding 6/18 or < 20/60 up to 3/60, or field of vision < 40° up to 10° · High-Contrast WCAG AAA signage & magnifiers.' },
  { num: '03', cat: 'locomotor', division: 'Locomotor & Physical', name: 'Leprosy Cured Persons', spec: 'Cured of leprosy but experiencing loss of sensation in hands/feet, paresis in eye/eyelid, or manifest deformity · Ergonomic grip & mobility support.' },
  { num: '04', cat: 'sensory', division: 'Hearing Impairment', name: 'Hearing Impairment (Deaf & Hard of Hearing)', spec: 'Deaf (>= 70 dB hearing loss in speech frequencies in both ears) or Hard of Hearing (60 dB to 70 dB) · Certified ISL Interpreters & CART Live Captions.' },
  { num: '05', cat: 'locomotor', division: 'Locomotor & Physical', name: 'Locomotor Disability', spec: 'Substantial restriction of the movement of limbs resulting from bones, joints, or muscle conditions · Zero-step 1:12 ramps & 3m wheelchair aisles.' },
  { num: '06', cat: 'locomotor', division: 'Locomotor & Physical', name: 'Dwarfism', spec: 'Medical or genetic condition resulting in an adult height of 4 feet 10 inches (147 cm) or less · Dual-height registration counters & reach-adjusted podiums.' },
  { num: '07', cat: 'neuro', division: 'Intellectual & Neurodevelopmental', name: 'Intellectual Disability', spec: 'Significant limitations both in intellectual functioning (reasoning, learning, problem solving) and in adaptive behaviour · Easy-Read visual guides.' },
  { num: '08', cat: 'chronic', division: 'Mental Behaviour', name: 'Mental Illness', spec: 'Substantial disorder of thinking, mood, perception, orientation, or memory affecting behaviour and daily functioning · Peer-support & psychosocial lounge.' },
  { num: '09', cat: 'neuro', division: 'Intellectual & Neurodevelopmental', name: 'Autism Spectrum Disorder (ASD)', spec: 'Neurodevelopmental condition affecting social communication, sensory processing, and behavioural patterns · Acoustic-dampened Sensory Quiet Rooms.' },
  { num: '10', cat: 'locomotor', division: 'Locomotor & Physical', name: 'Cerebral Palsy', spec: 'Group of non-progressive neurological conditions affecting body movement and muscle coordination · Adaptive seating, postural support & AAC boards.' },
  { num: '11', cat: 'locomotor', division: 'Locomotor & Physical', name: 'Muscular Dystrophy', spec: 'Group of hereditary genetic muscle diseases that weaken the skeletal muscles over time · Motorized wheelchair charging bays & hydraulic shuttle lifts.' },
  { num: '12', cat: 'chronic', division: 'Chronic Neurological', name: 'Chronic Neurological Conditions', spec: 'Long-term neurological conditions requiring continuous clinical and environmental accommodation · Priority rest lounges & GMERS medical desk.' },
  { num: '13', cat: 'neuro', division: 'Intellectual & Neurodevelopmental', name: 'Specific Learning Disabilities (SLD)', spec: 'Conditions including Dyslexia, Dysgraphia, Dyscalculia, Dyspraxia & Developmental Aphasia · Dyslexia-friendly typography & UDL educator track.' },
  { num: '14', cat: 'chronic', division: 'Chronic Neurological', name: 'Multiple Sclerosis (MS)', spec: 'Inflammatory demyelinating disease in which insulating covers of nerve cells in brain and spinal cord are damaged · Climate-controlled rest bays.' },
  { num: '15', cat: 'sensory', division: 'Speech & Language', name: 'Speech and Language Disability', spec: 'Permanent disability arising out of conditions such as laryngectomy or aphasia affecting speech/language · Text-to-Speech & AAC communication terminals.' },
  { num: '16', cat: 'chronic', division: 'Blood Disorders', name: 'Thalassemia', spec: 'Inherited blood disorder characterized by reduced or absent synthesis of hemoglobin chains · Dedicated sterile medical care room & GMERS haematology team.' },
  { num: '17', cat: 'chronic', division: 'Blood Disorders', name: 'Hemophilia', spec: 'Inheritable bleeding disorder causing impaired blood clotting and risk of spontaneous joint/internal bleeding · On-site emergency factor-support medical unit.' },
  { num: '18', cat: 'chronic', division: 'Blood Disorders', name: 'Sickle Cell Disease', spec: 'Hemolytic genetic blood disorder marked by chronic anemia, vaso-occlusive pain crises, and organ stress · Hydration stations & climate-controlled rest bays.' },
  { num: '19', cat: 'multiple', division: 'Multiple Disabilities', name: 'Multiple Disabilities (including Deaf-Blindness)', spec: 'Two or more specified benchmark disabilities, including Deaf-Blindness · Dedicated Tactile Sign Language (Pro-Tactile) interpreters & 1:1 escort support.' },
  { num: '20', cat: 'chronic', division: 'Special Statutory Category', name: 'Acid Attack Victims', spec: 'Survivors disfigured by violent acid or corrosive substance attacks · Dignity-centered clinical reconstructive, legal aid & enterprise empowerment tracks.' },
  { num: '21', cat: 'chronic', division: 'Chronic Neurological', name: 'Parkinson\'s Disease', spec: 'Progressive nervous system disease marked by tremor, muscular rigidity, and slow, imprecise movement · Stabilized handrails, seating & assistive utensils.' }
];

function initBenchmarkDisabilitiesLedger() {
  const grid = document.getElementById('rpwd-ledger-grid');
  const filters = document.querySelectorAll('.rpwd-filter');
  const countLabel = document.getElementById('rpwd-count-label');
  if (!grid) return;

  function renderRPWD(filterKey) {
    const items = filterKey === 'all'
      ? RPWD_21_DISABILITIES
      : RPWD_21_DISABILITIES.filter(d => d.cat === filterKey);

    if (countLabel) {
      countLabel.textContent = `Showing ${items.length} of 21 Statutory Classifications`;
    }

    grid.innerHTML = items.map(item => `
      <div class="ledger-row" role="row">
        <span class="ledger-cell-idx" role="cell">${item.num}</span>
        <span class="ledger-cell-role" role="cell">${item.division}</span>
        <strong class="ledger-cell-name" role="cell">${item.name}</strong>
        <span class="ledger-cell-org" role="cell">${item.spec}</span>
      </div>
    `).join('');
  }

  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderRPWD(btn.getAttribute('data-rpwd') || 'all');
    });
  });

  renderRPWD('all');
}

/* =========================================================
   8. SIX EXPERIENCE ZONES EXPLORER
   ========================================================= */
const ZONES_DATA = {
  expo: {
    index: 'Zone 01 / Main Exhibition Ground · 60+ Stalls',
    sensory: 'Sensory Level: Moderate · 3m Step-Free Aisles',
    title: 'Assistive Tech & Commercial Stalls Expo',
    description: 'Over 60 modular Octanorm stalls and corporate pavilions showcasing indigenous bionic prosthetics, refreshable Braille displays, AI vision wearables, eye-tracking systems, and mobility hardware across all 21 Benchmark Disabilities.',
    image: 'purple_expo.jpg',
    imageCaption: 'ZONE VISUAL // Smart Prosthetics, AI Braille Tablets & Eye-Tracking Stalls',
    highlights: [
      'Live mobility test track for motorized & all-terrain wheelchairs',
      'Refreshable Braille & AI screen-reading hardware demonstrations',
      'ALIMCO assessment desk & prosthetic fitting consultations',
      'Dedicated B2B & institutional procurement lounge'
    ],
    access: '3-metre wide step-free aisles, tactile floor routing, ISL interpreters at every pavilion cluster, and dedicated stall booking for exhibitors.'
  },
  conclave: {
    index: 'Zone 02 / Sayaji Nagar Gruh Auditorium',
    sensory: 'Sensory Level: Acoustic Controlled · Live ISL & Captions',
    title: 'Viksit Bharat Conclave & We Care Cinema',
    description: 'National policy roundtables on Viksit Bharat @ 2047 and RPwD Act 2016 implementation led by TISS Mumbai, Brotherhood, and State Disability Commissioners alongside screenings from the We Care Film Festival.',
    image: 'purple_fest_hero.jpg',
    imageCaption: 'ZONE VISUAL // National Policy Plenary & Inclusive Cultural Stage',
    highlights: [
      'Viksit Bharat @ 2047 Policy Blueprint & RPwD Act 21-Disability Audit',
      'Award-winning international documentaries with audio description',
      'Universal Design for Learning (UDL) academic paper presentations',
      'Clinical rehabilitation workshops by MSU Baroda & GMERS faculty'
    ],
    access: 'Dual-screen certified Indian Sign Language (ISL) interpretation, real-time CART captioning, inductive hearing loops, and front-row ramp access onto the stage.'
  },
  sports: {
    index: 'Zone 03 / MSU Sports Complex',
    sensory: 'Sensory Level: High Performance · Adaptive Equipment',
    title: 'Paralympic & Adaptive Sports Arena',
    description: 'Live demonstrations, technical biomechanics clinics, and exhibition matches featuring India\'s Paralympic Champions across para-shooting, javelin, para-table tennis, wheelchair basketball, and boccia.',
    image: 'purple_sports.jpg',
    imageCaption: 'ZONE VISUAL // Wheelchair Basketball & Blind Cricket Arena',
    highlights: [
      'Paralympic Champions Meet & Biomechanics Masterclasses',
      'West Zone Wheelchair Basketball & Para-Table Tennis Exhibitions',
      'Blind Cricket & Goalball acoustic sound-ball matches',
      'Adaptive sports classification clinic for emerging Gujarat athletes'
    ],
    access: 'Sport-grade wheelchair surfaces, acoustic boundary bells, shaded accessible bleachers, and sports medicine hydration bays.'
  },
  culture: {
    index: 'Zone 04 / Open-Air Amphitheatre',
    sensory: 'Sensory Level: Vibrant · Tactile Sub-Bass Flooring',
    title: 'Kaleidoscope Cultural Amphitheatre',
    description: 'Evening performances featuring classical wheelchair choreography, blind symphony ensembles, Vadodara Inclusive Garba, sign-language poetry, and adaptive fashion design.',
    image: 'purple_fest_hero.jpg',
    imageCaption: 'ZONE VISUAL // Kaleidoscope Main Stage — Wheelchair Percussion & Garba',
    highlights: [
      'Miracle on Wheels & classical wheelchair fusion choreography',
      'Sanskari Nagari Inclusive Garba & folk showcase',
      'Sign-language musical theatre & acoustic ensemble',
      'Adaptive industrial clothing & functional fashion showcase'
    ],
    access: 'Zero-step stage ramps, tactile vibration zones for Deaf guests, audio-described performance introductions, and ear-defender distribution.'
  },
  empathy: {
    index: 'Zone 05 / Experiential Pavilion',
    sensory: 'Sensory Level: Controlled · Guided Small-Group Labs',
    title: 'Sensory & Universal Design Lab',
    description: 'Architectural and sensory simulation laboratories designed for urban planners, engineers, architects, and educators to test non-visual navigation, acoustic environments, and wheelchair ergonomics.',
    image: 'purple_expo.jpg',
    imageCaption: 'ZONE VISUAL // Tactile Braille & Eye-Tracking Simulation Lab',
    highlights: [
      'Non-visual tactile & acoustic navigation lab led by blind facilitators',
      'Sign-Language Communication Studio',
      'Urban Curb-Cut & Wheelchair Ergonomics Audit Track for architects',
      'Neurodiversity & sensory-friendly classroom architecture model'
    ],
    access: 'Pre-briefed orientation, immediate exit doors in every room, occupational therapists on standby, and zero strobe lighting.'
  },
  career: {
    index: 'Zone 06 / Placement Concourse',
    sensory: 'Sensory Level: Calm · Accessible Interview Bays',
    title: 'DEI Corporate Recruitment & Enterprise Hub',
    description: 'Connecting skilled professionals and graduates across all 21 Benchmark Disabilities with DEI corporate employers, assistive workplace software providers, and startup incubation.',
    image: 'purple_expo.jpg',
    imageCaption: 'ZONE VISUAL // Assistive Workplace Tech & DEI Enterprise Concourse',
    highlights: [
      'Direct corporate recruitment interviews across IT, BFSI & manufacturing',
      'Assistive workplace hardware & screen-reader onboarding clinic',
      'Divyangjan Founder Pitch Deck & micro-enterprise showcase',
      'UDID registration & corporate CSR partnership desk'
    ],
    access: 'Dedicated ISL interpreters for candidate interviews, screen-reader equipped assessment terminals, and step-free interview bays.'
  }
};

function initZonesExplorer() {
  const tabs = document.querySelectorAll('.exp-zone-tab');
  const badgeEl = document.getElementById('zone-badge');
  const sensoryEl = document.getElementById('zone-sensory');
  const titleEl = document.getElementById('zone-title');
  const descEl = document.getElementById('zone-description');
  const listEl = document.getElementById('zone-highlights');
  const accessEl = document.getElementById('zone-access-note');
  const imgEl = document.getElementById('zone-event-img');
  const imgCapEl = document.getElementById('zone-img-caption');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const key = tab.getAttribute('data-zone');
      const data = ZONES_DATA[key];
      if (!data) return;

      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      if (badgeEl) badgeEl.textContent = data.index;
      if (sensoryEl) sensoryEl.textContent = data.sensory;
      if (titleEl) titleEl.textContent = data.title;
      if (descEl) descEl.textContent = data.description;
      if (accessEl) accessEl.textContent = data.access;
      if (imgEl && data.image) imgEl.src = data.image;
      if (imgCapEl && data.imageCaption) imgCapEl.textContent = data.imageCaption;
      if (listEl) {
        listEl.innerHTML = data.highlights.map(item => `<li>${item}</li>`).join('');
      }
    });
  });
}

/* =========================================================
   9. THREE-DAY SWISS TIMETABLE & ITINERARY BUILDER
   ========================================================= */
const SCHEDULE_ITEMS = [
  // DAY 1: 14 JAN 2027
  { id: 'd1-1', day: '1', time: '09:30 – 11:00', title: 'Grand Inauguration: Viksit Bharat @ 2047 & Inclusive India', desc: 'Opening plenary with Dr. Satendra Singh, Mr. Satish Kapoor, Prof. Vaishali Kolhe, Praangan leadership & Indian Paralympic Icons.', venue: 'Main Auditorium, MSU', category: 'conclave', tags: ['Viksit Bharat', 'ISL', 'Live Captions'] },
  { id: 'd1-2', day: '1', time: '11:30 – 13:00', title: '60+ Assistive Tech Stalls & Commercial Expo Opening', desc: 'Ribbon-cutting of Tier A–D Exhibition Stalls featuring bionic prosthetics, Braille hardware, and AI wearables.', venue: 'Zone 01 · Exhibition Ground', category: 'tech', tags: ['60+ Stalls', 'B2B & Trials'] },
  { id: 'd1-3', day: '1', time: '14:00 – 15:45', title: 'Statutory Conclave: The 21 Benchmark Disabilities (RPwD Act 2016)', desc: 'Comprehensive policy and clinical audit across all 21 recognized disability categories led by TISS Mumbai & GMERS.', venue: 'Zone 02 · Sayaji Nagar Gruh', category: 'conclave', tags: ['RPwD Act 2016', '21 Categories'] },
  { id: 'd1-4', day: '1', time: '16:00 – 17:45', title: 'Paralympic Champions Keynote & Live Biomechanics Clinic', desc: 'Featuring India\'s Paralympic medalists in shooting, javelin, archery, and table tennis on elite sports science.', venue: 'Zone 03 · MSU Sports Complex', category: 'sports', tags: ['Paralympians', 'Live Clinic'] },
  { id: 'd1-5', day: '1', time: '18:30 – 20:30', title: 'Kaleidoscope Opening Night: Classical & Wheelchair Choreography', desc: 'Evening performance showcase with tactile sub-bass flooring and sign-language ensemble.', venue: 'Zone 04 · Amphitheatre', category: 'culture', tags: ['ISL', 'Tactile Audio'] },

  // DAY 2: 15 JAN 2027
  { id: 'd2-1', day: '2', time: '10:00 – 11:45', title: 'National Conclave: Universal Design for Learning (UDL) in Education', desc: 'Led by TISS Mumbai (CDSA) & GIEN on implementing SLD, ASD, and sensory accommodations across schools & universities.', venue: 'Zone 02 · Sayaji Nagar Gruh', category: 'conclave', tags: ['GIEN', 'TISS Mumbai'] },
  { id: 'd2-2', day: '2', time: '12:00 – 13:30', title: 'Indigenous Assistive Hardware & Bionic Engineering Showcase', desc: 'Exhibitor stall demonstrations by deep-tech startups, MSU Baroda engineering teams, and clinical researchers.', venue: 'Zone 01 · Exhibition Stalls', category: 'tech', tags: ['Make in India', 'Assistive R&D'] },
  { id: 'd2-3', day: '2', time: '14:30 – 16:15', title: 'We Care Film Festival: International Cinema & Director Dialogue', desc: 'Curated screenings from the UNESCO-supported We Care Film Festival with audio description and subtitles.', venue: 'Zone 02 · Sayaji Nagar Gruh', category: 'conclave', tags: ['Audio Described', 'Subtitled'] },
  { id: 'd2-4', day: '2', time: '16:30 – 18:15', title: 'Para-Table Tennis & Wheelchair Basketball Invitational Finals', desc: 'Featuring Gujarat para-table tennis stars and West Zone wheelchair basketball teams.', venue: 'Zone 03 · MSU Sports Complex', category: 'sports', tags: ['Para-Sports', 'Championship'] },
  { id: 'd2-5', day: '2', time: '18:30 – 20:30', title: 'Sanskari Nagari Inclusive Garba & Adaptive Industrial Fashion', desc: 'Zero-step Garba arena and functional adaptive clothing showcase.', venue: 'Zone 04 · Amphitheatre', category: 'culture', tags: ['Inclusive Garba', 'Adaptive Design'] },

  // DAY 3: 16 JAN 2027
  { id: 'd3-1', day: '3', time: '10:00 – 13:00', title: 'DEI Corporate Recruitment Drive & Enterprise B2B Networking', desc: 'Direct hiring interviews and exhibitor stall procurement meetings for corporate and institutional buyers.', venue: 'Zone 06 · Placement Concourse', category: 'tech', tags: ['DEI Hiring', 'Enterprise Stalls'] },
  { id: 'd3-2', day: '3', time: '13:30 – 15:15', title: 'Vadodara Declaration for Viksit Bharat @ 2047 Barrier-Free Cities', desc: 'Drafting municipal accessibility standards with Goa PwD Commission mentors, civic architects, and legal experts.', venue: 'Zone 02 · Sayaji Nagar Gruh', category: 'conclave', tags: ['Viksit Bharat 2047', 'Policy'] },
  { id: 'd3-3', day: '3', time: '15:30 – 17:00', title: 'Para-Athletics, Boccia & Blind Cricket Honours', desc: 'Closing sporting exhibitions and athlete recognition ceremony.', venue: 'Zone 03 · MSU Sports Complex', category: 'sports', tags: ['Para-Athletics', 'Medal Ceremony'] },
  { id: 'd3-4', day: '3', time: '17:30 – 19:30', title: 'Valedictory Plenary & Delegate Certificate Distribution', desc: 'Closing honours for registered delegates and stall exhibitors.', venue: 'Main Auditorium, MSU', category: 'culture', tags: ['Valedictory', 'Delegate Honours'] }
];

function initSchedule() {
  const grid = document.getElementById('schedule-grid');
  const dayTabs = document.querySelectorAll('.day-tab');
  const filterPills = document.querySelectorAll('.sched-filter');
  const savedBadge = document.getElementById('saved-count-badge');
  const drawer = document.getElementById('itinerary-drawer');
  const openDrawerBtn = document.getElementById('btn-saved-schedule');
  const closeDrawerBtn = document.getElementById('btn-close-drawer');
  const itineraryList = document.getElementById('itinerary-list');

  let activeDay = '1';
  let activeCategory = 'all';
  let savedIds = [];

  try {
    savedIds = JSON.parse(localStorage.getItem('pfv_saved_schedule') || '[]');
  } catch (e) {
    savedIds = [];
  }

  function saveState() {
    try {
      localStorage.setItem('pfv_saved_schedule', JSON.stringify(savedIds));
    } catch (e) {}
    if (savedBadge) savedBadge.textContent = String(savedIds.length);
    renderDrawer();
  }

  function renderTimetable() {
    if (!grid) return;
    const filtered = SCHEDULE_ITEMS.filter(item => {
      const matchDay = item.day === activeDay;
      const matchCat = activeCategory === 'all' || item.category === activeCategory;
      return matchDay && matchCat;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `<div class="py-5 text-muted">No sessions in this filter for Day 0${activeDay}. Try selecting "All".</div>`;
      return;
    }

    grid.innerHTML = filtered.map(item => {
      const isSaved = savedIds.includes(item.id);
      return `
        <article class="timetable-row">
          <div class="tt-time">${item.time}</div>
          <div class="tt-main">
            <h3 class="tt-title">${item.title}</h3>
            <p class="tt-desc">${item.desc}</p>
            <div class="tt-tags">
              ${item.tags.map(t => `<span class="tt-tag">[${t}]</span>`).join('')}
            </div>
          </div>
          <div class="tt-venue">${item.venue}</div>
          <div class="tt-action">
            <button type="button" class="btn-save-session ${isSaved ? 'saved' : ''}" data-session-id="${item.id}" aria-pressed="${isSaved}">
              ${isSaved ? '✓ Saved' : '+ Save'}
            </button>
          </div>
        </article>
      `;
    }).join('');

    grid.querySelectorAll('.btn-save-session').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-session-id');
        if (savedIds.includes(id)) {
          savedIds = savedIds.filter(x => x !== id);
          showToast('Removed from your itinerary');
        } else {
          savedIds.push(id);
          showToast('Saved to your personal itinerary');
        }
        saveState();
        renderTimetable();
      });
    });
  }

  function renderDrawer() {
    if (!itineraryList) return;
    if (savedIds.length === 0) {
      itineraryList.innerHTML = `<p class="text-muted small">No sessions saved yet. Click "+ Save" on any programme row to build your personal schedule.</p>`;
      return;
    }

    const items = SCHEDULE_ITEMS.filter(i => savedIds.includes(i.id));
    itineraryList.innerHTML = items.map(item => `
      <div class="saved-item-row">
        <div>
          <span class="d-block small text-muted">Day 0${item.day} · ${item.time}</span>
          <strong>${item.title}</strong>
          <span class="d-block small text-muted">${item.venue}</span>
        </div>
        <button type="button" class="btn-minimal-outline btn-sm remove-saved-btn" data-id="${item.id}">×</button>
      </div>
    `).join('');

    itineraryList.querySelectorAll('.remove-saved-btn').forEach(b => {
      b.addEventListener('click', () => {
        const id = b.getAttribute('data-id');
        savedIds = savedIds.filter(x => x !== id);
        saveState();
        renderTimetable();
      });
    });
  }

  dayTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      dayTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      activeDay = tab.getAttribute('data-day');
      renderTimetable();
    });
  });

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeCategory = pill.getAttribute('data-category');
      renderTimetable();
    });
  });

  if (openDrawerBtn && drawer) {
    openDrawerBtn.addEventListener('click', () => {
      drawer.classList.add('open');
      drawer.setAttribute('aria-hidden', 'false');
    });
  }

  if (closeDrawerBtn && drawer) {
    closeDrawerBtn.addEventListener('click', () => {
      drawer.classList.remove('open');
      drawer.setAttribute('aria-hidden', 'true');
    });
  }

  saveState();
  renderTimetable();
}

/* =========================================================
   10. COUNTDOWN TO 14 JANUARY 2027
   ========================================================= */
function initCountdown() {
  const daysEl = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minsEl = document.getElementById('cd-mins');
  const secsEl = document.getElementById('cd-secs');
  if (!daysEl) return;

  const targetDate = new Date('2027-01-14T09:00:00+05:30').getTime();

  function update() {
    const now = Date.now();
    const diff = Math.max(0, targetDate - now);
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    daysEl.textContent = String(d).padStart(2, '0');
    hoursEl.textContent = String(h).padStart(2, '0');
    minsEl.textContent = String(m).padStart(2, '0');
    secsEl.textContent = String(s).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

/* =========================================================
   11. SEPARATE STALL BOOKING + ₹2,200 DELEGATE REGISTRATION
   WITH RAZORPAY API PLACEHOLDER CHECKOUT
   ========================================================= */
function initRegistrationAndRazorpay() {
  const delegateForm = document.getElementById('registration-form');
  const stallForm = document.getElementById('stall-booking-form');
  const stallTierSelect = document.getElementById('stall-tier');
  const stallBtnAmount = document.getElementById('stall-btn-amount');

  const rzpModal = document.getElementById('razorpay-modal');
  const rzpCloseBtn = document.getElementById('btn-rzp-close');
  const rzpConfirmBtn = document.getElementById('btn-rzp-confirm');
  const rzpConfirmText = document.getElementById('btn-rzp-confirm-text');
  const rzpOrderDesc = document.getElementById('rzp-order-desc');
  const rzpAmountDisplay = document.getElementById('rzp-amount-display');
  const rzpPayloadPreview = document.getElementById('rzp-payload-preview');

  const ticketOutput = document.getElementById('ticket-output');
  const passEyebrow = document.getElementById('pass-eyebrow-text');
  const idDisplay = document.getElementById('pass-id-display');
  const nameDisplay = document.getElementById('pass-name-display');
  const roleDisplay = document.getElementById('pass-role-display');
  const a11yDisplay = document.getElementById('pass-a11y-display');
  const rzpIdDisplay = document.getElementById('pass-rzp-display');
  const qrCanvas = document.getElementById('pass-qr-canvas');
  const printBtn = document.getElementById('btn-print-pass');
  const downloadBtn = document.getElementById('btn-download-pass');

  let pendingCheckout = null;

  // Update Stall button price dynamically when tier changes
  if (stallTierSelect && stallBtnAmount) {
    stallTierSelect.addEventListener('change', () => {
      const val = Number(stallTierSelect.value || 15000);
      stallBtnAmount.textContent = `₹${val.toLocaleString('en-IN')} →`;
    });
  }

  /**
   * Opens the Razorpay API Placeholder Checkout (or live window.Razorpay if loaded)
   */
  function openRazorpayCheckout(orderData) {
    pendingCheckout = orderData;

    const rzpOptionsPayload = {
      key: RAZORPAY_CONFIG.key_id,
      amount: orderData.amountInr * 100, // in paise
      currency: RAZORPAY_CONFIG.currency,
      name: RAZORPAY_CONFIG.merchant_name,
      description: orderData.description,
      order_id: `order_PFV2027_${Math.floor(100000 + Math.random() * 900000)}`,
      prefill: {
        name: orderData.name,
        email: orderData.email,
        contact: orderData.phone
      },
      notes: {
        type: orderData.type,
        category: orderData.category,
        spec: orderData.spec
      }
    };

    // If real Razorpay SDK is injected later and a live key is configured, it can be invoked directly:
    if (typeof window.Razorpay === 'function' && !RAZORPAY_CONFIG.key_id.includes('PLACEHOLDER')) {
      const rzp = new window.Razorpay({
        ...rzpOptionsPayload,
        handler: function (response) {
          completeVerifiedIssuance(orderData, response.razorpay_payment_id);
        }
      });
      rzp.open();
      return;
    }

    // Otherwise display the interactive Razorpay API Placeholder Modal
    if (rzpOrderDesc) rzpOrderDesc.textContent = orderData.description;
    if (rzpAmountDisplay) rzpAmountDisplay.textContent = `₹${orderData.amountInr.toLocaleString('en-IN')}`;
    if (rzpConfirmText) rzpConfirmText.textContent = `Complete Razorpay Payment · ₹${orderData.amountInr.toLocaleString('en-IN')}`;
    if (rzpPayloadPreview) {
      rzpPayloadPreview.textContent = JSON.stringify(rzpOptionsPayload, null, 2);
    }

    if (rzpModal) {
      rzpModal.hidden = false;
    }
  }

  function completeVerifiedIssuance(orderData, paymentId) {
    if (rzpModal) rzpModal.hidden = true;

    const prefix = orderData.type === 'STALL' ? 'STALL-2027' : 'PFV-2027';
    const passId = `${prefix}-${Math.floor(1000 + Math.random() * 9000)}`;

    if (passEyebrow) {
      passEyebrow.textContent = orderData.type === 'STALL'
        ? `CONFIRMED EXHIBITION STALL ALLOTMENT · ₹${orderData.amountInr.toLocaleString('en-IN')} PAID`
        : `VERIFIED DELEGATE PASS · ₹2,200 PAID · 14–16 JAN 2027`;
    }
    if (idDisplay) idDisplay.textContent = passId;
    if (nameDisplay) nameDisplay.textContent = orderData.name;
    if (roleDisplay) roleDisplay.textContent = orderData.category;
    if (a11yDisplay) a11yDisplay.textContent = orderData.spec;
    if (rzpIdDisplay) rzpIdDisplay.textContent = paymentId;

    if (qrCanvas) {
      drawDeterministicQR(qrCanvas, `${passId}|${paymentId}|${orderData.name}|INR${orderData.amountInr}`);
    }

    if (ticketOutput) {
      ticketOutput.hidden = false;
      ticketOutput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    showToast(`Payment ${paymentId} verified! ${passId} generated.`);
  }

  // Event Delegate Registration Submit (Fixed ₹2,200 Fee)
  if (delegateForm) {
    delegateForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = (document.getElementById('reg-name')?.value || '').trim();
      const email = (document.getElementById('reg-email')?.value || '').trim();
      const phone = (document.getElementById('reg-phone')?.value || '').trim();
      const role = document.getElementById('reg-role')?.value || 'Delegate (₹2,200)';
      const benchmark = document.getElementById('reg-benchmark')?.value || 'Standard Barrier-Free Access';

      if (!name || !email || !phone) {
        showToast('Please enter Full Name, Email, and Mobile Number.');
        return;
      }

      openRazorpayCheckout({
        type: 'DELEGATE',
        name,
        email,
        phone,
        amountInr: RAZORPAY_CONFIG.delegate_fee_inr, // ₹2,200
        description: 'Event Delegate Registration (Standard Fee ₹2,200)',
        category: role,
        spec: benchmark
      });
    });
  }

  // Separate Exhibition Stall Booking Submit
  if (stallForm) {
    stallForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const org = (document.getElementById('stall-org')?.value || '').trim();
      const contact = (document.getElementById('stall-contact')?.value || '').trim();
      const email = (document.getElementById('stall-email')?.value || '').trim();
      const phone = (document.getElementById('stall-phone')?.value || '').trim();
      const tierSelect = document.getElementById('stall-tier');
      const amountInr = Number(tierSelect?.value || 15000);
      const tierLabel = tierSelect?.options[tierSelect.selectedIndex]?.getAttribute('data-label') || 'Exhibition Stall';
      const domain = document.getElementById('stall-domain')?.value || 'Assistive Tech';

      if (!org || !contact || !email || !phone) {
        showToast('Please complete Organisation Name, Contact Person, Email, and Mobile.');
        return;
      }

      openRazorpayCheckout({
        type: 'STALL',
        name: `${org} (${contact})`,
        email,
        phone,
        amountInr,
        description: `Exhibition Stall Booking · ${tierLabel}`,
        category: tierLabel,
        spec: domain
      });
    });
  }

  if (rzpCloseBtn && rzpModal) {
    rzpCloseBtn.addEventListener('click', () => {
      rzpModal.hidden = true;
    });
  }

  if (rzpConfirmBtn) {
    rzpConfirmBtn.addEventListener('click', () => {
      if (!pendingCheckout) return;
      const rzpPayId = `pay_RZP2027_${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      completeVerifiedIssuance(pendingCheckout, rzpPayId);
    });
  }

  if (printBtn) {
    printBtn.addEventListener('click', () => window.print());
  }

  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      if (!qrCanvas) return;
      const link = document.createElement('a');
      link.download = `${idDisplay ? idDisplay.textContent : 'PurpleFest-Pass'}.png`;
      link.href = qrCanvas.toDataURL('image/png');
      link.click();
    });
  }
}

function drawDeterministicQR(canvas, seedText) {
  const ctx = canvas.getContext('2d');
  const size = canvas.width;
  const cells = 21;
  const cellSize = Math.floor(size / cells);

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, size, size);
  ctx.fillStyle = '#16121d';

  let hash = 2166136261;
  for (let i = 0; i < seedText.length; i++) {
    hash ^= seedText.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }

  function drawFinder(ox, oy) {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        const border = r === 0 || r === 6 || c === 0 || c === 6;
        const inner = r >= 2 && r <= 4 && c >= 2 && c <= 4;
        if (border || inner) {
          ctx.fillRect((ox + c) * cellSize, (oy + r) * cellSize, cellSize, cellSize);
        }
      }
    }
  }

  drawFinder(0, 0);
  drawFinder(cells - 7, 0);
  drawFinder(0, cells - 7);

  for (let r = 0; r < cells; r++) {
    for (let c = 0; c < cells; c++) {
      const inFinder = (r < 8 && c < 8) || (r < 8 && c >= cells - 8) || (r >= cells - 8 && c < 8);
      if (inFinder) continue;
      hash ^= (r * 31 + c * 17);
      hash = Math.imul(hash, 16777619);
      if ((Math.abs(hash) % 10) < 5) {
        ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
      }
    }
  }
}

/* =========================================================
   12. MITRA FESTIVAL CONCIERGE
   ========================================================= */
function initMitraAssistant() {
  const toggleBtn = document.getElementById('btn-mitra-toggle');
  const closeBtn = document.getElementById('btn-mitra-close');
  const panel = document.getElementById('mitra-panel');
  const form = document.getElementById('mitra-form');
  const input = document.getElementById('mitra-input');
  const messages = document.getElementById('mitra-messages');
  const chips = document.querySelectorAll('.mitra-chip');

  if (!toggleBtn || !panel) return;

  toggleBtn.addEventListener('click', () => {
    const isHidden = panel.hidden;
    panel.hidden = !isHidden;
    toggleBtn.setAttribute('aria-expanded', String(isHidden));
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      panel.hidden = true;
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  }

  function respondTo(query) {
    if (!messages) return;
    const userMsg = document.createElement('div');
    userMsg.className = 'mitra-msg user';
    userMsg.textContent = query;
    messages.appendChild(userMsg);

    const q = query.toLowerCase();
    let reply = 'Purple Fest Vadodara 2027 (14–16 Jan 2027) is aligned with Viksit Bharat @ 2047. Standard Delegate Fee is ₹2,200 (no free passes), and Exhibition Stall booking is available in Section 06.';

    if (q.includes('fee') || q.includes('free') || q.includes('2200') || q.includes('2,200') || q.includes('price') || q.includes('pass')) {
      reply = 'There are no free passes. The standard Event Delegate Registration fee is ₹2,200 per participant (payable via Razorpay in Section 07), covering all 3 days, 6 zones, delegate kit, and hospitality.';
    } else if (q.includes('stall') || q.includes('exhibit') || q.includes('booth')) {
      reply = 'Exhibition Stalls are booked separately in Section 06: Tier A Shell Stall (₹15,000), Tier B Corporate Pavilion (₹35,000), Tier C University/Clinical (₹12,000), and Tier D Divyangjan/NGO Stall (₹5,500).';
    } else if (q.includes('paralymp') || q.includes('athlete') || q.includes('sport') || q.includes('avani') || q.includes('sumit')) {
      reply = 'Section 02 features Indian Paralympic Champions including Avani Lekhara, Sumit Antil, Devendra Jhajharia, Sheetal Devi, Dr. Deepa Malik, Bhavina Patel (Gujarat), Mariyappan Thangavelu, and Praveen Kumar.';
    } else if (q.includes('21') || q.includes('benchmark') || q.includes('rpwd') || q.includes('disabilit')) {
      reply = 'Section 03 lists all 21 Benchmark Disabilities recognized under the RPwD Act, 2016 — with interactive filters across Physical, Sensory, Intellectual/Neurodevelopmental, Chronic Neurological/Blood, and Multiple Disabilities.';
    } else if (q.includes('viksit') || q.includes('2047')) {
      reply = 'Purple Fest Vadodara 2027 is aligned with Viksit Bharat @ 2047 across 4 pillars: Indigenous Assistive Deep-Tech, Universal Civic Design, Paralympic Sports Science, and DEI Workforce Integration.';
    }

    setTimeout(() => {
      const botMsg = document.createElement('div');
      botMsg.className = 'mitra-msg bot';
      botMsg.textContent = reply;
      messages.appendChild(botMsg);
      messages.scrollTop = messages.scrollHeight;
    }, 220);
  }

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      respondTo(chip.getAttribute('data-query') || chip.textContent);
    });
  });

  if (form && input) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = input.value.trim();
      if (!val) return;
      input.value = '';
      respondTo(val);
    });
  }
}

/* =========================================================
   UTILITY TOAST
   ========================================================= */
function showToast(msg) {
  const region = document.getElementById('toast-container');
  if (!region) return;
  const t = document.createElement('div');
  t.className = 'minimal-toast';
  t.textContent = msg;
  region.appendChild(t);
  setTimeout(() => {
    t.remove();
  }, 3200);
}
