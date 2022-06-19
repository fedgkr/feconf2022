import {FC, useRef} from "react";
import styled from '@emotion/styled';
import ApplyButton from "~/views/components/ApplyButton";
import Portal from "~/views/components/Portal";
import useFadeInOutAnimation from "~/views/ComingSoonPage/hooks/useFadeInOutAnimation";
import SectionContainer from "~/views/ComingSoonPage/components/SectionContainer";
import Center from "~/views/ComingSoonPage/components/Center";

interface Props {
  state: SectionState;
}

const CallForSpeakerSection: FC<Props> = ({ state }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { opacity, scale, transition } = useFadeInOutAnimation(state);
  return (
    <SectionContainer ref={ref}>
      <Center visible={state.visible}>
        <TextWrap style={{ opacity, transform: `scale(${scale})`, transition }}>
          <h2>
            꾸준 성장하는 <br/>
            당신이 올해의 주인공.
          </h2>
          <p>
            FECONF 2022의 스피커가 되어 <br/>
            당신의 멋진 스토리를 공유해주세요.
          </p>
          <ApplyButton href="#">스피커 신청하기</ApplyButton>
        </TextWrap>
      </Center>
    </SectionContainer>
  );
};

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
