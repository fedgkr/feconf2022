import { useEffect, useRef, useState } from 'react';
import { SceneItem } from 'scenejs';
import * as THREE from 'three';
import { ThreeCanvas, ThreeCanvasObject } from '~/views/components/ThreeCanvas';

const POINT_LIGHT_FRAGMENT_SHADER = `
varying vec3 vPosition;
uniform float uScrollTop;

// lights
float getPointLightIntensity() {
  vec3 lightPos = vec3(0.7, 0.5 - uScrollTop * 1.5 / uHeight, 1.2);
  vec3 lightColor = vec3(1.0, 1.0, 1.0);
  vec3 lightDirection = normalize(lightPos - vPosition);
  float lightIntensity = 1.0 + pow(max(dot(lightDirection, normalize(vNormal)), 0.0), 10.0) * 5.0;

  return lightIntensity;
}

float getScreenAlpha() {
  float screenAlpha = min(1.0, (gl_FragCoord.y + uScrollTop * 0.15) / (uHeight * 0.5));

  return screenAlpha;
}
`;

const color1 = new THREE.Color(0x304ab7);
const color2 = new THREE.Color(0x8e5fe6);

// const color1 = new THREE.Color(0xff0000);
// const color2 = new THREE.Color(0x00ff00);
const color3 = new THREE.Color(0x011432);
const blurColor = new THREE.Color(0x163982);
const earthVertexShader = `
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

varying vec2 vPos;

void main() {
  vUv = uv;
  vNormal = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  vPos = gl_Position.xy;

  vPosition = vec3(modelMatrix * vec4(position, 1.0));
}
`;
const earthFragmentShader = `
varying vec3 vNormal;

varying vec2 vUv;
varying vec2 vPos;
uniform sampler2D map;
uniform float uWidth;
uniform float uHeight;
uniform float uOpacity;


${POINT_LIGHT_FRAGMENT_SHADER}

void main() {
  vec4 color1 = vec4(${color1.r.toFixed(10)}, ${color1.g.toFixed(
  10
)}, ${color1.b.toFixed(10)}, 1.0);
  vec4 color2 = vec4(${color2.r.toFixed(10)}, ${color2.g.toFixed(
  10
)}, ${color2.b.toFixed(10)}, 1.0);
  vec4 colorEarth = vec4(${color3.r.toFixed(10)}, ${color3.g.toFixed(
  10
)}, ${color3.b.toFixed(10)}, 1.0);
  vec4 texture = texture2D(map, vUv);
  float x = (vNormal.x + 1.0) * 0.5;
  float y = (vNormal.y + 1.0) * 0.5 - 0.3;

  vec4 cColor = color1 * (1.0 - x) + color2 * x;

  float a = texture.a;
  float w = 0.5 * a;
  float screenY = (vPos.y + 1.0) * 0.5;
  vec4 blended = vec4(cColor.rgb * (1.0 - w) + texture.rgb * w, a);


  float lightIntensity = getPointLightIntensity();
  float screenAlpha = getScreenAlpha();
  vec3 rgb = blended.rgb * a + (1.0 - a) * colorEarth.rgb;

	gl_FragColor = vec4(rgb * lightIntensity, screenAlpha * uOpacity);
}
`;

const atmosphereVertexShader = `
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  vNormal = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

  vPosition = vec3(modelMatrix * vec4(position, 1.0));
}
`;

const atmosphererFragmentShader = `
varying vec3 vNormal;
uniform float uHeight;
uniform float uOpacity;


${POINT_LIGHT_FRAGMENT_SHADER}

void main() {
  float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 16.0);

  // float screenAlpha = pow(gl_FragCoord.y / (uHeight * 0.3) - 0.05, 2.0);

  float lightIntensity = getPointLightIntensity();
  float screenAlpha = getScreenAlpha() - 0.05;
	gl_FragColor = vec4(vec3(${blurColor.r}, ${blurColor.g}, ${blurColor.b}) * lightIntensity, screenAlpha * uOpacity) * intensity;
}
`;

export function getAtmosphereMesh(radius = 0.65) {
  const atmosphereGeometry = new THREE.SphereGeometry(radius, 64, 64);
  const atmosphereMaterial = new THREE.ShaderMaterial({
    vertexShader: atmosphereVertexShader,
    fragmentShader: atmosphererFragmentShader,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
    transparent: true,
    depthWrite: true,
    uniforms: {
      uHeight: {
        value: 0,
      },
      uOpacity: {
        value: 1,
      },
      uScrollTop: {
        value: 0,
      },
    },
  });
  const atmosphereMesh = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);

  return atmosphereMesh;
}

export async function getEarthTexture() {
  const image = await new THREE.ImageLoader().loadAsync(
    '/texture/small_earth.png'
  );

  const canvas = document.createElement('canvas');

  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, 0, 0);

  const data = ctx.getImageData(0, 0, canvas.width, canvas.height);

  const canvas2 = document.createElement('canvas');
  const zoom = 8;
  const length = 1;

  canvas2.width = image.naturalWidth * zoom;
  canvas2.height = image.naturalHeight * zoom;
  const ctx2 = canvas2.getContext('2d');
  ctx2.clearRect(0, 0, canvas2.width, canvas2.height);

  const dataWidth = data.width;
  const dataheight = data.height;

  for (let y = 0; y < dataheight; ++y) {
    for (let yZoom = 0; yZoom < length; ++yZoom) {
      for (let x = 0; x < dataWidth; ++x) {
        const alpha = data.data[(x + y * dataWidth) * 4 + 3];

        if (alpha < 50) {
          continue;
        }
        // if (x % 2 || y % 2) {
        //   continue;
        // }
        for (let xZoom = 0; xZoom < length; ++xZoom) {
          ctx2.beginPath();
          ctx2.fillStyle = `rgba(255, 255, 255, ${Math.max(0.8, alpha / 255)})`;
          ctx2.arc(
            (x + (xZoom / length) * 2) * zoom,
            (y + (yZoom / length) * 2) * zoom,
            1.5 / length,
            0,
            2 * Math.PI
          );
          ctx2.fill();
        }
      }
    }
  }

  return new THREE.CanvasTexture(canvas2);
}
export function getImageBitmapTexture(url: string) {
  return new Promise<THREE.Texture>((resolve) => {
    new THREE.ImageBitmapLoader()
      .setOptions({ imageOrientation: 'none' })
      .setCrossOrigin('*')
      .load(url, function (image) {
        const texture = new THREE.CanvasTexture(image);

        resolve(texture);
      });
  });
}
export function getEarthMesh(radius: number, onReady: () => void) {
  const earthGeometry = new THREE.SphereGeometry(radius, 64, 64);
  const earthMaterial = new THREE.ShaderMaterial({
    fragmentShader: earthFragmentShader,
    vertexShader: earthVertexShader,
    depthWrite: true,
    transparent: true,
    depthTest: true,
    lights: true,
    uniforms: {
      ...THREE.UniformsLib['lights'],
      map: {
        value: null,
      },
      uHeight: {
        value: 0,
      },
      uOpacity: {
        value: 1,
      },
      uScrollTop: {
        value: 0,
      },
    },
  });

  getEarthTexture().then((texture) => {
    earthMaterial.uniforms.map.value = texture;
    // earthMaterial.map = texture;
    onReady();
  });
  // getImageBitmapTexture("/texture/2k_earth_specular_map.png").then(texture => {
  //   earthMaterial.specularMap = texture;
  // });
  const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
  // earthMesh.rotateX(-0.4);
  earthMesh.rotateY(2.4);

  return earthMesh;
}

export interface EarthProps {
  useScroll?: boolean;
  offset?: number;
  scaleOffset?: number;
  onReady?: () => void;
}
export const Earth = (props: EarthProps) => {
  const earthRef = useRef<THREE.Mesh>();
  const atmosphereRef = useRef<THREE.Mesh>();
  const [isReady, setReady] = useState(false);
  const threeCanvasRef = useRef<ThreeCanvasObject>(null);

  useEffect(() => {
    const scene = threeCanvasRef.current!.sceneRef.current!;

    // scene.fog = new THREE.FogExp2( 0x000000, 0.001 );
    const atmosphereMesh = getAtmosphereMesh(0.9);
    const earthMesh = getEarthMesh(0.9, () => {
      setReady(true);
      props.onReady?.();
    });

    earthRef.current = earthMesh;
    atmosphereRef.current = atmosphereMesh;

    earthMesh.position.set(0, -1.25, 0);
    atmosphereMesh.position.set(0, -1.25, 0.1);

    earthMesh.rotateOnAxis(new THREE.Vector3(1, 2, -1), 0.1);

    earthMesh.scale.set(1, 1, 1);
    atmosphereMesh.scale.set(1.1, 1.1, 1.1);

    scene.add(atmosphereMesh);
    scene.add(earthMesh);
    const offset = props.offset || 0;
    const item = new SceneItem(
      {
        0: {
          pos: -1.25,
          uOpacity: 1,
          scale: 1,
        },
        10: {
          pos: -0.5,
          uOpacity: 0,
          scale: 1.3,
        },
      },
      {
        easing: 'ease-out',
        iterationCount: 'infinite',
      }
    ).on('animate', ({ frame }) => {
      const { uOpacity, scale, pos } = frame.get();

      const nextScale = scale + (props.scaleOffset || 0);
      earthMesh.scale.set(nextScale, nextScale, nextScale);
      atmosphereMesh.scale.set(
        nextScale * 1.1,
        nextScale * 1.1,
        nextScale * 1.1
      );
      (earthMesh.material as THREE.ShaderMaterial).uniforms.uOpacity.value =
        uOpacity;
      (
        atmosphereMesh.material as THREE.ShaderMaterial
      ).uniforms.uOpacity.value = uOpacity;
      earthMesh.position.set(0, pos + offset, 0);
      atmosphereMesh.position.set(0, pos + offset, 0.1);
    });

    item.setTime(0);
    if (props.useScroll) {
      const onScroll = () => {
        const height = threeCanvasRef.current.sizeRef.current.height;
        const scrollTop = document.documentElement.scrollTop;
        item.setTime((scrollTop / height) * 10);
        (earthMesh.material as THREE.ShaderMaterial).uniforms.uScrollTop.value =
          scrollTop;
        (
          atmosphereMesh.material as THREE.ShaderMaterial
        ).uniforms.uScrollTop.value = scrollTop;
      };
      window.addEventListener('scroll', onScroll, { passive: true });

      return () => {
        window.removeEventListener('scroll', onScroll);
      };
    }
  }, []);

  return (
    <ThreeCanvas
      ref={threeCanvasRef}
      render={isReady}
      onRender={() => {
        if (!earthRef.current) {
          return;
        }
        earthRef.current!.rotateOnAxis(new THREE.Vector3(1, 2, 0), 0.0003);

        const height = threeCanvasRef.current.sizeRef.current.height;
        (earthRef.current!.material as any).uniforms.uHeight.value = height;
        (atmosphereRef.current!.material as any).uniforms.uHeight.value =
          height;
        // cloudRef.current!.rotateOnAxis(new THREE.Vector3(1, 2, -1), 0.0003);
      }}
    ></ThreeCanvas>
  );
};
