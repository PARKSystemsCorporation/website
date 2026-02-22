export function createOverlay() {
  const overlay = document.getElementById('overlay');

  overlay.innerHTML = `
    <div class="brand" id="brand-text">PARKSYSTEMS<br><span class="brand-sub">CORPORATION</span></div>
    <div class="sign-hint" id="sign-hint">click the neon signs to navigate</div>
  `;
}
