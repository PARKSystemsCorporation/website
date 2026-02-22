import * as THREE from 'three';
import { createHeroBuilding } from './scene/hero-building.js';
import { createBackgroundTowers } from './scene/background-towers.js';
import { createPlatform } from './scene/platform.js';
import { createTrailer } from './scene/trailer.js';
import { createVegetation } from './scene/vegetation.js';
import { setupAtmosphere } from './scene/atmosphere.js';
import { setupLighting } from './scene/lighting.js';
import { createOverlay } from './ui/overlay.js';
import './style.css';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  65,
  window.innerWidth / window.innerHeight,
  0.1,
  500
);

const startPos = new THREE.Vector3(-2, 1.7, 4.8);
const endPos = new THREE.Vector3(-2.5, 1.65, 4.5);
camera.position.copy(startPos);

const lookAtBase = new THREE.Vector3(8, 0, -12);
const lookAt = lookAtBase.clone();
camera.lookAt(lookAt);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  powerPreference: 'high-performance',
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.15;
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.getElementById('canvas-container').appendChild(renderer.domElement);

const { composer, rainUpdate } = setupAtmosphere(scene, camera, renderer);
createOverlay();

const clock = new THREE.Clock();
const INTRO_DURATION = 2.5;

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

let updateStringLights = () => {};
let vegetationGroup = null;

function updateVegetation(elapsed) {
  if (!vegetationGroup) return;
  vegetationGroup.traverse((obj) => {
    if (obj.isSprite && obj.userData.swaySpeed) {
      const sway = Math.sin(elapsed * obj.userData.swaySpeed + obj.userData.swayOffset) * obj.userData.swayAmount;
      obj.position.x = (obj.userData.baseX ?? obj.position.x) + sway;
    }
  });
}

async function init() {
  createPlatform(scene);
  const { updateStringLights: slUpdate } = createTrailer(scene);
  vegetationGroup = createVegetation(scene);

  createBackgroundTowers(scene);
  await createHeroBuilding(scene);
  setupLighting(scene);

  updateStringLights = slUpdate;

  const breathAmt = 0.015;
  const breathSpeed = 0.35;
  let targetMouseX = 0.5, targetMouseY = 0.5;
  let mouseX = 0.5, mouseY = 0.5;
  window.addEventListener('mousemove', (e) => {
    targetMouseX = e.clientX / window.innerWidth;
    targetMouseY = e.clientY / window.innerHeight;
  });

  function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    const elapsed = clock.getElapsedTime();

    if (elapsed < INTRO_DURATION) {
      const t = easeOutCubic(elapsed / INTRO_DURATION);
      camera.position.lerpVectors(startPos, endPos, t);
    } else {
      const breath = Math.sin(elapsed * breathSpeed) * breathAmt;
      camera.position.y = endPos.y + breath;
    }

    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;
    lookAt.copy(lookAtBase);
    lookAt.x += (mouseX - 0.5) * 2.5;
    lookAt.y += (mouseY - 0.5) * 1.5;
    camera.lookAt(lookAt);
    updateStringLights(elapsed);
    updateVegetation(elapsed);
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
