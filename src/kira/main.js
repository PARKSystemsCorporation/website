import './kira.css';

const app = document.getElementById('app');
const GUMROAD = 'https://parkscorporation.gumroad.com/l/ixuuu';

app.innerHTML = `
<div class="kira-page">

  <!-- Nav -->
  <nav class="k-nav">
    <a href="/" class="k-nav-brand">
      <div class="k-nav-logo"></div>
      <span class="k-nav-wordmark">KIRA 5.1</span>
    </a>
    <ul class="k-nav-links">
      <li><a href="/">Home</a></li>
      <li><a href="/research/">Research</a></li>
    </ul>
    <a href="${GUMROAD}" target="_blank" rel="noopener" class="k-nav-cta">Download</a>
  </nav>

  <!-- Hero -->
  <section class="k-hero">
    <div class="k-hero-badge">PARK Systems Corporation</div>
    <div class="k-hero-logo">
      <div class="k-hero-logo-ring"></div>
      <div class="k-hero-logo-core"></div>
    </div>
    <h1>KIRA <span class="version">5.1</span></h1>
    <p class="k-hero-tagline">Your AI Operating System. Runs locally. Learns continuously. Compounds over time.</p>
    <a href="${GUMROAD}" target="_blank" rel="noopener" class="k-hero-cta">Download Now</a>
    <div class="k-hero-scroll">Scroll ↓</div>
  </section>

  <!-- The Pitch -->
  <section class="k-panel k-pitch k-reveal">
    <p class="k-pitch-quote">Most AI tools give answers.<br>KIRA gets better at <em>doing the work</em>.</p>
    <p class="k-pitch-sub">This is not another chatbot, wrapper, or prompt toy.</p>
  </section>

  <!-- What KIRA Is -->
  <section class="k-panel k-panel--elevated k-reveal">
    <div class="k-panel-inner k-split">
      <div>
        <div class="k-eyebrow">The Concept</div>
        <h2>A local intelligence environment that <em>compounds</em></h2>
        <p class="k-panel-text">
          KIRA sits in your workflow. It watches how you work, watches how other AIs respond,
          and gradually learns to do those tasks itself — so over time you rely less on
          external APIs and more on <strong>your own system</strong>.
        </p>
        <p class="k-panel-text" style="margin-top:1rem">
          You install it once. It compounds as you use it.
        </p>
      </div>
      <div class="k-terminal">
        <div class="k-terminal-bar">
          <div class="k-terminal-dot"></div>
          <div class="k-terminal-dot"></div>
          <div class="k-terminal-dot"></div>
          <span class="k-terminal-title">KIRA — Local Runtime</span>
        </div>
        <div class="k-terminal-body" id="terminal-content">
          <div><span class="prompt">$</span> <span class="cmd">ollama pull llama3.2</span></div>
          <div class="output">pulling manifest... done</div>
          <div style="margin-top:8px"><span class="prompt">$</span> <span class="cmd">kira start</span></div>
          <div class="success">✓ KIRA 5.1 online</div>
          <div class="success">✓ Ollama bridge connected (llama3.2)</div>
          <div class="success">✓ Memory layer initialized</div>
          <div class="success">✓ Cognitive engine ready</div>
          <div style="margin-top:8px"><span class="prompt">kira&gt;</span> <span class="cmd" id="typing-target"></span><span class="cursor-blink"></span></div>
        </div>
      </div>
    </div>
  </section>

  <!-- Enterprise Mode -->
  <section class="k-panel k-panel--dark k-reveal">
    <div class="k-panel-inner k-split k-split--reverse">
      <div>
        <div class="k-eyebrow">Enterprise Mode</div>
        <h2>Agents on a <em>canvas</em>. Wired together. Running.</h2>
        <p class="k-panel-text">
          <strong>Industrial</strong> — Agents on a scheduler with wires connecting them.
          Build pipelines visually. Every agent is a node. Every connection is a data flow.
          Watch your system think.
        </p>
        <p class="k-panel-text" style="margin-top:1rem">
          <strong>Corporate</strong> — Agent employees running tasks autonomously.
          They're all little KIRA AIs — each with a role, each learning from their work,
          each reporting back. Your AI workforce on your machine.
        </p>
      </div>
      <div class="k-canvas-illustration" id="agent-canvas">
        <div class="k-agent-node k-agent-node--active" style="top:20px;left:20px">
          <div class="k-agent-node-title">Researcher</div>
          <div class="k-agent-node-status">● EXECUTING</div>
        </div>
        <div class="k-agent-node" style="top:30px;right:30px">
          <div class="k-agent-node-title">Writer</div>
          <div class="k-agent-node-status">○ WAITING</div>
        </div>
        <div class="k-agent-node k-agent-node--active" style="bottom:60px;left:50%;transform:translateX(-50%)">
          <div class="k-agent-node-title">Reviewer</div>
          <div class="k-agent-node-status">● PLANNING</div>
        </div>
        <div class="k-agent-node" style="bottom:20px;left:20px">
          <div class="k-agent-node-title">Monitor</div>
          <div class="k-agent-node-status">○ IDLE</div>
        </div>
        <svg class="k-agent-wire" style="position:absolute;inset:0;width:100%;height:100%;z-index:1" id="wire-svg"></svg>
      </div>
    </div>
  </section>

  <!-- What It's Not -->
  <section class="k-panel k-panel--elevated k-reveal">
    <div class="k-panel-inner" style="text-align:center">
      <div class="k-eyebrow" style="text-align:center">What KIRA is not</div>
      <h2 style="text-align:center">No cloud. No subscription. <em>No data leaves your machine.</em></h2>
      <div class="k-not-grid">
        <div class="k-not-item">
          <div class="k-not-x">✕</div>
          <div class="k-not-label">SaaS</div>
        </div>
        <div class="k-not-item">
          <div class="k-not-x">✕</div>
          <div class="k-not-label">API Wrapper</div>
        </div>
        <div class="k-not-item">
          <div class="k-not-x">✕</div>
          <div class="k-not-label">Chatbot</div>
        </div>
      </div>
    </div>
  </section>

  <!-- How It Works -->
  <section class="k-panel k-panel--dark k-reveal">
    <div class="k-panel-inner">
      <div class="k-eyebrow">How It Works</div>
      <h2>Install once. <em>Everything runs local.</em></h2>
      <p class="k-panel-text">
        KIRA runs on your local LLM via <strong>Ollama</strong>.
        You bring the model — KIRA brings the intelligence layer.
        Any model works. KIRA just passes the model name to Ollama. That's it.
      </p>

      <div class="k-requirement">
        <h4>Requirement</h4>
        <p>You must have <strong>Ollama</strong> installed and at least one model pulled.</p>
        <p>Models that work immediately:</p>
        <div class="k-model-list">
          <span class="k-model-tag">llama3</span>
          <span class="k-model-tag">llama3.1</span>
          <span class="k-model-tag">llama3.2</span>
          <span class="k-model-tag">mistral</span>
          <span class="k-model-tag">codellama</span>
          <span class="k-model-tag">deepseek-coder</span>
        </div>
      </div>

      <div class="k-features">
        <div class="k-feature">
          <div class="k-feature-icon">⚡</div>
          <h4>Code Mode</h4>
          <p>Full development environment with AI pair programming. Understands your codebase, learns your patterns.</p>
        </div>
        <div class="k-feature">
          <div class="k-feature-icon">🏗️</div>
          <h4>Enterprise Mode</h4>
          <p>Industrial agent pipelines and corporate AI employees. Visual canvas. Wired connections. Scheduled execution.</p>
        </div>
        <div class="k-feature">
          <div class="k-feature-icon">🧠</div>
          <h4>Memory Layer</h4>
          <p>Persistent memory across sessions. KIRA remembers what worked, what failed, and what you prefer.</p>
        </div>
        <div class="k-feature">
          <div class="k-feature-icon">🔒</div>
          <h4>Fully Offline</h4>
          <p>No cloud dependency. No API keys burning money. Your data stays on your machine. Period.</p>
        </div>
        <div class="k-feature">
          <div class="k-feature-icon">📈</div>
          <h4>Compounds Over Time</h4>
          <p>The more you use it, the better it gets. Behavioral reinforcement from real outcomes, not prompts.</p>
        </div>
        <div class="k-feature">
          <div class="k-feature-icon">🔌</div>
          <h4>Any Ollama Model</h4>
          <p>Swap models freely. llama3, mistral, codellama, deepseek — KIRA adapts to whatever you run.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Final CTA -->
  <section class="k-cta-section k-reveal">
    <h2>Get <span style="color:var(--k-orange)">KIRA 5.1</span></h2>
    <p class="k-cta-sub">Install it. Use it. Watch it learn.</p>
    <a href="${GUMROAD}" target="_blank" rel="noopener" class="k-cta-button">Download on Gumroad</a>
    <div class="k-cta-corp">PARK Systems Corporation</div>
  </section>

  <footer class="k-footer">
    © 2026 PARK Systems Corporation
  </footer>

</div>
`;

// ═══════════════════════════════════════
// Scroll Reveal (IntersectionObserver)
// ═══════════════════════════════════════
const reveals = document.querySelectorAll('.k-reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
reveals.forEach(el => revealObserver.observe(el));

// ═══════════════════════════════════════
// Typing Effect
// ═══════════════════════════════════════
const phrases = [
  'analyze this codebase',
  'deploy to production',
  'research competitor APIs',
  'refactor the auth module',
  'write integration tests',
  'build the dashboard',
];

const typingTarget = document.getElementById('typing-target');
let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  if (!typingTarget) return;
  const phrase = phrases[phraseIndex];

  if (!deleting) {
    typingTarget.textContent = phrase.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex >= phrase.length) {
      deleting = true;
      setTimeout(typeLoop, 2000);
      return;
    }
    setTimeout(typeLoop, 60 + Math.random() * 40);
  } else {
    typingTarget.textContent = phrase.slice(0, charIndex);
    charIndex--;
    if (charIndex < 0) {
      deleting = false;
      charIndex = 0;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(typeLoop, 400);
      return;
    }
    setTimeout(typeLoop, 30);
  }
}
setTimeout(typeLoop, 1500);

// ═══════════════════════════════════════
// Agent Canvas Wires (SVG)
// ═══════════════════════════════════════
function drawWires() {
  const svg = document.getElementById('wire-svg');
  const canvas = document.getElementById('agent-canvas');
  if (!svg || !canvas) return;

  const nodes = canvas.querySelectorAll('.k-agent-node');
  if (nodes.length < 2) return;

  const canvasRect = canvas.getBoundingClientRect();
  let pathsHTML = '';

  function getCenter(node) {
    const r = node.getBoundingClientRect();
    return {
      x: r.left - canvasRect.left + r.width / 2,
      y: r.top - canvasRect.top + r.height / 2,
    };
  }

  const connections = [[0, 1], [0, 2], [1, 2], [2, 3]];

  connections.forEach(([a, b]) => {
    if (nodes[a] && nodes[b]) {
      const p1 = getCenter(nodes[a]);
      const p2 = getCenter(nodes[b]);
      const mx = (p1.x + p2.x) / 2;
      const my = (p1.y + p2.y) / 2;
      const isActive = nodes[a].classList.contains('k-agent-node--active');
      const color = isActive ? 'rgba(232,106,0,0.3)' : 'rgba(100,100,140,0.15)';
      pathsHTML += `<path d="M${p1.x},${p1.y} Q${mx},${my - 20} ${p2.x},${p2.y}" fill="none" stroke="${color}" stroke-width="1.5" stroke-dasharray="${isActive ? 'none' : '4,4'}"/>`;
    }
  });

  svg.innerHTML = pathsHTML;
}

setTimeout(drawWires, 100);
window.addEventListener('resize', drawWires);

// ═══════════════════════════════════════
// Floating Particles (Canvas)
// ═══════════════════════════════════════
const particleCanvas = document.getElementById('particles');
if (particleCanvas) {
  const ctx = particleCanvas.getContext('2d');
  let w, h;

  function resize() {
    w = particleCanvas.width = window.innerWidth;
    h = particleCanvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const particles = [];
  const COUNT = 60;
  const chars = ['0', '1', '{', '}', '/', '*', '>', '<', '=', '+', ';', ':', '.', '→'];

  for (let i = 0; i < COUNT; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.15,
      vy: -Math.random() * 0.3 - 0.1,
      char: chars[Math.floor(Math.random() * chars.length)],
      alpha: Math.random() * 0.12 + 0.03,
      size: Math.random() * 4 + 8,
    });
  }

  function animateParticles() {
    ctx.clearRect(0, 0, w, h);
    ctx.font = '10px "JetBrains Mono", monospace';

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;

      if (p.y < -20) { p.y = h + 20; p.x = Math.random() * w; }
      if (p.x < -20) p.x = w + 20;
      if (p.x > w + 20) p.x = -20;

      ctx.fillStyle = `rgba(232, 106, 0, ${p.alpha})`;
      ctx.font = `${p.size}px "JetBrains Mono", monospace`;
      ctx.fillText(p.char, p.x, p.y);
    }

    requestAnimationFrame(animateParticles);
  }
  animateParticles();
}
