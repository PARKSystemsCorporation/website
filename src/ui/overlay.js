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
      <a href="/kira/"
         class="nav-link nav-link--kira">
        KIRA 5.1
      </a>
      <a href="/research/"
         class="nav-link nav-link--research">
        Research
      </a>
    </nav>
  `;
}
