import { FC } from "react";
import styled from "@emotion/styled";
import Portal from "~/views/components/Portal";
import { Earth } from "./Earth";
import useFadeInOutAnimation from "~/views/ComingSoonPage/hooks/useFadeInOutAnimation";
import SectionContainer from "~/views/ComingSoonPage/components/SectionContainer";
import Center from "~/views/ComingSoonPage/components/Center";
import Footer from "~/views/ComingSoonPage/components/Footer";

interface Props {
  state: SectionState;
}

const ComingSoonSection: FC<Props> = ({ state }) => {
  const { opacity, scale, transition } = useFadeInOutAnimation(state);
  return (
    <SectionContainer>
      <Center visible={state.visible}>
        <TextContainer style={{ opacity, transform: `scale(${scale})`, transition }}>
          <TextWrap>
            <h2>마침내, 오프라인에서</h2>
            <p>10월 8일, 잠실 롯데타워에서 만나요.</p>
          </TextWrap>
        </TextContainer>
      </Center>
      <Portal area="content">
        <FixedWrap style={{ pointerEvents: 'none', zIndex: 0 }}>
          <Earth fadeIn={state.visible} />
        </FixedWrap>
        <Footer visible={state.visible}/>
      </Portal>
    </SectionContainer>
  );
}

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

const TextContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const TextWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  text-align: center;

  h2 {
    font-weight: 700;
    font-size: 60px;
    line-height: 130%;
    color: #FFFFFF;
  }
  p {
    margin: 32px auto 0 auto;
    color: #C8CCD5;
    font-size: 24px;
    font-weight: 600;
    line-height: 1.6;
  }
`;

export default ComingSoonSection;
