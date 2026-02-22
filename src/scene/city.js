import * as THREE from 'three';

function createWindowTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#06060e';
  ctx.fillRect(0, 0, 128, 512);

  const cols = 14;
  const rows = 70;
  const ww = 4;
  const wh = 4;
  const gapX = (128 - cols * ww) / (cols + 1);
  const gapY = (512 - rows * wh) / (rows + 1);

  const warm = ['#ffcc66', '#ffaa44', '#ffdd88', '#ff9933', '#ffe8a0'];
  const cool = ['#44aaff', '#00ccff', '#22ddcc', '#6688ff', '#00aaee', '#3366cc'];
  const accent = ['#ff4488', '#ff6644', '#cc44ff', '#44ffaa'];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (Math.random() > 0.35) {
        let palette;
        const roll = Math.random();
        if (roll < 0.25) palette = warm;
        else if (roll < 0.9) palette = cool;
        else palette = accent;

        ctx.fillStyle = palette[Math.floor(Math.random() * palette.length)];
        ctx.globalAlpha = 0.3 + Math.random() * 0.7;
        ctx.fillRect(
          gapX + c * (ww + gapX),
          gapY + r * (wh + gapY),
          ww, wh
        );
      }
    }
  }
  ctx.globalAlpha = 1;

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

export function createCity(scene) {
  const group = new THREE.Group();
  const count = 280;
  const geo = new THREE.BoxGeometry(1, 1, 1);
  const windowTex = createWindowTexture();

  const mat = new THREE.MeshStandardMaterial({
    color: 0x080814,
    emissiveMap: windowTex,
    emissive: new THREE.Color(1, 1, 1),
    emissiveIntensity: 1.5,
    roughness: 0.9,
    metalness: 0.2,
  });

  const mesh = new THREE.InstancedMesh(geo, mat, count);
  const dummy = new THREE.Object3D();
  const color = new THREE.Color();

  for (let i = 0; i < count; i++) {
    const rightBias = Math.random() < 0.7;

    let angle;
    if (rightBias) {
      angle = -0.2 + Math.random() * 1.1;
    } else {
      angle = -1.2 + Math.random() * 2.4;
    }

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

    dummy.position.set(
      Math.sin(angle) * dist + (Math.random() - 0.5) * 6,
      topY - h / 2,
      -Math.cos(angle) * dist
    );
    dummy.scale.set(w, h, d);
    dummy.updateMatrix();
    mesh.setMatrixAt(i, dummy.matrix);

    color.setRGB(
      0.01 + Math.random() * 0.02,
      0.01 + Math.random() * 0.03,
      0.03 + Math.random() * 0.06
    );
    mesh.setColorAt(i, color);
  }

  mesh.instanceMatrix.needsUpdate = true;
  if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  group.add(mesh);

  const flickerStrips = addNeonStrips(group);

  scene.add(group);
  return { group, flickerStrips };
}

function addNeonStrips(group) {
  const colors = [0x00ffff, 0xff00ff, 0x00ff88, 0xff3366, 0x4488ff, 0xffaa00];
  const flickerStrips = [];

  for (let i = 0; i < 90; i++) {
    const isVert = Math.random() > 0.5;
    const len = 2 + Math.random() * 8;
    const geo = isVert
      ? new THREE.PlaneGeometry(0.15, len)
      : new THREE.PlaneGeometry(len, 0.15);

    const c = colors[Math.floor(Math.random() * colors.length)];
    const mat = new THREE.MeshBasicMaterial({
      color: c,
      transparent: true,
      opacity: 0.6 + Math.random() * 0.4,
      side: THREE.DoubleSide,
    });

    const strip = new THREE.Mesh(geo, mat);

    const rightBias = Math.random() < 0.75;
    let angle;
    if (rightBias) {
      angle = -0.1 + Math.random() * 0.9;
    } else {
      angle = -1.0 + Math.random() * 2.0;
    }
    const dist = 18 + Math.random() * 50;

    strip.position.set(
      Math.sin(angle) * dist + (Math.random() - 0.5) * 5,
      -15 + Math.random() * 20,
      -Math.cos(angle) * dist
    );
    strip.rotation.y = angle + Math.PI;
    group.add(strip);

    if (flickerStrips.length < 15 && Math.random() < 0.2) {
      const roll = Math.random();
      flickerStrips.push({
        mesh: strip,
        baseOpacity: strip.material.opacity,
        pattern: roll < 0.4 ? 'rapid' : roll < 0.7 ? 'slow' : 'cutout',
        phase: Math.random() * Math.PI * 2,
        speed: 2 + Math.random() * 6,
      });
    }
  }

  return flickerStrips;
}

export function updateNeonFlicker(flickerStrips, elapsed) {
  for (const s of flickerStrips) {
    const t = elapsed * s.speed + s.phase;
    let intensity;
    if (s.pattern === 'rapid') {
      intensity = Math.sin(t * 8) > 0.2 ? 1 : 0.1;
    } else if (s.pattern === 'slow') {
      intensity = 0.4 + 0.6 * (0.5 + 0.5 * Math.sin(t));
    } else {
      intensity = Math.sin(t * 3) > -0.8 ? 1 : 0;
    }
    s.mesh.material.opacity = s.baseOpacity * intensity;
  }
}
