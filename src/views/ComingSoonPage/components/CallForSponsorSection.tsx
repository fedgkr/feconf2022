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

const CallForSponsorSection: FC<Props> = (props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { opacity, scale, transition } = useHandleAnimation(props);
  return (
    <Container ref={ref} className="section">
      <Portal area="content">
        <FixedWrap>
          <TextWrap style={{ opacity, transform: `scale(${scale})`, transition }}>
            <h2>
              개발 문화를 선도하는<br/>
              후원사가 되어주세요.
            </h2>
            <p>
              FECONF 후원사가 되어 개발 문화를 만들고,<br/>
              기업 홍와 채용 활동을 계획하세요.
            </p>
            <ApplyButton href="#">후원 문의하기</ApplyButton>
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
    font-size: 60px;
    font-weight: 700;
    line-height: 1.3;
    color: #FFFFFF;
  }
  p {
    margin: 24px auto 42px auto;
    color: #B0BECF;
    font-size: 24px;
    font-weight: 600;
    line-height: 1.6;
    opacity: 0.9;
  }
`;

export default CallForSponsorSection;
