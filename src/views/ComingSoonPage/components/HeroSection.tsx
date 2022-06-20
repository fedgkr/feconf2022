import {FC, useRef} from "react";
import styled from '@emotion/styled';
import SpaceshipIcon from "~/views/ComingSoonPage/components/SpaceshipIcon";
import Center from "~/views/ComingSoonPage/components/Center";
import useFadeInOutAnimation from "~/views/ComingSoonPage/hooks/useFadeInOutAnimation";
import SectionContainer from "~/views/ComingSoonPage/components/SectionContainer";
import {mobile, tablet} from "~/views/ComingSoonPage/styles/media-query";

interface Props {
  state: SectionState;
}

const HeroSection: FC<Props> = ({ state }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { opacity, scale, transition } = useFadeInOutAnimation(state);
  return (
    <SectionContainer ref={ref}>
      <Center visible={state.visible}>
        <TextWrap style={{ opacity, transform: `scale(${scale})`, transition }}>
          <h2><span>올해도 가보자고</span><SpaceshipIcon/></h2>
          <h4>국내 최대 프론트엔드 개발 컨퍼런스,<br/> FECONF 2022가 찾아옵니다.</h4>
        </TextWrap>
      </Center>
    </SectionContainer>
  );
};

const TextWrap = styled.div`
  h2 {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 92px;
    font-weight: 900;
    line-height: 1.1;
    color: white;
    svg {
      width: 80px;
      height: 80px;
      margin-left: 24px;
    }
    ${tablet`
      font-size: 48px;
      svg {
        width: 42px;
        height: 42px;
        margin-left: 10px;
      }
    `}
    ${mobile`
      svg {
        position: absolute;
        top: -40px;
        width: 40px;
        height: 40px;
        margin-left: 0;
        margin-top: -16px;
      }
    `}
  }
  h4 {
    margin-top: 24px;
    font-size: 24px;
    font-weight: 600;
    color: #B0BECF;
    ${tablet`
      margin-top: 12px;
      font-size: 16px;
    `}
    ${mobile`
      font-size: 16px;
    `}
  }
`;

export default HeroSection;

