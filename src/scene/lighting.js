import * as THREE from 'three';

export function setupLighting(scene) {
  scene.add(new THREE.AmbientLight(0x0a0c18, 0.15));
  scene.add(new THREE.HemisphereLight(0x151a28, 0x0a0808, 0.12));

  const heroX = 12;
  const heroZ = -15;

  const basePink = new THREE.PointLight(0xff0066, 1.2, 30, 1.2);
  basePink.position.set(heroX, -15, heroZ);
  scene.add(basePink);

  const baseCyan = new THREE.PointLight(0x00ccff, 0.9, 25, 1.2);
  baseCyan.position.set(heroX + 8, -10, heroZ + 5);
  scene.add(baseCyan);

  const midRed = new THREE.PointLight(0xff2244, 0.7, 22, 1.2);
  midRed.position.set(heroX + 5, 5, heroZ);
  scene.add(midRed);

  const signPink = new THREE.PointLight(0xff0066, 0.6, 18, 1.2);
  signPink.position.set(heroX + 13, 5, heroZ);
  scene.add(signPink);

  const signCyan = new THREE.PointLight(0x00ddff, 0.5, 15, 1.2);
  signCyan.position.set(heroX, 18, heroZ + 10);
  scene.add(signCyan);

  const domeLight = new THREE.PointLight(0xff6688, 0.5, 20, 1.2);
  domeLight.position.set(heroX + 2, 22, heroZ - 1);
  scene.add(domeLight);

  const moon = new THREE.DirectionalLight(0x1a2540, 0.4);
  moon.position.set(-25, 40, -60);
  moon.target.position.set(heroX, 0, heroZ);
  scene.add(moon);
  scene.add(moon.target);

  const rim = new THREE.DirectionalLight(0x0a1533, 0.2);
  rim.position.set(30, 20, -30);
  scene.add(rim);
}
