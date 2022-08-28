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
import { MeshLine, MeshLineMaterial } from 'three.meshline';
import createGradientTexture from '~/views/pages/HomePage/sections/WarpSection/resources/createGradientTexture';
import { times } from 'lodash';
import { Power1 } from 'gsap';
import { requestAnimationFrame } from '@daybrush/utils';
import { mobile } from '~/views/pages/HomePage/styles/media-query';

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

  const points = shape.getPoints();
  const bufferGeometry = new BufferGeometry().setFromPoints(points);
  bufferGeometry.center();
  const texture = new CanvasTexture(createGradientTexture());
  const material = new MeshLineMaterial({
    useMap: true,
    map: texture,
    side: DoubleSide,
    lineWidth: 0.02,
  });

  const lineStandZ = 0;
  const lineTargetZ = 25;
  const lineCount = 15;
  const lineStep = 1;
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
  const camera = new PerspectiveCamera(75, size.width / size.height, 0.1, 50);
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 25;
  scene.add(camera);

  const animationList = lineList.map((line, index) => {
    const order = lineCount - index;
    const animation = {
      delay: index / lineList.length + 1,
      duration: 4,
      ease: Power1.easeIn,
      originalPositionZ: line.position.z,
      originalRotationZ: line.rotation.z,
      targetPositionZ: lineTargetZ + order * lineStep,
      targetRotationZ: line.rotation.z + Math.PI / 2,
    };
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
    duration = Math.min(Math.max((duration - 0.1) / 0.8, 0), 1);
    const shouldRender = duration !== 0;
    animationList.forEach((animation, index) => {
      const line = lineList[index];
      if (shouldRender) {
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
        line.position.z = originalPositionZ + posZ;
        line.rotation.z = targetRotationZ + rotZ;
      }
      line.material.transparent = true;
      line.material.opacity = shouldRender ? line.position.z / 15 : 0;
    });
    renderer.render(scene, camera);
  };
}

function showTitle(title: HTMLHeadingElement) {
  title.style.opacity = '1';
  title.style.transform = 'scale(1)';
  title.style.transition =
    'opacity 400ms 300ms ease-out, transform 400ms 300ms ease-out';
}

function hideTitle(title: HTMLHeadingElement, isBehind: boolean) {
  if (isBehind) {
    title.style.transform = 'scale(0.5)';
    title.style.transition = 'opacity 100ms ease-out, transform 100ms ease-out';
  } else {
    title.style.transform = 'scale(1.5)';
    title.style.transition = 'opacity 600ms ease-out, transform 600ms ease-out';
  }
  title.style.opacity = '0';
}

const useScrollEffect = () => {
  const titleEl = useRef<HTMLHeadingElement>();
  const canvasEl = useRef<HTMLCanvasElement>();
  const containerEl = useRef<HTMLDivElement>();
  useEffect(() => {
    const render = init(canvasEl.current);
    let latestCall = null;
    const tick = () => {
      const rect = containerEl.current.getBoundingClientRect();
      const { top: containerTop, height: containerHeight } = rect;
      const windowHeight = window.innerHeight;
      let duration = 0;

      // TODO: 리팩터링 예정
      if (containerTop <= windowHeight) {
        const top = containerTop - windowHeight;
        duration = Math.min(top / -containerHeight, 1);

        if (duration <= 0) {
          hideTitle(titleEl.current, true);
          canvasEl.current.style.opacity = '0';
        } else if (duration > 0 && duration <= 0.2) {
          showTitle(titleEl.current);
          canvasEl.current.style.opacity = '0';
        } else if (duration > 0.2) {
          hideTitle(titleEl.current, false);
          canvasEl.current.style.opacity = '1';
        }

        if (containerTop > 0) {
          // After start animation
          canvasEl.current.style.position = 'absolute';
          canvasEl.current.style.top = '0px';
          canvasEl.current.style.bottom = 'auto';
        } else if (top < -containerHeight) {
          // After end animation
          canvasEl.current.style.position = 'absolute';
          canvasEl.current.style.top = 'auto';
          canvasEl.current.style.bottom = '0px';
        } else {
          // During animation
          canvasEl.current.style.position = 'fixed';
          canvasEl.current.style.top = '0px';
          canvasEl.current.style.bottom = 'auto';
        }
      } else {
        duration = 0;
        hideTitle(titleEl.current, true);
        canvasEl.current.style.opacity = '0';
      }
      render(duration);
    };
    const onScroll = () => {
      latestCall = tick;
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
  return {
    containerEl,
    titleEl,
    canvasEl,
  };
};

const WarpScene: FC = () => {
  const { containerEl, titleEl, canvasEl } = useScrollEffect();
  return (
    <Container ref={containerEl}>
      <Title ref={titleEl}>
        프론트엔드 엔지니어의
        <br />
        다양한 도전과 경험
      </Title>
      <canvas ref={canvasEl} />
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  canvas {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
  }
`;

const Title = styled.h2`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 80px;
  font-weight: 700;
  line-height: 1.3;
  color: white;
  text-align: center;
  opacity: 0;
  transform: scale(0.5);
  z-index: 1;
  pointer-events: none;
  ${mobile`
    font-size: 28px;
  `}
`;

export default WarpScene;
