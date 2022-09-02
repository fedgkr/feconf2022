import { MutableRefObject, useContext, useEffect } from 'react';

import BackgroundContext from '~/views/pages/HomePage/sections/WarpSection/contexts/BackgroundContext';

import MotionPlayer from '../motions/MotionPlayer';
import animateTitle from '../motions/fn/animateTitle';
import placeCanvas from '../motions/fn/placeCanvas';
import getMotionData from '../motions/fn/getMotionData';
import gt from 'lodash/gt';

interface ElementRefs {
  container: MutableRefObject<HTMLDivElement>;
  title: MutableRefObject<HTMLHeadingElement>;
  canvas: MutableRefObject<HTMLCanvasElement>;
}

interface Options {
  intersected: boolean;
  reduced: boolean;
}

let tick;
const cb = () => (tick = tick?.());
const player = new MotionPlayer();

const handleTransitionSection = (
  { current, distance, height }: MotionData,
  onHandleTransitionSection: (val: boolean) => void
) => {
  onHandleTransitionSection(gt(height, current + distance));
};

const handleFrame = (
  elements: ElementRefs,
  reduced: boolean,
  onHandleTransitionSection: (val: boolean) => void
) => {
  const motionData = getMotionData(elements.container.current);
  handleTransitionSection(motionData, onHandleTransitionSection);
  animateTitle(elements.title.current, motionData);
  placeCanvas(elements.canvas.current, motionData, reduced);
  player.run(motionData, reduced);
};

const usePrepareMotion = (canvas: ElementRefs['canvas']) => {
  useEffect(() => {
    player.prepare(canvas.current);
    player.addResizeHandler();
    return () => {
      player.removeResizeHandler();
    };
  }, []);
};

const useHandleInteraction = (
  elements: ElementRefs,
  { intersected, reduced }: Options
) => {
  const { setActive: handleTransitionSection } = useContext(BackgroundContext);
  useEffect(() => {
    if (!intersected) {
      return;
    }
    const handleScroll = () => {
      tick = () => handleFrame(elements, reduced, handleTransitionSection);
      requestAnimationFrame(cb);
    };
    handleScroll();
    player.addResizeHandler();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      player.removeResizeHandler();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [intersected, reduced]);
};

const useHandleMotion = (elements: ElementRefs, options: Options) => {
  usePrepareMotion(elements.canvas);
  useHandleInteraction(elements, options);
};

export default useHandleMotion;
