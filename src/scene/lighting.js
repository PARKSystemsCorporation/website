import * as THREE from 'three';

export function setupLighting(scene) {
  scene.add(new THREE.AmbientLight(0x080818, 0.1));
  scene.add(new THREE.HemisphereLight(0x0a0a20, 0x080400, 0.1));

  const heroX = 12;
  const heroZ = -15;

  const basePink = new THREE.PointLight(0xff0066, 0.8, 25, 1.5);
  basePink.position.set(heroX, -15, heroZ);
  scene.add(basePink);

  const baseCyan = new THREE.PointLight(0x00ccff, 0.6, 20, 1.5);
  baseCyan.position.set(heroX + 8, -10, heroZ + 5);
  scene.add(baseCyan);

  const midRed = new THREE.PointLight(0xff2244, 0.5, 18, 1.5);
  midRed.position.set(heroX + 5, 5, heroZ);
  scene.add(midRed);

  const signPink = new THREE.PointLight(0xff0066, 0.4, 15, 1.5);
  signPink.position.set(heroX + 13, 5, heroZ);
  scene.add(signPink);

  const signCyan = new THREE.PointLight(0x00ddff, 0.35, 12, 1.5);
  signCyan.position.set(heroX, 18, heroZ + 10);
  scene.add(signCyan);

  const moon = new THREE.DirectionalLight(0x1a2255, 0.5);
  moon.position.set(-25, 40, -60);
  moon.target.position.set(heroX, 0, heroZ);
  scene.add(moon);
  scene.add(moon.target);

  const rim = new THREE.DirectionalLight(0x0a1533, 0.25);
  rim.position.set(30, 20, -30);
  scene.add(rim);
}
