import {FC, useRef} from "react";
import {useIntersectionObserver} from 'usehooks-ts';
import styled from '@emotion/styled';
import {getStyle} from "~/views/ComingSoonPage/components/HeroSection";

const CallForSponsorSection: FC = () => {
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
          <h2>
            컨퍼런스를 함께 만들어갈<br/>
            후원사를 모집해요.
          </h2>
          <p>후원을 통해 함께 프론트엔드 개발 문화를 만들고, <br/>
            기업 홍보 및 채용 활동을 계획해보세요!</p>
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
  transform: scale(${({isVisible}) => isVisible ? 1 : 0.8});
  transition: ${({isVisible}) => isVisible ? 1 : 0};

  h2 {
    font-weight: 700;
    font-size: 60px;
    line-height: 130%;
    color: #FFFFFF;
  }
  p {
    width: 468px;
    margin: 24px auto 0 auto;
    color: #C8CCD5;
    font-size: 24px;
    line-height: 1.6;
    opacity: 0.9;
  }
`;

export default CallForSponsorSection;
