import * as THREE from 'three';

function createNeonTextTexture(text, color, width = 512, height = 128) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = 'rgba(5,5,10,0.6)';
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = `rgba(${(color >> 16) & 255}, ${(color >> 8) & 255}, ${color & 255}, 0.3)`;
  ctx.lineWidth = 2;
  ctx.strokeRect(4, 4, width - 8, height - 8);

  const r = (color >> 16) & 255;
  const g = (color >> 8) & 255;
  const b = color & 255;

  ctx.font = 'bold 56px "Orbitron", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  ctx.shadowColor = `rgb(${r},${g},${b})`;
  ctx.shadowBlur = 25;
  ctx.fillStyle = `rgb(${r},${g},${b})`;
  ctx.fillText(text, width / 2, height / 2);

  ctx.shadowBlur = 12;
  ctx.fillText(text, width / 2, height / 2);

  ctx.shadowBlur = 0;
  ctx.fillStyle = `rgba(255,255,255,0.6)`;
  ctx.fillText(text, width / 2, height / 2);

  return new THREE.CanvasTexture(canvas);
}

export function createNeonSigns(scene) {
  const signs = [];

  const signData = [
    {
      text: 'MMO',
      color: 0xff3264,
      url: 'https://parksystemscorporation.com/mmo',
      external: true,
      position: new THREE.Vector3(14, 12, -22),
      rotation: new THREE.Euler(0, -0.6, 0),
      scale: new THREE.Vector3(3.5, 1, 1),
    },
    {
      text: 'KIRA 5.1',
      color: 0x00ff88,
      url: '/kira/',
      external: false,
      position: new THREE.Vector3(1, 2.8, 5.2),
      rotation: new THREE.Euler(0, 0, 0),
      scale: new THREE.Vector3(2.2, 0.65, 1),
    },
    {
      text: 'RESEARCH',
      color: 0x4488ff,
      url: '/research/',
      external: false,
      position: new THREE.Vector3(-6.5, 4.5, -1),
      rotation: new THREE.Euler(0, 0.3, 0),
      scale: new THREE.Vector3(2.5, 0.7, 1),
    },
  ];

  for (const data of signData) {
    const tex = createNeonTextTexture(data.text, data.color);
    const geo = new THREE.PlaneGeometry(1, 0.25);
    const mat = new THREE.MeshBasicMaterial({
      map: tex,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.copy(data.position);
    mesh.rotation.copy(data.rotation);
    mesh.scale.copy(data.scale);

    mesh.userData = {
      url: data.url,
      external: data.external,
      baseColor: data.color,
      isSign: true,
    };

    scene.add(mesh);

    const light = new THREE.PointLight(data.color, 0.8, 12, 2);
    light.position.copy(data.position);
    light.position.z += 0.5;
    scene.add(light);

    signs.push({ mesh, light, baseIntensity: 0.8 });
  }

  return signs;
}

export function setupSignInteraction(camera, signs, renderer) {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  const signMeshes = signs.map(s => s.mesh);
  let hoveredSign = null;

  function onMouseMove(e) {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  }

  function onClick(e) {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const hits = raycaster.intersectObjects(signMeshes);

    if (hits.length > 0) {
      const data = hits[0].object.userData;
      if (data.external) {
        window.open(data.url, '_blank', 'noopener');
      } else {
        window.location.href = data.url;
      }
    }
  }

  function update() {
    raycaster.setFromCamera(mouse, camera);
    const hits = raycaster.intersectObjects(signMeshes);

    const newHovered = hits.length > 0 ? hits[0].object : null;

    if (newHovered !== hoveredSign) {
      if (hoveredSign) {
        hoveredSign.material.opacity = 1;
        renderer.domElement.style.cursor = 'default';
      }
      hoveredSign = newHovered;
      if (hoveredSign) {
        renderer.domElement.style.cursor = 'pointer';
      }
    }

    for (const s of signs) {
      const isHovered = s.mesh === hoveredSign;
      s.mesh.material.opacity = isHovered ? 1.0 : 0.85;
      s.light.intensity = isHovered ? 1.6 : s.baseIntensity;
    }
  }

  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('click', onClick);

  return { update };
}
