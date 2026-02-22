import { articles } from './articles.js';
import './research.css';

const app = document.getElementById('app');

function formatDate(iso) {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function renderFeed() {
  app.innerHTML = `
    <div class="r-wrapper">
      <header class="r-header">
        <span class="r-title">Research</span>
        <a href="/" class="r-home">Home</a>
      </header>

      <div class="r-stats">
        <div>
          <div class="r-stat-val">${articles.length}</div>
          <div class="r-stat-label">Publications</div>
        </div>
        <div>
          <div class="r-stat-val">${articles.filter(a => a.type === 'SPEC').length}</div>
          <div class="r-stat-label">Specifications</div>
        </div>
        <div>
          <div class="r-stat-val">${articles.filter(a => a.type === 'REPORT').length}</div>
          <div class="r-stat-label">Reports</div>
        </div>
      </div>

      <ul class="r-feed">
        ${articles.map(a => `
          <li class="r-item" data-slug="${a.slug}">
            <div class="r-meta">
              <span class="r-type">${a.type}</span>
              <span class="r-date">${formatDate(a.date)}</span>
            </div>
            <div class="r-item-title">${a.title}</div>
            <div class="r-summary">${a.summary}</div>
            <div class="r-tags">
              ${a.tags.map(t => `<span class="r-tag">${t}</span>`).join('')}
            </div>
          </li>
        `).join('')}
      </ul>
    </div>
  `;

  app.querySelectorAll('.r-item').forEach(el => {
    el.addEventListener('click', () => {
      window.location.hash = el.dataset.slug;
    });
  });
}

function renderArticle(slug) {
  const a = articles.find(x => x.slug === slug);
  if (!a) { renderFeed(); return; }

  app.innerHTML = `
    <div class="r-wrapper">
      <header class="r-header">
        <span class="r-title">Research</span>
        <a href="/" class="r-home">Home</a>
      </header>

      <a href="#" class="r-back">&larr; Back</a>

      <div class="r-article-meta">
        <span class="r-type">${a.type}</span>
        <span class="r-date">${formatDate(a.date)}</span>
      </div>
      <h1 class="r-article-title">${a.title}</h1>
      <div class="r-article-tags">
        ${a.tags.map(t => `<span class="r-article-tag">${t}</span>`).join('')}
      </div>
      <div class="r-body">${a.content}</div>
    </div>
  `;

  window.scrollTo(0, 0);
}

function route() {
  const hash = window.location.hash.slice(1);
  if (hash) {
    renderArticle(hash);
  } else {
    renderFeed();
  }
}

window.addEventListener('hashchange', route);
route();
