import { useContext, useEffect, useRef } from 'react';

import animateText from '../utils/animateText';
import BackgroundContext from '../contexts/BackgroundContext';
import Warp from '~/views/pages/HomePage/sections/WarpSection/utils/Warp';

interface Refs {
  container: HTMLDivElement;
  title: HTMLHeadingElement;
  canvas: HTMLCanvasElement;
}

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

const onFrame = (
  { container, title, canvas }: Refs,
  warp: Warp,
  setActive: (val: boolean) => void
) => {
  const windowHeight = window.innerHeight;
  const { top, height } = container.getBoundingClientRect();
  animateText(title, top, windowHeight);
  if (top > 0) {
    prepareAnimation(canvas);
  } else {
    animate(canvas);
  }

  const cursor = top - windowHeight;
  const duration = Math.min(cursor / -height, 1);
  warp.run(duration, setActive);
};

const useScrollMotion = () => {
  const { setActive } = useContext(BackgroundContext);
  const titleEl = useRef<HTMLHeadingElement>();
  const canvasEl = useRef<HTMLCanvasElement>();
  const containerEl = useRef<HTMLDivElement>();

  useEffect(() => {
    const warp = new Warp(canvasEl.current);
    const refs = {
      container: containerEl.current,
      title: titleEl.current,
      canvas: canvasEl.current,
    };
    let tick = null;
    const frame = () => onFrame(refs, warp, setActive);
    const cb = () => {
      if (tick) {
        tick();
        tick = null;
      }
    };
    const onScroll = () => {
      tick = frame;
      requestAnimationFrame(cb);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      tick = null;
      window.removeEventListener('scroll', onScroll);
      warp.removeResizeHandler();
    };
  }, []);
  return {
    containerEl,
    titleEl,
    canvasEl,
  };
};

export default useScrollMotion;
