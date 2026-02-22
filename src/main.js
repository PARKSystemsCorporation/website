import * as THREE from 'three';
import { createCity } from './scene/city.js';
import { createPlatform } from './scene/platform.js';
import { createTrailer } from './scene/trailer.js';
import { createVegetation } from './scene/vegetation.js';
import { setupAtmosphere } from './scene/atmosphere.js';
import { setupLighting } from './scene/lighting.js';
import { createOverlay } from './ui/overlay.js';
import './style.css';

// Scene
const scene = new THREE.Scene();

// Camera - elevated 3/4 view looking down at the rooftop
const camera = new THREE.PerspectiveCamera(
  52,
  window.innerWidth / window.innerHeight,
  0.1,
  500
);
camera.position.set(8, 7, 13);
camera.lookAt(0, 1, -2);

// Renderer
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  powerPreference: 'default',
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.65;
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Build scene
createCity(scene);
createPlatform(scene);
createTrailer(scene);
const vegetation = createVegetation(scene);
const { composer, rainUpdate } = setupAtmosphere(scene, camera, renderer);
setupLighting(scene);
createOverlay();

// Mouse parallax (smooth)
let targetMX = 0, targetMY = 0;
let currentMX = 0, currentMY = 0;
const baseCamPos = camera.position.clone();
const lookAt = new THREE.Vector3(0, 1, -2);

document.addEventListener('mousemove', (e) => {
  targetMX = (e.clientX / window.innerWidth - 0.5) * 2;
  targetMY = (e.clientY / window.innerHeight - 0.5) * 2;
});

// Touch parallax for mobile
document.addEventListener('touchmove', (e) => {
  if (e.touches.length > 0) {
    targetMX = (e.touches[0].clientX / window.innerWidth - 0.5) * 2;
    targetMY = (e.touches[0].clientY / window.innerHeight - 0.5) * 2;
  }
}, { passive: true });

// Vegetation sway
function updateVegetation(elapsed) {
  for (const sprite of vegetation.children) {
    const ud = sprite.userData;
    if (ud.baseX !== undefined) {
      sprite.position.x = ud.baseX + Math.sin(elapsed * ud.swaySpeed + ud.swayOffset) * ud.swayAmount;
    }
  }
}

// Render loop
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta();
  const elapsed = clock.getElapsedTime();

  // Smooth camera follow
  currentMX += (targetMX - currentMX) * 0.04;
  currentMY += (targetMY - currentMY) * 0.04;

  camera.position.x = baseCamPos.x + currentMX * 0.6;
  camera.position.y = baseCamPos.y - currentMY * 0.35;
  camera.lookAt(lookAt);

  rainUpdate(delta);
  updateVegetation(elapsed);

  composer.render();
}

animate();

// Fade out loading screen
const loadingEl = document.getElementById('loading');
if (loadingEl) {
  setTimeout(() => {
    loadingEl.classList.add('fade-out');
    setTimeout(() => loadingEl.remove(), 1200);
  }, 600);
}

// Resize handler
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);
});
