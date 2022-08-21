import { FC, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import {
  BufferGeometry,
  CanvasTexture,
  DoubleSide,
  Mesh,
  PerspectiveCamera,
  Scene,
  Shape,
  WebGLRenderer,
} from 'three';
import { times } from 'lodash';
import { gsap, Power1 } from 'gsap';
import { MeshLine, MeshLineMaterial } from 'three.meshline';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { requestAnimationFrame } from '@daybrush/utils';

function generateTexture() {
  const size = 512;

  // create canvas
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;

  // get context
  const context = canvas.getContext('2d');

  // draw gradient
  context.rect(0, 0, size, size);
  const gradient = context.createLinearGradient(0, 0, size, 0);
  const violet = '#8F5FE7';
  const blue = '#304AB7';
  gradient.addColorStop(0, violet);
  gradient.addColorStop(0.25, violet);
  gradient.addColorStop(0.4, blue);
  gradient.addColorStop(0.75, blue);
  gradient.addColorStop(0.95, violet);
  context.fillStyle = gradient;
  context.fill();

  // document.body.appendChild(canvas);
  // canvas.style.position = 'absolute';
  // canvas.style.left = '0px';
  // canvas.style.top = '0px';

  return canvas;
}

function init(canvas: HTMLCanvasElement) {
  const shapeLength = 1;
  const shape = new Shape();
  const shapePoints = {
    startX: 0,
    startY: 0,
    width: shapeLength,
    height: shapeLength,
    radius: 0.0,
  };

  shape
    .moveTo(shapePoints.startX, shapePoints.startY)
    .lineTo(shapePoints.startX, shapePoints.startX + shapePoints.width)
    .lineTo(
      shapePoints.startX + shapePoints.width,
      shapePoints.startY + shapePoints.height
    )
    .lineTo(shapePoints.startY + shapePoints.height, shapePoints.startX)
    .lineTo(shapePoints.startX, shapePoints.startY);

  // shape
  //   .moveTo(shapePoints.startX, shapePoints.startY + shapePoints.radius)
  //   .lineTo(
  //     shapePoints.startX,
  //     shapePoints.startY + shapePoints.height - shapePoints.radius
  //   )
  //   .quadraticCurveTo(
  //     shapePoints.startX,
  //     shapePoints.startY + shapePoints.height,
  //     shapePoints.startX + shapePoints.radius,
  //     shapePoints.startY + shapePoints.height
  //   )
  //   .lineTo(
  //     shapePoints.startX + shapePoints.width - shapePoints.radius,
  //     shapePoints.startY + shapePoints.height
  //   )
  //   .quadraticCurveTo(
  //     shapePoints.startX + shapePoints.width,
  //     shapePoints.startY + shapePoints.height,
  //     shapePoints.startX + shapePoints.width,
  //     shapePoints.startY + shapePoints.height - shapePoints.radius
  //   )
  //   .lineTo(
  //     shapePoints.startX + shapePoints.width,
  //     shapePoints.startY + shapePoints.radius
  //   )
  //   .quadraticCurveTo(
  //     shapePoints.startX + shapePoints.width,
  //     shapePoints.startY,
  //     shapePoints.startX + shapePoints.width - shapePoints.radius,
  //     shapePoints.startY
  //   )
  //   .lineTo(shapePoints.startX + shapePoints.radius, shapePoints.startY)
  //   .quadraticCurveTo(
  //     shapePoints.startX,
  //     shapePoints.startY,
  //     shapePoints.startX,
  //     shapePoints.startY + shapePoints.radius
  //   );

  const points = shape.getPoints();
  const bufferGeometry = new BufferGeometry().setFromPoints(points);
  bufferGeometry.center();
  const texture = new CanvasTexture(generateTexture());
  const material = new MeshLineMaterial({
    useMap: true,
    map: texture,
    side: DoubleSide,
    lineWidth: 0.02,
  });

  const lineStandZ = 0;
  const lineCount = 10;
  const lineStep = 0.5;
  const lineList = times(lineCount, (index) => {
    const line = new MeshLine();
    line.setGeometry(bufferGeometry);
    const mesh = new Mesh(line, material);
    const order = lineCount - index;
    mesh.position.setZ(lineStandZ + order * lineStep);
    mesh.rotation.set(0, 0, (Math.PI / 60) * order);
    return mesh;
  });

  const size = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
  const scene = new Scene();

  lineList.forEach((line) => scene.add(line));

  /**
   * Camera
   */
  const camera = new PerspectiveCamera(75, size.width / size.height, 0.1, 100);
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 25;
  scene.add(camera);

  const animationList = lineList.map((line, index) => {
    const animation = {
      delay: index / lineList.length + 0.05,
      duration: 4,
      ease: Power1.easeIn,
      originalPositionZ: line.position.z,
      originalRotationZ: line.rotation.z,
      targetPositionZ: line.position.z + 25,
      targetRotationZ: line.rotation.z + Math.PI / 2,
    };
    // gsap.to(line.position, {
    //   ...animation,
    //   z: line.position.z + 25,
    // });
    // gsap.to(line.rotation, {
    //   ...animation,
    //   z: line.rotation.z + Math.PI / 2,
    // });
    return animation;
  });

  /**
   * Renderer
   */
  // new OrbitControls(camera, canvas).enableDamping = true;
  const renderer = new WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(size.width, size.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  return (duration: number) => {
    animationList.forEach((animation, index) => {
      const line = lineList[index];
      const {
        delay,
        duration: dur,
        ease,
        originalPositionZ,
        originalRotationZ,
        targetPositionZ,
        targetRotationZ,
      } = animation;
      const delayRatio = delay / dur;
      const delayedDuration = ease(Math.max(duration + delayRatio, 0));
      const posZ = (targetPositionZ - originalPositionZ) * delayedDuration;
      const rotZ = (targetRotationZ - originalRotationZ) * delayedDuration;
      line.position.z = posZ;
      line.rotation.z = rotZ;
    });
    renderer.render(scene, camera);
  };
}

const WarpSection: FC = () => {
  const containerEl = useRef<HTMLDivElement>();
  const canvasEl = useRef<HTMLCanvasElement>();
  useEffect(() => {
    const render = init(canvasEl.current);
    let latestCall = null;
    const onScroll = () => {
      latestCall = () => {
        const rect = containerEl.current.getBoundingClientRect();
        const rectTop = rect.top;
        const windowHeight = window.innerHeight;
        const height = 10000;
        let duration = 0;
        if (rectTop <= windowHeight) {
          const top = rectTop - windowHeight;
          duration = Math.min(top / -height, 2);
          if (top < -height) {
            canvasEl.current.style.position = 'absolute';
            canvasEl.current.style.top = 'auto';
            canvasEl.current.style.bottom = '0px';
          } else if (rectTop > 0) {
            canvasEl.current.style.position = 'absolute';
            canvasEl.current.style.top = '0px';
            canvasEl.current.style.bottom = 'auto';
          } else {
            canvasEl.current.style.position = 'fixed';
            canvasEl.current.style.top = '0px';
            canvasEl.current.style.bottom = 'auto';
          }
        } else {
          duration = 0;
          canvasEl.current.style.position = 'absolute';
          canvasEl.current.style.top = '0px';
          canvasEl.current.style.bottom = '0px';
        }
        render(duration);
      };
      requestAnimationFrame(() => {
        latestCall?.();
        latestCall = null;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      latestCall = null;
      window.removeEventListener('scroll', onScroll);
    };
  }, []);
  return (
    <Container ref={containerEl}>
      <canvas ref={canvasEl} />
    </Container>
  );
};

const Container = styled.section`
  position: relative;
  height: 10000px;

  canvas {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
`;

export default WarpSection;
