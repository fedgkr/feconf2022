const getMotionData = (container: HTMLDivElement): MotionData => {
  const { top, height } = container.getBoundingClientRect();
  return {
    height: window.innerHeight,
    current: top,
    distance: height,
  };
};

export default getMotionData;
