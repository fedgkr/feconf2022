import {FC, useRef} from "react";
import styled from '@emotion/styled';
import Portal from "~/views/components/Portal";

interface Props {
  in: boolean;
  out: boolean;
  direction: 'up' | 'down';
}

export const useHandleAnimation = (props: Props) => {
  const styles = useRef({ opacity: 0, scale: 0, transition: ' ' });
  if (props.in) {
    if (props.direction === 'down') {
      styles.current.opacity = 1;
      styles.current.scale = 1;
      styles.current.transition = 'opacity 600ms 300ms, transform 600ms 300ms';
    }
    if (props.direction === 'up') {
      styles.current.opacity = 1;
      styles.current.scale = 1;
      styles.current.transition = 'opacity 600ms 300ms, transform 600ms 300ms';
    }
  } else if (props.out) {
    if (props.direction === 'down') {
      styles.current.opacity = 0;
      styles.current.scale = 2;
      styles.current.transition = 'opacity 400ms, transform 400ms';
    }
    if (props.direction === 'up') {
      styles.current.opacity = 0;
      styles.current.scale = 0;
      styles.current.transition = 'opacity 400ms, transform 400ms';
    }
  }
  return styles.current;
}

const HeroSection: FC<Props> = (props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { opacity, scale, transition } = useHandleAnimation(props);
  return (
    <Container ref={ref} className="section">
      <Portal>
        <FixedWrap>
          <TextWrap style={{ opacity, transform: `scale(${scale})`, transition }}>
            <h3>Explore the forefront of FE dev</h3>
            <h2>FECONF.22</h2>
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

  h3 {
    font-size: 24px;
    color: #D7DCE5;
  }

  h2 {
    font-size: 84px;
    font-weight: 900;
    color: white;
  }
`;

export default HeroSection;

