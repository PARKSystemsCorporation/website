import * as THREE from 'three';

// --- TEXTURE FACTORY ---

function createWindowTexture(style) {
  const W = 256, H = 512;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  const darkBase = style === 'industrial' ? '#030308' : '#050510';
  ctx.fillStyle = darkBase;
  ctx.fillRect(0, 0, W, H);

  // Panel grid
  ctx.strokeStyle = 'rgba(15, 15, 30, 0.25)';
  ctx.lineWidth = 0.5;
  for (let x = 0; x < W; x += 16) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
  for (let y = 0; y < H; y += 12) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

  const cols = 14, rows = 50, ww = 8, wh = 4;
  const gapX = (W - cols * ww) / (cols + 1);
  const gapY = (H - rows * wh) / (rows + 1);

  const palettes = {
    residential: { colors: ['#ffcc66','#ffaa44','#ffdd88','#ff9933','#ffe0a0','#ffc855'], litChance: 0.55, alpha: [0.25, 0.55] },
    corporate:   { colors: ['#44aaff','#00ccff','#6688ff','#00aaee','#5599ff','#ddeeff','#ffffff'], litChance: 0.75, alpha: [0.35, 0.65] },
    nightlife:   { colors: ['#ff4488','#00ffcc','#cc44ff','#ffaa00','#00ddff','#ff2266','#44ffaa','#ffffff'], litChance: 0.65, alpha: [0.3, 0.6] },
    industrial:  { colors: ['#334455','#445566','#2a3a4a','#556677','#1a2a3a'], litChance: 0.25, alpha: [0.1, 0.3] },
  };

  const p = palettes[style] || palettes.corporate;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const wx = gapX + c * (ww + gapX);
      const wy = gapY + r * (wh + gapY);

      if (Math.random() < p.litChance) {
        const baseColor = p.colors[Math.floor(Math.random() * p.colors.length)];
        ctx.globalAlpha = p.alpha[0] + Math.random() * (p.alpha[1] - p.alpha[0]);
        ctx.fillStyle = baseColor;
        ctx.fillRect(wx, wy, ww, wh);

        if (Math.random() < 0.25) {
          ctx.globalAlpha = 0.04;
          ctx.fillStyle = baseColor;
          ctx.fillRect(wx - 1, wy - 1, ww + 2, wh + 2);
        }
      } else {
        ctx.globalAlpha = 0.04;
        ctx.fillStyle = '#0a0a1a';
        ctx.fillRect(wx, wy, ww, wh);
      }
    }
  }
  ctx.globalAlpha = 1;

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

function createBillboardTexture() {
  const W = 256, H = 128;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  const bgColors = ['#00cccc','#cc0055','#ff6600','#0066ff','#cc00ff','#00ff66','#ff0044','#0088ff'];
  const bg = bgColors[Math.floor(Math.random() * bgColors.length)];

  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, W, H);

  // Colored background panel with margin
  ctx.fillStyle = bg;
  ctx.globalAlpha = 0.7 + Math.random() * 0.3;
  ctx.fillRect(4, 4, W - 8, H - 8);

  // Fake text lines
  ctx.globalAlpha = 0.8;
  const lineCount = 2 + Math.floor(Math.random() * 3);
  for (let i = 0; i < lineCount; i++) {
    const ly = 20 + i * 28;
    const lw = 40 + Math.random() * 150;
    const lx = 15 + Math.random() * (W - lw - 30);
    ctx.fillStyle = Math.random() > 0.4 ? '#ffffff' : '#000000';
    ctx.globalAlpha = 0.6 + Math.random() * 0.4;
    ctx.fillRect(lx, ly, lw, 8 + Math.random() * 6);
  }

  // Accent blocks (simulating icons/logos)
  if (Math.random() < 0.6) {
    ctx.globalAlpha = 0.5 + Math.random() * 0.4;
    ctx.fillStyle = '#ffffff';
    const bx = 10 + Math.random() * 30;
    const by = 15 + Math.random() * 40;
    ctx.fillRect(bx, by, 20 + Math.random() * 25, 20 + Math.random() * 25);
  }

  // Glow border
  ctx.globalAlpha = 0.5;
  ctx.strokeStyle = bg;
  ctx.lineWidth = 3;
  ctx.strokeRect(2, 2, W - 4, H - 4);

  ctx.globalAlpha = 1;
  const tex = new THREE.CanvasTexture(canvas);
  return { tex, color: new THREE.Color(bg) };
}


// --- BUILDING PLACEMENT DATA ---

function generateBuildingData(count) {
  const buildings = [];

  for (let i = 0; i < count; i++) {
    const leftBias = Math.random() < 0.7;
    let angle = leftBias
      ? -(0.2 + Math.random() * 1.1)
      : -1.2 + Math.random() * 2.4;

    const tierRoll = Math.random();
    let dist, topY, maxH;

    if (tierRoll < 0.3) {
      dist = 20 + Math.random() * 18;
      topY = -3 + Math.random() * 8;
      maxH = 30 + Math.pow(Math.random(), 0.5) * 50;
    } else if (tierRoll < 0.7) {
      dist = 40 + Math.random() * 25;
      topY = -5 + Math.random() * 7;
      maxH = 18 + Math.pow(Math.random(), 0.6) * 35;
    } else {
      dist = 68 + Math.random() * 52;
      topY = -8 + Math.random() * 8;
      maxH = 10 + Math.pow(Math.random(), 0.7) * 25;
    }

    const h = maxH;
    const w = 2 + Math.random() * 6;
    const d = 2 + Math.random() * 6;

    const x = Math.sin(angle) * dist + (Math.random() - 0.5) * 6;
    const z = -Math.cos(angle) * dist;
    const y = topY - h / 2;

    const typeRoll = Math.random();
    let archetype;
    if (h > 40) archetype = typeRoll < 0.4 ? 'spire' : 'tower';
    else if (w > 5) archetype = 'slab';
    else archetype = typeRoll < 0.3 ? 'complex' : 'tower';

    const styleRoll = Math.random();
    let windowStyle;
    if (styleRoll < 0.25) windowStyle = 'residential';
    else if (styleRoll < 0.55) windowStyle = 'corporate';
    else if (styleRoll < 0.75) windowStyle = 'nightlife';
    else windowStyle = 'industrial';

    buildings.push({ x, y, z, w, h, d, topY, angle, dist, archetype, windowStyle });
  }
  return buildings;
}


// --- BUILDING MESH CREATION ---

function createBuildingMeshes(group, buildings, textures) {
  const dummy = new THREE.Object3D();
  const color = new THREE.Color();

  const styleGroups = { residential: [], corporate: [], nightlife: [], industrial: [] };
  buildings.forEach(b => styleGroups[b.windowStyle].push(b));

  for (const [style, blds] of Object.entries(styleGroups)) {
    if (blds.length === 0) continue;

    const geo = new THREE.BoxGeometry(1, 1, 1);
    const mat = new THREE.MeshStandardMaterial({
      color: 0x080814,
      emissiveMap: textures[style],
      emissive: new THREE.Color(1, 1, 1),
      emissiveIntensity: style === 'industrial' ? 0.4 : 0.7,
      roughness: 0.9,
      metalness: 0.2,
    });

    const mesh = new THREE.InstancedMesh(geo, mat, blds.length);

    blds.forEach((b, i) => {
      dummy.position.set(b.x, b.y, b.z);
      dummy.scale.set(b.w, b.h, b.d);
      dummy.rotation.set(0, 0, 0);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);

      const tint = style === 'industrial' ? 0.02 : 0.01;
      color.setRGB(tint + Math.random() * 0.02, tint + Math.random() * 0.02, tint + Math.random() * 0.05);
      mesh.setColorAt(i, color);
    });

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    group.add(mesh);
  }
}


// --- ROOFTOP DETAILS ---

function addRooftopDetails(group, buildings) {
  const antennaMat = new THREE.MeshStandardMaterial({ color: 0x222233, roughness: 0.6, metalness: 0.8 });
  const acMat = new THREE.MeshStandardMaterial({ color: 0x1a1a2a, roughness: 0.8, metalness: 0.3 });
  const antennaGeo = new THREE.CylinderGeometry(0.05, 0.08, 1, 4);
  const acGeo = new THREE.BoxGeometry(1, 1, 1);

  const near = buildings.filter(b => b.dist < 50);

  for (const b of near) {
    const roofY = b.topY;

    // Antenna on tall buildings
    if (b.h > 25 && Math.random() < 0.5) {
      const aH = 2 + Math.random() * 5;
      const antenna = new THREE.Mesh(antennaGeo, antennaMat);
      antenna.position.set(b.x, roofY + aH / 2, b.z);
      antenna.scale.set(1, aH, 1);
      group.add(antenna);

      // Red beacon light
      if (Math.random() < 0.6) {
        const beacon = new THREE.Mesh(
          new THREE.SphereGeometry(0.12, 4, 4),
          new THREE.MeshBasicMaterial({ color: 0xff2200 })
        );
        beacon.position.set(b.x, roofY + aH, b.z);
        group.add(beacon);
      }
    }

    // AC units
    if (Math.random() < 0.4) {
      const count = 1 + Math.floor(Math.random() * 3);
      for (let i = 0; i < count; i++) {
        const ac = new THREE.Mesh(acGeo, acMat);
        const acW = 0.4 + Math.random() * 0.6;
        const acH = 0.3 + Math.random() * 0.4;
        ac.position.set(
          b.x + (Math.random() - 0.5) * b.w * 0.6,
          roofY + acH / 2,
          b.z + (Math.random() - 0.5) * b.d * 0.6
        );
        ac.scale.set(acW, acH, acW * 0.8);
        group.add(ac);
      }
    }
  }
}


// --- BILLBOARDS (flush on building faces) ---

const BILLBOARD_TEX_CACHE = [];
function getBillboardTexture() {
  if (BILLBOARD_TEX_CACHE.length < 6) {
    BILLBOARD_TEX_CACHE.push(createBillboardTexture());
  }
  return BILLBOARD_TEX_CACHE[Math.floor(Math.random() * BILLBOARD_TEX_CACHE.length)];
}

function addBillboards(group, buildings) {
  const flickerBoards = [];
  const near = buildings.filter(b => b.dist < 55 && b.h > 10);
  const chosen = near.sort(() => Math.random() - 0.5).slice(0, 28);

  for (const b of chosen) {
    const { tex, color: bbColor } = getBillboardTexture();
    const bw = 1.5 + Math.random() * Math.min(b.w * 0.6, 4);
    const bh = bw * 0.5;
    const geo = new THREE.PlaneGeometry(bw, bh);
    const mat = new THREE.MeshBasicMaterial({
      map: tex,
      transparent: true,
      opacity: 0.85,
      side: THREE.FrontSide,
    });

    const board = new THREE.Mesh(geo, mat);

    // Pick a face (front, back, left, right)
    const faceRoll = Math.random();
    let bx = b.x, bz = b.z;
    const boardY = b.topY - 2 - Math.random() * Math.min(b.h * 0.5, 15);

    if (faceRoll < 0.25) {
      bz += b.d / 2 + 0.05;
      board.rotation.y = 0;
    } else if (faceRoll < 0.5) {
      bz -= b.d / 2 + 0.05;
      board.rotation.y = Math.PI;
    } else if (faceRoll < 0.75) {
      bx += b.w / 2 + 0.05;
      board.rotation.y = Math.PI / 2;
    } else {
      bx -= b.w / 2 + 0.05;
      board.rotation.y = -Math.PI / 2;
    }

    board.position.set(bx, boardY, bz);
    group.add(board);

    if (Math.random() < 0.3) {
      flickerBoards.push({
        mesh: board,
        baseOpacity: mat.opacity,
        speed: 1.5 + Math.random() * 5,
        phase: Math.random() * Math.PI * 2,
        pattern: Math.random() < 0.5 ? 'pulse' : 'glitch',
      });
    }
  }

  return flickerBoards;
}


// --- NEON EDGE ACCENTS ---

function addNeonEdges(group, buildings) {
  const edgeColors = [0x00ccff, 0xff0066, 0x00ff88, 0xff6600, 0xcc44ff, 0x00ffcc];
  const near = buildings.filter(b => b.dist < 50 && b.h > 15);
  const chosen = near.sort(() => Math.random() - 0.5).slice(0, 18);

  for (const b of chosen) {
    const c = edgeColors[Math.floor(Math.random() * edgeColors.length)];
    const mat = new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: 0.4 + Math.random() * 0.3 });

    const edgeType = Math.random();
    if (edgeType < 0.5) {
      // Vertical corner edge
      const edgeH = b.h * (0.3 + Math.random() * 0.5);
      const geo = new THREE.BoxGeometry(0.08, edgeH, 0.08);
      const edge = new THREE.Mesh(geo, mat);
      const cornerX = b.x + (Math.random() > 0.5 ? b.w / 2 : -b.w / 2);
      const cornerZ = b.z + (Math.random() > 0.5 ? b.d / 2 : -b.d / 2);
      edge.position.set(cornerX, b.topY - edgeH / 2, cornerZ);
      group.add(edge);
    } else {
      // Horizontal roofline accent
      const isFront = Math.random() > 0.5;
      const len = isFront ? b.w : b.d;
      const geo = new THREE.BoxGeometry(isFront ? len : 0.08, 0.08, isFront ? 0.08 : len);
      const edge = new THREE.Mesh(geo, mat);
      const ez = isFront ? b.z + (Math.random() > 0.5 ? 1 : -1) * b.d / 2 : b.z;
      const ex = isFront ? b.x : b.x + (Math.random() > 0.5 ? 1 : -1) * b.w / 2;
      edge.position.set(ex, b.topY, ez);
      group.add(edge);
    }
  }
}


// --- BASE GLOW LIGHTS ---

function addBaseLights(group, buildings) {
  const near = buildings.filter(b => b.dist < 45).sort(() => Math.random() - 0.5).slice(0, 6);
  const glowColors = [0x00ccff, 0xff0066, 0x4488ff, 0x00ff88, 0xcc44ff, 0xff6600];

  for (const b of near) {
    const c = glowColors[Math.floor(Math.random() * glowColors.length)];
    const light = new THREE.PointLight(c, 0.6, 15, 1.5);
    light.position.set(b.x, b.topY - b.h + 1, b.z);
    group.add(light);
  }
}


// --- FOG PLANES ---

function addFogPlanes(group) {
  const fogMat = new THREE.MeshBasicMaterial({
    color: 0x0a0a1a,
    transparent: true,
    opacity: 0.12,
    side: THREE.DoubleSide,
    depthWrite: false,
  });

  const heights = [-10, -5, 0];
  for (const h of heights) {
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), fogMat.clone());
    plane.rotation.x = -Math.PI / 2;
    plane.position.set(-20, h, -40);
    plane.material.opacity = 0.06 + Math.abs(h) * 0.008;
    group.add(plane);
  }
}


// --- MAIN EXPORT ---

export function createCity(scene) {
  const group = new THREE.Group();

  const textures = {
    residential: createWindowTexture('residential'),
    corporate: createWindowTexture('corporate'),
    nightlife: createWindowTexture('nightlife'),
    industrial: createWindowTexture('industrial'),
  };

  const buildings = generateBuildingData(280);

  createBuildingMeshes(group, buildings, textures);
  addRooftopDetails(group, buildings);
  const flickerBoards = addBillboards(group, buildings);
  addNeonEdges(group, buildings);
  addBaseLights(group, buildings);
  addFogPlanes(group);

  scene.add(group);
  return { group, flickerBoards };
}

export function updateNeonFlicker(flickerBoards, elapsed) {
  if (!flickerBoards) return;
  for (const fb of flickerBoards) {
    const t = elapsed * fb.speed + fb.phase;
    const factor = fb.pattern === 'pulse'
      ? 0.6 + 0.4 * Math.sin(t)
      : (Math.sin(t * 6) > -0.3 ? 1 : 0.05);
    fb.mesh.material.opacity = fb.baseOpacity * factor;
  }
}
