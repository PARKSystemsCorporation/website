import * as THREE from 'three';
import { createCity, updateNeonFlicker } from './scene/city.js';
import { createPlatform } from './scene/platform.js';
import { createTrailer } from './scene/trailer.js';
import { createVegetation } from './scene/vegetation.js';
import { setupAtmosphere } from './scene/atmosphere.js';
import { setupLighting } from './scene/lighting.js';
import { createEffects } from './scene/effects.js';
import { createOverlay } from './ui/overlay.js';
import './style.css';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  55,
  window.innerWidth / window.innerHeight,
  0.1,
  500
);

const startPos = new THREE.Vector3(-4, 9, 20);
const endPos = new THREE.Vector3(0, 7, 15);
camera.position.copy(startPos);

const lookAt = new THREE.Vector3(-6, 0, -4);
camera.lookAt(lookAt);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  powerPreference: 'high-performance',
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 3));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.1;
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.getElementById('canvas-container').appendChild(renderer.domElement);

const { group: cityGroup, flickerStrips } = createCity(scene);
createPlatform(scene);
const { group: trailerGroup, updateStringLights } = createTrailer(scene);
const vegetation = createVegetation(scene);
const { composer, rainUpdate } = setupAtmosphere(scene, camera, renderer);
setupLighting(scene);
const effects = createEffects(scene);
createOverlay();

let targetMX = 0, targetMY = 0;
let currentMX = 0, currentMY = 0;

document.addEventListener('mousemove', (e) => {
  targetMX = (e.clientX / window.innerWidth - 0.5) * 2;
  targetMY = (e.clientY / window.innerHeight - 0.5) * 2;
});

document.addEventListener('touchmove', (e) => {
  if (e.touches.length > 0) {
    targetMX = (e.touches[0].clientX / window.innerWidth - 0.5) * 2;
    targetMY = (e.touches[0].clientY / window.innerHeight - 0.5) * 2;
  }
}, { passive: true });

function updateVegetation(elapsed) {
  for (const sprite of vegetation.children) {
    const ud = sprite.userData;
    if (ud.baseX !== undefined) {
      sprite.position.x = ud.baseX + Math.sin(elapsed * ud.swaySpeed + ud.swayOffset) * ud.swayAmount;
    }
  }
}

const clock = new THREE.Clock();
const INTRO_DURATION = 2.5;

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta();
  const elapsed = clock.getElapsedTime();

  if (elapsed < INTRO_DURATION) {
    const t = easeOutCubic(elapsed / INTRO_DURATION);
    camera.position.lerpVectors(startPos, endPos, t);
  } else {
    currentMX += (targetMX - currentMX) * 0.04;
    currentMY += (targetMY - currentMY) * 0.04;

    const breatheX = Math.sin(elapsed * 0.8) * 0.08;
    const breatheY = Math.cos(elapsed * 0.5) * 0.05;

    camera.position.x = endPos.x + currentMX * 0.6 + breatheX;
    camera.position.y = endPos.y - currentMY * 0.35 + breatheY;
    camera.position.z = endPos.z;
  }

  camera.lookAt(lookAt);

  rainUpdate(delta, elapsed);
  updateVegetation(elapsed);
  updateNeonFlicker(flickerStrips, elapsed);
  updateStringLights(elapsed);
  effects.update(elapsed, delta);

  composer.render();
}

animate();

const loadingEl = document.getElementById('loading');
if (loadingEl) {
  setTimeout(() => {
    loadingEl.classList.add('fade-out');
    setTimeout(() => loadingEl.remove(), 2000);
  }, 800);
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 3));
  composer.setSize(window.innerWidth, window.innerHeight);
});
