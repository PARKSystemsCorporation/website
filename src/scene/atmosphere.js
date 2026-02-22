import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';

const VignetteShader = {
  uniforms: {
    tDiffuse: { value: null },
    darkness: { value: 0.45 },
    offset: { value: 1.1 },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float darkness;
    uniform float offset;
    varying vec2 vUv;
    void main() {
      vec4 texel = texture2D(tDiffuse, vUv);
      vec2 uv = (vUv - vec2(0.5)) * vec2(offset);
      float vig = clamp(1.0 - dot(uv, uv), 0.0, 1.0);
      texel.rgb *= mix(1.0 - darkness, 1.0, vig);
      gl_FragColor = texel;
    }
  `,
};

export function setupAtmosphere(scene, camera, renderer) {
  scene.fog = new THREE.FogExp2(0x1a2035, 0.018);
  scene.background = new THREE.Color(0x080a12);

  const fogGroup = new THREE.Group();
  const fogMat = new THREE.MeshBasicMaterial({
    color: 0x2a3045,
    transparent: true,
    opacity: 0.18,
    side: THREE.DoubleSide,
    depthWrite: false,
  });

  const heights = [-18, -10, -2, 6, 14, 22];
  heights.forEach((h) => {
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(140, 100), fogMat.clone());
    plane.rotation.x = -Math.PI / 2;
    plane.position.set(0, h, -30);
    plane.material.opacity = 0.08 + Math.abs(h) * 0.008;
    fogGroup.add(plane);
  });
  scene.add(fogGroup);

  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));

  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(
      Math.floor(window.innerWidth / 2),
      Math.floor(window.innerHeight / 2)
    ),
    1.35,
    0.7,
    0.42
  );
  composer.addPass(bloomPass);

  const vignettePass = new ShaderPass(VignetteShader);
  vignettePass.uniforms.darkness.value = 0.35;
  composer.addPass(vignettePass);

  function rainUpdate(delta, elapsed) {}

  return { composer, rainUpdate, bloomPass };
}
