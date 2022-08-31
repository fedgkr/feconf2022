import clamp from 'lodash/clamp';
import gt from 'lodash/gt';
import eq from 'lodash/eq';

function animateText(
  title: HTMLHeadingElement,
  containerTop: number,
  windowHeight: number
) {
  const windowHeightHalf = windowHeight / 2;
  const textLen = windowHeight + windowHeightHalf;
  const textTop = -(containerTop - windowHeightHalf);
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

export default animateText;
