import {FC, useRef} from "react";
import { useIntersectionObserver } from 'usehooks-ts';
import styled from '@emotion/styled';
import {getStyle} from "~/views/ComingSoonPage/components/HeroSection";

const IntroSection: FC = () => {
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
        <TextWrap isVisible={isVisible} style={{ ...css }}>
          <p>
            국내 최대 규모 프론트엔드 개발 컨퍼런스 FEConf 엔지니어들의 다양한 도전과 경험을 공유합니다.
            새로운 기술을 익히고 함께 성장해요.
          </p>
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
  background-color: #393939;
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
  opacity: ${({ isVisible }) => isVisible ? 1 : 0};
  transform: scale(${({ isVisible }) => isVisible ? 1 : 0.8});
  transition: ${({ isVisible }) => isVisible ? 1 : 0};
  p {
    width: 468px;
    margin: 0 auto;
    color: #C8CCD5;
    font-size: 24px;
    line-height: 1.6;
    opacity: 0.9;
  }
`;

export default IntroSection;
