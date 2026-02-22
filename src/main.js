import * as THREE from 'three';
import { createHeroBuilding } from './scene/hero-building.js';
import { createBackgroundTowers } from './scene/background-towers.js';
import { setupAtmosphere } from './scene/atmosphere.js';
import { setupLighting } from './scene/lighting.js';
import { createOverlay } from './ui/overlay.js';
import './style.css';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  55,
  window.innerWidth / window.innerHeight,
  0.1,
  500
);

const startPos = new THREE.Vector3(5, 38, 50);
const endPos = new THREE.Vector3(2, 32, 42);
camera.position.copy(startPos);

const lookAt = new THREE.Vector3(14, -8, -18);
camera.lookAt(lookAt);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  powerPreference: 'high-performance',
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.95;
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.getElementById('canvas-container').appendChild(renderer.domElement);

const { composer, rainUpdate } = setupAtmosphere(scene, camera, renderer);
createOverlay();

const clock = new THREE.Clock();
const INTRO_DURATION = 2.5;

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

async function init() {
  createBackgroundTowers(scene);
  await createHeroBuilding(scene);
  setupLighting(scene);

  function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    const elapsed = clock.getElapsedTime();

    if (elapsed < INTRO_DURATION) {
      const t = easeOutCubic(elapsed / INTRO_DURATION);
      camera.position.lerpVectors(startPos, endPos, t);
    }

    camera.lookAt(lookAt);
    rainUpdate(delta, elapsed);
    composer.render();
  }
  animate();
}

init();

const loadingEl = document.getElementById('loading');
if (loadingEl) {
  setTimeout(() => {
    loadingEl.classList.add('fade-out');
    setTimeout(() => loadingEl.remove(), 2000);
  }, 1200);
}

let resizeT = 0;
window.addEventListener('resize', () => {
  clearTimeout(resizeT);
  resizeT = setTimeout(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    composer.setSize(w, h);
    composer.setPixelRatio(renderer.getPixelRatio());
  }, 100);
});
