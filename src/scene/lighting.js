import * as THREE from 'three';

export function setupLighting(scene) {
  scene.add(new THREE.AmbientLight(0x0a0a1a, 0.45));

  scene.add(new THREE.HemisphereLight(0x080820, 0x1a0a00, 0.5));

  const trailerMain = new THREE.PointLight(0xff8844, 4.0, 16, 1.5);
  trailerMain.position.set(2.5, 2.5, -1.5);
  scene.add(trailerMain);

  const trailerDeep = new THREE.PointLight(0xffaa55, 2.5, 12, 1.5);
  trailerDeep.position.set(4.5, 2, -2);
  scene.add(trailerDeep);

  const loungeWarm = new THREE.PointLight(0xff9944, 1.8, 10, 1.8);
  loungeWarm.position.set(-3, 1.5, 2);
  scene.add(loungeWarm);

  const cityDir = new THREE.DirectionalLight(0x1a3388, 0.9);
  cityDir.position.set(0, 15, -50);
  cityDir.target.position.set(0, 0, 0);
  scene.add(cityDir);
  scene.add(cityDir.target);

  const rim = new THREE.DirectionalLight(0x00aacc, 0.45);
  rim.position.set(-15, 10, -25);
  scene.add(rim);

  const neonGreen = new THREE.PointLight(0x00ff88, 0.9, 50);
  neonGreen.position.set(-20, 18, -35);
  scene.add(neonGreen);

  const neonPink = new THREE.PointLight(0xff0066, 0.6, 40);
  neonPink.position.set(25, 14, -30);
  scene.add(neonPink);

  const neonBlue = new THREE.PointLight(0x4488ff, 0.75, 45);
  neonBlue.position.set(5, 20, -45);
  scene.add(neonBlue);
}
