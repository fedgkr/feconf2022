import clamp from 'lodash/clamp';

function animateText(
  title: HTMLHeadingElement,
  containerTop: number,
  windowHeight: number
) {
  const windowHeightHalf = windowHeight / 2;
  const textLen = windowHeight + windowHeightHalf;
  const textTop = -(containerTop - windowHeightHalf);
  const duration = clamp(textTop / textLen, 0, 1);

  title.style.transform = `scale(${1 + 0.2 * duration})`;
  if (duration === 0) {
    title.style.opacity = '0';
  } else {
    title.style.opacity = duration < 1 ? '1' : '0';
  }
}

export default animateText;
