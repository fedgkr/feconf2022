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

  gtag: (
    target: string,
    eventName: string,
    data: { event_category: string; event_label: string }
  ) => void;
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
