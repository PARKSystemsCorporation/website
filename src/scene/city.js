import * as THREE from 'three';

function createWindowTexture() {
  const W = 512;
  const H = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#050510';
  ctx.fillRect(0, 0, W, H);

  // Subtle vertical panel lines
  ctx.strokeStyle = 'rgba(20, 20, 40, 0.3)';
  ctx.lineWidth = 1;
  for (let x = 0; x < W; x += 32) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, H);
    ctx.stroke();
  }

  // Horizontal floor lines
  for (let y = 0; y < H; y += 24) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
    ctx.stroke();
  }

  const cols = 20;
  const rows = 80;
  const ww = 12;
  const wh = 6;
  const gapX = (W - cols * ww) / (cols + 1);
  const gapY = (H - rows * wh) / (rows + 1);

  const warm = ['#ffcc66', '#ffaa44', '#ffdd88', '#ff9933', '#ffe8a0', '#ffbb55', '#ffd070'];
  const cool = ['#44aaff', '#00ccff', '#22ddcc', '#6688ff', '#00aaee', '#3366cc', '#5599ff', '#00bbdd', '#4477ee'];
  const accent = ['#ff4488', '#ff6644', '#cc44ff', '#44ffaa', '#ff2266', '#ee55cc', '#ff8800'];
  const white = ['#ddeeff', '#ccddee', '#eef4ff', '#ffffff'];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const wx = gapX + c * (ww + gapX);
      const wy = gapY + r * (wh + gapY);

      if (Math.random() > 0.2) {
        let palette;
        const roll = Math.random();
        if (roll < 0.15) palette = warm;
        else if (roll < 0.75) palette = cool;
        else if (roll < 0.88) palette = white;
        else palette = accent;

        const baseColor = palette[Math.floor(Math.random() * palette.length)];

        if (Math.random() < 0.3) {
          ctx.globalAlpha = 0.06 + Math.random() * 0.08;
          ctx.fillStyle = baseColor;
          ctx.fillRect(wx - 2, wy - 1, ww + 4, wh + 2);
        }

        ctx.globalAlpha = 0.4 + Math.random() * 0.6;
        ctx.fillStyle = baseColor;
        ctx.fillRect(wx, wy, ww, wh);

        if (Math.random() < 0.4) {
          ctx.globalAlpha = 0.2 + Math.random() * 0.3;
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(wx + 1, wy + 1, ww - 2, wh - 2);
        }
      } else {
        ctx.globalAlpha = 0.08;
        ctx.fillStyle = '#1a1a3a';
        ctx.fillRect(wx, wy, ww, wh);
      }
    }
  }

  // Neon reflection patches on building glass
  for (let i = 0; i < 30; i++) {
    const px = Math.random() * W;
    const py = Math.random() * H;
    const pw = 10 + Math.random() * 20;
    const ph = 3 + Math.random() * 6;
    const neonColors = ['#00ffff', '#ff00ff', '#00ff88', '#ff3366', '#ffaa00', '#4488ff'];
    ctx.globalAlpha = 0.08 + Math.random() * 0.12;
    ctx.fillStyle = neonColors[Math.floor(Math.random() * neonColors.length)];
    ctx.fillRect(px, py, pw, ph);
  }

  ctx.globalAlpha = 1;

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = 4;
  return tex;
}

export function createCity(scene) {
  const group = new THREE.Group();
  const count = 280;
  const geo = new THREE.BoxGeometry(1, 1, 1);
  const windowTex = createWindowTexture();

  const mat = new THREE.MeshStandardMaterial({
    color: 0x0a0a18,
    emissiveMap: windowTex,
    emissive: new THREE.Color(1, 1, 1),
    emissiveIntensity: 0.8,
    roughness: 0.85,
    metalness: 0.25,
  });

  const mesh = new THREE.InstancedMesh(geo, mat, count);
  const dummy = new THREE.Object3D();
  const color = new THREE.Color();

  for (let i = 0; i < count; i++) {
    const leftBias = Math.random() < 0.7;

    let angle;
    if (leftBias) {
      angle = -(0.2 + Math.random() * 1.1);
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
      0.01 + Math.random() * 0.03,
      0.01 + Math.random() * 0.03,
      0.03 + Math.random() * 0.07
    );
    mesh.setColorAt(i, color);
  }

  mesh.instanceMatrix.needsUpdate = true;
  if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  group.add(mesh);

  scene.add(group);
  return { group, flickerStrips: [] };
}

export function updateNeonFlicker() {}
