import * as THREE from 'three';

export function createEffects(scene) {
  const group = new THREE.Group();

  // Ground haze — slow-drifting translucent planes near platform level
  const hazePlanes = [];
  const hazeGeo = new THREE.PlaneGeometry(18, 18);

  for (let i = 0; i < 7; i++) {
    const hazeMat = new THREE.MeshBasicMaterial({
      color: 0x1a1a2e,
      transparent: true,
      opacity: 0.04 + Math.random() * 0.04,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const plane = new THREE.Mesh(hazeGeo, hazeMat);
    plane.rotation.x = -Math.PI / 2;
    plane.position.set(
      (Math.random() - 0.5) * 8,
      -0.5 + i * 0.25,
      (Math.random() - 0.5) * 6
    );

    hazePlanes.push({
      mesh: plane,
      driftSpeed: 0.15 + Math.random() * 0.2,
      driftPhase: Math.random() * Math.PI * 2,
      baseOpacity: hazeMat.opacity,
    });
    group.add(plane);
  }

  // Steam particles — rising from the pipe area on the right
  const steamCount = 30;
  const steamPositions = new Float32Array(steamCount * 3);
  const steamData = [];

  for (let i = 0; i < steamCount; i++) {
    const x = 7.5 + Math.random() * 1.5;
    const y = 2 + Math.random() * 4;
    const z = -3 + Math.random() * 4;
    steamPositions[i * 3] = x;
    steamPositions[i * 3 + 1] = y;
    steamPositions[i * 3 + 2] = z;
    steamData.push({
      baseX: x,
      baseZ: z,
      speed: 0.8 + Math.random() * 1.2,
      drift: (Math.random() - 0.5) * 0.3,
      maxY: 6 + Math.random() * 5,
    });
  }

  const steamGeo = new THREE.BufferGeometry();
  steamGeo.setAttribute('position', new THREE.BufferAttribute(steamPositions, 3));
  const steamMat = new THREE.PointsMaterial({
    color: 0x8899aa,
    size: 0.12,
    transparent: true,
    opacity: 0.2,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const steamPoints = new THREE.Points(steamGeo, steamMat);
  group.add(steamPoints);

  // Firefly embers — tiny warm particles floating around the lounge
  const fireflyCount = 18;
  const fireflyPositions = new Float32Array(fireflyCount * 3);
  const fireflyData = [];

  for (let i = 0; i < fireflyCount; i++) {
    const x = -6 + Math.random() * 14;
    const y = 0.5 + Math.random() * 4;
    const z = -4 + Math.random() * 9;
    fireflyPositions[i * 3] = x;
    fireflyPositions[i * 3 + 1] = y;
    fireflyPositions[i * 3 + 2] = z;
    fireflyData.push({
      vx: (Math.random() - 0.5) * 0.3,
      vy: 0.05 + Math.random() * 0.15,
      vz: (Math.random() - 0.5) * 0.3,
      phase: Math.random() * Math.PI * 2,
      pulseSpeed: 1 + Math.random() * 3,
    });
  }

  const fireflyGeo = new THREE.BufferGeometry();
  fireflyGeo.setAttribute('position', new THREE.BufferAttribute(fireflyPositions, 3));
  const fireflyMat = new THREE.PointsMaterial({
    color: 0xffaa44,
    size: 0.06,
    transparent: true,
    opacity: 0.7,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const fireflyPoints = new THREE.Points(fireflyGeo, fireflyMat);
  group.add(fireflyPoints);

  scene.add(group);

  function update(elapsed, delta) {
    // Haze drift and pulse
    for (const h of hazePlanes) {
      h.mesh.position.x += Math.sin(elapsed * h.driftSpeed + h.driftPhase) * 0.002;
      h.mesh.material.opacity = h.baseOpacity * (0.7 + 0.3 * Math.sin(elapsed * 0.5 + h.driftPhase));
    }

    // Steam rising
    const sPos = steamPoints.geometry.attributes.position.array;
    for (let i = 0; i < steamCount; i++) {
      const sd = steamData[i];
      sPos[i * 3 + 1] += sd.speed * delta;
      sPos[i * 3] += sd.drift * delta;

      if (sPos[i * 3 + 1] > sd.maxY) {
        sPos[i * 3] = sd.baseX + (Math.random() - 0.5) * 0.5;
        sPos[i * 3 + 1] = 2 + Math.random() * 1;
        sPos[i * 3 + 2] = sd.baseZ + (Math.random() - 0.5) * 0.5;
      }
    }
    steamPoints.geometry.attributes.position.needsUpdate = true;

    // Firefly float and pulse
    const fPos = fireflyPoints.geometry.attributes.position.array;
    for (let i = 0; i < fireflyCount; i++) {
      const fd = fireflyData[i];
      fPos[i * 3] += fd.vx * delta;
      fPos[i * 3 + 1] += fd.vy * delta;
      fPos[i * 3 + 2] += fd.vz * delta;

      if (fPos[i * 3 + 1] > 5) {
        fPos[i * 3] = -6 + Math.random() * 14;
        fPos[i * 3 + 1] = 0.5 + Math.random() * 1;
        fPos[i * 3 + 2] = -4 + Math.random() * 9;
      }
    }
    fireflyPoints.geometry.attributes.position.needsUpdate = true;

    const pulse = 0.4 + 0.6 * (0.5 + 0.5 * Math.sin(elapsed * 2));
    fireflyMat.opacity = 0.7 * pulse;
  }

  return { update };
}
