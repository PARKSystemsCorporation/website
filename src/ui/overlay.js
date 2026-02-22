export function createOverlay() {
  const overlay = document.getElementById('overlay');

  overlay.innerHTML = `
    <div class="brand">PARKSYSTEMS<br><span class="brand-sub">CORPORATION</span></div>
    <nav class="nav-links">
      <a href="https://parksystemscorporation.com/mmo"
         class="nav-link nav-link--mmo"
         target="_blank" rel="noopener noreferrer">
        MMO
      </a>
      <a href="https://parkscorporation.gumroad.com/l/ixuuu"
         class="nav-link nav-link--kira"
         target="_blank" rel="noopener noreferrer">
        KIRA 5.0
      </a>
      <a href="/research/"
         class="nav-link nav-link--research">
        Research
      </a>
    </nav>
  `;
}
