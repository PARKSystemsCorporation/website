import * as THREE from 'three';

function createWindowTexture() {
  const W = 256, H = 512;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#050510';
  ctx.fillRect(0, 0, W, H);
  const cols = 12, rows = 60, ww = 10, wh = 5;
  const gapX = (W - cols * ww) / (cols + 1);
  const gapY = (H - rows * wh) / (rows + 1);
  const colors = ['#44aaff', '#00ccff', '#6688ff', '#ddeeff', '#3366cc'];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (Math.random() < 0.5) {
        ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
        ctx.globalAlpha = 0.3 + Math.random() * 0.5;
        ctx.fillRect(gapX + c * (ww + gapX), gapY + r * (wh + gapY), ww, wh);
      }
    }
  }
  ctx.globalAlpha = 1;
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

export function createBackgroundTowers(scene) {
  const group = new THREE.Group();
  const windowTex = createWindowTexture();
  const mat = new THREE.MeshStandardMaterial({
    color: 0x080814,
    emissiveMap: windowTex,
    emissive: new THREE.Color(1, 1, 1),
    emissiveIntensity: 0.85,
    roughness: 0.9,
    metalness: 0.2,
  });

  const towers = [
    { x: -25, z: -30, w: 8, h: 45, d: 10 },
    { x: -35, z: -25, w: 6, h: 35, d: 8 },
    { x: -20, z: -45, w: 10, h: 55, d: 12 },
    { x: -40, z: -40, w: 5, h: 28, d: 6 },
    { x: -15, z: -55, w: 7, h: 40, d: 9 },
    { x: -30, z: -50, w: 4, h: 22, d: 5 },
  ];

  const neonColors = [0xff0066, 0xff3366, 0xcc0044];
  towers.forEach((t, i) => {
    const box = new THREE.Mesh(new THREE.BoxGeometry(t.w, t.h, t.d), mat);
    box.position.set(t.x, t.h / 2 - 15, t.z);
    group.add(box);

    if (i < 4) {
      const edgeMat = new THREE.MeshBasicMaterial({
        color: neonColors[i % 3],
        transparent: true,
        opacity: 0.55,
      });
      const edge = new THREE.Mesh(
        new THREE.BoxGeometry(0.08, t.h * 0.7, 0.08),
        edgeMat
      );
      edge.position.set(t.x + t.w / 2 + 0.05, t.h / 2 - 15 + t.h * 0.15, t.z);
      group.add(edge);
    }
  });

  scene.add(group);
  return group;
}
