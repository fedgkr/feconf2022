import { FC, useContext } from 'react';
import styled from '@emotion/styled';
import TrackSortBar from '~/views/pages/HomePage/sections/TrackSection/components/TrackSortBar';
import { TrackSortProvider } from '~/views/pages/HomePage/sections/TrackSection/contexts/TrackSortContext';
import TrackList from '~/views/pages/HomePage/sections/TrackSection/components/TrackList';
import TitleBadge from '~/views/pages/HomePage/components/TitleBadge';
import SectionTitle from '~/views/pages/HomePage/components/SectionTitle';
import SectionHeader from '~/views/pages/HomePage/components/SectionHeader';
import { mobile } from '~/views/pages/HomePage/styles/media-query';
import BackgroundContext from '~/views/pages/HomePage/sections/WarpSection/contexts/BackgroundContext';

const TrackSection: FC = () => {
  const { active } = useContext(BackgroundContext);
  return (
    <TrackSortProvider>
      <Container active={active}>
        <SectionHeader>
          <TitleBadge>프로그램</TitleBadge>
          <SectionTitle>
            FEConf를 빛낼 스피커와
            <br /> 프로그램을 소개합니다.
          </SectionTitle>
        </SectionHeader>
        <TrackSortBar />
        <TrackList />
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
