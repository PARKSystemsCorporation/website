import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

export function setupAtmosphere(scene, camera, renderer) {
  // Dark blue-purple fog
  scene.fog = new THREE.FogExp2(0x04040c, 0.013);
  scene.background = new THREE.Color(0x04040c);

  // Rain particle system
  const rainCount = 2500;
  const positions = new Float32Array(rainCount * 3);
  const velocities = new Float32Array(rainCount);

  const spreadX = 50;
  const spreadY = 25;
  const spreadZ = 50;

  for (let i = 0; i < rainCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * spreadX;
    positions[i * 3 + 1] = Math.random() * spreadY;
    positions[i * 3 + 2] = (Math.random() - 0.5) * spreadZ;
    velocities[i] = 8 + Math.random() * 10;
  }

  const rainGeo = new THREE.BufferGeometry();
  rainGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const rainMat = new THREE.PointsMaterial({
    color: 0x8899bb,
    size: 0.06,
    transparent: true,
    opacity: 0.35,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const rain = new THREE.Points(rainGeo, rainMat);
  scene.add(rain);

  // Post-processing: bloom for neon glow
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));

  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(
      Math.floor(window.innerWidth / 2),
      Math.floor(window.innerHeight / 2)
    ),
    0.7,
    0.35,
    0.82
  );
  composer.addPass(bloomPass);

  function rainUpdate(delta) {
    const pos = rain.geometry.attributes.position.array;
    for (let i = 0; i < rainCount; i++) {
      pos[i * 3 + 1] -= velocities[i] * delta;
      if (pos[i * 3 + 1] < -3) {
        pos[i * 3 + 1] = spreadY;
        pos[i * 3] = (Math.random() - 0.5) * spreadX;
        pos[i * 3 + 2] = (Math.random() - 0.5) * spreadZ;
      }
    }
    rain.geometry.attributes.position.needsUpdate = true;
  }

  return { composer, rainUpdate, bloomPass };
}
