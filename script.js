/* =========================================================
   THE KINGDOM OF YAZHINI — interactions & magic
   ========================================================= */
(() => {
  "use strict";

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const rand = (a, b) => a + Math.random() * (b - a);
  const pick = (arr) => arr[(Math.random() * arr.length) | 0];
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const PHOTOS = window.ROYAL_PHOTOS || { months: [] };

  const EVENT_START = new Date("2026-11-03T18:00:00+05:30");
  const EVENT_END = new Date("2026-11-03T22:00:00+05:30");
  const MAP_URL = "https://maps.app.goo.gl/xtVJiD3oyzXinZCK8";

  /* ---------------------------------------------------------
     The 12-Chapter Royal Chronicle
     --------------------------------------------------------- */
  const CHAPTERS = [
    { n: "I", title: "The Arrival of the Star", month: "November 2025", emoji: "🌟", milestone: "✨ Born on 3rd November",
      story: "Under a calm autumn sky on November 3rd, the universe paused as a tiny miracle opened her eyes. Wrapped in ivory swaddling blankets, her very first breath brought an endless summer into the hearts of King Bhoobalan and Queen Revathy.",
      bg: "linear-gradient(160deg,#fff7e0,#ffe1ee 60%,#f3e6ff)" },
    { n: "II", title: "Whispers & Soft Slumbers", month: "December 2025", emoji: "🌙", milestone: "💤 Velvet lullabies",
      story: "Quiet nights filled with velvet lullabies. A tiny thumb curled tightly around her mother's finger, dreaming softly as the world outside was cool and hushed.",
      bg: "linear-gradient(160deg,#e9e4ff,#d9d0ff 50%,#ffe1ee)" },
    { n: "III", title: "The First Sovereign Smile", month: "January 2026", emoji: "😊", milestone: "😍 First smile",
      story: "The dawn of the new year brought the most magical decree yet: Princess Yazhini discovered how to smile back. A flash of tiny dimples that instantly commanded the devotion of everyone in the room.",
      bg: "linear-gradient(160deg,#fff1d6,#ffd6e6 60%,#ffeaf3)" },
    { n: "IV", title: "Curious Gaze & Coos", month: "February 2026", emoji: "🎐", milestone: "🎶 First coos",
      story: "The little princess found her voice. Soft coos, melodic chirps, and wide, questioning eyes taking in the dancing mobiles and the warmth of gentle arms.",
      bg: "linear-gradient(160deg,#e1f5ff,#ede4ff 55%,#ffe1ee)" },
    { n: "V", title: "Tummy-Time Triumphs", month: "March 2026", emoji: "🐢", milestone: "🔄 First roll-over",
      story: "Lifting her crown — her head held high as she surveyed her nursery kingdom from her playmat. Rolling over for the first time was celebrated like a national festival.",
      bg: "linear-gradient(160deg,#e6fbef,#fff4d6 55%,#ffe1ee)" },
    { n: "VI", title: "Half a Year of Royalty", month: "April 2026", emoji: "👑", milestone: "🎉 Six months old",
      story: "Six months of pure sweetness. Sitting up like a little queen propped amidst velvet pillows, greeting the morning sun with clapping hands and bubbling chatter.",
      bg: "linear-gradient(160deg,#fff4c7,#ffd9a8 40%,#ffc8de)" },
    { n: "VII", title: "The Sweetest Taste of Life", month: "May 2026", emoji: "🍓", milestone: "🥄 First solid food",
      story: "Curious explorations with first spoonfuls, messy fruit purees, and the comical squint of discovering new flavors in the royal banquet.",
      bg: "linear-gradient(160deg,#ffe0e6,#ffd0d9 50%,#fff1e0)" },
    { n: "VIII", title: "Crawling Across Her Empire", month: "June 2026", emoji: "🧸", milestone: "🏃‍♀️ First crawl",
      story: "No corner was left unexplored. With quick, determined scoots on hands and knees, Princess Yazhini made the entire palace floor her personal runway of discovery.",
      bg: "linear-gradient(160deg,#f3e6ff,#e0d4ff 50%,#ffe6f0)" },
    { n: "IX", title: "Tiny Pearls & Teething Grins", month: "July 2026", emoji: "🦷", milestone: "🦪 First two pearls",
      story: "Two tiny white pearls appeared in her smile. Her laugh grew louder, ringing through the hallways, accompanied by the gentle clatter of her favorite wooden toys.",
      bg: "linear-gradient(160deg,#ffffff,#eaf6ff 50%,#ffe1ee)" },
    { n: "X", title: "Pulling Up to the Throne", month: "August 2026", emoji: "🪑", milestone: "🧍‍♀️ First stand",
      story: "Holding onto edges, tables, and knees, she rose onto two unsteady, adorable little feet — proudly showing the world just how tall a ten-month-old princess could stand.",
      bg: "linear-gradient(160deg,#fff0d9,#ffe1ee 50%,#e9e4ff)" },
    { n: "XI", title: "Waving & Blowing Kisses", month: "September 2026", emoji: "👋", milestone: "😘 First bye-bye",
      story: "Little gestures carrying royal grace — waving “bye-bye” to the birds, mimicking every word, and scattering unprompted baby kisses that melted every heart.",
      bg: "linear-gradient(160deg,#ffe1ee,#ffc9de 50%,#fff2c7)" },
    { n: "XII", title: "The Grand Coronation", month: "October – November 2026", emoji: "🎂", milestone: "👑 Turning ONE!",
      story: "Three hundred and sixty-five days of pure enchantment lead to this crowning moment. Standing on the threshold of toddlerhood, crown placed gently upon her curls, ready to cut her very first cake.",
      bg: "linear-gradient(160deg,#fff6c8,#f7dc8a 30%,#ffc0dc 70%,#d8c4fb)" },
  ];

  /* ---------------------------------------------------------
     AUDIO — music box lullaby, harp plucks, chimes
     --------------------------------------------------------- */
  const NOTE = (() => {
    const map = { C: -9, D: -7, E: -5, F: -4, G: -2, A: 0, B: 2 };
    return (name) => {
      const m = /^([A-G])(#|b)?(\d)$/.exec(name);
      let semi = map[m[1]] + (m[2] === "#" ? 1 : m[2] === "b" ? -1 : 0) + (parseInt(m[3], 10) - 4) * 12;
      return 440 * Math.pow(2, semi / 12);
    };
  })();

  const Audio = {
    ctx: null, master: null, musicBus: null, sfxBus: null, reverb: null,
    musicOn: false, timers: [], nodes: [],
    init() {
      if (this.ctx) { if (this.ctx.state === "suspended") this.ctx.resume(); return true; }
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return false;
      const ctx = (this.ctx = new AC());
      this.master = ctx.createGain(); this.master.gain.value = 0.8;
      this.master.connect(ctx.destination);
      // generated impulse reverb for a dreamy palace hall
      const len = ctx.sampleRate * 2.6, ir = ctx.createBuffer(2, len, ctx.sampleRate);
      for (let c = 0; c < 2; c++) {
        const d = ir.getChannelData(c);
        for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3);
      }
      this.reverb = ctx.createConvolver(); this.reverb.buffer = ir;
      const wet = ctx.createGain(); wet.gain.value = 0.45;
      this.reverb.connect(wet).connect(this.master);
      this.musicBus = ctx.createGain(); this.musicBus.gain.value = 0;
      this.sfxBus = ctx.createGain(); this.sfxBus.gain.value = 0.9;
      [this.musicBus, this.sfxBus].forEach((b) => { b.connect(this.master); b.connect(this.reverb); });
      return true;
    },
    bell(freq, t, dur = 1.6, vol = 0.16, bus = this.sfxBus, track = false) {
      const ctx = this.ctx;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(vol, t + 0.008);
      g.gain.exponentialRampToValueAtTime(0.0008, t + dur);
      g.connect(bus);
      [[1, "sine", 1], [2, "sine", 0.28], [3.01, "triangle", 0.08], [4.2, "sine", 0.04]].forEach(([mult, type, amp]) => {
        const o = ctx.createOscillator(), og = ctx.createGain();
        o.type = type; o.frequency.value = freq * mult; og.gain.value = amp;
        o.connect(og).connect(g); o.start(t); o.stop(t + dur + 0.05);
        if (track) this.nodes.push(o);
      });
    },
    pluck(freq, vol = 0.5) {
      // Karplus–Strong string for the Yazh
      if (!this.init()) return;
      const ctx = this.ctx, sr = ctx.sampleRate, dur = 2.2, N = Math.round(sr / freq);
      const buf = ctx.createBuffer(1, sr * dur, sr), d = buf.getChannelData(0);
      const ring = new Float32Array(N);
      for (let i = 0; i < N; i++) ring[i] = Math.random() * 2 - 1;
      let idx = 0;
      for (let i = 0; i < d.length; i++) {
        const nxt = (idx + 1) % N;
        const v = (ring[idx] + ring[nxt]) * 0.4975;
        d[i] = ring[idx]; ring[idx] = v; idx = nxt;
      }
      const src = ctx.createBufferSource(); src.buffer = buf;
      const g = ctx.createGain(); g.gain.value = vol;
      const lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 3200;
      src.connect(lp).connect(g).connect(this.sfxBus); src.start();
    },
    chime() {
      if (!this.init()) return;
      const t = this.ctx.currentTime;
      ["C6", "E6", "G6", "C7"].forEach((n, i) => this.bell(NOTE(n), t + i * 0.07, 1.4, 0.07));
    },
    fanfare() {
      if (!this.init()) return;
      const t = this.ctx.currentTime;
      ["C5", "E5", "G5", "C6", "E6", "G6", "C7"].forEach((n, i) => this.bell(NOTE(n), t + i * 0.09, 2, 0.09));
    },
    pop() {
      if (!this.init()) return;
      const ctx = this.ctx, t = ctx.currentTime, o = ctx.createOscillator(), g = ctx.createGain();
      o.type = "sine"; o.frequency.setValueAtTime(rand(600, 900), t); o.frequency.exponentialRampToValueAtTime(120, t + 0.12);
      g.gain.setValueAtTime(0.25, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
      o.connect(g).connect(this.sfxBus); o.start(t); o.stop(t + 0.2);
    },

    /* songs: [note|null, beats, bassNote?] */
    songs: [
      { bpm: 108, notes: [
        ["G4", .75], ["G4", .25], ["A4", 1, "C3"], ["G4", 1], ["C5", 1], ["B4", 2, "G2"],
        ["G4", .75], ["G4", .25], ["A4", 1, "G2"], ["G4", 1], ["D5", 1], ["C5", 2, "C3"],
        ["G4", .75], ["G4", .25], ["G5", 1, "C3"], ["E5", 1], ["C5", 1], ["B4", 1, "F2"], ["A4", 2],
        ["F5", .75], ["F5", .25], ["E5", 1, "C3"], ["C5", 1], ["D5", 1, "G2"], ["C5", 3, "C3"], [null, 2],
      ] },
      { bpm: 96, notes: [
        ["C5", 1, "C3"], ["C5", 1], ["G5", 1, "E3"], ["G5", 1], ["A5", 1, "F3"], ["A5", 1], ["G5", 2, "C3"],
        ["F5", 1, "F2"], ["F5", 1], ["E5", 1, "C3"], ["E5", 1], ["D5", 1, "G2"], ["D5", 1], ["C5", 2, "C3"],
        ["G5", 1, "C3"], ["G5", 1], ["F5", 1, "F2"], ["F5", 1], ["E5", 1, "C3"], ["E5", 1], ["D5", 2, "G2"],
        ["G5", 1, "C3"], ["G5", 1], ["F5", 1, "F2"], ["F5", 1], ["E5", 1, "C3"], ["E5", 1], ["D5", 2, "G2"],
        ["C5", 1, "C3"], ["C5", 1], ["G5", 1, "E3"], ["G5", 1], ["A5", 1, "F3"], ["A5", 1], ["G5", 2, "C3"],
        ["F5", 1, "F2"], ["F5", 1], ["E5", 1, "C3"], ["E5", 1], ["D5", 1, "G2"], ["D5", 1], ["C5", 3, "C3"], [null, 2],
      ] },
    ],
    songIdx: 0,
    scheduleSong(at) {
      const song = this.songs[this.songIdx % this.songs.length];
      this.songIdx++;
      const beat = 60 / song.bpm;
      let t = at;
      song.notes.forEach(([n, b, bass]) => {
        if (n) this.bell(NOTE(n), t, Math.max(1.2, b * beat * 2.2), 0.13, this.musicBus, true);
        if (bass) this.bell(NOTE(bass) * 2, t, 2.4, 0.06, this.musicBus, true);
        t += b * beat;
      });
      const wait = (t - this.ctx.currentTime - 0.4) * 1000;
      this.timers.push(setTimeout(() => { if (this.musicOn) this.scheduleSong(t); }, wait));
      // keep the tracked node list from growing forever
      if (this.nodes.length > 600) this.nodes.splice(0, this.nodes.length - 400);
    },
    startMusic(fromSong = 0) {
      if (!this.init()) return;
      if (this.musicOn) return;
      this.musicOn = true;
      this.songIdx = fromSong;
      const t = this.ctx.currentTime;
      this.musicBus.gain.cancelScheduledValues(t);
      this.musicBus.gain.setValueAtTime(0.0001, t);
      this.musicBus.gain.linearRampToValueAtTime(0.9, t + 1.2);
      this.scheduleSong(t + 0.15);
      $("#music-toggle").classList.add("playing");
    },
    stopMusic() {
      if (!this.ctx || !this.musicOn) return;
      this.musicOn = false;
      const t = this.ctx.currentTime;
      this.musicBus.gain.cancelScheduledValues(t);
      this.musicBus.gain.setValueAtTime(this.musicBus.gain.value, t);
      this.musicBus.gain.linearRampToValueAtTime(0.0001, t + 0.5);
      this.timers.forEach(clearTimeout); this.timers = [];
      const nodes = this.nodes; this.nodes = [];
      setTimeout(() => nodes.forEach((o) => { try { o.stop(); } catch (_) {} }), 600);
      $("#music-toggle").classList.remove("playing");
    },
    restartWithBirthdaySong() {
      this.stopMusic();
      setTimeout(() => this.startMusic(0), 650);
    },
  };

  /* ---------------------------------------------------------
     MAGIC CANVAS — petals, sparkles, hearts, confetti
     --------------------------------------------------------- */
  const canvas = $("#magic-canvas");
  const ctx = canvas.getContext("2d");
  let W = 0, H = 0, DPR = 1;
  const particles = [];
  const PETAL_COLORS = ["#ffc4dc", "#ffb3d1", "#ffd6e7", "#f9a8d4", "#fde2ec", "#e9d5ff"];
  const CONFETTI_COLORS = ["#f472b6", "#e9b949", "#c084fc", "#fbcfe8", "#fde68a", "#a7f3d0", "#ffffff", "#e2558f"];

  function resize() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = innerWidth; H = innerHeight;
    canvas.width = W * DPR; canvas.height = H * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }
  resize();
  addEventListener("resize", resize);

  function addPetal(initial) {
    particles.push({
      kind: "petal", x: rand(-40, W + 40), y: initial ? rand(-H, H) : rand(-80, -20),
      vx: rand(-0.3, 0.6), vy: rand(0.5, 1.3), r: rand(5, 10), rot: rand(0, Math.PI * 2), vr: rand(-0.03, 0.03),
      flip: rand(0, Math.PI * 2), vf: rand(0.02, 0.06), color: pick(PETAL_COLORS), life: Infinity, sway: rand(0.5, 1.5),
    });
  }
  function sparkle(x, y, n = 1, spread = 1) {
    for (let i = 0; i < n; i++) {
      const a = rand(0, Math.PI * 2), s = rand(0.3, 2.5) * spread;
      particles.push({ kind: "star", x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 0.4, r: rand(2, 5.5), life: rand(40, 80), max: 80,
        color: pick(["#fff6c8", "#f7dc8a", "#ffffff", "#ffc4dc", "#e9d5ff"]), rot: rand(0, 3) });
    }
  }
  function hearts(x, y, n = 6) {
    for (let i = 0; i < n; i++) {
      const a = rand(-Math.PI, 0), s = rand(1.2, 3.4);
      particles.push({ kind: "heart", x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 1, r: rand(6, 12), life: rand(60, 100), max: 100,
        color: pick(["#f472b6", "#e2558f", "#ff9fcb", "#c084fc"]), rot: rand(-0.4, 0.4) });
    }
  }
  function confetti(x = W / 2, y = H / 3, n = 140, power = 1) {
    if (reduceMotion) n = Math.min(n, 30);
    for (let i = 0; i < n; i++) {
      const a = rand(-Math.PI, 0), s = rand(4, 13) * power;
      particles.push({ kind: "confetti", x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, w: rand(6, 11), h: rand(3, 6),
        rot: rand(0, 6), vr: rand(-0.3, 0.3), flip: rand(0, 6), vf: rand(0.1, 0.3), life: rand(140, 220), max: 220,
        color: pick(CONFETTI_COLORS), round: Math.random() < 0.25 });
    }
  }
  function confettiCannons() {
    confetti(0, H * 0.8, 90, 1.1);
    confetti(W, H * 0.8, 90, 1.1);
    setTimeout(() => confetti(W / 2, H * 0.4, 120, 0.9), 250);
  }

  function drawStar(p, alpha) {
    const r = p.r * (0.5 + alpha * 0.5);
    ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.globalAlpha = alpha;
    ctx.fillStyle = p.color; ctx.shadowColor = p.color; ctx.shadowBlur = 8;
    ctx.beginPath();
    for (let i = 0; i < 8; i++) {
      const rr = i % 2 ? r * 0.28 : r, a = (i * Math.PI) / 4;
      ctx.lineTo(Math.cos(a) * rr, Math.sin(a) * rr);
    }
    ctx.closePath(); ctx.fill(); ctx.restore();
  }
  function drawHeart(p, alpha) {
    const s = p.r / 10;
    ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.scale(s, s); ctx.globalAlpha = alpha; ctx.fillStyle = p.color;
    ctx.beginPath(); ctx.moveTo(0, 3);
    ctx.bezierCurveTo(0, 0, -5, -6, -10, -1); ctx.bezierCurveTo(-14, 4, -6, 10, 0, 14);
    ctx.bezierCurveTo(6, 10, 14, 4, 10, -1); ctx.bezierCurveTo(5, -6, 0, 0, 0, 3);
    ctx.fill(); ctx.restore();
  }

  let lastFrame = performance.now();
  function loop(now) {
    const dt = Math.min(3, (now - lastFrame) / 16.67); lastFrame = now;
    ctx.clearRect(0, 0, W, H);
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      if (p.kind === "petal") {
        p.flip += p.vf * dt; p.rot += p.vr * dt;
        p.x += (p.vx + Math.sin(p.flip) * p.sway * 0.6) * dt; p.y += p.vy * dt;
        if (p.y > H + 30 || p.x > W + 60 || p.x < -60) { particles.splice(i, 1); addPetal(false); continue; }
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.scale(1, Math.abs(Math.cos(p.flip)) * 0.8 + 0.2);
        ctx.globalAlpha = 0.85; ctx.fillStyle = p.color;
        ctx.beginPath(); ctx.ellipse(0, 0, p.r, p.r * 0.62, 0, 0, Math.PI * 2); ctx.fill();
        ctx.globalAlpha = 0.5; ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.ellipse(-p.r * 0.3, -p.r * 0.15, p.r * 0.35, p.r * 0.18, 0, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
        continue;
      }
      p.life -= dt;
      if (p.life <= 0) { particles.splice(i, 1); continue; }
      const alpha = clamp(p.life / (p.max * 0.6), 0, 1);
      if (p.kind === "star") {
        p.x += p.vx * dt; p.y += p.vy * dt; p.vx *= 0.97; p.vy = p.vy * 0.97 + 0.02; p.rot += 0.05 * dt;
        drawStar(p, alpha);
      } else if (p.kind === "heart") {
        p.x += p.vx * dt; p.y += p.vy * dt; p.vx *= 0.98; p.vy = p.vy * 0.98 - 0.01;
        drawHeart(p, alpha);
      } else if (p.kind === "confetti") {
        p.vy += 0.18 * dt; p.vx *= 0.985; p.vy *= 0.985;
        p.x += p.vx * dt + Math.sin(p.flip) * 0.6; p.y += p.vy * dt; p.rot += p.vr * dt; p.flip += p.vf * dt;
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.scale(1, Math.cos(p.flip));
        ctx.globalAlpha = alpha; ctx.fillStyle = p.color;
        if (p.round) { ctx.beginPath(); ctx.arc(0, 0, p.h, 0, Math.PI * 2); ctx.fill(); }
        else ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }
    }
    requestAnimationFrame(loop);
  }
  const petalCount = reduceMotion ? 0 : innerWidth < 700 ? 14 : 26;
  for (let i = 0; i < petalCount; i++) addPetal(true);
  requestAnimationFrame(loop);

  // Pointer magic: glow + sparkle trail + click hearts
  const glow = $("#cursor-glow");
  let lastTrail = 0;
  addEventListener("pointermove", (e) => {
    if (glow) glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    const now = performance.now();
    if (!reduceMotion && now - lastTrail > 28) { lastTrail = now; sparkle(e.clientX, e.clientY, 1, 0.6); }
  }, { passive: true });
  addEventListener("pointerdown", (e) => {
    if (e.target.closest("button, a, input, textarea, .lightbox, .yazh, .garden, .cake, .balloon")) return;
    hearts(e.clientX, e.clientY, 7); sparkle(e.clientX, e.clientY, 10, 1.5);
  });

  /* ---------------------------------------------------------
     PHOTOS
     --------------------------------------------------------- */
  function setPhoto(el, url, alt) {
    if (!el || !url) return;
    // the <img> must be in the page for lazy loading to start; the placeholder stays until it arrives
    const img = document.createElement("img");
    img.alt = alt || "";
    img.loading = "lazy";
    img.className = "photo-loading";
    img.onload = () => {
      [...el.children].forEach((c) => { if (c !== img) c.remove(); });
      img.classList.remove("photo-loading");
    };
    img.src = url;
    el.appendChild(img);
  }
  setPhoto($('[data-photo="hero"]'), PHOTOS.hero, "Princess Yazhini");
  setPhoto($('[data-photo="father"]'), PHOTOS.father, "King K. Bhoobalan");
  setPhoto($('[data-photo="mother"]'), PHOTOS.mother, "Queen V. Revathy");
  setPhoto($('[data-photo="brother"]'), PHOTOS.brother, "Her big brother");
  if (PHOTOS.brotherName) $("#brother-name").textContent = PHOTOS.brotherName;
  if (PHOTOS.family) {
    const fp = $("#family-photo"); fp.hidden = false;
    $("img", fp).src = PHOTOS.family;
  }

  /* ---------------------------------------------------------
     FLORAL GATE — roses, garlands, hanging blossoms, fairy lights
     --------------------------------------------------------- */
  const ROSE_TINTS = {
    pink: ["#ffe0ec", "#f58fbd", "#c2346f"],
    blush: ["#fff4f8", "#f9bcd6", "#e2558f"],
    lav: ["#f6f0ff", "#cfb2f7", "#8b5cf6"],
    peach: ["#fff7ee", "#ffcaa8", "#ea8a6a"],
    cream: ["#ffffff", "#fde9d6", "#e3b07e"],
  };
  const TINT_KEYS = Object.keys(ROSE_TINTS);
  (function floralDefs() {
    let d = "";
    TINT_KEYS.forEach((k) => {
      const [lt, md, dk] = ROSE_TINTS[k];
      d += `<radialGradient id="rg-${k}" cx="50%" cy="50%" r="60%"><stop offset="0" stop-color="${dk}"/><stop offset=".35" stop-color="${md}"/><stop offset="1" stop-color="${lt}"/></radialGradient>`;
      let petals = "";
      for (let i = 0; i < 5; i++) petals += `<path transform="rotate(${i * 72 + 10})" d="M0 -4 C 22 -46, 54 -12, 33 17 C 21 33, -4 29, 0 -4Z" fill="url(#rg-${k})" stroke="${dk}" stroke-opacity=".22" stroke-width="1.2"/>`;
      for (let i = 0; i < 5; i++) petals += `<path transform="rotate(${i * 72 + 46}) scale(.72)" d="M0 -4 C 22 -46, 54 -12, 33 17 C 21 33, -4 29, 0 -4Z" fill="${md}" stroke="${dk}" stroke-opacity=".25" stroke-width="1.2"/>`;
      d += `<symbol id="rose-${k}" viewBox="-50 -50 100 100" overflow="visible">${petals}
        <circle r="17" fill="${md}"/>
        <path d="M-15 3 C -17 -14, 3 -21, 15 -10 C 4 -14, -9 -8, -7 6 Z" fill="${dk}" opacity=".55"/>
        <path d="M14 -4 C 18 11, 4 20, -10 14 C 1 14, 11 8, 8 -3 Z" fill="${dk}" opacity=".5"/>
        <path d="M-6 -4 C -2 -12, 9 -9, 8 0 C 5 -5, -1 -6, -3 1 Z" fill="${dk}" opacity=".7"/>
        <circle r="3.5" fill="${dk}" opacity=".8"/>
        <path d="M-24 -10 C -16 -26, 10 -30, 22 -16" fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="2" stroke-linecap="round"/>
      </symbol>`;
    });
    d += `<linearGradient id="leafG" x1="0" x2="1"><stop offset="0" stop-color="#5fae74"/><stop offset="1" stop-color="#a8e0b4"/></linearGradient>
      <symbol id="leaf" viewBox="0 -14 50 28" overflow="visible"><path d="M0 0 C 10 -15, 34 -15, 50 0 C 34 15, 10 15, 0 0Z" fill="url(#leafG)"/><path d="M2 0 L 44 0" stroke="#3f8f57" stroke-width="1.2" opacity=".6"/></symbol>
      <symbol id="blossom" viewBox="-12 -12 24 24" overflow="visible">
        ${[0, 72, 144, 216, 288].map((a) => `<circle cx="${Math.cos((a * Math.PI) / 180) * 5.5}" cy="${Math.sin((a * Math.PI) / 180) * 5.5}" r="5" fill="#fff" stroke="#f9c6dc" stroke-width="1"/>`).join("")}
        <circle r="2.8" fill="#f7c948"/></symbol>
      <symbol id="blossom-pink" viewBox="-12 -12 24 24" overflow="visible">
        ${[0, 72, 144, 216, 288].map((a) => `<circle cx="${Math.cos((a * Math.PI) / 180) * 5.5}" cy="${Math.sin((a * Math.PI) / 180) * 5.5}" r="5" fill="#ffd3e6" stroke="#f49ac1" stroke-width="1"/>`).join("")}
        <circle r="2.8" fill="#fff6c8"/></symbol>
      <filter id="fl-glow" x="-200%" y="-200%" width="500%" height="500%"><feGaussianBlur stdDeviation="3"/></filter>
      <filter id="fl-shadow" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#7a2e5c" flood-opacity=".25"/></filter>`;
    const holder = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    holder.setAttribute("width", "0"); holder.setAttribute("height", "0");
    holder.setAttribute("aria-hidden", "true");
    holder.style.position = "absolute";
    holder.innerHTML = `<defs>${d}</defs>`;
    document.body.prepend(holder);
  })();

  const F = {
    rose(x, y, size, tint, delay, rot = rand(0, 360)) {
      return `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${rot.toFixed(0)})"><use class="fl" href="#rose-${tint}" x="${-size / 2}" y="${-size / 2}" width="${size}" height="${size}" style="animation-delay:${delay.toFixed(2)}s"/></g>`;
    },
    leaf(x, y, len, angle, delay) {
      const h = (len * 28) / 50;
      return `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${angle.toFixed(0)})"><use class="fl" href="#leaf" x="0" y="${-h / 2}" width="${len}" height="${h}" style="animation-delay:${delay.toFixed(2)}s"/></g>`;
    },
    blossom(x, y, size, delay, pinkish = Math.random() < 0.45) {
      return `<use class="fl" href="#${pinkish ? "blossom-pink" : "blossom"}" x="${(x - size / 2).toFixed(1)}" y="${(y - size / 2).toFixed(1)}" width="${size}" height="${size}" style="animation-delay:${delay.toFixed(2)}s"/>`;
    },
    light(x, y, delay) {
      return `<g class="light" style="animation-delay:${rand(0, 1.8).toFixed(2)}s"><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="7" fill="#fff1b0" filter="url(#fl-glow)"/><circle class="fl" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.6" fill="#fffbe6" style="animation-delay:${delay.toFixed(2)}s"/></g>`;
    },
    bouquet(x, y, scale, baseDelay, fan = 0) {
      let out = "";
      for (let i = 0; i < 7; i++) out += F.leaf(x, y, rand(38, 60) * scale, fan + rand(-160, 160), baseDelay + 0.1);
      const spots = [[0, 0, 1], [-0.55, 0.25, 0.75], [0.55, 0.25, 0.75], [-0.25, -0.5, 0.62], [0.3, -0.48, 0.6]];
      spots.forEach(([dx, dy, sz], i) => {
        out += F.rose(x + dx * 46 * scale, y + dy * 46 * scale, 62 * sz * scale, pick(TINT_KEYS), baseDelay + 0.15 + i * 0.08);
      });
      for (let i = 0; i < 6; i++) out += F.blossom(x + rand(-60, 60) * scale, y + rand(-50, 50) * scale, rand(12, 18) * scale, baseDelay + 0.5);
      return out;
    },
  };

  function drawFloralFrame() {
    const svg = $("#floral-frame");
    if (!svg) return;
    const W = innerWidth, H = innerHeight, small = W < 640;
    svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
    let back = "", front = "";
    const swags = W < 640 ? 2 : W < 1300 ? 3 : 4;
    const sag = clamp(H * 0.11, 48, 120);
    const sc = small ? 0.72 : 1;
    const seg = W / swags;
    // fairy-light wires (behind) + rose garlands
    for (let s = 0; s < swags; s++) {
      const x1 = s * seg, x2 = (s + 1) * seg, cx = (x1 + x2) / 2;
      const P = (t, sg) => {
        const y0 = -4, cy = y0 + sg * 2;
        const u = 1 - t;
        return { x: u * u * x1 + 2 * u * t * cx + t * t * x2, y: u * u * y0 + 2 * u * t * cy + t * t * y0,
          a: (Math.atan2(2 * u * (cy - y0) + 2 * t * (y0 - cy), 2 * u * (cx - x1) + 2 * t * (x2 - cx)) * 180) / Math.PI };
      };
      const wireSag = sag * 1.35;
      back += `<path d="M${x1} -4 Q${cx} ${-4 + wireSag * 2} ${x2} -4" fill="none" stroke="#d9b45a" stroke-width="1.2" opacity=".8"/>`;
      for (let t = 0.06; t < 0.95; t += 0.075) { const p = P(t, wireSag); back += F.light(p.x, p.y, 1 + t); }
      back += `<path class="vine" d="M${x1} -4 Q${cx} ${-4 + sag * 2} ${x2} -4" fill="none" stroke="#6fb985" stroke-width="3.5" stroke-linecap="round"/>`;
      for (let t = 0.03; t < 0.98; t += 0.05) {
        const p = P(t, sag), side = (Math.round(t * 20) % 2 ? 1 : -1);
        front += F.leaf(p.x, p.y, rand(22, 34) * sc, p.a + side * rand(40, 75), 0.4 + t * 0.6);
      }
      for (let t = 0.1; t < 0.93; t += 0.105) {
        const p = P(t, sag), mid = 1 - Math.abs(t - 0.5) * 1.6;
        front += F.rose(p.x, p.y, (28 + mid * 26) * sc, pick(TINT_KEYS), 0.6 + t * 0.7);
        const q = P(t + 0.05, sag);
        front += F.blossom(q.x + rand(-6, 6), q.y + rand(4, 12), rand(11, 16) * sc, 0.9 + t * 0.6);
      }
    }
    // joints: bouquets with hanging wisteria-like strands
    for (let s = 0; s <= swags; s++) {
      const x = s * seg;
      if (s > 0 && s < swags) {
        const len = H * rand(0.16, 0.3);
        let strand = `<path d="M0 0 C 6 ${len * 0.3}, -6 ${len * 0.6}, 0 ${len}" fill="none" stroke="#7cc492" stroke-width="1.6"/>`;
        for (let y = 18; y < len; y += 13) strand += F.blossom(Math.sin(y * 0.15) * 7, y, (16 - (y / len) * 6) * sc, 1.2 + y / len);
        strand += F.rose(0, len + 6, 26 * sc, pick(TINT_KEYS), 1.9);
        front += `<g transform="translate(${x} 4)"><g class="sway" style="animation-delay:${rand(0, 2).toFixed(2)}s">${strand}</g></g>`;
      }
      front += F.bouquet(x, 8, small ? 0.62 : 0.95, 0.2, 90);
    }
    // climbing side vines
    [0, 1].forEach((side) => {
      const xEdge = side ? W : 0, dir = side ? -1 : 1;
      const top = H * 0.18;
      let d = `M${xEdge} ${H}`;
      const pts = [];
      for (let y = H; y >= top; y -= 10) {
        const x = xEdge + dir * (22 + Math.sin(y * 0.014) * 16) * (small ? 0.7 : 1);
        pts.push({ x, y }); d += ` L${x.toFixed(1)} ${y}`;
      }
      back += `<path class="vine" d="${d}" fill="none" stroke="#6fb985" stroke-width="3" stroke-linecap="round"/>`;
      pts.forEach((p, i) => {
        const delay = 0.3 + (1 - p.y / H) * 1.2;
        if (i % 3 === 0) front += F.leaf(p.x, p.y, rand(20, 32) * sc, (i % 6 ? -90 : 90) + dir * rand(-50, 50) - (side ? 180 : 0) * 0, delay);
        if (i % 9 === 4) front += F.rose(p.x + dir * 4, p.y, rand(26, 40) * sc, pick(TINT_KEYS), delay + 0.2);
        else if (i % 9 === 8) front += F.blossom(p.x + dir * 10, p.y, rand(12, 17) * sc, delay + 0.2);
      });
    });
    // grand corner bouquets
    front += F.bouquet(small ? 34 : 70, H - (small ? 30 : 55), small ? 0.95 : 1.6, 0.1, -45);
    front += F.bouquet(W - (small ? 34 : 70), H - (small ? 30 : 55), small ? 0.95 : 1.6, 0.1, -135);
    svg.innerHTML = `<g>${back}</g><g filter="url(#fl-shadow)">${front}</g>`;
  }

  function drawCardFlowers() {
    const crest = $("#card-crest");
    if (crest) {
      let out = `<path class="vine" d="M20 104 Q200 -26 380 104" fill="none" stroke="#6fb985" stroke-width="3"/>`;
      const P = (t) => { const u = 1 - t; return { x: u * u * 20 + 2 * u * t * 200 + t * t * 380, y: u * u * 104 + 2 * u * t * -26 + t * t * 104 }; };
      for (let t = 0.02; t < 1; t += 0.06) { const p = P(t); out += F.leaf(p.x, p.y, rand(18, 26), rand(0, 360), 0.8 + t * 0.4); }
      [0.08, 0.2, 0.33, 0.67, 0.8, 0.92].forEach((t, i) => {
        const p = P(t), sz = 22 + (1 - Math.abs(t - 0.5) * 2) * 18;
        out += F.rose(p.x, p.y, sz, TINT_KEYS[i % TINT_KEYS.length], 1 + Math.abs(t - 0.5));
        const q = P(t + 0.06); out += F.blossom(q.x, q.y + 6, 13, 1.3);
      });
      out += F.rose(160, 30, 36, "blush", 1.05) + F.rose(240, 30, 36, "lav", 1.05) + F.rose(200, 24, 50, "pink", 0.95);
      crest.innerHTML = `<g filter="url(#fl-shadow)">${out}</g>`;
    }
    $$(".card-bouquet").forEach((b) => {
      let out = "";
      for (let i = 0; i < 6; i++) out += F.leaf(60, 72, rand(26, 40), rand(-200, 20), 1.2);
      out += F.rose(60, 70, 46, "pink", 1.3) + F.rose(32, 86, 32, "cream", 1.4) + F.rose(86, 90, 30, "lav", 1.45) + F.rose(48, 44, 26, "peach", 1.5);
      for (let i = 0; i < 5; i++) out += F.blossom(rand(20, 100), rand(40, 105), rand(10, 14), 1.6);
      b.innerHTML = `<g filter="url(#fl-shadow)">${out}</g>`;
    });
  }
  drawFloralFrame();
  drawCardFlowers();
  let floralTimer;
  addEventListener("resize", () => {
    if ($("#gate").classList.contains("open")) return;
    clearTimeout(floralTimer); floralTimer = setTimeout(drawFloralFrame, 200);
  });

  /* ---------------------------------------------------------
     GATE / ENTRANCE
     --------------------------------------------------------- */
  const gate = $("#gate");
  $("#enter-btn").addEventListener("click", () => {
    Audio.init();
    Audio.fanfare();
    gate.classList.add("open");
    document.body.classList.remove("is-locked");
    document.body.classList.add("entered");
    setTimeout(() => confettiCannons(), 500);
    setTimeout(() => Audio.startMusic(1), 1800);
    setTimeout(() => gate.classList.add("gone"), 3000);
  });

  $("#music-toggle").addEventListener("click", () => {
    if (Audio.musicOn) Audio.stopMusic(); else Audio.startMusic();
  });
  document.addEventListener("visibilitychange", () => {
    if (!Audio.ctx) return;
    if (document.hidden) Audio.ctx.suspend(); else Audio.ctx.resume();
  });

  /* ---------------------------------------------------------
     HERO: parallax + butterflies
     --------------------------------------------------------- */
  const hero = $(".hero");
  const parallaxEls = $$(".parallax");
  if (!reduceMotion) {
    hero.addEventListener("pointermove", (e) => {
      const cx = (e.clientX / innerWidth - 0.5) * 2, cy = (e.clientY / innerHeight - 0.5) * 2;
      parallaxEls.forEach((el) => {
        const d = parseFloat(el.dataset.depth) * 30;
        const base = el.classList.contains("castle") ? "translateX(-50%) " : "";
        el.style.transform = `${base}translate(${cx * d}px, ${cy * d * 0.5}px)`;
      });
    });
  }

  const butterflies = [];
  function makeButterfly(container, x, y) {
    const b = document.createElement("div");
    b.className = "butterfly";
    b.innerHTML = '<span class="wing l"></span><span class="wing r"></span>';
    container.appendChild(b);
    const bf = { el: b, container, x, y, t: rand(0, 100), speed: rand(0.6, 1.3), ax: rand(0.4, 1), ay: rand(0.3, 0.8), hx: x, hy: y, life: Infinity };
    butterflies.push(bf);
    return bf;
  }
  if (!reduceMotion) {
    for (let i = 0; i < 6; i++) {
      makeButterfly(hero, rand(0.1, 0.9) * innerWidth, rand(0.2, 0.8) * innerHeight);
    }
    let mx = -999, my = -999;
    hero.addEventListener("pointermove", (e) => { const r = hero.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top; });
    addEventListener("resize", () => butterflies.forEach((b) => { b.cw = b.ch = 0; }));
    (function flutter() {
      butterflies.forEach((bf) => {
        bf.t += 0.012 * bf.speed;
        const cw = bf.cw || (bf.cw = bf.container.clientWidth), ch = bf.ch || (bf.ch = bf.container.clientHeight);
        // wander around a home point which slowly drifts
        bf.hx += Math.sin(bf.t * 0.7) * 0.8; bf.hy += Math.cos(bf.t * 0.5) * 0.5;
        const dx = mx - bf.hx, dy = my - bf.hy, dist = Math.hypot(dx, dy);
        if (bf.container === hero && dist < 220) { bf.hx += dx * 0.01; bf.hy += dy * 0.01; }
        bf.hx = clamp(bf.hx, 20, cw - 40); bf.hy = clamp(bf.hy, 20, ch - 40);
        const x = bf.hx + Math.sin(bf.t * 2.1) * 60 * bf.ax, y = bf.hy + Math.sin(bf.t * 3.3) * 40 * bf.ay;
        const angle = Math.cos(bf.t * 2.1) * 25;
        bf.el.style.transform = `translate(${x}px, ${y}px) rotate(${angle}deg)`;
      });
      requestAnimationFrame(flutter);
    })();
  }

  /* ---------------------------------------------------------
     COUNTDOWN
     --------------------------------------------------------- */
  const cdEls = { d: $("#cd-days"), h: $("#cd-hours"), m: $("#cd-mins"), s: $("#cd-secs") };
  const prev = {};
  function setNum(key, val) {
    const str = String(val).padStart(2, "0");
    if (prev[key] === str) return;
    prev[key] = str;
    const el = cdEls[key];
    el.textContent = str;
    el.classList.remove("tick"); void el.offsetWidth; el.classList.add("tick");
  }
  function updateCountdown() {
    const now = new Date();
    let diff = EVENT_START - now;
    if (diff <= 0) {
      ["d", "h", "m", "s"].forEach((k) => setNum(k, 0));
      $("#cd-note").textContent = now < EVENT_END
        ? "🎉 The grand ball is happening right now at Ramya Mahal! 🎉"
        : "💖 Thank you for celebrating Princess Yazhini's first birthday with us! 💖";
      return;
    }
    const s = Math.floor(diff / 1000);
    setNum("d", Math.floor(s / 86400));
    setNum("h", Math.floor((s % 86400) / 3600));
    setNum("m", Math.floor((s % 3600) / 60));
    setNum("s", s % 60);
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* ---------------------------------------------------------
     THE ROYAL YAZH (interactive harp)
     --------------------------------------------------------- */
  (function buildYazh() {
    const yazh = $("#yazh"), wrap = $("#yazh-strings");
    const path = $(".yazh-frame path", yazh);
    const notes = ["C4", "D4", "E4", "G4", "A4", "C5", "D5", "E5", "G5"];
    const total = path.getTotalLength();
    const samples = [];
    for (let i = 0; i <= 600; i++) samples.push(path.getPointAtLength((total * i) / 600));
    const strings = notes.map((n, i) => {
      const x = 78 + i * 20; // svg units
      let topY = 300;
      samples.forEach((p) => { if (Math.abs(p.x - x) < 2.5 && p.y < topY) topY = p.y; });
      const el = document.createElement("div");
      el.className = "string";
      el.style.left = (x / 300) * 100 + "%";
      el.style.top = ((topY + 8) / 340) * 100 + "%";
      el.dataset.note = n;
      wrap.appendChild(el);
      return { el, x: x / 300, note: n };
    });
    const NOTE_GLYPHS = ["♪", "♫", "♩", "♬", "🎵", "💗", "✨"];
    function play(s, clientX, clientY) {
      Audio.pluck(NOTE(s.note), 0.55);
      s.el.classList.remove("pluck"); void s.el.offsetWidth; s.el.classList.add("pluck");
      const r = yazh.getBoundingClientRect();
      const g = document.createElement("span");
      g.className = "yazh-note"; g.textContent = pick(NOTE_GLYPHS);
      g.style.left = clientX - r.left + "px"; g.style.top = clientY - r.top - 20 + "px";
      g.style.setProperty("--dx", rand(-40, 40) + "px");
      yazh.appendChild(g); setTimeout(() => g.remove(), 1600);
      sparkle(clientX, clientY, 4, 1);
    }
    let lastX = null;
    yazh.addEventListener("pointerdown", (e) => {
      Audio.init();
      const r = yazh.getBoundingClientRect(), fx = (e.clientX - r.left) / r.width;
      const nearest = strings.reduce((a, b) => (Math.abs(b.x - fx) < Math.abs(a.x - fx) ? b : a));
      if (Math.abs(nearest.x - fx) < 0.05) play(nearest, e.clientX, e.clientY);
      lastX = fx;
    });
    yazh.addEventListener("pointermove", (e) => {
      const r = yazh.getBoundingClientRect(), fx = (e.clientX - r.left) / r.width;
      if (e.pointerType !== "mouse" && e.buttons === 0) { lastX = fx; return; }
      if (lastX !== null) {
        const lo = Math.min(lastX, fx), hi = Math.max(lastX, fx);
        strings.forEach((s) => { if (s.x > lo && s.x <= hi) play(s, e.clientX, e.clientY); });
      }
      lastX = fx;
    });
    yazh.addEventListener("pointerleave", () => { lastX = null; });
  })();

  /* ---------------------------------------------------------
     ENCHANTED GARDEN
     --------------------------------------------------------- */
  (function garden() {
    const g = $("#garden");
    const BLOOMS = ["🌸", "🌷", "🌺", "🌼", "💮", "🪷", "🌹", "💐"];
    const scale = ["C5", "D5", "E5", "G5", "A5", "C6"];
    let count = 0;
    function bloom(x) {
      const f = document.createElement("div");
      f.className = "flower";
      const h = rand(40, 110);
      f.style.left = x - 16 + "px";
      f.innerHTML = `<div class="bloom" style="animation-delay:${rand(0, 2)}s">${pick(BLOOMS)}</div><div class="stem" style="height:${h}px"></div>`;
      g.appendChild(f);
      if (++count > 45) { const first = $(".flower", g); first && first.remove(); count--; }
      return h;
    }
    // seed a few
    requestAnimationFrame(() => { for (let i = 0; i < 9; i++) bloom(rand(30, g.clientWidth - 30)); });
    g.addEventListener("pointerdown", (e) => {
      Audio.init();
      const r = g.getBoundingClientRect(), x = e.clientX - r.left;
      bloom(x);
      Audio.bell(NOTE(pick(scale)), Audio.ctx.currentTime, 1.4, 0.08);
      sparkle(e.clientX, e.clientY, 12, 1.4);
      if (!reduceMotion && butterflies.filter((b) => b.container === g).length < 8) {
        makeButterfly(g, x, e.clientY - r.top - 30);
      }
    });
  })();

  /* ---------------------------------------------------------
     TIMELINE
     --------------------------------------------------------- */
  const timeline = $("#timeline");
  CHAPTERS.forEach((c, i) => {
    const url = PHOTOS.months && PHOTOS.months[i];
    const art = document.createElement("article");
    art.className = "chapter reveal";
    art.innerHTML = `
      <div class="ch-node">${c.n}</div>
      <div class="ch-media">
        <div class="frame" role="button" tabindex="0" aria-label="Open chapter ${c.n}: ${c.title}">
          <span class="frame-gem t"></span><span class="frame-gem b"></span><span class="frame-gem l"></span><span class="frame-gem r"></span>
          <span class="frame-ribbon">${i === 0 ? "Birth" : i === 11 ? "Age One" : "Month " + i}</span>
          <div class="frame-inner">
            <div class="placeholder" style="--ph-bg:${c.bg}">
              <span class="ph-emoji">${c.emoji}</span>
              <span class="ph-month">${c.month.split(" ")[0]}</span>
              <span class="ph-sub">Photo coming soon</span>
            </div>
          </div>
          <span class="frame-zoom">🔍 Open the story</span>
        </div>
      </div>
      <div class="ch-text">
        <p class="ch-label">Chapter ${c.n}</p>
        <h3 class="ch-title">${c.title}</h3>
        <span class="ch-month">${c.month}</span>
        <p class="ch-story">${c.story}</p>
        <span class="ch-milestone">${c.milestone}</span>
      </div>`;
    timeline.appendChild(art);
    if (url) setPhoto($(".frame-inner", art), url, `Princess Yazhini — ${c.title}`);
    const frame = $(".frame", art);
    frame.addEventListener("click", () => openLightbox(i));
    frame.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLightbox(i); } });
    addTilt(frame, 10);
  });

  // journey progress (crawling baby)
  const jpFill = $("#jp-fill"), jpCrawler = $("#jp-crawler"), jpTrack = $(".jp-track");
  function updateJourney() {
    const r = timeline.getBoundingClientRect();
    const p = clamp((innerHeight * 0.6 - r.top) / r.height, 0, 1);
    jpFill.style.width = p * 100 + "%";
    jpCrawler.style.left = 20 + p * jpTrack.clientWidth + "px";
    jpCrawler.textContent = p >= 0.98 ? "👸🏻" : "👶🏻";
  }
  addEventListener("scroll", updateJourney, { passive: true });
  updateJourney();

  /* ---------------------------------------------------------
     LIGHTBOX
     --------------------------------------------------------- */
  const lb = $("#lightbox");
  let lbIdx = 0, lastFocus = null;
  const dots = $("#lb-dots");
  CHAPTERS.forEach((c, i) => {
    const b = document.createElement("button");
    b.setAttribute("aria-label", "Chapter " + c.n);
    b.addEventListener("click", () => renderLightbox(i));
    dots.appendChild(b);
  });
  function renderLightbox(i) {
    lbIdx = (i + CHAPTERS.length) % CHAPTERS.length;
    const c = CHAPTERS[lbIdx], url = PHOTOS.months && PHOTOS.months[lbIdx];
    $("#lb-chapter").textContent = "Chapter " + c.n;
    $("#lb-title").textContent = c.title;
    $("#lb-month").textContent = c.month;
    $("#lb-story").textContent = c.story;
    const ph = $("#lb-photo");
    ph.style.background = c.bg;
    ph.innerHTML = url
      ? `<img src="${url}" alt="Princess Yazhini — ${c.title}">`
      : `<div class="placeholder" style="--ph-bg:${c.bg}"><span class="ph-emoji">${c.emoji}</span><span class="ph-month">${c.month}</span><span class="ph-sub">Photo coming soon</span></div>`;
    $$("button", dots).forEach((d, j) => d.classList.toggle("on", j === lbIdx));
    if (Audio.ctx) Audio.bell(NOTE(["C6", "D6", "E6", "G6", "A6"][lbIdx % 5]), Audio.ctx.currentTime, 1.2, 0.05);
  }
  function openLightbox(i) {
    lastFocus = document.activeElement;
    renderLightbox(i);
    lb.classList.add("open"); lb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    $("#lb-close").focus();
  }
  function closeLightbox() {
    lb.classList.remove("open"); lb.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }
  $("#lb-close").addEventListener("click", closeLightbox);
  $("#lb-prev").addEventListener("click", () => renderLightbox(lbIdx - 1));
  $("#lb-next").addEventListener("click", () => renderLightbox(lbIdx + 1));
  lb.addEventListener("click", (e) => { if (e.target === lb) closeLightbox(); });
  addEventListener("keydown", (e) => {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") renderLightbox(lbIdx - 1);
    if (e.key === "ArrowRight") renderLightbox(lbIdx + 1);
  });
  let touchX = null;
  lb.addEventListener("touchstart", (e) => { touchX = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) renderLightbox(lbIdx + (dx < 0 ? 1 : -1));
    touchX = null;
  });

  /* ---------------------------------------------------------
     3D TILT
     --------------------------------------------------------- */
  function addTilt(el, max = 8) {
    if (reduceMotion || matchMedia("(hover: none)").matches) return;
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `rotateY(${x * max * 2}deg) rotateX(${-y * max * 2}deg) scale(1.02)`;
    });
    el.addEventListener("pointerleave", () => { el.style.transform = ""; });
  }
  $$(".tilt").forEach((el) => addTilt(el, 6));

  /* ---------------------------------------------------------
     CAKE + BALLOONS
     --------------------------------------------------------- */
  const cake = $("#the-cake"), flame = $("#flame"), smoke = $("#smoke");
  const wishMsg = $("#wish-msg"), relight = $("#relight-btn"), micBtn = $("#mic-btn");
  const balloonsBox = $("#balloons");
  let blown = false, micStream = null, micRaf = null;
  const BALLOON_COLORS = ["#f9a8d4", "#f472b6", "#c084fc", "#fde68a", "#fbcfe8", "#e9d5ff", "#fecdd3", "#f7dc8a"];

  function launchBalloons(n = 14) {
    for (let i = 0; i < n; i++) {
      setTimeout(() => {
        const b = document.createElement("div");
        b.className = "balloon";
        const color = pick(BALLOON_COLORS);
        b.style.background = `radial-gradient(circle at 35% 30%, #fff9, ${color} 45%)`;
        b.style.borderBottomColor = color;
        b.style.color = color;
        b.style.left = rand(2, 92) + "%";
        b.style.animationDuration = rand(7, 12) + "s";
        b.style.setProperty("--sway", rand(-80, 80) + "px");
        b.addEventListener("pointerdown", (e) => {
          e.stopPropagation();
          b.classList.add("pop"); Audio.pop();
          sparkle(e.clientX, e.clientY, 14, 2); hearts(e.clientX, e.clientY, 3);
          setTimeout(() => b.remove(), 300);
        });
        b.addEventListener("animationend", (e) => { if (e.animationName === "rise") b.remove(); });
        balloonsBox.appendChild(b);
      }, i * 220);
    }
  }

  const guideSteps = $$("#cake-guide li"), tapHint = $("#tap-hint"), tapBtn = $("#tap-btn");
  const micPanel = $("#mic-panel"), micStatus = $("#mic-status"), micSub = $("#mic-sub"), breathFill = $("#breath-fill");
  function setStep(n) {
    guideSteps.forEach((li, i) => { li.classList.toggle("done", i < n); li.classList.toggle("now", i === n); });
  }
  setStep(1);

  function blowOut() {
    if (blown) return;
    blown = true;
    flame.classList.add("out");
    flame.style.rotate = ""; flame.style.scale = "";
    smoke.classList.remove("puff"); void smoke.offsetWidth; smoke.classList.add("puff");
    cake.classList.add("blown");
    const r = cake.getBoundingClientRect();
    confetti(r.left + r.width / 2, r.top, 180, 1.1);
    setTimeout(confettiCannons, 300);
    Audio.init(); Audio.fanfare();
    Audio.restartWithBirthdaySong();
    launchBalloons(16);
    wishMsg.textContent = "Happy 1st Birthday, Princess Yazhini! 💖";
    relight.hidden = false; tapBtn.hidden = true; micBtn.hidden = true;
    setStep(2);
    stopMic();
    toast("🎉 Your wish has been sent to the stars! Now pop the balloons 🎈");
  }
  function relightCandle() {
    blown = false;
    flame.classList.remove("out"); cake.classList.remove("blown");
    wishMsg.textContent = ""; relight.hidden = true; tapBtn.hidden = false; micBtn.hidden = false;
    setStep(1);
    Audio.chime();
  }
  cake.addEventListener("click", blowOut);
  cake.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); blowOut(); } });
  tapBtn.addEventListener("click", blowOut);
  relight.addEventListener("click", relightCandle);

  function stopMic() {
    if (micRaf) cancelAnimationFrame(micRaf);
    if (micStream) micStream.getTracks().forEach((t) => t.stop());
    micStream = null; micRaf = null;
    micBtn.textContent = "🎤 Use my microphone";
    micPanel.hidden = true;
    breathFill.style.width = "0%";
    if (!blown) { flame.style.rotate = ""; flame.style.scale = ""; }
  }
  micBtn.addEventListener("click", async () => {
    if (micStream) { stopMic(); return; }
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      toast("The microphone needs a secure (https) link — just tap the flame instead! 👆");
      return;
    }
    micPanel.hidden = false;
    micStatus.innerHTML = "🎤 Please tap <b>Allow</b> when your browser asks for the microphone…";
    micSub.textContent = "We only listen for your blow — nothing is recorded or saved.";
    try {
      if (blown) relightCandle();
      Audio.init();
      // Noise suppression would filter out the very "whoosh" we want to hear, so turn it off.
      micStream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false },
      });
      await Audio.ctx.resume();
      const src = Audio.ctx.createMediaStreamSource(micStream);
      const an = Audio.ctx.createAnalyser(); an.fftSize = 1024;
      const mute = Audio.ctx.createGain(); mute.gain.value = 0;
      src.connect(an); an.connect(mute); mute.connect(Audio.ctx.destination); // keeps the analyser running in every browser
      const data = new Uint8Array(an.fftSize);
      micBtn.textContent = "✋ Stop microphone";
      micStatus.innerHTML = "🌬️ Listening… now <b>blow at your screen</b> like blowing a real candle!";
      micSub.textContent = "Keep blowing until the bar reaches the ⭐";
      let noise = 0.01, power = 0, frames = 0;
      const startedAt = performance.now();
      const listen = () => {
        an.getByteTimeDomainData(data);
        let sum = 0;
        for (let i = 0; i < data.length; i++) { const v = (data[i] - 128) / 128; sum += v * v; }
        const rms = Math.sqrt(sum / data.length);
        // learn the room's background level during the first half second
        if (frames++ < 30) noise = Math.max(noise, rms * 1.3);
        const strength = clamp((rms - noise) / 0.08, 0, 1.5);
        power = strength > 0.25 ? power + strength * 0.045 : Math.max(0, power - 0.012);
        breathFill.style.width = clamp(power, 0, 1) * 100 + "%";
        flame.style.rotate = clamp(strength * 35, 0, 40) + "deg";
        flame.style.scale = String(1 - clamp(strength * 0.35, 0, 0.5));
        if (power >= 1) { blowOut(); return; }
        if (performance.now() - startedAt > 12000 && power < 0.2) {
          micSub.textContent = "Can't hear you yet 🙈 Blow a little closer to the mic — or just tap the flame 👆";
        }
        micRaf = requestAnimationFrame(listen);
      };
      listen();
    } catch (err) {
      stopMic();
      toast("No worries — just tap the flame to blow it out! 👆🕯️");
    }
  });

  /* ---------------------------------------------------------
     ENVELOPE / ROYAL DECREE
     --------------------------------------------------------- */
  const envelope = $("#envelope");
  function openEnvelope() {
    if (envelope.classList.contains("opened")) return;
    const letter = $(".letter", envelope), inner = $(".letter-inner", envelope);
    inner.style.height = "auto";
    const lift = inner.offsetHeight + 10;
    inner.style.height = "";
    envelope.style.setProperty("--lift", lift + "px");
    envelope.classList.add("opened");
    $("#seal-hint").textContent = "✨ You are invited! ✨";
    const r = $("#wax-seal").getBoundingClientRect();
    sparkle(r.left + r.width / 2, r.top + r.height / 2, 40, 3);
    setTimeout(() => {
      const lr = letter.getBoundingClientRect();
      confetti(lr.left + lr.width / 2, Math.max(60, lr.top + 40), 120, 0.9);
    }, 1400);
    Audio.init(); Audio.chime();
    setTimeout(() => Audio.fanfare(), 900);
  }
  $("#wax-seal").addEventListener("click", openEnvelope);

  /* Calendar + share */
  const ICS = [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Kingdom of Yazhini//Birthday//EN", "CALSCALE:GREGORIAN", "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    "UID:yazhini-first-birthday-20261103@kingdom",
    "DTSTAMP:20261001T000000Z",
    "DTSTART:20261103T123000Z",
    "DTEND:20261103T163000Z",
    "SUMMARY:👑 Princess B. Yazhini's 1st Birthday",
    "DESCRIPTION:Come shower your blessings on our sweetest Princess B. Yazhini as she turns One!\\nHosted by K. Bhoobalan & V. Revathy.\\nMap: " + MAP_URL,
    "LOCATION:Ramya Mahal\\, Maraimalai Nagar",
    "BEGIN:VALARM", "TRIGGER:-P1D", "ACTION:DISPLAY", "DESCRIPTION:Princess Yazhini's birthday is tomorrow!", "END:VALARM",
    "END:VEVENT", "END:VCALENDAR",
  ].join("\r\n");
  $("#cal-btn").addEventListener("click", () => {
    const blob = new Blob([ICS], { type: "text/calendar;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "Yazhini-1st-Birthday.ics";
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    toast("🗓️ Saved! See you at the royal ball 👑");
    Audio.chime();
  });
  const gcal = new URL("https://calendar.google.com/calendar/render");
  gcal.searchParams.set("action", "TEMPLATE");
  gcal.searchParams.set("text", "👑 Princess B. Yazhini's 1st Birthday");
  gcal.searchParams.set("dates", "20261103T123000Z/20261103T163000Z");
  gcal.searchParams.set("details", "Come shower your blessings on our sweetest Princess B. Yazhini as she turns One!\nHosted by K. Bhoobalan & V. Revathy.\nMap: " + MAP_URL);
  gcal.searchParams.set("location", "Ramya Mahal, Maraimalai Nagar");
  $("#gcal-btn").href = gcal.toString();

  $("#share-btn").addEventListener("click", async () => {
    const text = "👑 You're invited to Princess B. Yazhini's 1st Birthday!\n📅 Tuesday, 3rd November 2026\n🕕 6:00 PM\n📍 Ramya Mahal, Maraimalai Nagar\n🗺️ " + MAP_URL;
    const url = location.href.split("#")[0];
    if (navigator.share) {
      try { await navigator.share({ title: "Princess Yazhini turns One", text, url }); } catch (_) {}
    } else {
      window.open("https://wa.me/?text=" + encodeURIComponent(text + "\n✨ " + url), "_blank", "noopener");
    }
  });

  /* ---------------------------------------------------------
     BLESSINGS / WISH LANTERNS (saved on this device)
     --------------------------------------------------------- */
  const WKEY = "yazhini-blessings";
  const wall = $("#wish-wall"), sky = $("#lantern-sky");
  const CARD_TINTS = ["#fff0f7", "#f3ecff", "#fff6e0", "#ffeef2", "#eef7ff"];
  function loadWishes() { try { return JSON.parse(localStorage.getItem(WKEY)) || []; } catch (_) { return []; } }
  function saveWishes(w) { try { localStorage.setItem(WKEY, JSON.stringify(w)); } catch (_) {} }
  function wishCard(w, i) {
    const card = document.createElement("div");
    card.className = "wish-card";
    card.style.setProperty("--c", CARD_TINTS[i % CARD_TINTS.length]);
    const p = document.createElement("p"); p.textContent = w.text;
    const b = document.createElement("b"); b.textContent = "— " + w.name;
    card.append(p, b);
    return card;
  }
  function renderWishes() {
    const w = loadWishes();
    wall.innerHTML = "";
    if (!w.length) {
      const e = document.createElement("p"); e.className = "wish-empty";
      e.textContent = "Be the first to light a lantern for the little princess ✨";
      wall.appendChild(e); return;
    }
    w.slice().reverse().forEach((x, i) => wall.appendChild(wishCard(x, i)));
  }
  renderWishes();
  $("#wish-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = $("#wish-name").value.trim(), text = $("#wish-text").value.trim();
    if (!name || !text) return;
    const w = loadWishes(); w.push({ name, text, at: Date.now() }); saveWishes(w);
    renderWishes();
    const l = document.createElement("div");
    l.className = "lantern";
    l.style.left = rand(15, 80) + "%";
    l.style.setProperty("--sway", rand(-60, 60) + "px");
    const s = document.createElement("span"); s.textContent = name; l.appendChild(s);
    sky.appendChild(l); setTimeout(() => l.remove(), 9000);
    const fr = e.target.getBoundingClientRect();
    hearts(fr.left + fr.width / 2, fr.top, 14); sparkle(fr.left + fr.width / 2, fr.top, 30, 2.5);
    Audio.init(); Audio.chime();
    e.target.reset();
    toast("🏮 Your blessing is floating up to Princess Yazhini!");
  });

  /* ---------------------------------------------------------
     REVEAL + NAV + TOAST
     --------------------------------------------------------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
  }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
  $$(".reveal").forEach((el) => io.observe(el));

  const navLinks = $$("#royal-nav a");
  const sections = navLinks.map((a) => $(a.getAttribute("href")));
  const navIo = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      navLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach((s) => s && navIo.observe(s));

  let toastTimer;
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg; t.classList.add("show");
    clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove("show"), 3200);
  }

  // Easter egg: tap the princess portrait for a giggle of sparkles
  $("#hero-portrait").addEventListener("click", (e) => {
    Audio.init(); Audio.chime();
    hearts(e.clientX, e.clientY, 12); sparkle(e.clientX, e.clientY, 24, 2);
  });
})();
