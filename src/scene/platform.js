import * as THREE from 'three';

function createWoodTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#3d2a18';
  ctx.fillRect(0, 0, 512, 512);

  // Plank divisions
  const planks = 8;
  const plankH = 512 / planks;
  for (let p = 0; p < planks; p++) {
    const baseY = p * plankH;
    const hue = Math.random() * 15 - 7;

    // Plank base color variation
    ctx.fillStyle = `rgb(${55 + hue}, ${38 + hue * 0.6}, ${22 + hue * 0.3})`;
    ctx.globalAlpha = 0.4;
    ctx.fillRect(0, baseY, 512, plankH);

    // Wood grain lines
    for (let i = 0; i < 60; i++) {
      const gy = baseY + Math.random() * plankH;
      ctx.strokeStyle = `rgba(${25 + Math.random() * 35}, ${18 + Math.random() * 18}, ${8 + Math.random() * 12}, ${0.15 + Math.random() * 0.25})`;
      ctx.lineWidth = 0.3 + Math.random() * 1.2;
      ctx.beginPath();
      ctx.moveTo(0, gy);
      for (let x = 0; x < 512; x += 20) {
        ctx.lineTo(x, gy + (Math.random() - 0.5) * 2);
      }
      ctx.stroke();
    }

    // Knots
    if (Math.random() < 0.3) {
      const kx = 50 + Math.random() * 400;
      const ky = baseY + plankH * 0.3 + Math.random() * plankH * 0.4;
      const kr = 4 + Math.random() * 8;
      ctx.globalAlpha = 0.3;
      ctx.fillStyle = '#2a1a0a';
      ctx.beginPath();
      ctx.ellipse(kx, ky, kr * 1.3, kr, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // Plank gap line
    ctx.globalAlpha = 0.35;
    ctx.strokeStyle = '#1a0e05';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, baseY);
    ctx.lineTo(512, baseY);
    ctx.stroke();
  }

  // Weathering patches
  for (let i = 0; i < 30; i++) {
    ctx.globalAlpha = 0.05 + Math.random() * 0.08;
    ctx.fillStyle = Math.random() > 0.5 ? '#1a0e05' : '#5a4830';
    ctx.fillRect(Math.random() * 512, Math.random() * 512, 10 + Math.random() * 40, 5 + Math.random() * 20);
  }

  // Warm light tint across the surface (cabin warmth)
  const warmGrad = ctx.createRadialGradient(256, 256, 50, 256, 256, 350);
  warmGrad.addColorStop(0, 'rgba(255, 160, 60, 0.06)');
  warmGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.globalAlpha = 1;
  ctx.fillStyle = warmGrad;
  ctx.fillRect(0, 0, 512, 512);

  ctx.globalAlpha = 1;

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(3, 3);
  tex.anisotropy = 4;
  return tex;
}

function createHillTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Dark earthy base
  ctx.fillStyle = '#1a2a12';
  ctx.fillRect(0, 0, 512, 512);

  for (let i = 0; i < 800; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const len = 3 + Math.random() * 8;
    const angle = -Math.PI / 2 + (Math.random() - 0.5) * 0.8;
    const greens = ['#1a3a10', '#223d18', '#152e0e', '#1d3515', '#253d1a', '#0e2208', '#2a4520'];
    ctx.strokeStyle = greens[Math.floor(Math.random() * greens.length)];
    ctx.globalAlpha = 0.3 + Math.random() * 0.5;
    ctx.lineWidth = 0.5 + Math.random() * 1.5;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + Math.cos(angle) * len, y + Math.sin(angle) * len);
    ctx.stroke();
  }

  // Moss patches
  for (let i = 0; i < 40; i++) {
    ctx.globalAlpha = 0.08 + Math.random() * 0.1;
    ctx.fillStyle = ['#1a3510', '#0e2208', '#2a4018', '#16300a'][Math.floor(Math.random() * 4)];
    ctx.beginPath();
    ctx.arc(Math.random() * 512, Math.random() * 512, 5 + Math.random() * 20, 0, Math.PI * 2);
    ctx.fill();
  }

  // Dirt/earth spots
  for (let i = 0; i < 25; i++) {
    ctx.globalAlpha = 0.06 + Math.random() * 0.08;
    ctx.fillStyle = ['#2a1a0a', '#1a1008', '#3a2a18'][Math.floor(Math.random() * 3)];
    ctx.beginPath();
    ctx.arc(Math.random() * 512, Math.random() * 512, 3 + Math.random() * 12, 0, Math.PI * 2);
    ctx.fill();
  }

  // Small pebbles
  for (let i = 0; i < 60; i++) {
    ctx.globalAlpha = 0.1 + Math.random() * 0.15;
    ctx.fillStyle = '#2a2a20';
    ctx.beginPath();
    ctx.arc(Math.random() * 512, Math.random() * 512, 0.5 + Math.random() * 2, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.globalAlpha = 1;
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(2, 2);
  tex.anisotropy = 4;
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

  // Fairytale hill with procedural earth/grass texture
  const hillTex = createHillTexture();
  const hillMat = new THREE.MeshStandardMaterial({
    map: hillTex,
    color: 0x1a2a15,
    roughness: 0.95,
    metalness: 0.0,
  });

  // Main mound — sits just under the deck, extends downward
  const hillGeo = new THREE.SphereGeometry(7, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2);
  const hill = new THREE.Mesh(hillGeo, hillMat);
  hill.position.set(0, -0.3, 0);
  hill.scale.set(1.3, 0.5, 1.1);
  hill.rotation.x = Math.PI; // Flip upside down so dome goes downward
  group.add(hill);

  // Secondary mound — slightly offset, also pointing down
  const hill2Geo = new THREE.SphereGeometry(4, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2);
  const hill2Mat = hillMat.clone();
  hill2Mat.color = new THREE.Color(0x152210);
  const hill2 = new THREE.Mesh(hill2Geo, hill2Mat);
  hill2.position.set(-4, -0.3, 2);
  hill2.scale.set(1.0, 0.6, 0.9);
  hill2.rotation.x = Math.PI;
  group.add(hill2);

  const hill3Mat = hillMat.clone();
  hill3Mat.color = new THREE.Color(0x1d2e18);
  const hill3 = new THREE.Mesh(hill2Geo, hill3Mat);
  hill3.position.set(3, -0.3, -1.5);
  hill3.scale.set(0.9, 0.5, 0.8);
  hill3.rotation.x = Math.PI;
  group.add(hill3);

  scene.add(group);
  return group;
}
