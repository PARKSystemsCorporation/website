import * as THREE from 'three';

export function createEffects(scene) {
  const group = new THREE.Group();

  // Ground haze — translucent planes drifting near deck
  const hazePlanes = [];
  const hazeMat = new THREE.MeshBasicMaterial({
    color: 0x1a1020,
    transparent: true,
    opacity: 0.08,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  for (let i = 0; i < 7; i++) {
    const size = 6 + Math.random() * 10;
    const haze = new THREE.Mesh(
      new THREE.PlaneGeometry(size, size),
      hazeMat.clone()
    );
    haze.rotation.x = -Math.PI / 2;
    haze.position.set(
      (Math.random() - 0.5) * 16,
      0.2 + Math.random() * 0.5,
      (Math.random() - 0.5) * 12
    );
    haze.material.opacity = 0.04 + Math.random() * 0.06;
    haze.userData.driftSpeed = 0.1 + Math.random() * 0.2;
    haze.userData.driftPhase = Math.random() * Math.PI * 2;
    group.add(haze);
    hazePlanes.push(haze);
  }

  // Steam particles rising from pipes (right side, around x=8, z=-2)
  const steamCount = 40;
  const steamPositions = new Float32Array(steamCount * 3);
  const steamData = [];

  for (let i = 0; i < steamCount; i++) {
    const sx = 7.5 + Math.random() * 1.5;
    const sy = 2 + Math.random() * 4;
    const sz = -3 + Math.random() * 3;
    steamPositions[i * 3] = sx;
    steamPositions[i * 3 + 1] = sy;
    steamPositions[i * 3 + 2] = sz;
    steamData.push({
      baseX: sx, baseZ: sz,
      speed: 0.5 + Math.random() * 1.0,
      drift: (Math.random() - 0.5) * 0.3,
      maxY: 6 + Math.random() * 4,
      resetY: 2 + Math.random() * 2,
    });
  }

  const steamGeo = new THREE.BufferGeometry();
  steamGeo.setAttribute('position', new THREE.BufferAttribute(steamPositions, 3));

  const steamMat = new THREE.PointsMaterial({
    color: 0x999999,
    size: 0.25,
    transparent: true,
    opacity: 0.15,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const steam = new THREE.Points(steamGeo, steamMat);
  group.add(steam);

  // Firefly embers near trailer/candle area
  const emberCount = 18;
  const emberPositions = new Float32Array(emberCount * 3);
  const emberVelocities = [];

  for (let i = 0; i < emberCount; i++) {
    emberPositions[i * 3] = -3 + Math.random() * 6;
    emberPositions[i * 3 + 1] = 0.5 + Math.random() * 3;
    emberPositions[i * 3 + 2] = -1 + Math.random() * 5;
    emberVelocities.push({
      vx: (Math.random() - 0.5) * 0.15,
      vy: 0.02 + Math.random() * 0.08,
      vz: (Math.random() - 0.5) * 0.15,
      phase: Math.random() * Math.PI * 2,
    });
  }

  const emberGeo = new THREE.BufferGeometry();
  emberGeo.setAttribute('position', new THREE.BufferAttribute(emberPositions, 3));

  const emberMat = new THREE.PointsMaterial({
    color: 0xffaa44,
    size: 0.08,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const embers = new THREE.Points(emberGeo, emberMat);
  group.add(embers);

  scene.add(group);

  function update(elapsed, delta) {
    // Haze drift
    for (const h of hazePlanes) {
      h.position.x += Math.sin(elapsed * h.userData.driftSpeed + h.userData.driftPhase) * 0.003;
      h.material.opacity = 0.03 + 0.03 * Math.sin(elapsed * 0.3 + h.userData.driftPhase);
    }

    // Steam rise
    const sp = steam.geometry.attributes.position.array;
    for (let i = 0; i < steamCount; i++) {
      const d = steamData[i];
      sp[i * 3 + 1] += d.speed * delta;
      sp[i * 3] += d.drift * delta;
      if (sp[i * 3 + 1] > d.maxY) {
        sp[i * 3 + 1] = d.resetY;
        sp[i * 3] = d.baseX + (Math.random() - 0.5) * 0.5;
        sp[i * 3 + 2] = d.baseZ + (Math.random() - 0.5) * 0.5;
      }
    }
    steam.geometry.attributes.position.needsUpdate = true;

    // Firefly embers
    const ep = embers.geometry.attributes.position.array;
    for (let i = 0; i < emberCount; i++) {
      const v = emberVelocities[i];
      ep[i * 3] += Math.sin(elapsed * 0.5 + v.phase) * v.vx * delta * 3;
      ep[i * 3 + 1] += v.vy * delta;
      ep[i * 3 + 2] += Math.cos(elapsed * 0.4 + v.phase) * v.vz * delta * 3;

      if (ep[i * 3 + 1] > 5) {
        ep[i * 3] = -3 + Math.random() * 6;
        ep[i * 3 + 1] = 0.3 + Math.random() * 1;
        ep[i * 3 + 2] = -1 + Math.random() * 5;
      }
    }
    embers.geometry.attributes.position.needsUpdate = true;
    emberMat.opacity = 0.3 + 0.3 * Math.sin(elapsed * 1.5);
  }

  return { update };
}
