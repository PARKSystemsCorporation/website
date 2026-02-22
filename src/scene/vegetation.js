import * as THREE from 'three';

function createLeafTexture(hueShift) {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 128, 128);

  // Main leaf cluster with more density
  for (let i = 0; i < 50; i++) {
    const x = 24 + Math.random() * 80;
    const y = 8 + Math.random() * 95;
    const size = 4 + Math.random() * 14;

    const g = 50 + Math.random() * 80 + hueShift;
    const r = 8 + Math.random() * 25;
    const b = 12 + Math.random() * 30;

    ctx.globalAlpha = 0.4 + Math.random() * 0.5;
    ctx.fillStyle = `rgb(${r}, ${Math.min(255, g)}, ${b})`;
    ctx.beginPath();
    ctx.ellipse(x, y, size * 0.7, size * 1.4, Math.random() * Math.PI, 0, Math.PI * 2);
    ctx.fill();

    // Leaf vein highlight
    if (Math.random() < 0.3) {
      ctx.globalAlpha = 0.15;
      ctx.strokeStyle = `rgb(${r + 20}, ${Math.min(255, g + 30)}, ${b + 15})`;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(x, y - size);
      ctx.lineTo(x, y + size);
      ctx.stroke();
    }
  }

  // Stem with branching
  ctx.globalAlpha = 0.5;
  ctx.strokeStyle = '#1a3a10';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(64, 125);
  ctx.quadraticCurveTo(60 + Math.random() * 8, 70, 64, 12);
  ctx.stroke();
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(64, 60);
  ctx.quadraticCurveTo(45, 50, 35, 35);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(64, 50);
  ctx.quadraticCurveTo(80, 40, 90, 30);
  ctx.stroke();

  ctx.globalAlpha = 1;
  const tex = new THREE.CanvasTexture(canvas);
  tex.premultiplyAlpha = true;
  return tex;
}

function createFernTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 192;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 128, 192);

  // Frond shape - more tropical, higher resolution
  for (let f = 0; f < 7; f++) {
    const cx = 45 + Math.random() * 38;
    const baseY = 185;
    const tipY = 8 + Math.random() * 20;
    const spread = 12 + Math.random() * 18;

    ctx.globalAlpha = 0.35 + Math.random() * 0.4;
    ctx.fillStyle = `rgb(${10 + Math.random() * 20}, ${40 + Math.random() * 65}, ${10 + Math.random() * 25})`;
    ctx.beginPath();
    ctx.moveTo(cx, baseY);
    ctx.quadraticCurveTo(cx - spread, baseY * 0.4, cx - spread * 0.3, tipY);
    ctx.quadraticCurveTo(cx + spread * 0.3, tipY - 5, cx + spread, baseY * 0.4);
    ctx.closePath();
    ctx.fill();

    // Individual leaflets along the frond
    const steps = 8;
    for (let s = 0; s < steps; s++) {
      const t = s / steps;
      const ly = baseY - t * (baseY - tipY);
      const lx = cx + (Math.random() - 0.5) * spread * (1 - t);
      ctx.globalAlpha = 0.2 + Math.random() * 0.2;
      ctx.fillStyle = `rgb(${15 + Math.random() * 15}, ${50 + Math.random() * 50}, ${15 + Math.random() * 20})`;
      ctx.beginPath();
      ctx.ellipse(lx, ly, 2 + Math.random() * 4, 5 + Math.random() * 8, Math.random(), 0, Math.PI * 2);
      ctx.fill();
    }
  }

  ctx.globalAlpha = 1;
  const tex = new THREE.CanvasTexture(canvas);
  tex.premultiplyAlpha = true;
  return tex;
}

export function createVegetation(scene) {
  const group = new THREE.Group();

  const leafTextures = [0, 20, -10, 30, -20].map(h => createLeafTexture(h));
  const fernTex = createFernTexture();

  const plantData = [
    // [x, y, z, scale, type] where type 0=leaf sprite, 1=fern
    // Front edge
    [-5.5, 1.0, 4.5, 1.6, 0], [-3.5, 0.9, 4.8, 1.9, 1], [-1, 0.8, 4.6, 1.4, 0],
    [1, 0.9, 4.7, 1.7, 1], [3.5, 0.8, 4.5, 1.5, 0], [5.5, 1.0, 4.4, 1.8, 1],

    // Right side (near pipes)
    [6.8, 1.0, -3, 2.2, 1], [6.8, 0.8, -1, 1.9, 0], [6.5, 0.9, 1, 1.6, 1],
    [7.2, 1.5, -2, 2.8, 0], [7.0, 1.3, 0.5, 2.4, 1],

    // Left side
    [-6.8, 0.8, -2, 1.9, 0], [-6.5, 0.9, 0.5, 2.1, 1], [-6, 0.8, 3, 1.7, 0],

    // Around trailer
    [5.8, 0.8, -3.5, 1.6, 0], [5.5, 0.9, -0.5, 1.4, 1],
    [-0.5, 0.8, -3.8, 2.0, 1], [0.5, 0.9, -4.2, 2.2, 0],

    // Larger background plants
    [-5.5, 1.5, -4.8, 2.8, 1], [4.5, 1.3, -4.5, 3.0, 0], [0, 2.0, -4.8, 3.2, 1],

    // Rooftop / hanging foliage (above trailer)
    [2.5, 4.8, -2.5, 1.6, 0], [4, 4.6, -3, 1.3, 0], [0.5, 4.7, -1.5, 1.5, 1],
    [-2, 4.2, 0.5, 1.4, 0], [-0.5, 4.5, -2, 1.1, 0],
    [1, 4.9, -1, 1.2, 1], [3.5, 4.3, -1.5, 1.0, 0],

    // Pot plants on deck
    [-5, 0.6, 3.5, 0.8, 0], [-1.5, 0.6, 3.8, 0.9, 0], [5, 0.6, 3, 0.7, 1],
  ];

  // Terracotta pots for deck plants
  const potGeo = new THREE.CylinderGeometry(0.15, 0.12, 0.25, 8);
  const potMat = new THREE.MeshStandardMaterial({ color: 0x8a4a2a, roughness: 0.9 });
  [[-5, 0.22, 3.5], [-1.5, 0.22, 3.8], [5, 0.22, 3]].forEach(([x, y, z]) => {
    const pot = new THREE.Mesh(potGeo, potMat);
    pot.position.set(x, y, z);
    group.add(pot);
  });

  plantData.forEach(([x, y, z, scale, type], i) => {
    const tex = type === 1 ? fernTex : leafTextures[i % leafTextures.length];
    const mat = new THREE.SpriteMaterial({
      map: tex,
      transparent: true,
      alphaTest: 0.05,
      color: new THREE.Color().setHSL(
        0.28 + Math.random() * 0.08,
        0.35 + Math.random() * 0.15,
        0.12 + Math.random() * 0.08
      ),
    });

    const sprite = new THREE.Sprite(mat);
    sprite.position.set(x, y, z);
    sprite.scale.set(scale, scale * 1.3, 1);
    sprite.userData.baseX = x;
    sprite.userData.swayOffset = Math.random() * Math.PI * 2;
    sprite.userData.swaySpeed = 0.3 + Math.random() * 0.4;
    sprite.userData.swayAmount = 0.015 + Math.random() * 0.025;
    group.add(sprite);
  });

  scene.add(group);
  return group;
}
