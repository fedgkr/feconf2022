import {FC, useRef, CSSProperties} from "react";
import {useIntersectionObserver} from 'usehooks-ts';
import styled from '@emotion/styled';

export const styles: Record<string, CSSProperties> = {
  fadeUpOut: {
    opacity: 0,
    transform: 'scale(3.0)',
    transition: 'all 800ms ease-out',
  },
  fadeUpIn: {
    opacity: 1,
    transform: 'scale(1.0)',
    transition: 'opacity 1200ms ease-out 900ms, transform 1200ms ease-out 900ms'
  },
  fadeDownOut: {
    opacity: 0,
    transform: 'scale(0.2)',
    transition: 'all 800ms ease-in'
  },
  fadeDownIn: {
    opacity: 1,
    transform: 'scale(1.0)',
    transition: 'opacity 1200ms ease-out 900ms, transform 1200ms ease-out 900ms'
  },
};

export const getStyle = (isVisible: boolean, fadeUpOut: boolean, fadeUpIn: boolean, fadeDownIn: boolean, fadeDownOut: boolean) => {
  let animation: keyof typeof styles;
  if (fadeUpOut) {
    animation = 'fadeUpOut';
  } else if (fadeUpIn) {
    animation = 'fadeUpIn';
  } else if (fadeDownIn) {
    animation = 'fadeDownIn';
  } else if (fadeDownOut) {
    animation = 'fadeDownOut';
  }
  return styles[animation];
}

const HeroSection: FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, {
    rootMargin: "0px",
    threshold: 0.25
  });
  const isVisible = !!entry?.isIntersecting;
  const fadeUpOut = !isVisible && entry?.boundingClientRect?.y < 0;
  const fadeUpIn = isVisible && entry?.boundingClientRect?.y > 0;
  const fadeDownIn = isVisible && entry?.boundingClientRect?.y < 0;
  const fadeDownOut = !isVisible && entry?.boundingClientRect?.y < entry?.rootBounds.height;
  const css = getStyle(isVisible, fadeUpOut, fadeUpIn, fadeDownIn, fadeDownOut);
  return (
    <Container ref={ref} className="section">
      <FixedWrap>
        <TextWrap isVisible={isVisible} style={{...css}}>
          <h3>Explore the forefront of FE dev</h3>
          <h2>FECONF.22</h2>
        </TextWrap>
      </FixedWrap>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  scroll-snap-align: center;
  background-color: black;
`;

const FixedWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`;

const TextWrap = styled.div<{ isVisible: boolean }>`
  width: 100%;
  text-align: center;
  opacity: ${({isVisible}) => isVisible ? 1 : 0};
  transform: scale(1);

  h3 {
    font-size: 24px;
    color: #D7DCE5;
  }

  h2 {
    font-size: 84px;
    font-weight: 900;
    color: white;
  }
`;

export default HeroSection;

