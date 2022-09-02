declare module '*.glsl';

interface SectionState {
  visible: boolean;
  out: boolean;
  direction: 'up' | 'down';
}

interface Window {
  fullpage_api: {
    moveTo: (target: number) => void;
    silentMoveTo: (target: number) => void;
  };
}

interface WindowDimension {
  width: number;
  height: number;
}

interface MotionData {
  height: number;
  current: number;
  distance: number;
}
