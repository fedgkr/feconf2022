import { FC } from 'react';
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

  return (
    <Container>
      <TitleArea
        style={{
          transform: `translateY(${-scrollTop / 2}px)`,
          opacity: height ? Math.max(0, height - scrollTop * 5) / height : 1,
        }}
      >
        <Title src={logo.src} onMouseDown={preventDefault} />
        <Info>
          {DATE} {LOCATION}
        </Info>
        <ReserveButton />
      </TitleArea>
      <Earth useScroll={true} />
    </Container>
  );
};

const Container = styled.section`
  position: relative;
  height: 100vh;
  text-align: center;
  margin-top: -60px;

  .three-canvas {
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
  }
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
