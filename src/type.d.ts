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
  }
}
