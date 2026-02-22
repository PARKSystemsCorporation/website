export function createOverlay() {
  const overlay = document.getElementById('overlay');

  overlay.innerHTML = `
    <div class="brand">View Escape</div>
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
      <a href="https://parksystemscorporation.com/research"
         class="nav-link nav-link--research"
         target="_blank" rel="noopener noreferrer">
        Research
      </a>
    </nav>
  `;
}
