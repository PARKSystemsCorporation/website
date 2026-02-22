import * as THREE from 'three';

function createWoodTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#3a2818';
  ctx.fillRect(0, 0, 128, 128);

  for (let i = 0; i < 40; i++) {
    ctx.strokeStyle = `rgba(${20 + Math.random() * 30}, ${15 + Math.random() * 15}, ${5 + Math.random() * 10}, ${0.2 + Math.random() * 0.3})`;
    ctx.lineWidth = 0.5 + Math.random() * 1.5;
    ctx.beginPath();
    const y = Math.random() * 128;
    ctx.moveTo(0, y + Math.random() * 3);
    ctx.lineTo(128, y + Math.random() * 3);
    ctx.stroke();
  }

  for (let i = 0; i < 4; i++) {
    const y = (i + 1) * 32;
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(128, y);
    ctx.stroke();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(4, 4);
  return tex;
}

export function createPlatform(scene) {
  const group = new THREE.Group();

  const woodTex = createWoodTexture();
  const woodMat = new THREE.MeshStandardMaterial({
    map: woodTex,
    color: 0x5a3a20,
    roughness: 0.92,
    metalness: 0.0,
  });

  const metalMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    roughness: 0.35,
    metalness: 0.85,
  });

  // Main deck
  const deck = new THREE.Mesh(new THREE.BoxGeometry(14, 0.3, 10), woodMat);
  deck.position.set(0, 0, 0);
  deck.receiveShadow = true;
  group.add(deck);

  // Support beams underneath
  const beamGeo = new THREE.BoxGeometry(0.25, 4, 0.25);
  const beamSpots = [
    [-6.5, -2, -4.5], [-6.5, -2, 4.5], [6.5, -2, -4.5], [6.5, -2, 4.5],
    [0, -2, -4.5], [0, -2, 4.5], [-3, -2, -4.5], [3, -2, 4.5],
  ];
  beamSpots.forEach(([x, y, z]) => {
    const beam = new THREE.Mesh(beamGeo, metalMat);
    beam.position.set(x, y, z);
    group.add(beam);
  });

  // Cross-braces
  const crossGeo = new THREE.BoxGeometry(14, 0.15, 0.15);
  [-4.5, 0, 4.5].forEach(z => {
    const cross = new THREE.Mesh(crossGeo, metalMat);
    cross.position.set(0, -0.5, z);
    group.add(cross);
  });

  // Front railing
  const railGeo = new THREE.BoxGeometry(14, 0.05, 0.05);
  [0.5, 1.0].forEach(h => {
    const rail = new THREE.Mesh(railGeo, metalMat);
    rail.position.set(0, h, 5);
    group.add(rail);
  });

  // Front railing posts
  const postGeo = new THREE.CylinderGeometry(0.035, 0.035, 1.0, 6);
  for (let x = -6.5; x <= 6.5; x += 2) {
    const post = new THREE.Mesh(postGeo, metalMat);
    post.position.set(x, 0.65, 5);
    group.add(post);
  }

  // Side railings
  const sideGeo = new THREE.BoxGeometry(0.05, 0.05, 10);
  [-7, 7].forEach(x => {
    [0.5, 1.0].forEach(h => {
      const rail = new THREE.Mesh(sideGeo, metalMat);
      rail.position.set(x, h, 0);
      group.add(rail);
    });
    for (let z = -4; z <= 4; z += 2) {
      const post = new THREE.Mesh(postGeo, metalMat);
      post.position.set(x, 0.65, z);
      group.add(post);
    }
  });

  // Stairs (left side, going down and forward)
  const stairMat = metalMat.clone();
  for (let i = 0; i < 8; i++) {
    const tread = new THREE.Mesh(
      new THREE.BoxGeometry(2, 0.12, 0.7),
      stairMat
    );
    tread.position.set(-7.5, -i * 0.5, 2.5 + i * 0.7);
    group.add(tread);
  }

  // Stair stringers (side rails)
  const stringerLen = Math.sqrt(Math.pow(4, 2) + Math.pow(5.6, 2));
  const stringerAngle = Math.atan2(4, 5.6);
  const stringerGeo = new THREE.BoxGeometry(0.06, 0.06, stringerLen);
  [-6.6, -8.4].forEach(x => {
    const stringer = new THREE.Mesh(stringerGeo, metalMat);
    stringer.position.set(x, -1.7, 5.3);
    stringer.rotation.x = stringerAngle;
    group.add(stringer);
  });

  // Industrial pipes (right side)
  const pipeMat = new THREE.MeshStandardMaterial({
    color: 0x4a4a4a,
    roughness: 0.3,
    metalness: 0.9,
  });

  const pipeGeo = new THREE.CylinderGeometry(0.12, 0.12, 8, 8);
  for (let i = 0; i < 4; i++) {
    const pipe = new THREE.Mesh(pipeGeo, pipeMat);
    pipe.position.set(7.8 + i * 0.45, 2, -3 + i * 1.2);
    group.add(pipe);
  }

  const hPipeGeo = new THREE.CylinderGeometry(0.1, 0.1, 5, 8);
  const hPipe = new THREE.Mesh(hPipeGeo, pipeMat);
  hPipe.position.set(8.2, 4, -1);
  hPipe.rotation.x = Math.PI / 2;
  group.add(hPipe);

  const hPipe2 = new THREE.Mesh(
    new THREE.CylinderGeometry(0.08, 0.08, 6, 8),
    pipeMat
  );
  hPipe2.position.set(8.5, 2.5, 0);
  hPipe2.rotation.x = Math.PI / 2;
  group.add(hPipe2);

  // Fairytale hill mound under the platform
  const hillMat = new THREE.MeshStandardMaterial({
    color: 0x1a2a15,
    roughness: 0.95,
    metalness: 0.0,
  });

  const hillGeo = new THREE.SphereGeometry(14, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2);
  const hill = new THREE.Mesh(hillGeo, hillMat);
  hill.position.set(0, -0.15, 0);
  hill.scale.set(1.2, 0.6, 1.0);
  group.add(hill);

  // Smaller secondary mound for organic shape
  const hill2Geo = new THREE.SphereGeometry(8, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2);
  const hill2 = new THREE.Mesh(hill2Geo, hillMat.clone());
  hill2.material.color.setHex(0x152210);
  hill2.position.set(-5, -0.15, 3);
  hill2.scale.set(1.0, 0.5, 0.8);
  group.add(hill2);

  const hill3 = new THREE.Mesh(hill2Geo, hillMat.clone());
  hill3.material.color.setHex(0x1d2e18);
  hill3.position.set(4, -0.15, -2);
  hill3.scale.set(0.8, 0.45, 0.9);
  group.add(hill3);

  scene.add(group);
  return group;
}
