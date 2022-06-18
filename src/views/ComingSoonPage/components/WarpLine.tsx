import { forwardRef, useEffect, useRef, useState } from "react";
import * as THREE from "three";
// import { ImprovedNoise } from "three/examples/jsm/math/ImprovedNoise";
import { ThreeCanvas, ThreeCanvasObject } from "~/views/components/ThreeCanvas";
import { EFFECT_COLOR } from "~/views/components/threeConsts";
import { Mesh } from "three";

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
  const blurLineMesh = new THREE.Mesh(
    blurLineGeometry,
    blurLineMaterial,
  );
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


export const WarpLine = () => {
  const threeCanvasRef = useRef<ThreeCanvasObject>(null);
  const velocityRef = useRef(DEFAULT_VELOCITY);
  const linesRef = useRef<Mesh[]>([]);
  const nebularsRef = useRef<Mesh[]>([]);

  // const [attributes] = useState(() => {
  //     const position = new THREE.BufferAttribute(new Float32Array(6 * LINE_COUNT), 3);
  //     const positionArray = position.array as number[];

  //     for (let lineIndex = 0; lineIndex < LINE_COUNT; ++lineIndex) {
  //         const rad = Math.random() * Math.PI * 2;
  //         const lineRadius = 10 + (Math.random() * 20);
  //         const lineX = lineRadius * Math.cos(rad);
  //         const lineY = lineRadius * Math.sin(rad);
  //         const lineZ = Math.random() * 500 - 100;
  //         //line start to End
  //         positionArray[6 * lineIndex + 3] = positionArray[6 * lineIndex] = lineX;
  //         positionArray[6 * lineIndex + 4] = positionArray[6 * lineIndex + 1] = lineY;
  //         positionArray[6 * lineIndex + 5] = positionArray[6 * lineIndex + 2] = lineZ;
  //     }
  //     return {
  //         position,
  //     };
  // });
  useEffect(() => {
    const scene = threeCanvasRef.current!.sceneRef.current!;

    for (let i = 0; i < LINE_COUNT; ++i) {
      const line = getBlurLineMesh();
      const lineRad = Math.random() * Math.PI * 2;
      const lineRadius = 10 + (Math.random() * 20);
      const lineX = lineRadius * Math.cos(lineRad);
      const lineY = lineRadius * Math.sin(lineRad);
      const lineZ = Math.random() * 200 - 100;

      line.rotateZ(lineRad);
      line.position.set(lineX, lineY, lineZ);

      scene.add(line);
      linesRef.current.push(line);
    }

    // for (let i = 0; i < 100; ++i) {
    //     const nebularColors = [
    //         0x4062DD,
    //         0x8540DD,
    //         0x6940DD,
    //     ]
    //     const nebula = getNebulaMesh(nebularColors[Math.floor(Math.random() * 3)]);
    //     const nebularRad = i / 40 * Math.PI * 2;
    //     const nebularRadius = 5 + (Math.random() * 20);
    //     const nebularX = nebularRadius * Math.cos(nebularRad);
    //     const nebularY = nebularRadius * Math.sin(nebularRad);
    //     const nebularZ = -160 + i * 2;

    //     nebula.position.set(nebularX, nebularY, nebularZ);

    //     nebularsRef.current.push(nebula);
    //     scene.add(nebula);
    // }
    // lineObject.matrixAutoUpdate = false;

    function onWheel(e?: WheelEvent) {
      const size = threeCanvasRef.current!.rendererRef.current!.getSize(new THREE.Vector2());
      const delta = (e?.deltaY ?? 0) / 50 / size.y;

      velocityRef.current += delta >= 0 ? delta : delta * 2;
    }
    onWheel();
    window.addEventListener("wheel", onWheel);
    return () => {
      window.removeEventListener("wheel", onWheel);
    }
  }, []);

  return <ThreeCanvas perspective={true} ref={threeCanvasRef} render={true} onRender={() => {
    const velocity = velocityRef.current;
    const lines = linesRef.current;
    const nebulars = nebularsRef.current;

    velocityRef.current = velocity - (velocity - DEFAULT_VELOCITY) * 0.05;


    nebulars.forEach(nebular => {
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
    lines.forEach(line => {
      const position = line.position;
      let z = line.position.z + 100 * velocity;
      let scale = 1;

      if (z > 100) {
        z = -100;
      }
      if (z < -100) {
        z = 100;
      }
      scale = 0.5 + 0.5 * velocity / DEFAULT_VELOCITY;
      line.scale.set(scale, 1, 1);
      line.position.set(position.x, position.y, z);
    });
  }}></ThreeCanvas>;
};
