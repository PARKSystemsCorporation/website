import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';

const VignetteShader = {
  uniforms: {
    tDiffuse: { value: null },
    darkness: { value: 1.2 },
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
      vec2 uv = (vUv - 0.5) * 2.0;
      float vig = 1.0 - dot(uv, uv) * darkness;
      vig = clamp(vig, 0.0, 1.0);
      vig = smoothstep(0.0, offset, vig);
      gl_FragColor = vec4(texel.rgb * vig, texel.a);
    }
  `,
};

const FilmGrainShader = {
  uniforms: {
    tDiffuse: { value: null },
    time: { value: 0 },
    intensity: { value: 0.08 },
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
    uniform float time;
    uniform float intensity;
    varying vec2 vUv;
    float rand(vec2 co) {
      return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
    }
    void main() {
      vec4 texel = texture2D(tDiffuse, vUv);
      float noise = rand(vUv + vec2(time * 0.001)) * 2.0 - 1.0;
      texel.rgb += noise * intensity;
      gl_FragColor = texel;
    }
  `,
};

const ChromaticAberrationShader = {
  uniforms: {
    tDiffuse: { value: null },
    amount: { value: 0.0015 },
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
    uniform float amount;
    varying vec2 vUv;
    void main() {
      vec2 dir = vUv - 0.5;
      float dist = length(dir);
      vec2 offset = dir * dist * amount;
      float r = texture2D(tDiffuse, vUv + offset).r;
      float g = texture2D(tDiffuse, vUv).g;
      float b = texture2D(tDiffuse, vUv - offset).b;
      float a = texture2D(tDiffuse, vUv).a;
      gl_FragColor = vec4(r, g, b, a);
    }
  `,
};

export function setupAtmosphere(scene, camera, renderer) {
  scene.fog = new THREE.FogExp2(0x04040c, 0.011);
  scene.background = new THREE.Color(0x04040c);

  const rainCount = 3000;
  const positions = new Float32Array(rainCount * 3);
  const velocities = new Float32Array(rainCount);

  const spreadX = 60;
  const spreadY = 40;
  const spreadZ = 60;

  for (let i = 0; i < rainCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * spreadX;
    positions[i * 3 + 1] = Math.random() * spreadY;
    positions[i * 3 + 2] = (Math.random() - 0.5) * spreadZ;
    velocities[i] = 8 + Math.random() * 12;
  }

  const rainGeo = new THREE.BufferGeometry();
  rainGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const rainMat = new THREE.PointsMaterial({
    color: 0x8899bb,
    size: 0.06,
    transparent: true,
    opacity: 0.35,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const rain = new THREE.Points(rainGeo, rainMat);
  scene.add(rain);

  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));

  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(
      Math.floor(window.innerWidth / 2),
      Math.floor(window.innerHeight / 2)
    ),
    0.8,
    0.4,
    0.78
  );
  composer.addPass(bloomPass);

  const vignettePass = new ShaderPass(VignetteShader);
  composer.addPass(vignettePass);

  const filmGrainPass = new ShaderPass(FilmGrainShader);
  composer.addPass(filmGrainPass);

  const chromaPass = new ShaderPass(ChromaticAberrationShader);
  composer.addPass(chromaPass);

  function rainUpdate(delta, elapsed) {
    const pos = rain.geometry.attributes.position.array;
    for (let i = 0; i < rainCount; i++) {
      pos[i * 3 + 1] -= velocities[i] * delta;
      if (pos[i * 3 + 1] < -3) {
        pos[i * 3 + 1] = spreadY;
        pos[i * 3] = (Math.random() - 0.5) * spreadX;
        pos[i * 3 + 2] = (Math.random() - 0.5) * spreadZ;
      }
    }
    rain.geometry.attributes.position.needsUpdate = true;

    if (elapsed !== undefined) {
      filmGrainPass.uniforms.time.value = elapsed;
    }
  }

  return { composer, rainUpdate, bloomPass };
}
