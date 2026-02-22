import * as THREE from 'three';

export function setupLighting(scene) {
  scene.add(new THREE.AmbientLight(0x0a0a1a, 0.35));
  scene.add(new THREE.HemisphereLight(0x080820, 0x1a0a00, 0.4));

  // --- CABIN SANCTUARY (warm, inviting, golden) ---
  const trailerMain = new THREE.PointLight(0xff8844, 5.0, 18, 1.4);
  trailerMain.position.set(2.5, 2.5, -1.5);
  scene.add(trailerMain);

  const trailerDeep = new THREE.PointLight(0xffaa55, 3.0, 14, 1.4);
  trailerDeep.position.set(4.5, 2, -2);
  scene.add(trailerDeep);

  const loungeWarm = new THREE.PointLight(0xff9944, 2.5, 12, 1.6);
  loungeWarm.position.set(-3, 1.5, 2);
  scene.add(loungeWarm);

  const loungeOuter = new THREE.PointLight(0xffbb66, 1.5, 10, 1.8);
  loungeOuter.position.set(-5, 1, 3.5);
  scene.add(loungeOuter);

  const cabinCeiling = new THREE.PointLight(0xffcc88, 1.2, 8, 2);
  cabinCeiling.position.set(2, 3.5, -1);
  scene.add(cabinCeiling);

  const hillGlow = new THREE.PointLight(0xffaa44, 0.8, 12, 2);
  hillGlow.position.set(0, -0.5, 1);
  scene.add(hillGlow);

  // --- CITY HUSTLE (cool neon, energy) ---
  const cityDir = new THREE.DirectionalLight(0x1a3388, 1.0);
  cityDir.position.set(0, 15, -50);
  cityDir.target.position.set(0, 0, 0);
  scene.add(cityDir);
  scene.add(cityDir.target);

  const rim = new THREE.DirectionalLight(0x00aacc, 0.5);
  rim.position.set(-15, 10, -25);
  scene.add(rim);

  // Scattered neon point lights across the city
  const neonGreen = new THREE.PointLight(0x00ff88, 1.2, 55);
  neonGreen.position.set(-20, 8, -35);
  scene.add(neonGreen);

  const neonPink = new THREE.PointLight(0xff0066, 0.9, 50);
  neonPink.position.set(-30, 4, -25);
  scene.add(neonPink);

  const neonBlue = new THREE.PointLight(0x4488ff, 1.0, 50);
  neonBlue.position.set(-10, 12, -45);
  scene.add(neonBlue);

  const neonCyan = new THREE.PointLight(0x00ddff, 0.8, 45);
  neonCyan.position.set(-25, -2, -40);
  scene.add(neonCyan);

  const neonMagenta = new THREE.PointLight(0xcc44ff, 0.7, 40);
  neonMagenta.position.set(-35, 0, -30);
  scene.add(neonMagenta);

  const neonOrange = new THREE.PointLight(0xff6600, 0.6, 35);
  neonOrange.position.set(-15, -5, -50);
  scene.add(neonOrange);

  const neonDeepBlue = new THREE.PointLight(0x2266ff, 0.8, 50);
  neonDeepBlue.position.set(-40, 5, -55);
  scene.add(neonDeepBlue);

  const neonHotPink = new THREE.PointLight(0xff2288, 0.5, 35);
  neonHotPink.position.set(-8, -8, -35);
  scene.add(neonHotPink);

  const neonTeal = new THREE.PointLight(0x00ffaa, 0.6, 40);
  neonTeal.position.set(-45, -3, -45);
  scene.add(neonTeal);
}
