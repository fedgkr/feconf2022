import {FC, useRef} from "react";
import styled from '@emotion/styled';
import ApplyButton from "~/views/components/ApplyButton";
import useFadeInOutAnimation from "~/views/ComingSoonPage/hooks/useFadeInOutAnimation";
import SectionContainer from "~/views/ComingSoonPage/components/SectionContainer";
import Center from "~/views/ComingSoonPage/components/Center";
import {tablet} from "~/views/ComingSoonPage/styles/media-query";
import {SPEAKER_FORM} from "~/views/ComingSoonPage/data/meta";
import CircleIcon from "~/views/ComingSoonPage/components/CircleIcon";

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
            꾸준히 성장하는 <br/>
            당신이 올해의 <span>주인공<CircleIcon visible={state.visible}/></span>.
          </h2>
          <p>
            FECONF 2022의 스피커가 되어 <br/>
            당신의 멋진 경험을 공유해주세요.
          </p>
          <ApplyButton href={SPEAKER_FORM} style={{ pointerEvents: state.visible ? 'all' : 'none' }}>
            스피커 신청하기
          </ApplyButton>
        </TextWrap>
      </Center>
    </SectionContainer>
  );
};

const TextWrap = styled.div`
  text-align: center;

  h2 {
    font-weight: 700;
    font-size: 60px;
    line-height: 130%;
    color: #FFFFFF;
    span {
      position: relative;
    }
  }
  p {
    margin: 24px auto 48px auto;
    color: #B0BECF;
    font-size: 24px;
    font-weight: 600;
    line-height: 1.6;
    opacity: 0.9;
  }

  ${tablet`
    h2 {
      font-size: 36px;
    }
    p {
      margin: 16px auto 32px auto;
      font-size: 16px;
    }
  `}
`;

export default CallForSpeakerSection;
