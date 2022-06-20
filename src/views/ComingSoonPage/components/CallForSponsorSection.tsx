import {FC, useRef} from "react";
import styled from '@emotion/styled';
import ApplyButton from "~/views/components/ApplyButton";
import Portal from "~/views/components/Portal";
import useFadeInOutAnimation from "~/views/ComingSoonPage/hooks/useFadeInOutAnimation";
import SectionContainer from "~/views/ComingSoonPage/components/SectionContainer";
import Center from "~/views/ComingSoonPage/components/Center";
import {tablet} from "~/views/ComingSoonPage/styles/media-query";
import {SPONSOR_FORM} from "~/views/ComingSoonPage/data/meta";
import CircleIcon from "~/views/ComingSoonPage/components/CircleIcon";

interface Props {
  state: SectionState;
}

const CallForSponsorSection: FC<Props> = ({ state }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { opacity, scale, transition } = useFadeInOutAnimation(state);
  return (
    <SectionContainer ref={ref}>
      <Center visible={state.visible}>
        <TextWrap style={{ opacity, transform: `scale(${scale})`, transition }}>
          <h2>
            개발 문화를 선도하는<br/>
            <span>후원사<CircleIcon visible={state.visible}/></span>가 되어주세요.
          </h2>
          <p>
            FECONF 후원사가 되어 개발 문화를 만들고,<br/>
            기업 홍와 채용 활동을 계획하세요.
          </p>
          <ApplyButton href={SPONSOR_FORM} style={{ pointerEvents: state.visible ? 'all' : 'none' }}>
            후원 문의하기
          </ApplyButton>
        </TextWrap>
      </Center>
    </SectionContainer>
  );
};

const TextWrap = styled.div`
  width: 100%;
  text-align: center;

  h2 {
    font-size: 60px;
    font-weight: 700;
    line-height: 1.3;
    color: #FFFFFF;
    span {
      position: relative;
    }
  }
  p {
    margin: 24px auto 42px auto;
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

export default CallForSponsorSection;
