import * as THREE from 'three';

function createWindowTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#06060e';
  ctx.fillRect(0, 0, 64, 256);

  const cols = 8;
  const rows = 40;
  const ww = 3;
  const wh = 3;
  const gapX = (64 - cols * ww) / (cols + 1);
  const gapY = (256 - rows * wh) / (rows + 1);

  const warm = ['#ffcc66', '#ffaa44', '#ffdd88', '#ff9933'];
  const cool = ['#44aaff', '#00ccff', '#22ddcc', '#6688ff', '#00aaee'];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (Math.random() > 0.4) {
        const palette = Math.random() > 0.3 ? cool : warm;
        ctx.fillStyle = palette[Math.floor(Math.random() * palette.length)];
        ctx.globalAlpha = 0.35 + Math.random() * 0.65;
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
  const count = 220;
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
    const h = 8 + Math.pow(Math.random(), 0.6) * 55;
    const w = 2 + Math.random() * 5;
    const d = 2 + Math.random() * 5;

    const angle = (Math.random() - 0.5) * Math.PI * 1.5;
    const dist = 28 + Math.random() * 100;

    dummy.position.set(
      Math.sin(angle) * dist,
      h / 2 - 3,
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

  addNeonStrips(group);

  scene.add(group);
  return group;
}

function addNeonStrips(group) {
  const colors = [0x00ffff, 0xff00ff, 0x00ff88, 0xff3366, 0x4488ff, 0xffaa00];

  for (let i = 0; i < 60; i++) {
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
    const angle = (Math.random() - 0.5) * Math.PI * 1.3;
    const dist = 22 + Math.random() * 55;

    strip.position.set(
      Math.sin(angle) * dist + (Math.random() - 0.5) * 4,
      2 + Math.random() * 35,
      -Math.cos(angle) * dist
    );
    strip.rotation.y = angle + Math.PI;
    group.add(strip);
  }
}
