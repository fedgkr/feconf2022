import {FC, useRef} from "react";
import styled from '@emotion/styled';
import Portal from "~/views/components/Portal";
import useFadeInOutAnimation from "~/views/ComingSoonPage/hooks/useFadeInOutAnimation";
import SectionContainer from "~/views/ComingSoonPage/components/SectionContainer";
import Center from "~/views/ComingSoonPage/components/Center";

interface Props {
  state: SectionState;
}

const IntroSection: FC<Props> = ({ state }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { opacity, scale, transition } = useFadeInOutAnimation(state);
  return (
    <SectionContainer ref={ref}>
      <Center visible={state.visible}>
        <TextWrap style={{ opacity, transform: `scale(${scale})`, transition }}>
          <p>
            프론트엔드 엔지니어의 다양한 도전과 경험, <br/> 개발하며 마주한 치열한 고민과 깊은 인사이트를 나누고 <br/> 새로운 기술을 익히며 함께 성장해요.
          </p>
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
  p {
    margin: 0 auto;
    color: #B0BECF;
    font-size: 24px;
    font-weight: 600;
    line-height: 1.6;
    opacity: 0.9;
  }
`;

export default IntroSection;
