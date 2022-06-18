import * as THREE from "three";
import { EFFECT_COLOR } from "~/views/components/threeConsts";

const vertexShader = `
varying vec3 vNormal;


void main() {
  vNormal = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;
const fragmentShader = `
varying vec3 vNormal;

void main() {
  float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 15.0);
	gl_FragColor = vec4(${EFFECT_COLOR.r}, ${EFFECT_COLOR.g}, ${EFFECT_COLOR.b}, 1.0) * intensity;
}
`;
const haloFragmentShader = `
varying vec3 vNormal;

void main() {
	gl_FragColor = vec4(${EFFECT_COLOR.r}, ${EFFECT_COLOR.g}, ${EFFECT_COLOR.b}, 1.0) * (1.0 - dot(vNormal.xy, vNormal.xy));
}
`;

const sunriseVertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;
const sunriseFragmentShader = `
varying vec2 vUv;

void main() {

  float x = 1.0 - 2.0 * abs(vUv.x - 0.5);
  float scale = x * 2.0;
	gl_FragColor = vec4(${EFFECT_COLOR.r}, ${EFFECT_COLOR.g}, ${EFFECT_COLOR.b}, 1.0) * scale;
}
`;

export function getHaloMesh() {
  const haloGeometry = new THREE.SphereGeometry(0.5, 64, 64);
  const haloMaterial = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader: haloFragmentShader,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
    transparent: true,
    depthWrite: true,
  });
  const haloMesh = new THREE.Mesh(
    haloGeometry,
    haloMaterial,
  );
  haloMesh.position.set(0, -0.46, -0.1);
  haloMesh.scale.set(1.5, 1, 1);

  return haloMesh;
}
export function getAtmosphereMesh() {
  const atmosphereGeometry = new THREE.SphereGeometry(0.602, 64, 64);
  const atmosphereMaterial = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
    transparent: true,
    depthWrite: true,
  });
  const atmosphereMesh = new THREE.Mesh(
    atmosphereGeometry,
    atmosphereMaterial,
  );
  atmosphereMesh.position.set(0, 0, 0);
  atmosphereMesh.scale.set(0, 0, 0);

  return atmosphereMesh;
}

export function getSunriseMesh() {
  const sunriseGeometry = new THREE.BoxGeometry(2.5, 0.01, 0.01, 10, 10);
  const sunriseMaterial = new THREE.ShaderMaterial({
    vertexShader: sunriseVertexShader,
    fragmentShader: sunriseFragmentShader,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
    transparent: true,
    depthWrite: true,
  });
  const sunriseMesh = new THREE.Mesh(
    sunriseGeometry,
    sunriseMaterial,
  );
  sunriseMesh.position.set(0, -0.415, -1);
  return sunriseMesh;
}
