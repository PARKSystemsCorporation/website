import * as THREE from 'three';

function createWindowTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 2048;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#050510';
  ctx.fillRect(0, 0, 1024, 2048);

  // Subtle vertical panel lines
  ctx.strokeStyle = 'rgba(20, 20, 40, 0.3)';
  ctx.lineWidth = 1;
  for (let x = 0; x < 1024; x += 64) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 2048);
    ctx.stroke();
  }

  // Horizontal floor lines
  for (let y = 0; y < 2048; y += 48) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(1024, y);
    ctx.stroke();
  }

  const cols = 30;
  const rows = 120;
  const ww = 18;
  const wh = 10;
  const gapX = (1024 - cols * ww) / (cols + 1);
  const gapY = (2048 - rows * wh) / (rows + 1);

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

        // Window glow halo
        if (Math.random() < 0.3) {
          ctx.globalAlpha = 0.06 + Math.random() * 0.08;
          ctx.fillStyle = baseColor;
          ctx.fillRect(wx - 3, wy - 2, ww + 6, wh + 4);
        }

        ctx.globalAlpha = 0.4 + Math.random() * 0.6;
        ctx.fillStyle = baseColor;
        ctx.fillRect(wx, wy, ww, wh);

        // Inner bright core
        if (Math.random() < 0.4) {
          ctx.globalAlpha = 0.2 + Math.random() * 0.3;
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(wx + 2, wy + 1, ww - 4, wh - 2);
        }
      } else {
        // Dark window with faint outline
        ctx.globalAlpha = 0.08;
        ctx.fillStyle = '#1a1a3a';
        ctx.fillRect(wx, wy, ww, wh);
      }
    }
  }

  // Scattered bright accent patches (neon reflections on glass)
  for (let i = 0; i < 40; i++) {
    const px = Math.random() * 1024;
    const py = Math.random() * 2048;
    const pw = 20 + Math.random() * 40;
    const ph = 6 + Math.random() * 12;
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
    emissiveIntensity: 2.0,
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

  const flickerStrips = addNeonStrips(group);
  addNeonSigns(group);

  scene.add(group);
  return { group, flickerStrips };
}

function addNeonSigns(group) {
  const signColors = [0x00ffff, 0xff00ff, 0x00ff88, 0xff3366, 0xffaa00, 0x4488ff, 0xff4444, 0x00ddff];

  for (let i = 0; i < 50; i++) {
    const sw = 1.5 + Math.random() * 4;
    const sh = 0.8 + Math.random() * 2;
    const geo = new THREE.PlaneGeometry(sw, sh);
    const c = signColors[Math.floor(Math.random() * signColors.length)];

    const mat = new THREE.MeshBasicMaterial({
      color: c,
      transparent: true,
      opacity: 0.5 + Math.random() * 0.4,
      side: THREE.DoubleSide,
    });

    const sign = new THREE.Mesh(geo, mat);

    const leftBias = Math.random() < 0.75;
    let angle;
    if (leftBias) {
      angle = -(0.15 + Math.random() * 0.85);
    } else {
      angle = -0.8 + Math.random() * 1.6;
    }
    const dist = 18 + Math.random() * 45;

    sign.position.set(
      Math.sin(angle) * dist + (Math.random() - 0.5) * 4,
      -8 + Math.random() * 14,
      -Math.cos(angle) * dist
    );
    sign.rotation.y = angle + Math.PI + (Math.random() - 0.5) * 0.3;
    group.add(sign);
  }
}

function addNeonStrips(group) {
  const colors = [0x00ffff, 0xff00ff, 0x00ff88, 0xff3366, 0x4488ff, 0xffaa00, 0x00ddff, 0xff4488, 0x44ffaa];
  const flickerStrips = [];

  for (let i = 0; i < 150; i++) {
    const isVert = Math.random() > 0.5;
    const len = 1.5 + Math.random() * 10;
    const thickness = 0.1 + Math.random() * 0.2;
    const geo = isVert
      ? new THREE.PlaneGeometry(thickness, len)
      : new THREE.PlaneGeometry(len, thickness);

    const c = colors[Math.floor(Math.random() * colors.length)];
    const mat = new THREE.MeshBasicMaterial({
      color: c,
      transparent: true,
      opacity: 0.5 + Math.random() * 0.5,
      side: THREE.DoubleSide,
    });

    const strip = new THREE.Mesh(geo, mat);

    const leftBias = Math.random() < 0.75;
    let angle;
    if (leftBias) {
      angle = -(0.1 + Math.random() * 0.9);
    } else {
      angle = -1.0 + Math.random() * 2.0;
    }
    const dist = 16 + Math.random() * 55;

    strip.position.set(
      Math.sin(angle) * dist + (Math.random() - 0.5) * 5,
      -15 + Math.random() * 22,
      -Math.cos(angle) * dist
    );
    strip.rotation.y = angle + Math.PI;
    group.add(strip);

    if (flickerStrips.length < 25 && Math.random() < 0.2) {
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
