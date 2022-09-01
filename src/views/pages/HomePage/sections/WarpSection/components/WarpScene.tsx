import { FC } from 'react';
import styled from '@emotion/styled';

import { mobile } from '~/views/pages/HomePage/styles/media-query';

import useScrollMotion from '../hooks/useScrollMotion';

const WarpScene: FC = () => {
  const { containerEl, titleEl, canvasEl } = useScrollMotion();
  return (
    <Container ref={containerEl}>
      <Title ref={titleEl}>
        프론트엔드 엔지니어의
        <br />
        다양한 도전과 경험
      </Title>
      <canvas ref={canvasEl} />
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  canvas {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
  }
`;

const Title = styled.h2`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 80px;
  font-weight: 700;
  line-height: 1.3;
  color: white;
  text-align: center;
  opacity: 0;
  transform: scale(0.5);
  z-index: 1;
  pointer-events: none;
  ${mobile`
    font-size: 28px;
  `}
`;

export default WarpScene;
