import { articles } from './articles.js';
import './research.css';

const app = document.getElementById('app');

function fmtDate(iso) {
  return iso.replace(/-/g, '.');
}

function systemsUsed() {
  const s = new Set();
  articles.forEach(a => a.tags.forEach(t => s.add(t)));
  return s.size;
}

function renderFeed() {
  app.innerHTML = `
    <div class="hud">
      <nav class="topbar">
        <div class="topbar-left">
          <span class="sys-dot"></span>
          <span class="sys-label">SYS ONLINE</span>
          <span class="topbar-sep"></span>
          <span class="topbar-title">RESEARCH DIVISION</span>
        </div>
        <a href="/" class="topbar-link">HOME</a>
      </nav>

      <div class="hero">
        <div class="hero-label">PARK SYSTEMS CORPORATION</div>
        <h1 class="hero-title">Research Hub</h1>
        <p class="hero-desc">Published findings, specifications, and technical reports.</p>
      </div>

      <div class="stat-row">
        <div class="stat-block">
          <div class="stat-num">${articles.length}</div>
          <div class="stat-label">PUBLICATIONS</div>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-block">
          <div class="stat-num">${systemsUsed()}</div>
          <div class="stat-label">TAGS INDEXED</div>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-block">
          <div class="stat-num">${articles.filter(a => a.type === 'SPEC').length}</div>
          <div class="stat-label">SPECIFICATIONS</div>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-block">
          <div class="stat-num">${articles.filter(a => a.type === 'REPORT').length}</div>
          <div class="stat-label">REPORTS</div>
        </div>
      </div>

      <div class="feed-header">
        <span class="feed-label">LATEST PUBLICATIONS</span>
        <span class="feed-count">${articles.length} entries</span>
      </div>

      <div class="feed">
        ${articles.map(a => `
          <article class="card" data-slug="${a.slug}">
            <div class="card-top">
              <span class="card-type card-type--${a.type.toLowerCase()}">${a.type}</span>
              <span class="card-date">${fmtDate(a.date)}</span>
            </div>
            <h2 class="card-title">${a.title}</h2>
            <p class="card-summary">${a.summary}</p>
            <div class="card-tags">
              ${a.tags.map(t => `<span class="card-tag">${t}</span>`).join('')}
            </div>
            <div class="card-action">READ &rarr;</div>
          </article>
        `).join('')}
      </div>
    </div>
  `;

  app.querySelectorAll('.card').forEach(el => {
    el.addEventListener('click', () => {
      window.location.hash = el.dataset.slug;
    });
  });
}

function renderArticle(slug) {
  const a = articles.find(x => x.slug === slug);
  if (!a) { renderFeed(); return; }

  app.innerHTML = `
    <div class="hud">
      <nav class="topbar">
        <div class="topbar-left">
          <span class="sys-dot"></span>
          <span class="sys-label">SYS ONLINE</span>
          <span class="topbar-sep"></span>
          <span class="topbar-title">RESEARCH DIVISION</span>
        </div>
        <a href="/" class="topbar-link">HOME</a>
      </nav>

      <a href="#" class="back-link">&larr; ALL PUBLICATIONS</a>

      <div class="doc">
        <div class="doc-header">
          <div class="doc-meta">
            <span class="card-type card-type--${a.type.toLowerCase()}">${a.type}</span>
            <span class="card-date">${fmtDate(a.date)}</span>
          </div>
          <h1 class="doc-title">${a.title}</h1>
          <div class="doc-tags">
            ${a.tags.map(t => `<span class="card-tag">${t}</span>`).join('')}
          </div>
        </div>
        <div class="doc-body">${a.content}</div>
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
