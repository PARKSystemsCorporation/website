import { articles, systemTags } from './articles.js';
import './research.css';

const app = document.getElementById('app');

function fmtDate(iso) {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function relTime(iso) {
  const diff = Date.now() - new Date(iso + 'T00:00:00').getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return 'JUST NOW';
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
  return { KIRA: 0, EXOKIN: 0, ARIA: 0, 'Unity Bridge': 0, 'Neural Runtime': 0 };
}

function countSystems() {
  const s = getSystems();
  articles.forEach(a => {
    if (a.systems) a.systems.forEach(sys => { if (s[sys] !== undefined) s[sys]++; });
  });
  return s;
}

function totalFilesSpecd() {
  return 31;
}

function classColor(type) {
  if (type === 'SPEC') return '#e86a00';
  if (type === 'REPORT') return '#ff6f3c';
  return '#7b5cff';
}

function classCSS(type) {
  if (type === 'SPEC') return 'rh-class-spec';
  if (type === 'REPORT') return 'rh-class-report';
  return 'rh-class-research';
}

function activityDotColor(i) {
  const colors = ['#e86a00', '#7b5cff', '#ff6f3c', '#ff8c33'];
  return colors[i % colors.length];
}

function renderShell(inner) {
  return `
    <div class="research-hub">
      <div class="rh-hud-corner rh-hud-tl"></div>
      <div class="rh-hud-corner rh-hud-tr"></div>
      <div class="rh-hud-corner rh-hud-bl"></div>
      <div class="rh-hud-corner rh-hud-br"></div>

      <nav class="rh-nav">
        <a href="/" class="rh-nav-brand">
          <div class="rh-nav-icon"></div>
          <span class="rh-nav-title">Research</span>
        </a>
        <ul class="rh-nav-links">
          <li><a href="#" class="active">Feed</a></li>
          <li><a>Archive</a></li>
          <li><a>Systems</a></li>
          <li><a>Bazaar</a></li>
        </ul>
        <div class="rh-nav-status">
          <div class="rh-status-dot"></div>
          SYS ONLINE
        </div>
      </nav>

      ${inner}
    </div>
  `;
}

function renderFeed() {
  const cls = getClassifications();
  const sys = countSystems();

  const leftSidebar = `
    <aside class="rh-sidebar-left">
      <div class="rh-sidebar-section">
        <h4 class="rh-sidebar-title">Classifications</h4>
        <ul class="rh-tag-list">
          ${Object.entries(cls).map(([k, v]) => `
            <li class="rh-tag-item">
              <span class="rh-tag-dot" style="background:${k === 'Specifications' ? '#e86a00' : k === 'Reports' ? '#ff6f3c' : '#7b5cff'}"></span>
              ${k}
              <span class="rh-tag-count">${v}</span>
            </li>
          `).join('')}
        </ul>
      </div>
      <div class="rh-sidebar-section">
        <h4 class="rh-sidebar-title">Systems</h4>
        <ul class="rh-tag-list">
          ${Object.entries(sys).map(([k, v]) => `
            <li class="rh-tag-item">
              <span class="rh-tag-dot" style="background:${v > 0 ? '#e86a00' : '#4a5070'}"></span>
              ${k}
              <span class="rh-tag-count">${v}</span>
            </li>
          `).join('')}
        </ul>
      </div>
    </aside>
  `;

  const rightSidebar = `
    <aside class="rh-sidebar-right">
      <div class="rh-sidebar-section">
        <h4 class="rh-sidebar-title">Recent Activity</h4>
        ${articles.slice(0, 4).map((a, i) => `
          <div class="rh-activity-item">
            <div class="rh-activity-dot" style="background:${activityDotColor(i)}"></div>
            <div class="rh-activity-text">
              ${a.title.length > 40 ? a.title.slice(0, 40) + '…' : a.title}
              <span class="rh-activity-time">${relTime(a.date)}</span>
            </div>
          </div>
        `).join('')}
      </div>
      <div class="rh-sidebar-section">
        <h4 class="rh-sidebar-title">System Tags</h4>
        <div style="display:flex;flex-wrap:wrap;gap:6px">
          ${systemTags.map(t => `<span class="rh-post-tag">${t}</span>`).join('')}
        </div>
      </div>
    </aside>
  `;

  const feedCards = articles.map(a => `
    <div class="rh-post" data-slug="${a.slug}">
      <div class="rh-post-header">
        <span class="rh-post-classification ${classCSS(a.type)}">${a.type}</span>
        <span class="rh-post-meta">${fmtDate(a.date)}${a.subtype ? ' · ' + a.subtype : ''}</span>
      </div>
      <h3 class="rh-post-title"><a href="#${a.slug}">${a.title}</a></h3>
      <p class="rh-post-subtitle">${a.summary}</p>
      <div class="rh-post-tags">
        ${a.tags.map(t => `<span class="rh-post-tag">${t}</span>`).join('')}
      </div>
      <div class="rh-post-footer">
        <a href="#${a.slug}" class="rh-post-action">READ FULL ${a.type === 'REPORT' ? 'REPORT' : 'SPECIFICATION'} →</a>
      </div>
    </div>
  `).join('');

  app.innerHTML = renderShell(`
    <div class="rh-hero">
      <div class="rh-hero-eyebrow">PARK Systems Research Division</div>
      <h1>Research <span>Hub</span></h1>
      <p class="rh-hero-sub">
        Published findings, specifications, and technical reports.
        Open knowledge for autonomous systems engineering.
      </p>
      <div class="rh-stats-bar">
        <div class="rh-stat">
          <span class="rh-stat-value">${articles.length}</span>
          <span class="rh-stat-label">Publications</span>
        </div>
        <div class="rh-stat">
          <span class="rh-stat-value">${totalFilesSpecd()}</span>
          <span class="rh-stat-label">Files Spec'd</span>
        </div>
        <div class="rh-stat">
          <span class="rh-stat-value">ACTIVE</span>
          <span class="rh-stat-label">Status</span>
        </div>
      </div>
    </div>

    <div class="rh-content">
      ${leftSidebar}
      <div class="rh-feed">
        <div class="rh-feed-header">
          <h3 class="rh-feed-title">Latest Publications</h3>
          <div class="rh-feed-sort">
            <button class="rh-sort-btn active">Latest</button>
            <button class="rh-sort-btn">Top</button>
          </div>
        </div>
        ${feedCards}
      </div>
      ${rightSidebar}
    </div>
  `);

  app.querySelectorAll('.rh-post').forEach(el => {
    el.addEventListener('click', (e) => {
      if (e.target.closest('a')) return;
      window.location.hash = el.dataset.slug;
    });
  });
}

function renderArticle(slug) {
  const a = articles.find(x => x.slug === slug);
  if (!a) { renderFeed(); return; }

  app.innerHTML = renderShell(`
    <a href="#" class="rh-back-link">← All Publications</a>
    <div class="rh-article-wrap">
      <div class="rh-post-header" style="padding:0 0 8px">
        <span class="rh-post-classification ${classCSS(a.type)}">${a.type}</span>
        <span class="rh-post-meta">${fmtDate(a.date)}${a.subtype ? ' · ' + a.subtype : ''}</span>
      </div>
      <h1 style="font-family:var(--rh-sans);font-size:clamp(24px,3.5vw,36px);font-weight:700;color:var(--rh-text-primary);margin:0 0 12px;line-height:1.2">${a.title}</h1>
      <div class="rh-post-tags" style="padding:0 0 20px">
        ${a.tags.map(t => `<span class="rh-post-tag">${t}</span>`).join('')}
      </div>
      <div class="rh-post-body">
        ${a.content}
      </div>
    </div>
  `);

  window.scrollTo(0, 0);
}

function route() {
  const hash = window.location.hash.slice(1);
  if (hash) renderArticle(hash);
  else renderFeed();
}

window.addEventListener('hashchange', route);
route();
