import {FC, useRef} from "react";
import styled from '@emotion/styled';
import {useHandleAnimation} from "~/views/ComingSoonPage/components/HeroSection";
import Portal from "~/views/components/Portal";

interface Props {
  in: boolean;
  out: boolean;
  direction: 'up' | 'down';
}

const IntroSection: FC<Props> = (props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { opacity, scale, transition } = useHandleAnimation(props);
  return (
    <Container ref={ref} className="section">
      <Portal area="content">
        <FixedWrap>
          <TextWrap style={{ opacity, transform: `scale(${scale})`, transition }}>
            <p>
              국내 최대 규모 프론트엔드 개발 컨퍼런스 FEConf 엔지니어들의 다양한 도전과 경험을 공유합니다.
              새로운 기술을 익히고 함께 성장해요.
            </p>
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
