import * as THREE from 'three';

function createTrailerTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#8a7e6a';
  ctx.fillRect(0, 0, 512, 256);

  // Weathering patches
  for (let i = 0; i < 60; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 256;
    const r = 4 + Math.random() * 25;
    ctx.globalAlpha = 0.08 + Math.random() * 0.15;
    ctx.fillStyle = Math.random() > 0.5 ? '#6a5a3a' : '#4a3a2a';
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Rust streaks
  for (let i = 0; i < 25; i++) {
    ctx.globalAlpha = 0.1 + Math.random() * 0.15;
    ctx.fillStyle = '#8a4a2a';
    ctx.fillRect(
      Math.random() * 512,
      Math.random() * 256,
      1.5 + Math.random() * 4,
      8 + Math.random() * 35
    );
  }

  // Stickers / graffiti marks
  const graffiti = ['#ff4444', '#44aaff', '#ffaa00', '#aa44ff', '#44ff88', '#ff6688'];
  for (let i = 0; i < 10; i++) {
    ctx.globalAlpha = 0.25 + Math.random() * 0.35;
    ctx.fillStyle = graffiti[Math.floor(Math.random() * graffiti.length)];
    ctx.fillRect(
      40 + Math.random() * 420,
      40 + Math.random() * 170,
      8 + Math.random() * 25,
      6 + Math.random() * 18
    );
  }

  // Seam lines (horizontal bands around barrel)
  ctx.globalAlpha = 0.2;
  ctx.strokeStyle = '#3a3020';
  ctx.lineWidth = 1;
  for (let y = 0; y < 256; y += 64) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(512, y);
    ctx.stroke();
  }

  ctx.globalAlpha = 1;
  return new THREE.CanvasTexture(canvas);
}

function createAwningTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');

  const stripes = ['#8a3322', '#cc9530', '#2a5a3a', '#8a3322', '#cc9530', '#2a5a3a', '#8a3322', '#cc9530'];
  const sw = 256 / stripes.length;
  stripes.forEach((c, i) => {
    ctx.fillStyle = c;
    ctx.fillRect(i * sw, 0, sw, 64);
  });

  return new THREE.CanvasTexture(canvas);
}

export function createTrailer(scene) {
  const group = new THREE.Group();
  const tex = createTrailerTexture();

  // Barrel body (cylinder rotated on its side)
  const bodyGeo = new THREE.CylinderGeometry(1.8, 1.8, 6, 20, 1, false);
  const bodyMat = new THREE.MeshStandardMaterial({
    map: tex,
    color: 0x9a8e7a,
    roughness: 0.85,
    metalness: 0.12,
  });
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  body.rotation.z = Math.PI / 2;
  body.position.set(2.5, 2, -2);
  group.add(body);

  // End caps
  const capGeo = new THREE.CircleGeometry(1.8, 20);
  const capMat = new THREE.MeshStandardMaterial({
    color: 0x6a5e4a,
    roughness: 0.85,
    metalness: 0.15,
  });

  const frontCap = new THREE.Mesh(capGeo, capMat);
  frontCap.position.set(5.5, 2, -2);
  frontCap.rotation.y = Math.PI / 2;
  group.add(frontCap);

  const backCap = new THREE.Mesh(capGeo, capMat);
  backCap.position.set(-0.5, 2, -2);
  backCap.rotation.y = -Math.PI / 2;
  group.add(backCap);

  // Windows (warm emissive glow)
  const winMat = new THREE.MeshBasicMaterial({
    color: 0xffaa44,
    transparent: true,
    opacity: 0.9,
  });

  const winGeo = new THREE.PlaneGeometry(1.1, 0.7);
  // Side windows (facing front/camera)
  [[1.2, 2.9, -0.19], [3.0, 2.9, -0.19], [4.5, 2.9, -0.19]].forEach(([x, y, z]) => {
    const win = new THREE.Mesh(winGeo, winMat);
    win.position.set(x, y, z);
    group.add(win);
  });

  // End window
  const endWin = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.7), winMat);
  endWin.position.set(5.51, 2.2, -2);
  endWin.rotation.y = Math.PI / 2;
  group.add(endWin);

  // Rear side window (barely visible, catches light)
  const rearWin = new THREE.Mesh(winGeo, winMat.clone());
  rearWin.material.opacity = 0.5;
  rearWin.position.set(3.0, 2.9, -3.81);
  rearWin.rotation.y = Math.PI;
  group.add(rearWin);

  // Door frame
  const doorMat = new THREE.MeshStandardMaterial({
    color: 0x4a3a28,
    roughness: 0.9,
    metalness: 0.1,
  });
  const door = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 1.7), doorMat);
  door.position.set(-0.2, 1.5, -0.2);
  group.add(door);

  // Striped awning / canopy over the lounge area
  const awningTex = createAwningTexture();
  const awningMat = new THREE.MeshStandardMaterial({
    map: awningTex,
    side: THREE.DoubleSide,
    roughness: 0.95,
    transparent: true,
    opacity: 0.88,
  });

  const awning = new THREE.Mesh(new THREE.PlaneGeometry(8, 5), awningMat);
  awning.position.set(-1.5, 3.6, 1);
  awning.rotation.x = -Math.PI / 2 + 0.12;
  group.add(awning);

  // Awning support poles
  const poleMat = new THREE.MeshStandardMaterial({
    color: 0x5a5a5a,
    roughness: 0.4,
    metalness: 0.8,
  });
  const poleGeo = new THREE.CylinderGeometry(0.03, 0.03, 3.5, 6);
  [[-5, 1.8, 3], [-5, 1.8, -1]].forEach(([x, y, z]) => {
    const pole = new THREE.Mesh(poleGeo, poleMat);
    pole.position.set(x, y, z);
    group.add(pole);
  });

  // Seating area
  // Pallet base
  const palletMat = new THREE.MeshStandardMaterial({ color: 0x3a2a1a, roughness: 0.95 });
  const pallet = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.2, 2.5), palletMat);
  pallet.position.set(-3.5, 0.25, 1.8);
  group.add(pallet);

  // Seat cushion
  const cushionMat = new THREE.MeshStandardMaterial({ color: 0x5a4a3a, roughness: 0.95 });
  const seat = new THREE.Mesh(new THREE.BoxGeometry(3.3, 0.35, 2.3), cushionMat);
  seat.position.set(-3.5, 0.55, 1.8);
  group.add(seat);

  // Cushion stripe texture
  const stripeCvs = document.createElement('canvas');
  stripeCvs.width = 64;
  stripeCvs.height = 64;
  const sctx = stripeCvs.getContext('2d');
  const cStripes = ['#6a4a3a', '#8a6a4a', '#5a3a2a', '#7a5a3a', '#4a3020'];
  cStripes.forEach((c, i) => {
    sctx.fillStyle = c;
    sctx.fillRect(0, i * (64 / cStripes.length), 64, 64 / cStripes.length);
  });
  const stripeTex = new THREE.CanvasTexture(stripeCvs);
  stripeTex.wrapS = stripeTex.wrapT = THREE.RepeatWrapping;
  stripeTex.repeat.set(1, 2);

  const pillowMat = new THREE.MeshStandardMaterial({
    map: stripeTex,
    roughness: 0.95,
  });

  // Back pillows
  for (let i = 0; i < 3; i++) {
    const pillow = new THREE.Mesh(
      new THREE.BoxGeometry(0.9, 0.7, 0.25),
      pillowMat
    );
    pillow.position.set(-4.2 + i * 1.1, 1.05, 0.55);
    pillow.rotation.x = -0.15;
    group.add(pillow);
  }

  // Small throw pillows on seat
  for (let i = 0; i < 2; i++) {
    const tp = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 0.3, 0.5),
      pillowMat
    );
    tp.position.set(-3 + i * 1.5, 0.85, 2.2);
    tp.rotation.y = 0.3 * (i === 0 ? 1 : -1);
    group.add(tp);
  }

  // Low table (pallet coffee table)
  const table = new THREE.Mesh(
    new THREE.BoxGeometry(0.7, 0.25, 0.7),
    palletMat
  );
  table.position.set(-1.8, 0.28, 2.8);
  group.add(table);

  // Candle on table
  const candleGeo = new THREE.CylinderGeometry(0.035, 0.035, 0.15, 8);
  const candleMat = new THREE.MeshStandardMaterial({
    color: 0xeecc88,
    emissive: 0xffaa44,
    emissiveIntensity: 3,
  });
  const candle = new THREE.Mesh(candleGeo, candleMat);
  candle.position.set(-1.8, 0.5, 2.8);
  group.add(candle);

  // Candle flame point light
  const candleLight = new THREE.PointLight(0xff8833, 1.5, 5, 2);
  candleLight.position.set(-1.8, 0.7, 2.8);
  group.add(candleLight);

  // String lights under awning (catenary curve)
  const stringLights = [];
  const bulbGeo = new THREE.SphereGeometry(0.04, 6, 6);
  const bulbCount = 16;
  const slStartX = -5.3;
  const slEndX = 2.2;
  const wireY = 3.3;
  const wireZ = 2.5;

  for (let i = 0; i < bulbCount; i++) {
    const t = i / (bulbCount - 1);
    const x = slStartX + t * (slEndX - slStartX);
    const sag = -Math.sin(t * Math.PI) * 0.35;
    const y = wireY + sag;
    const z = wireZ + Math.sin(t * Math.PI * 0.5) * 0.3;

    const bulbMat = new THREE.MeshBasicMaterial({
      color: 0xffcc66,
      transparent: true,
      opacity: 0.9,
    });
    const bulb = new THREE.Mesh(bulbGeo, bulbMat);
    bulb.position.set(x, y, z);
    group.add(bulb);

    const light = new THREE.PointLight(0xffaa44, 0.15, 3, 2);
    light.position.set(x, y - 0.05, z);
    group.add(light);

    stringLights.push({
      bulb,
      light,
      baseIntensity: 0.1 + Math.random() * 0.1,
      flickerSpeed: 3 + Math.random() * 5,
      flickerPhase: Math.random() * Math.PI * 2,
    });
  }

  scene.add(group);

  function updateStringLights(elapsed) {
    for (const sl of stringLights) {
      const flicker = 0.7 + 0.3 * Math.sin(elapsed * sl.flickerSpeed + sl.flickerPhase);
      sl.light.intensity = sl.baseIntensity * flicker;
      sl.bulb.material.opacity = 0.6 + 0.4 * flicker;
    }
  }

  return { group, updateStringLights };
}
