import gt from 'lodash/gt';
import clamp from 'lodash/clamp';

type Status = 'prepare' | 'ongoing' | 'end';
type Method = (canvas: HTMLCanvasElement) => void;

const prepare: Method = (canvas) => {
  canvas.style.position = 'absolute';
  canvas.style.top = '0px';
  canvas.style.bottom = 'auto';
  canvas.style.opacity = '0';
};

const ongoing: Method = (canvas) => {
  canvas.style.position = 'fixed';
  canvas.style.top = '0px';
  canvas.style.bottom = 'auto';
  canvas.style.opacity = '1';
};

const end: Method = (canvas) => {
  canvas.style.position = 'absolute';
  canvas.style.top = 'auto';
  canvas.style.bottom = '0';
  canvas.style.opacity = '0';
};

const reduceMotion = (
  canvas: HTMLCanvasElement,
  { current, distance }: MotionData
) => {
  const topRatio = -current / distance;
  const opacity = clamp((topRatio > 0.5 ? 1 - topRatio : topRatio) * 2, 0, 1);
  canvas.style.opacity = `${opacity}`;
};

let prevStatus: Status;

const methods: Record<Status, Method> = {
  prepare,
  ongoing,
  end,
};

const getMotionPlayStatus = ({ current, distance }: MotionData): Status => {
  if (gt(current, 0)) {
    return 'prepare';
  } else if (gt(-current, distance)) {
    return 'end';
  }
  return 'ongoing';
};

const placeCanvas = (
  canvas: HTMLCanvasElement,
  motionData: MotionData,
  reduced: boolean
) => {
  const status = getMotionPlayStatus(motionData);
  if (status === prevStatus) {
    return;
  }
  prevStatus = status;
  methods[status](canvas);
  if (reduced) {
    reduceMotion(canvas, motionData);
  }
};

export default placeCanvas;
