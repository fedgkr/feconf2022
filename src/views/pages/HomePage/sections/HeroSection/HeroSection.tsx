import { FC } from 'react';
import styled from '@emotion/styled';
import { DATE, LOCATION } from '~/data/meta';
import { Earth } from '../../components/Earth';
import {
  useWindowScrollTop,
  useWindowHeight,
} from '../../hooks/useWindowScroll';

const HeroSection: FC = () => {
  const scrollTop = useWindowScrollTop();
  const height = useWindowHeight();

  return (
    <Container>
      <TitleArea
        style={{
          transform: `translateY(${scrollTop / 2}px)`,
          opacity: height ? Math.max(0, height - scrollTop) / height : 1,
        }}
      >
        <Title>올해도 가보자고!</Title>
        <Info>
          {DATE} {LOCATION}
        </Info>
        <Button>티켓 구매하기</Button>
      </TitleArea>
      <Earth />
    </Container>
  );
};

const Container = styled.section`
  position: relative;
  height: 150vh;
  text-align: center;

  &:before {
    content: '';
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url(/images/hero/star.png);
    pointer-events: none;
  }
  canvas {
    position: absolute;
    z-index: 0;
    top: -100px;
    left: 0;
    width: 100%;
    height: 100vh;
  }
`;

const TitleArea = styled.div`
  position: relative;
  width: 100%;
  top: 266px;
  z-index: 1;
`;

const Title = styled.h2`
  color: white;
  font-size: 100px;
  font-weight: 900;
  letter-spacing: -1px;
`;

const Info = styled.h4`
  margin-top: 32px;
  font-size: 40px;
  font-weight: normal;
  line-height: 1.3;
  color: #b5b5b7;
`;

const Button = styled.a`
  margin-top: 80px;
  display: inline-flex;
  align-items: center;
  padding: 0 48px;
  height: 100px;
  font-size: 24px;
  font-weight: 700;
  color: white;
  border: 3px solid white;
  border-radius: 100px;
  background-color: transparent;
`;

export default HeroSection;
