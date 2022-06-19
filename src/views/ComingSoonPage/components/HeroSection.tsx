import {FC, useRef} from "react";
import styled from '@emotion/styled';
import Portal from "~/views/components/Portal";
import SpaceshipIcon from "~/views/ComingSoonPage/components/SpaceshipIcon";

interface Props {
  in: boolean;
  out: boolean;
  direction: 'up' | 'down';
}

export const useHandleAnimation = (props: Props) => {
  const styles = useRef({ opacity: 0, scale: 0, transition: ' ' });
  if (props.in) {
    styles.current.opacity = 1;
    styles.current.scale = 1;
    styles.current.transition = 'opacity 600ms 300ms, transform 600ms 300ms';
  } else if (props.out) {
    styles.current.opacity = 0;
    styles.current.opacity = 0;
    styles.current.transition = 'opacity 400ms, transform 400ms';
    if (props.direction === 'down') {
      styles.current.scale = 2;
    }
    if (props.direction === 'up') {
      styles.current.scale = 0;
    }
  }
  return styles.current;
}

const HeroSection: FC<Props> = (props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { opacity, scale, transition } = useHandleAnimation(props);
  return (
    <Container ref={ref} className="section">
      <Portal area="content">
        <FixedWrap>
          <TextWrap style={{ opacity, transform: `scale(${scale})`, transition }}>
            <h2><span>올해도 가보자고</span><SpaceshipIcon/></h2>
            <h4>국내 최대 프론트엔드 개발 컨퍼런스,<br/> FECONF 2022가 찾아옵니다.</h4>
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
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 92px;
    font-weight: 900;
    color: white;
    svg {
      width: 80px;
      margin-left: 24px;
    }
  }
  h4 {
    font-size: 24px;
    font-weight: 600;
    color: #B0BECF;
  }
`;

export default HeroSection;

