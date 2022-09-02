import { FC, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import logo from '../../resources/images/main-logo.png';
import { DATE, LOCATION, LOCATION_LINK } from '~/resources/meta';
import { Earth } from '../../components/Earth';
import {
  useWindowScrollTop,
  useWindowHeight,
} from '../../hooks/useWindowScroll';
import { mobile } from '~/views/pages/HomePage/styles/media-query';
import preventDefault from '~/views/pages/HomePage/utils/preventDefault';
import ReserveButton from '~/views/pages/HomePage/components/ReserveButton';
import { useIntersection } from 'use-intersection';
import FadeInUp from '~/views/pages/HomePage/components/FadeInUp';
import SafeLink from '~/views/components/SafeLink';
import { document } from '@daybrush/utils';
import usePrefersReducedMotion from '~/hoooks/usePrefersReducedMotion';

const useFontLoadingState = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  useEffect(() => {
    document.fonts.load('16px Pretendard').then(() => setFontLoaded(true));
  }, []);
  return fontLoaded;
};

const HeroSection: FC = () => {
  const containerRef = useRef<HTMLDivElement>();
  const intersected = useIntersection(containerRef);
  const scrollTop = useWindowScrollTop(intersected);
  const height = useWindowHeight();
  const opacity = height
    ? Math.min(1, Math.max(0, height - scrollTop * 2) / height)
    : 1;
  const [isReady, setReady] = useState(false);
  const fontLoaded = useFontLoadingState();
  const reducedMotion = usePrefersReducedMotion();
  const visible = intersected && fontLoaded && isReady;

  return (
    <Container ref={containerRef}>
      <TitleArea
        style={{
          display: opacity ? 'block' : 'none',
          opacity,
        }}
      >
        <FadeInUp visible={visible} delay={0} range={80}>
          <Title src={logo.src} onMouseDown={preventDefault} />
        </FadeInUp>
        <FadeInUp visible={visible} delay={50} range={80}>
          <Info>
            <SafeLink href={LOCATION_LINK}>
              {DATE} {LOCATION}
            </SafeLink>
          </Info>
        </FadeInUp>
        <FadeInUp visible={visible} delay={100} range={80}>
          <ReserveButton />
        </FadeInUp>
      </TitleArea>
      <EarthArea
        style={{
          opacity: isReady ? opacity : 0,
          transition: isReady && opacity !== 1 ? 'none' : undefined,
        }}
      >
        <Earth
          useScroll={false}
          useAnimation={visible && !reducedMotion}
          onReady={() => {
            setReady(true);
          }}
        />
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
  position: fixed;
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
  ${mobile`
    height: 650px;
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
  a {
    color: inherit;
  }

  ${mobile`
    font-size: 16px;
    line-height: 20.8px;
  `}
`;

export default HeroSection;
