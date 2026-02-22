import * as THREE from 'three';

export function setupLighting(scene, cabinPivot) {
  scene.add(new THREE.AmbientLight(0x060612, 0.12));
  scene.add(new THREE.HemisphereLight(0x080818, 0x060400, 0.12));

  // --- CABIN SANCTUARY ---
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

  // --- MOONLIGHT (backlit silhouette from behind city) ---
  const moon = new THREE.DirectionalLight(0x1a2255, 0.4);
  moon.position.set(-20, 30, -80);
  moon.target.position.set(0, 0, 0);
  scene.add(moon);
  scene.add(moon.target);

  // Subtle cool rim from the side
  const rim = new THREE.DirectionalLight(0x0a1533, 0.2);
  rim.position.set(20, 15, -40);
  scene.add(rim);
}
