import * as THREE from 'three';

const PH_BASE = 'https://dl.polyhaven.org/file/ph-assets/Textures/jpg/2k';
const loader = new THREE.TextureLoader();

function loadTexture(path) {
  return new Promise((resolve, reject) => {
    loader.load(path, resolve, undefined, reject);
  });
}

function createProceduralConcrete() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#2a2a35';
  ctx.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 80; i++) {
    ctx.fillStyle = `rgba(${40 + Math.random() * 30}, ${38 + Math.random() * 25}, ${45 + Math.random() * 30}, ${0.3 + Math.random() * 0.4})`;
    ctx.fillRect(Math.random() * 256, Math.random() * 256, 8 + Math.random() * 24, 6 + Math.random() * 20);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(4, 4);
  return tex;
}

function createStorefrontWindowTexture(warm = false) {
  const W = 256, H = 256;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#050510';
  ctx.fillRect(0, 0, W, H);
  const cols = 6, rows = 12, ww = 28, wh = 18;
  const gapX = (W - cols * ww) / (cols + 1);
  const gapY = (H - rows * wh) / (rows + 1);
  const colors = warm
    ? ['#ff8844', '#ffaa66', '#ffcc88', '#ff6622', '#dd5522']
    : ['#44aaff', '#00ccff', '#ddeeff', '#ffffff', '#6688ff'];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (Math.random() < 0.65) {
        ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
        ctx.globalAlpha = 0.6 + Math.random() * 0.4;
        ctx.fillRect(gapX + c * (ww + gapX), gapY + r * (wh + gapY), ww, wh);
      }
    }
  }
  ctx.globalAlpha = 1;
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

function createArchedDomeTexture() {
  const W = 512, H = 256;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#0a0a1a';
  ctx.fillRect(0, 0, W, H);
  const arcCount = 8;
  const arcW = W / arcCount;
  for (let i = 0; i < arcCount; i++) {
    const cx = 0.5 * arcW + i * arcW;
    const cy = H - 60;
    const r = 35;
    ctx.beginPath();
    ctx.arc(cx, cy, r, Math.PI, 0);
    ctx.lineTo(cx + r, cy);
    ctx.lineTo(cx + r, H);
    ctx.lineTo(cx - r, H);
    ctx.lineTo(cx - r, cy);
    ctx.closePath();
    ctx.fillStyle = Math.random() < 0.7 ? ['#ffcc66', '#44aaff', '#ffaa44', '#00ccff'][Math.floor(Math.random() * 4)] : '#1a1a2a';
    ctx.globalAlpha = 0.4 + Math.random() * 0.5;
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  return tex;
}

function createVerticalNeonSignTexture() {
  const W = 128, H = 512;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#cc0044';
  ctx.globalAlpha = 0.9;
  ctx.fillRect(4, 4, W - 8, H - 8);
  for (let i = 0; i < 12; i++) {
    const y = 30 + i * 38;
    ctx.fillStyle = '#ffffff';
    ctx.globalAlpha = 0.6 + Math.random() * 0.4;
    ctx.fillRect(15 + Math.random() * 20, y, 25 + Math.random() * 50, 8 + Math.random() * 6);
  }
  ctx.strokeStyle = '#ff0066';
  ctx.lineWidth = 3;
  ctx.globalAlpha = 0.8;
  ctx.strokeRect(2, 2, W - 4, H - 4);
  ctx.globalAlpha = 1;
  const tex = new THREE.CanvasTexture(canvas);
  return tex;
}

function createHorizontalNeonSignTexture() {
  const W = 512, H = 128;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#cc0044';
  ctx.globalAlpha = 0.9;
  ctx.fillRect(4, 4, W - 8, H - 8);
  for (let i = 0; i < 6; i++) {
    const x = 40 + i * 75;
    ctx.fillStyle = '#ffffff';
    ctx.globalAlpha = 0.7 + Math.random() * 0.3;
    ctx.fillRect(x, 40, 50 + Math.random() * 30, 12 + Math.random() * 8);
  }
  ctx.strokeStyle = '#ff0066';
  ctx.lineWidth = 3;
  ctx.globalAlpha = 0.8;
  ctx.strokeRect(2, 2, W - 4, H - 4);
  ctx.globalAlpha = 1;
  const tex = new THREE.CanvasTexture(canvas);
  return tex;
}

export async function createHeroBuilding(scene) {
  const group = new THREE.Group();
  const buildingX = 12;
  const buildingZ = -15;

  let concreteTex, metalTex, storefrontTex, domeTex;
  try {
    concreteTex = await loadTexture(`${PH_BASE}/concrete_panels/concrete_panels_diff_2k.jpg`);
    concreteTex.wrapS = concreteTex.wrapT = THREE.RepeatWrapping;
    concreteTex.repeat.set(3, 6);
  } catch {
    concreteTex = createProceduralConcrete();
  }

  const storefrontTexCool = createStorefrontWindowTexture(false);
  const storefrontTexWarm = createStorefrontWindowTexture(true);
  domeTex = createArchedDomeTexture();

  const concreteMat = new THREE.MeshStandardMaterial({
    map: concreteTex,
    color: 0x1a1a2a,
    roughness: 0.9,
    metalness: 0.1,
  });

  const storefrontMatCool = new THREE.MeshStandardMaterial({
    map: storefrontTexCool,
    emissiveMap: storefrontTexCool,
    emissive: new THREE.Color(1, 1, 1),
    emissiveIntensity: 1.0,
    color: 0x080814,
    roughness: 0.8,
    metalness: 0.2,
  });
  const storefrontMatWarm = new THREE.MeshStandardMaterial({
    map: storefrontTexWarm,
    emissiveMap: storefrontTexWarm,
    emissive: new THREE.Color(1, 1, 1),
    emissiveIntensity: 1.0,
    color: 0x080814,
    roughness: 0.8,
    metalness: 0.2,
  });

  const domeMat = new THREE.MeshStandardMaterial({
    map: domeTex,
    emissiveMap: domeTex,
    emissive: new THREE.Color(1, 1, 1),
    emissiveIntensity: 0.95,
    color: 0x0a0a18,
    roughness: 0.7,
    metalness: 0.15,
  });

  const metalMat = new THREE.MeshStandardMaterial({
    color: 0x222233,
    roughness: 0.6,
    metalness: 0.8,
  });

  const lowerBlock = new THREE.Mesh(
    new THREE.BoxGeometry(25, 40, 18),
    concreteMat.clone()
  );
  lowerBlock.position.set(buildingX, -20, buildingZ);
  group.add(lowerBlock);

  const midBlock = new THREE.Mesh(
    new THREE.BoxGeometry(18, 25, 14),
    concreteMat.clone()
  );
  midBlock.position.set(buildingX + 2, 5, buildingZ - 1);
  group.add(midBlock);

  const upperBlock = new THREE.Mesh(
    new THREE.BoxGeometry(12, 35, 10),
    concreteMat.clone()
  );
  upperBlock.position.set(buildingX + 3, 32.5, buildingZ - 2);
  group.add(upperBlock);

  const domeGeo = new THREE.SphereGeometry(8, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2);
  const dome = new THREE.Mesh(domeGeo, domeMat);
  dome.position.set(buildingX + 2, 22, buildingZ - 1);
  dome.scale.set(1, 1, 1);
  dome.rotation.x = Math.PI / 2;
  group.add(dome);

  const vertSignTex = createVerticalNeonSignTexture();
  const vertSignMat = new THREE.MeshBasicMaterial({
    map: vertSignTex,
    transparent: true,
    opacity: 0.95,
    side: THREE.DoubleSide,
  });
  const vertSign = new THREE.Mesh(new THREE.PlaneGeometry(3, 10), vertSignMat);
  vertSign.position.set(buildingX + 12.6, 5, buildingZ);
  vertSign.rotation.y = -Math.PI / 2;
  group.add(vertSign);

  const pipeGeo = new THREE.CylinderGeometry(0.35, 0.4, 1, 8);
  const pipes = [
    [buildingX + 12.6, -5, buildingZ + 9.2],
    [buildingX + 12.6, 0, buildingZ + 9.2],
    [buildingX + 12.6, 10, buildingZ + 7.2],
    [buildingX - 12.6, -8, buildingZ + 9.2],
    [buildingX - 12.6, 5, buildingZ - 7.2],
  ];
  pipes.forEach(([x, y, z]) => {
    const pipe = new THREE.Mesh(pipeGeo, metalMat);
    pipe.position.set(x, y, z);
    pipe.scale.set(1, 25 + Math.random() * 15, 1);
    group.add(pipe);
  });

  const conduitGeo = new THREE.CylinderGeometry(0.15, 0.15, 1, 6);
  for (let i = 0; i < 6; i++) {
    const conduit = new THREE.Mesh(conduitGeo, metalMat);
    conduit.rotation.z = Math.PI / 2;
    conduit.position.set(
      buildingX + (Math.random() - 0.5) * 20,
      5 + Math.random() * 25,
      buildingZ + 9 + Math.random() * 2
    );
    conduit.scale.set(8 + Math.random() * 6, 1, 1);
    group.add(conduit);
  }

  const walkwayMat = new THREE.MeshStandardMaterial({ color: 0x1a1a2a, roughness: 0.8, metalness: 0.3 });
  const walkways = [
    [buildingX + 14, -5, buildingZ, 4, 0.3, 2],
    [buildingX + 14, 8, buildingZ, 5, 0.3, 2],
    [buildingX + 14, 18, buildingZ - 2, 3, 0.25, 1.5],
  ];
  walkways.forEach(([x, y, z, w, h, d]) => {
    const walkway = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), walkwayMat);
    walkway.position.set(x, y, z);
    group.add(walkway);
    for (let i = 0; i < 5; i++) {
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.6, 0.08), metalMat);
      post.position.set(x - w / 2 + 0.2 + i * (w / 4), y + 0.45, z + d / 2 + 0.05);
      group.add(post);
    }
  });

  const vertSignTex2 = createVerticalNeonSignTexture();
  const vertSignTex3 = createVerticalNeonSignTexture();
  const vertSignTex4 = createVerticalNeonSignTexture();
  const vertSignTex5 = createVerticalNeonSignTexture();
  const signs = [
    { x: buildingX - 12.6, y: 15, z: buildingZ, rot: Math.PI / 2, w: 2.5, h: 9 },
    { x: buildingX + 12.6, y: -8, z: buildingZ - 9.2, rot: 0, w: 2, h: 7 },
    { x: buildingX + 9, y: 28, z: buildingZ - 7.2, rot: -Math.PI / 2, w: 2, h: 6 },
    { x: buildingX - 12.6, y: -5, z: buildingZ - 9.2, rot: 0, w: 2.2, h: 8 },
  ];
  [vertSignTex2, vertSignTex3, vertSignTex4, vertSignTex5].forEach((tex, i) => {
    if (i >= signs.length) return;
    const s = signs[i];
    const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: 0.98, side: THREE.DoubleSide });
    const sign = new THREE.Mesh(new THREE.PlaneGeometry(s.w, s.h), mat);
    sign.position.set(s.x, s.y, s.z);
    sign.rotation.y = s.rot;
    group.add(sign);
  });

  const horizSignTex = createHorizontalNeonSignTexture();
  const horizSigns = [
    { x: buildingX, y: 18, z: buildingZ + 9.2, w: 8, h: 1.5 },
    { x: buildingX + 3, y: -12, z: buildingZ + 9.2, w: 6, h: 1.2 },
    { x: buildingX - 8, y: 5, z: buildingZ - 7.2, w: 5, h: 1 },
    { x: buildingX + 2, y: 24, z: buildingZ - 1, w: 6, h: 1.2 },
  ];
  horizSigns.forEach(({ x, y, z, w, h }) => {
    const mat = new THREE.MeshBasicMaterial({ map: horizSignTex, transparent: true, opacity: 0.9, side: THREE.DoubleSide });
    const sign = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
    sign.position.set(x, y, z);
    sign.rotation.y = Math.PI / 2;
    group.add(sign);
  });

  const domeBandMat = new THREE.MeshBasicMaterial({ color: 0xff6688, transparent: true, opacity: 0.95 });
  const domeBand = new THREE.Mesh(new THREE.RingGeometry(7, 8.5, 32), domeBandMat);
  domeBand.position.set(buildingX + 2, 22, buildingZ - 1);
  domeBand.rotation.x = -Math.PI / 2;
  group.add(domeBand);

  const storefronts = [
    { x: buildingX - 8, y: -8, z: buildingZ + 9.3, w: 8, h: 6, warm: true },
    { x: buildingX + 10, y: -5, z: buildingZ - 9.3, w: 6, h: 5, warm: false },
    { x: buildingX - 12.6, y: 2, z: buildingZ + 9.3, w: 5, h: 4, warm: true },
    { x: buildingX + 12.6, y: -15, z: buildingZ - 9.3, w: 4, h: 3.5, warm: false },
  ];
  storefronts.forEach(({ x, y, z, w, h, warm }) => {
    const mat = warm ? storefrontMatWarm : storefrontMatCool;
    const block = new THREE.Mesh(new THREE.BoxGeometry(w, h, 0.5), mat);
    block.position.set(x, y, z);
    group.add(block);
  });

  scene.add(group);
  return { group, buildingX, buildingZ };
}
