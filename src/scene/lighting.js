import * as THREE from 'three';

export function setupLighting(scene, cabinPivot) {
  scene.add(new THREE.AmbientLight(0x060612, 0.15));
  scene.add(new THREE.HemisphereLight(0x080818, 0x080400, 0.15));

  // --- CABIN SANCTUARY (subtle warm glow) ---
  const trailerMain = new THREE.PointLight(0xff8844, 1.5, 14, 1.5);
  trailerMain.position.set(2.5, 2.5, -1.5);
  cabinPivot.add(trailerMain);

  const trailerDeep = new THREE.PointLight(0xffaa55, 1.0, 10, 1.5);
  trailerDeep.position.set(4.5, 2, -2);
  cabinPivot.add(trailerDeep);

  const loungeWarm = new THREE.PointLight(0xff9944, 0.8, 8, 1.6);
  loungeWarm.position.set(-3, 1.5, 2);
  cabinPivot.add(loungeWarm);

  const cabinCeiling = new THREE.PointLight(0xffcc88, 0.5, 6, 1.8);
  cabinCeiling.position.set(2, 3.5, -1);
  cabinPivot.add(cabinCeiling);

  // --- CITY (very subtle) ---
  const cityDir = new THREE.DirectionalLight(0x1a2266, 0.3);
  cityDir.position.set(-10, 15, -50);
  cityDir.target.position.set(-20, 0, -40);
  scene.add(cityDir);
  scene.add(cityDir.target);

  const rim = new THREE.DirectionalLight(0x00aacc, 0.15);
  rim.position.set(-15, 10, -25);
  scene.add(rim);
}
