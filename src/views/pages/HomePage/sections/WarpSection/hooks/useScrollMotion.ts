import { useContext, useEffect, useRef } from 'react';
import clamp from 'lodash/clamp';
import gte from 'lodash/gte';

import animateText from '../utils/animateText';
import BackgroundContext from '../contexts/BackgroundContext';
import WarpMotionScene from '../utils/WarpMotionScene';
import WarpRenderer from '../utils/WarpRenderer';
import WarpMotion from '../utils/WarpMotion';

function init(canvas: HTMLCanvasElement) {
  const windowSize = (): WindowDimension => ({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const scene = new WarpMotionScene();
  const renderer = new WarpRenderer(canvas, scene, windowSize());
  const motion = new WarpMotion(scene);

  function onResize() {
    renderer.resize(windowSize());
    renderer.render();
  }
  window.addEventListener('resize', onResize, { passive: true });

  return (duration: number, onUpdateStage: (val: boolean) => void) => {
    duration = clamp((duration - 0.1) / 0.9, 0, 1);
    onUpdateStage(gte(duration, 0.94));
    motion.run(duration);
    renderer.render();
  };
}

const onFrame = (
  container: HTMLDivElement,
  title: HTMLHeadingElement,
  canvas: HTMLCanvasElement,
  render: ReturnType<typeof init>,
  setActive: (val: boolean) => void
) => {
  const windowHeight = window.innerHeight;
  const { top: containerTop, height: containerHeight } =
    container.getBoundingClientRect();
  animateText(title, containerTop, windowHeight);
  if (containerTop > 0) {
    prepareAnimation(canvas);
  } else {
    animate(canvas);
  }

  const top = containerTop - windowHeight;
  const duration = Math.min(top / -containerHeight, 1);
  render(duration, setActive);
};

function prepareAnimation(canvas: HTMLCanvasElement) {
  canvas.style.position = 'absolute';
  canvas.style.top = '0px';
  canvas.style.bottom = 'auto';
  canvas.style.opacity = '0';
}

function animate(canvas: HTMLCanvasElement) {
  canvas.style.position = 'fixed';
  canvas.style.top = '0px';
  canvas.style.bottom = 'auto';
  canvas.style.opacity = '1';
}

const useScrollMotion = () => {
  const { setActive } = useContext(BackgroundContext);
  const titleEl = useRef<HTMLHeadingElement>();
  const canvasEl = useRef<HTMLCanvasElement>();
  const containerEl = useRef<HTMLDivElement>();

  useEffect(() => {
    const render = init(canvasEl.current);
    let tick = null;

    const onScroll = () => {
      tick = () =>
        onFrame(
          containerEl.current,
          titleEl.current,
          canvasEl.current,
          render,
          setActive
        );
      requestAnimationFrame(() => {
        if (tick) {
          tick();
          tick = null;
        }
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      tick = null;
      window.removeEventListener('scroll', onScroll);
    };
  }, []);
  return {
    containerEl,
    titleEl,
    canvasEl,
  };
};

export default useScrollMotion;
