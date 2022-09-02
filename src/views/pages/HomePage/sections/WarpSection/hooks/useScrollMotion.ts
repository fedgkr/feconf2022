import { useContext, useEffect, useRef } from 'react';

import animateText from '../utils/animateText';
import BackgroundContext from '../contexts/BackgroundContext';
import Warp from '~/views/pages/HomePage/sections/WarpSection/utils/Warp';
import usePrefersReducedMotion from '~/hoooks/usePrefersReducedMotion';
import { useIntersection } from 'use-intersection';
import gt from 'lodash/gt';

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

function endAnimation(canvas: HTMLCanvasElement) {
  canvas.style.position = 'absolute';
  canvas.style.top = 'auto';
  canvas.style.bottom = '0';
  canvas.style.opacity = '0';
}

const onFrame = (
  { container, title, canvas }: Refs,
  warp: Warp,
  reduced: boolean,
  setActive: (val: boolean) => void
) => {
  const windowHeight = window.innerHeight;
  const { top, height } = container.getBoundingClientRect();
  animateText(title, top, windowHeight);
  if (gt(top, 0)) {
    prepareAnimation(canvas);
  } else if (gt(-top, height)) {
    endAnimation(canvas);
  } else {
    animate(canvas);
  }

  const cursor = top - windowHeight;
  const duration = reduced ? 0.5 : Math.min(cursor / -height, 1);
  warp.run(duration, setActive);
};

const useScrollMotion = () => {
  const { setActive } = useContext(BackgroundContext);
  const titleEl = useRef<HTMLHeadingElement>();
  const canvasEl = useRef<HTMLCanvasElement>();
  const containerEl = useRef<HTMLDivElement>();
  const intersected = useIntersection(containerEl);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const warp = new Warp(canvasEl.current);
    const refs = {
      container: containerEl.current,
      title: titleEl.current,
      canvas: canvasEl.current,
    };
    let tick = null;
    const frame = () => onFrame(refs, warp, reduced, setActive);
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

    if (intersected) {
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    return () => {
      tick = null;
      window.removeEventListener('scroll', onScroll);
      warp.removeResizeHandler();
    };
  }, [intersected, reduced]);
  return {
    containerEl,
    titleEl,
    canvasEl,
  };
};

export default useScrollMotion;
