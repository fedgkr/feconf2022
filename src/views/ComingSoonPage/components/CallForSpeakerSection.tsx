import {FC, useRef} from "react";
import styled from '@emotion/styled';
import ApplyButton from "~/views/components/ApplyButton";
import Portal from "~/views/components/Portal";
import {useHandleAnimation} from "~/views/ComingSoonPage/components/HeroSection";

interface Props {
  in: boolean;
  out: boolean;
  direction: 'up' | 'down';
}

const CallForSpeakerSection: FC<Props> = (props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { opacity, scale, transition } = useHandleAnimation(props);
  return (
    <Container ref={ref} className="section">
      <Portal>
        <FixedWrap>
          <TextWrap style={{ opacity, transform: `scale(${scale})`, transition }}>
            <h2>
              FEConf 22를 함께 빛낼 <br/>
              스피커를 모집해요
            </h2>
            <p>당신의 멋진 스토리를 공유하고, 함께 빛내요.</p>
            <ApplyButton href="#">스피커 신청하기</ApplyButton>
          </TextWrap>
        </FixedWrap>
      </Portal>
    </Container>
  );
};

const Container = styled.section`
`;

const FixedWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TextWrap = styled.div`
  width: 100%;
  text-align: center;
  opacity: 1;
  transform: scale(1);

  h2 {
    font-weight: 700;
    font-size: 60px;
    line-height: 130%;
    color: #FFFFFF;
  }
  p {
    width: 468px;
    margin: 24px auto 48px auto;
    color: #C8CCD5;
    font-size: 24px;
    line-height: 1.6;
    opacity: 0.9;
  }
`;

export default CallForSpeakerSection;
