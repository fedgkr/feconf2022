import clamp from 'lodash/clamp';
import gt from 'lodash/gt';
import eq from 'lodash/eq';

function animateTitle(title: HTMLHeadingElement, motionData: MotionData) {
  const windowHeightHalf = motionData.height / 2;
  const textLen = motionData.height + windowHeightHalf;
  const textTop = -(motionData.current - windowHeightHalf);
  const duration = clamp(textTop / textLen, 0, 1);
  const tailMotionStart = 0.85;

  title.style.transform = `scale(${1 + 0.2 * duration})`;

  if (eq(duration, 0)) {
    title.style.opacity = '0';
    return;
  }
  if (gt(duration, tailMotionStart)) {
    const tailMotionDuration =
      (duration - tailMotionStart) / (1 - tailMotionStart);
    const tailMotionOpacity = 1 - tailMotionDuration;
    title.style.opacity = `${tailMotionOpacity}`;
  } else {
    title.style.opacity = `${gt(duration, 1) ? 0 : 1}`;
  }
}

export default animateTitle;
