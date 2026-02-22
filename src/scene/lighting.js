import * as THREE from 'three';

export function setupLighting(scene, cabinPivot) {
  scene.add(new THREE.AmbientLight(0x080818, 0.3));
  scene.add(new THREE.HemisphereLight(0x0a0a20, 0x0a0500, 0.35));

  // --- CABIN SANCTUARY (warm, inviting) — attached to pivot so they rotate ---
  const trailerMain = new THREE.PointLight(0xff8844, 3.0, 18, 1.3);
  trailerMain.position.set(2.5, 2.5, -1.5);
  cabinPivot.add(trailerMain);

  const trailerDeep = new THREE.PointLight(0xffaa55, 2.0, 14, 1.3);
  trailerDeep.position.set(4.5, 2, -2);
  cabinPivot.add(trailerDeep);

  const loungeWarm = new THREE.PointLight(0xff9944, 1.8, 12, 1.5);
  loungeWarm.position.set(-3, 1.5, 2);
  cabinPivot.add(loungeWarm);

  const loungeOuter = new THREE.PointLight(0xffbb66, 1.0, 10, 1.6);
  loungeOuter.position.set(-5, 1, 3.5);
  cabinPivot.add(loungeOuter);

  const cabinCeiling = new THREE.PointLight(0xffcc88, 1.0, 8, 1.6);
  cabinCeiling.position.set(2, 3.5, -1);
  cabinPivot.add(cabinCeiling);

  const hillGlow = new THREE.PointLight(0xffaa44, 0.6, 12, 1.6);
  hillGlow.position.set(0, -0.5, 1);
  cabinPivot.add(hillGlow);

  // --- CITY HUSTLE (cool neon, energy) — scene-level ---
  const cityDir = new THREE.DirectionalLight(0x2244aa, 0.8);
  cityDir.position.set(-10, 15, -50);
  cityDir.target.position.set(-20, 0, -40);
  scene.add(cityDir);
  scene.add(cityDir.target);

  const cityFill = new THREE.DirectionalLight(0x1a2266, 0.5);
  cityFill.position.set(-30, 10, -30);
  scene.add(cityFill);

  const rim = new THREE.DirectionalLight(0x00aacc, 0.35);
  rim.position.set(-15, 10, -25);
  scene.add(rim);

  const neonGreen = new THREE.PointLight(0x00ff88, 1.0, 65, 1.0);
  neonGreen.position.set(-20, 8, -35);
  scene.add(neonGreen);

  const neonPink = new THREE.PointLight(0xff0066, 0.8, 55, 1.0);
  neonPink.position.set(-30, 4, -25);
  scene.add(neonPink);

  const neonBlue = new THREE.PointLight(0x4488ff, 0.8, 55, 1.0);
  neonBlue.position.set(-10, 12, -45);
  scene.add(neonBlue);

  const neonCyan = new THREE.PointLight(0x00ddff, 0.7, 50, 1.0);
  neonCyan.position.set(-25, -2, -40);
  scene.add(neonCyan);

  const neonMagenta = new THREE.PointLight(0xcc44ff, 0.6, 45, 1.0);
  neonMagenta.position.set(-35, 0, -30);
  scene.add(neonMagenta);

  const neonOrange = new THREE.PointLight(0xff6600, 0.5, 40, 1.0);
  neonOrange.position.set(-15, -5, -50);
  scene.add(neonOrange);

  const neonDeepBlue = new THREE.PointLight(0x2266ff, 0.7, 55, 1.0);
  neonDeepBlue.position.set(-40, 5, -55);
  scene.add(neonDeepBlue);

  const neonHotPink = new THREE.PointLight(0xff2288, 0.5, 40, 1.0);
  neonHotPink.position.set(-8, -8, -35);
  scene.add(neonHotPink);

  const neonTeal = new THREE.PointLight(0x00ffaa, 0.5, 45, 1.0);
  neonTeal.position.set(-45, -3, -45);
  scene.add(neonTeal);
}
