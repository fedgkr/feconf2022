import { FC, useState } from 'react';
import styled from '@emotion/styled';
import logo from '../../resources/images/main-logo.png';
import { DATE, LOCATION } from '~/resources/meta';
import { Earth } from '../../components/Earth';
import {
  useWindowScrollTop,
  useWindowHeight,
} from '../../hooks/useWindowScroll';
import { mobile } from '~/views/pages/HomePage/styles/media-query';
import preventDefault from '~/views/pages/HomePage/utils/preventDefault';
import ReserveButton from '~/views/pages/HomePage/components/ReserveButton';

const HeroSection: FC = () => {
  const scrollTop = useWindowScrollTop();
  const height = useWindowHeight();
  const opacity = height ? Math.max(0, height - scrollTop * 5) / height : 1;
  const [isReady, setReady] = useState(false);

  return (
    <Container>
      <TitleArea
        style={{
          transform: opacity ? `translateY(${-scrollTop / 2}px)` : "none",
          display: opacity ? "block" : "none",
          opacity,
        }}
      >
        <Title src={logo.src} onMouseDown={preventDefault} />
        <Info>
          {DATE} {LOCATION}
        </Info>
        <ReserveButton />
      </TitleArea>
      <EarthArea style={{
        transform: `translateY(${-scrollTop}px)`,
        opacity: isReady ? 1 : 0,
      }}>
        <Earth useScroll={true} onReady={() => {
          setReady(true);
        }} />
      </EarthArea>
    </Container>
  );
};

const Container = styled.section`
  position: relative;
  height: 100vh;
  text-align: center;
  margin-top: -60px;
`;
const TitleArea = styled.div`
  position: relative;
  width: 100%;
  top: 20vh;
  z-index: 1;

  ${mobile`
    top: 16vh;
  `}
`;
const EarthArea = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1200px;
  pointer-events: none;
  transition: opacity ease 2s;

  .three-canvas {
    position: absolute;
    z-index: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const Title = styled.img`
  width: 600px;
  height: 196px;
  margin: 0 auto;

  ${mobile`
    width: 280px;
    height: 91px;
  `}
`;

const Info = styled.h4`
  margin-top: 16px;
  font-size: 24px;
  font-weight: 500;
  line-height: 31.2px;
  color: #fff;

  ${mobile`
    font-size: 16px;
    line-height: 20.8px;
  `}
`;

export default HeroSection;
