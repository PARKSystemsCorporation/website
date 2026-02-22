import * as THREE from 'three';

export function setupLighting(scene) {
  scene.add(new THREE.AmbientLight(0x101520, 0.25));
  scene.add(new THREE.HemisphereLight(0x1a2030, 0x080810, 0.2));

  const heroX = 12;
  const heroZ = -15;

  const basePink = new THREE.PointLight(0xff0066, 1.8, 40, 1);
  basePink.position.set(heroX, -15, heroZ);
  scene.add(basePink);

  const baseCyan = new THREE.PointLight(0x00ccff, 1.2, 35, 1);
  baseCyan.position.set(heroX + 8, -10, heroZ + 5);
  scene.add(baseCyan);

  const midRed = new THREE.PointLight(0xff2244, 1.0, 30, 1);
  midRed.position.set(heroX + 5, 5, heroZ);
  scene.add(midRed);

  const signPink = new THREE.PointLight(0xff0066, 0.9, 25, 1);
  signPink.position.set(heroX + 13, 5, heroZ);
  scene.add(signPink);

  const signCyan = new THREE.PointLight(0x00ddff, 0.7, 22, 1);
  signCyan.position.set(heroX, 18, heroZ + 10);
  scene.add(signCyan);

  const domeLight = new THREE.PointLight(0xff6688, 0.8, 28, 1);
  domeLight.position.set(heroX + 2, 22, heroZ - 1);
  scene.add(domeLight);

  const moon = new THREE.DirectionalLight(0x1a2845, 0.5);
  moon.position.set(-20, 35, -50);
  moon.target.position.set(heroX, 0, heroZ);
  scene.add(moon);
  scene.add(moon.target);

  const rim = new THREE.DirectionalLight(0x0a1533, 0.3);
  rim.position.set(25, 15, -25);
  scene.add(rim);
}
