import * as THREE from 'three';

export function setupLighting(scene) {
  scene.add(new THREE.AmbientLight(0x0a0a1a, 0.55));
  scene.add(new THREE.HemisphereLight(0x101030, 0x1a0a00, 0.6));

  // --- CABIN SANCTUARY (warm, inviting, golden) ---
  const trailerMain = new THREE.PointLight(0xff8844, 5.0, 20, 1.2);
  trailerMain.position.set(2.5, 2.5, -1.5);
  scene.add(trailerMain);

  const trailerDeep = new THREE.PointLight(0xffaa55, 3.0, 16, 1.2);
  trailerDeep.position.set(4.5, 2, -2);
  scene.add(trailerDeep);

  const loungeWarm = new THREE.PointLight(0xff9944, 2.5, 14, 1.4);
  loungeWarm.position.set(-3, 1.5, 2);
  scene.add(loungeWarm);

  const loungeOuter = new THREE.PointLight(0xffbb66, 1.5, 12, 1.5);
  loungeOuter.position.set(-5, 1, 3.5);
  scene.add(loungeOuter);

  const cabinCeiling = new THREE.PointLight(0xffcc88, 1.5, 10, 1.5);
  cabinCeiling.position.set(2, 3.5, -1);
  scene.add(cabinCeiling);

  const hillGlow = new THREE.PointLight(0xffaa44, 1.0, 15, 1.5);
  hillGlow.position.set(0, -0.5, 1);
  scene.add(hillGlow);

  // --- CITY HUSTLE (cool neon, energy) ---
  const cityDir = new THREE.DirectionalLight(0x2244aa, 1.2);
  cityDir.position.set(-10, 15, -50);
  cityDir.target.position.set(-20, 0, -40);
  scene.add(cityDir);
  scene.add(cityDir.target);

  const cityFill = new THREE.DirectionalLight(0x1a2266, 0.8);
  cityFill.position.set(-30, 10, -30);
  scene.add(cityFill);

  const rim = new THREE.DirectionalLight(0x00aacc, 0.6);
  rim.position.set(-15, 10, -25);
  scene.add(rim);

  // Scattered neon point lights — lower decay for wider reach
  const neonGreen = new THREE.PointLight(0x00ff88, 1.5, 70, 1.0);
  neonGreen.position.set(-20, 8, -35);
  scene.add(neonGreen);

  const neonPink = new THREE.PointLight(0xff0066, 1.2, 60, 1.0);
  neonPink.position.set(-30, 4, -25);
  scene.add(neonPink);

  const neonBlue = new THREE.PointLight(0x4488ff, 1.2, 60, 1.0);
  neonBlue.position.set(-10, 12, -45);
  scene.add(neonBlue);

  const neonCyan = new THREE.PointLight(0x00ddff, 1.0, 55, 1.0);
  neonCyan.position.set(-25, -2, -40);
  scene.add(neonCyan);

  const neonMagenta = new THREE.PointLight(0xcc44ff, 0.9, 50, 1.0);
  neonMagenta.position.set(-35, 0, -30);
  scene.add(neonMagenta);

  const neonOrange = new THREE.PointLight(0xff6600, 0.8, 45, 1.0);
  neonOrange.position.set(-15, -5, -50);
  scene.add(neonOrange);

  const neonDeepBlue = new THREE.PointLight(0x2266ff, 1.0, 60, 1.0);
  neonDeepBlue.position.set(-40, 5, -55);
  scene.add(neonDeepBlue);

  const neonHotPink = new THREE.PointLight(0xff2288, 0.7, 45, 1.0);
  neonHotPink.position.set(-8, -8, -35);
  scene.add(neonHotPink);

  const neonTeal = new THREE.PointLight(0x00ffaa, 0.8, 50, 1.0);
  neonTeal.position.set(-45, -3, -45);
  scene.add(neonTeal);
}
