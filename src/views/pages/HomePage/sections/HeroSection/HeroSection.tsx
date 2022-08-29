import { FC } from 'react';
import styled from '@emotion/styled';
import logo from '../../resources/main-logo.png';
import { DATE, LOCATION } from '~/resources/meta';
import { Earth } from '../../components/Earth';
import {
  useWindowScrollTop,
  useWindowHeight,
} from '../../hooks/useWindowScroll';
import { mobile } from '~/views/pages/HomePage/styles/media-query';
import useTicketButton from '~/views/pages/HomePage/hooks/useTicketButton';
import preventDefault from '~/views/pages/HomePage/utils/preventDefault';

const HeroSection: FC = () => {
  const { text, props } = useTicketButton();
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
        <Button {...props}>{text}</Button>
      </TitleArea>
      <Earth />
    </Container>
  );
};

const Container = styled.section`
  position: relative;
  height: 150vh;
  text-align: center;
  background: linear-gradient(#000, #0a132a);
  mix-blend-mode: screen;

  .three-canvas {
    position: absolute;
    z-index: 0;
    top: 0px;
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
  ${mobile`
    top: 160px;
  `}
`;

const Title = styled.img`
  width: 735px;
  height: 240px;
  margin: 0 auto;
  ${mobile`
    width: 280px;
    height: 91px;
  `}
`;

const Info = styled.h4`
  margin-top: 32px;
  font-size: 40px;
  font-weight: normal;
  line-height: 1.3;
  color: #b5b5b7;
  ${mobile`
    margin-top: 24px;
    font-size: 18px;
  `}
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
  ${mobile`
    margin-top: 48px;
    padding: 0 24px;
    height: 56px;
    font-size: 16px;
  `}
`;

export default HeroSection;
