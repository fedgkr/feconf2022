import { FC, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { DATE, LOCATION, LOCATION_LINK } from '~/resources/meta';
import { mobile } from '~/views/pages/HomePage/styles/media-query';
import { Earth } from '../../components/Earth';
import ReserveButton from '~/views/pages/HomePage/components/ReserveButton';
import { useIntersection } from 'use-intersection';
import FadeInUp from '~/views/pages/HomePage/components/FadeInUp';
import SafeLink from '~/views/components/SafeLink';

const TicketSection: FC = () => {
  const containerRef = useRef<HTMLDivElement>();
  const visible = useIntersection(containerRef, {
    once: true,
    rootMargin: '-200px 0px',
  });
  const [isReady, setReady] = useState(false);
  return (
    <Container ref={containerRef}>
      <EarthContainer
        style={{
          opacity: isReady ? 1 : 0,
        }}
      >
        <EarthWrapper>
          <Earth
            offset={0.4}
            scaleOffset={-0.1}
            onReady={() => {
              setReady(true);
            }}
          />
        </EarthWrapper>
      </EarthContainer>
      <TextWrap>
        <FadeInUp visible={visible} delay={0}>
          <Title>
            다양한 기술을 익히며
            <br />
            함께 성장해요
          </Title>
        </FadeInUp>
        <FadeInUp visible={visible} delay={100}>
          <SubText>
            <SafeLink href={LOCATION_LINK}>
              {DATE} {LOCATION}
            </SafeLink>
          </SubText>
        </FadeInUp>
        <FadeInUp visible={visible} delay={200}>
          <ReserveButton />
        </FadeInUp>
      </TextWrap>
    </Container>
  );
};

const Container = styled.section`
  position: relative;
  width: 100%;
  padding: 200px 0;
  text-align: center;
  overflow: hidden;

  ${mobile`
    padding: 60px 0 80px 0;
  `}
`;

const EarthContainer = styled.div`
  position: relative;
  height: 897px;
  overflow: hidden;
  transition: opacity ease 2s;
  ${mobile`
    height: 763px;
  `}
`;
const EarthWrapper = styled.div`
  left: 0;
  pointer-events: none;
  opacity: 0.7;

  position: absolute;
  bottom: 190px;
  width: 100%;
  height: 1400px;
  ${mobile`
  bottom: 104px;
  height: 1200px;
`}
  canvas {
    width: 100%;
    height: 100%;
  }
`;

const TextWrap = styled.div`
  position: absolute;
  bottom: 200px;
  width: 100%;
  z-index: 1;
  ${mobile`
    bottom: 80px;
  `}
`;

const Title = styled.h2`
  font-size: 72px;
  line-height: 1.3;
  font-weight: 900;
  color: white;
  ${mobile`
    font-size: 28px;
  `}
`;

const SubText = styled.p`
  margin-top: 24px;
  font-size: 28px;
  line-height: 1.4;
  color: #dfdfdf;
  a {
    color: inherit;
  }
  ${mobile`
    margin-top: 16px;
    font-size: 18px;
  `}
`;

export default TicketSection;
