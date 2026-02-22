import * as THREE from 'three';

export function setupLighting(scene) {
  // Very dim blue ambient
  scene.add(new THREE.AmbientLight(0x0a0a1a, 0.35));

  // Hemisphere: dark blue sky, warm dark ground
  scene.add(new THREE.HemisphereLight(0x080820, 0x1a0a00, 0.4));

  // Trailer interior - main warm glow
  const trailerMain = new THREE.PointLight(0xff8844, 3.5, 14, 1.5);
  trailerMain.position.set(2.5, 2.5, -1.5);
  scene.add(trailerMain);

  // Trailer secondary (deeper inside)
  const trailerDeep = new THREE.PointLight(0xffaa55, 2, 10, 1.5);
  trailerDeep.position.set(4.5, 2, -2);
  scene.add(trailerDeep);

  // City backlight - blue directional
  const cityDir = new THREE.DirectionalLight(0x1a3388, 0.6);
  cityDir.position.set(0, 15, -50);
  cityDir.target.position.set(0, 0, 0);
  scene.add(cityDir);
  scene.add(cityDir.target);

  // Cyan rim light from city
  const rim = new THREE.DirectionalLight(0x00aacc, 0.25);
  rim.position.set(-15, 10, -25);
  scene.add(rim);

  // Scattered neon point lights (far city glow)
  const neonGreen = new THREE.PointLight(0x00ff88, 0.6, 40);
  neonGreen.position.set(-20, 18, -35);
  scene.add(neonGreen);

  const neonPink = new THREE.PointLight(0xff0066, 0.4, 30);
  neonPink.position.set(25, 14, -30);
  scene.add(neonPink);

  const neonBlue = new THREE.PointLight(0x4488ff, 0.5, 35);
  neonBlue.position.set(5, 20, -45);
  scene.add(neonBlue);
}
