import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ThreeCanvas, ThreeCanvasObject } from '~/views/components/ThreeCanvas';
import { Mesh } from 'three';
import usePrefersReducedMotion from '~/hoooks/usePrefersReducedMotion';
import { SceneItem } from 'scenejs';

const DEFAULT_VELOCITY = 0.007;
const LINE_COUNT = 500;

const normalVertexShader = `
varying vec3 vNormal;


void main() {
  vNormal = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;
const nebulaFragmentShader = `
varying vec3 vNormal;
uniform vec3 uColor;

void main() {
  float intensity = pow(dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
  // floor(* 20.0) * 0.05;
  gl_FragColor = vec4(uColor, 0.1) * intensity;
}
`;

const blurVertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;
const blurFragmentShader = `
varying vec2 vUv;

void main() {

  float x = 1.0 - 2.0 * abs(vUv.x - 0.5);
  float scale = x * 2.0;
	gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0) * scale;
}
`;

export function getBlurLineMesh() {
  const blurLineGeometry = new THREE.PlaneBufferGeometry(1, 0.05, 1, 1);
  const blurLineMaterial = new THREE.ShaderMaterial({
    vertexShader: blurVertexShader,
    fragmentShader: blurFragmentShader,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    transparent: true,
    depthWrite: false,
  });
  const blurLineMesh = new THREE.Mesh(blurLineGeometry, blurLineMaterial);
  return blurLineMesh;
}

// export function getNebulaMesh(color: number) {
//   const geometry = new THREE.SphereGeometry(1, 64, 64);
//   const nebulaMaterial = new THREE.ShaderMaterial({
//     vertexShader: normalVertexShader,
//     fragmentShader: nebulaFragmentShader,
//     // blending: THREE.AdditiveBlending,
//     transparent: true,
//     depthWrite: false,
//     side: THREE.FrontSide,
//     uniforms: {
//       uColor: {
//         value: new THREE.Color(color),
//       },
//     }
//   });
//   const mesh = new THREE.Mesh(geometry, nebulaMaterial);
//   const verties = geometry.attributes.position.array as number[];
//   const perlin = new ImprovedNoise();
//   const noiseScale = 0.5 * Math.random();
//   for (let i = 0; i < verties.length / 3; ++i) {
//     const x = verties[3 * i];
//     const y = verties[3 * i + 1];
//     const z = verties[3 * i + 2];

//     const scale = 1 + perlin.noise(x * noiseScale, y * noiseScale, z * noiseScale);

//     verties[3 * i] *= scale;
//     verties[3 * i + 1] *= scale;
//     verties[3 * i + 2] *= scale;
//   }

//   mesh.scale.set(5, 5, 5);

//   return mesh;
// }

export interface WarpLineProps {
  target: number;
}

export const WarpLine = (props: WarpLineProps) => {
  const threeCanvasRef = useRef<ThreeCanvasObject>(null);
  const velocityRef = useRef(DEFAULT_VELOCITY);
  const linesRef = useRef<Mesh[]>([]);
  const nebularsRef = useRef<Mesh[]>([]);
  const prefersReducedMotion = usePrefersReducedMotion();
  const prevTargetRef = useRef<number>(props.target);
  const currentTargetRef = useRef<number>(props.target);

  currentTargetRef.current = props.target;

  useEffect(() => {
    const prevTarget = prevTargetRef.current;
    const currentTarget = currentTargetRef.current;

    if (
      prevTarget != null &&
      currentTarget != null &&
      currentTarget !== prevTarget
    ) {
      const a = (currentTarget - prevTarget > 0 ? 1 : -1) * 0.005;

      new SceneItem({
        0: {},
        0.3: {},
      })
        .on('animate', () => {
          velocityRef.current += a;
        })
        .play();
    }
    prevTargetRef.current = currentTargetRef.current;
  }, [currentTargetRef.current]);

  useEffect(() => {
    const scene = threeCanvasRef.current!.sceneRef.current!;
    const lineCount = prefersReducedMotion ? 20 : LINE_COUNT;

    for (let i = 0; i < lineCount; ++i) {
      const line = getBlurLineMesh();
      const lineRad = Math.random() * Math.PI * 2;
      const lineRadius = 10 + Math.random() * 20;
      const lineX = lineRadius * Math.cos(lineRad);
      const lineY = lineRadius * Math.sin(lineRad);
      const lineZ = Math.random() * 200 - 100;

      line.rotateZ(lineRad);
      line.position.set(lineX, lineY, lineZ);

      scene.add(line);
      linesRef.current.push(line);
    }
    return () => {
      linesRef.current!.forEach((lineMesh) => {
        scene.remove(lineMesh);
      });
      linesRef.current = [];
    };
  }, [prefersReducedMotion]);

  return (
    <ThreeCanvas
      perspective={true}
      ref={threeCanvasRef}
      render={true}
      onRender={() => {
        const velocity = velocityRef.current;
        const lines = linesRef.current;
        const nebulars = nebularsRef.current;

        velocityRef.current = velocity - (velocity - DEFAULT_VELOCITY) * 0.05;

        nebulars.forEach((nebular) => {
          const position = nebular.position;
          let z = nebular.position.z + 20 * velocity;

          if (z > 20) {
            z = -80;
          }
          if (z < -80) {
            z = 20;
          }
          nebular.position.set(position.x, position.y, z);
        });
        lines.forEach((line) => {
          const position = line.position;
          let z = line.position.z + 100 * velocity;
          let scale = 1;

          if (z > 100) {
            z = -100;
          }
          if (z < -100) {
            z = 100;
          }
          scale = 0.5 + (0.5 * velocity) / DEFAULT_VELOCITY;
          line.scale.set(scale, 1, 1);
          line.position.set(position.x, position.y, z);
        });
      }}
    ></ThreeCanvas>
  );
};
