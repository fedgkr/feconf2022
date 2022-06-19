import { useRef } from "react";

const useFadeInOutAnimation = ({ visible, out, direction }: SectionState) => {
  const styles = useRef({ opacity: 0, scale: 0, transition: ' ' });
  if (visible) {
    styles.current.opacity = 1;
    styles.current.scale = 1;
    styles.current.transition = 'opacity 600ms 300ms, transform 600ms 300ms';
  } else if (out) {
    styles.current.opacity = 0;
    styles.current.transition = 'opacity 400ms, transform 400ms';
    if (direction === 'down') {
      styles.current.scale = 2;
    }
    if (direction === 'up') {
      styles.current.scale = 0;
    }
  }
  return styles.current;
};

export default useFadeInOutAnimation;
