import { articles, systemTags } from './articles.js';
import './research.css';

const app = document.getElementById('app');
const tabs = ['Feed', 'Archive', 'Systems', 'Bazaar'];

function fmtDate(iso) {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function relTime(iso) {
  const diff = Date.now() - new Date(iso + 'T00:00:00').getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return 'TODAY';
  if (days === 1) return '1 DAY AGO';
  return `${days} DAYS AGO`;
}

function getClassifications() {
  const c = { Specifications: 0, Research: 0, Reports: 0 };
  articles.forEach(a => {
    if (a.type === 'SPEC') c.Specifications++;
    else if (a.type === 'REPORT') c.Reports++;
    else c.Research++;
  });
  return c;
}

function getSystems() {
  const s = { KIRA: 0, EXOKIN: 0, ARIA: 0, 'Unity Bridge': 0, 'Neural Runtime': 0 };
  articles.forEach(a => { if (a.systems) a.systems.forEach(sys => { if (s[sys] !== undefined) s[sys]++; }); });
  return s;
}

function renderFeed() {
  const cls = getClassifications();
  const sys = getSystems();

  app.innerHTML = `
    <div class="r-shell">
      <nav class="r-nav">
        <div class="r-nav-left">
          ${tabs.map((t, i) => `<a href="#" class="r-tab${i === 0 ? ' r-tab--active' : ''}">${t}</a>`).join('')}
        </div>
        <a href="/" class="r-nav-home">Home</a>
      </nav>

      <header class="r-hero">
        <div class="r-status"><span class="r-dot"></span>SYS ONLINE</div>
        <div class="r-division">PARK Systems Research Division</div>
        <h1 class="r-heading">Research Hub</h1>
        <p class="r-desc">Published findings, specifications, and technical reports. Open knowledge for autonomous systems engineering.</p>
      </header>

      <div class="r-stats">
        <div class="r-stat"><span class="r-stat-num">${articles.length}</span><span class="r-stat-lbl">Publications</span></div>
        <div class="r-stat"><span class="r-stat-num">31</span><span class="r-stat-lbl">Files Spec'd</span></div>
        <div class="r-stat"><span class="r-stat-num r-stat-active">ACTIVE</span><span class="r-stat-lbl">Status</span></div>
      </div>

      <div class="r-layout">
        <main class="r-main">
          <div class="r-feed-head">
            <span class="r-section-title">Latest Publications</span>
          </div>
          ${articles.map(a => `
            <article class="r-card" data-slug="${a.slug}">
              <div class="r-card-meta">
                <span class="r-badge r-badge--${a.type.toLowerCase()}">${a.type}</span>
                <span class="r-card-date">${fmtDate(a.date)}${a.subtype ? ' · ' + a.subtype : ''}</span>
              </div>
              <h2 class="r-card-title">${a.title}</h2>
              <p class="r-card-summary">${a.summary}</p>
              <div class="r-card-tags">${a.tags.map(t => `<span class="r-card-tag">${t}</span>`).join('')}</div>
              <span class="r-card-cta">READ FULL ${a.type === 'REPORT' ? 'REPORT' : 'SPECIFICATION'} &rarr;</span>
            </article>
          `).join('')}
        </main>

        <aside class="r-sidebar">
          <div class="r-side-section">
            <h4 class="r-side-title">Classifications</h4>
            <ul class="r-side-list">
              ${Object.entries(cls).map(([k, v]) => `<li class="r-side-item"><span>${k}</span><span class="r-side-count">${v}</span></li>`).join('')}
            </ul>
          </div>

          <div class="r-side-section">
            <h4 class="r-side-title">Systems</h4>
            <ul class="r-side-list">
              ${Object.entries(sys).map(([k, v]) => `<li class="r-side-item"><span>${k}</span><span class="r-side-count">${v}</span></li>`).join('')}
            </ul>
          </div>

          <div class="r-side-section">
            <h4 class="r-side-title">Recent Activity</h4>
            <ul class="r-side-activity">
              ${articles.slice(0, 4).map(a => `<li class="r-activity-item"><span class="r-activity-name">${a.title.length > 40 ? a.title.slice(0, 40) + '...' : a.title}</span><span class="r-activity-time">${relTime(a.date)}</span></li>`).join('')}
            </ul>
          </div>

          <div class="r-side-section">
            <h4 class="r-side-title">System Tags</h4>
            <div class="r-sys-tags">${systemTags.map(t => `<span class="r-sys-tag">${t}</span>`).join('')}</div>
          </div>
        </aside>
      </div>
    </div>
  `;

  app.querySelectorAll('.r-card').forEach(el => {
    el.addEventListener('click', () => { window.location.hash = el.dataset.slug; });
  });
}

function renderArticle(slug) {
  const a = articles.find(x => x.slug === slug);
  if (!a) { renderFeed(); return; }

  app.innerHTML = `
    <div class="r-shell">
      <nav class="r-nav">
        <div class="r-nav-left">
          ${tabs.map((t, i) => `<a href="#" class="r-tab${i === 0 ? ' r-tab--active' : ''}">${t}</a>`).join('')}
        </div>
        <a href="/" class="r-nav-home">Home</a>
      </nav>

      <div class="r-article-wrap">
        <a href="#" class="r-back">&larr; All Publications</a>
        <div class="r-article-meta">
          <span class="r-badge r-badge--${a.type.toLowerCase()}">${a.type}</span>
          <span class="r-card-date">${fmtDate(a.date)}${a.subtype ? ' · ' + a.subtype : ''}</span>
        </div>
        <h1 class="r-article-title">${a.title}</h1>
        <div class="r-card-tags">${a.tags.map(t => `<span class="r-card-tag">${t}</span>`).join('')}</div>
        <div class="r-article-body">${a.content}</div>
      </div>
    </div>
  `;

  window.scrollTo(0, 0);
}

function route() {
  const hash = window.location.hash.slice(1);
  if (hash) renderArticle(hash);
  else renderFeed();
}

window.addEventListener('hashchange', route);
route();
