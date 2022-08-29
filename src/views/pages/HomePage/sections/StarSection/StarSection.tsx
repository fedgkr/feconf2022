import { FC } from 'react';
import styled from '@emotion/styled';
import { StarCanvas } from '../../components/StarCanvas';

const StarSection: FC = () => {
  return (
    <Container>
      <StarCanvas />
    </Container>
  );
};

const Container = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;

  .star-canvas {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
`;

export default StarSection;
