import { FC, useContext, useRef } from 'react';
import styled from '@emotion/styled';
import TrackSortBar from '~/views/pages/HomePage/sections/TrackSection/components/TrackSortBar';
import { TrackSortProvider } from '~/views/pages/HomePage/sections/TrackSection/contexts/TrackSortContext';
import TrackList from '~/views/pages/HomePage/sections/TrackSection/components/TrackList';
import TitleBadge from '~/views/pages/HomePage/components/TitleBadge';
import SectionTitle from '~/views/pages/HomePage/components/SectionTitle';
import SectionHeader from '~/views/pages/HomePage/components/SectionHeader';
import { mobile } from '~/views/pages/HomePage/styles/media-query';
import BackgroundContext from '~/views/pages/HomePage/sections/WarpSection/contexts/BackgroundContext';
import { useIntersection } from 'use-intersection';
import FadeInUp from '~/views/pages/HomePage/components/FadeInUp';

const TrackSection: FC = () => {
  const { active } = useContext(BackgroundContext);
  const containerRef = useRef<HTMLDivElement>();
  const visible = useIntersection(containerRef, {
    once: true,
    rootMargin: '-150px 0px',
  });
  return (
    <TrackSortProvider>
      <Container ref={containerRef} active={active}>
        <SectionHeader>
          <FadeInUp visible={visible} delay={0}>
            <TitleBadge>프로그램</TitleBadge>
          </FadeInUp>
          <FadeInUp visible={visible} delay={100}>
            <SectionTitle>
              FEConf를 빛낼 스피커와
              <br /> 프로그램을 소개합니다.
            </SectionTitle>
          </FadeInUp>
        </SectionHeader>
        <FadeInUp visible={visible} delay={200}>
          <TrackSortBar />
        </FadeInUp>
        <FadeInUp visible={visible} delay={300}>
          <TrackList />
        </FadeInUp>
      </Container>
    </TrackSortProvider>
  );
};

const Container = styled.section<{ active: boolean }>`
  position: relative;
  padding-top: 120px;
  padding-bottom: 160px;
  &::before {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    background-image: linear-gradient(#304ab7, #5e53ce);
    opacity: ${({ active }) => (active ? 1 : 0)};
    transition: opacity 300ms ease-out;
  }
  ${mobile`
    padding-top: 60px;
    padding-bottom: 80px;
  `}
`;

export default TrackSection;
