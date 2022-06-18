import {FC} from "react";
import styled from "@emotion/styled";
import Portal from "~/views/components/Portal";
import {useHandleAnimation} from "~/views/ComingSoonPage/components/HeroSection";

interface Props {
  in: boolean;
  out: boolean;
  direction: 'up' | 'down';
}

const ComingSoonSection: FC<Props> = (props) => {
  const { opacity, scale, transition } = useHandleAnimation(props);
  return (
    <Container className="section">
      <Portal>
        <FixedWrap>
          <TextWrap style={{ opacity, transform: `scale(${scale})`, transition }}>
            <h2>10월에 찾아옵니다.</h2>
            <p>2022 FEConf -&gt; Frontend Developer Conference</p>
          </TextWrap>
        </FixedWrap>
      </Portal>
    </Container>
  );
}

const Container = styled.div`

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
    line-height: 1.6;
  }
`;

export default ComingSoonSection;
