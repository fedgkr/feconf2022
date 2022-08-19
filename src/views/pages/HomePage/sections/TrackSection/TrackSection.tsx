import { FC } from 'react';
import styled from '@emotion/styled';
import TrackSortBar from '~/views/pages/HomePage/sections/TrackSection/components/TrackSortBar';
import { TrackSortProvider } from '~/views/pages/HomePage/sections/TrackSection/contexts/TrackSortContext';
import TrackList from '~/views/pages/HomePage/sections/TrackSection/components/TrackList';
import TitleBadge from '~/views/pages/HomePage/components/TitleBadge';
import SectionTitle from '~/views/pages/HomePage/components/SectionTitle';
import SectionHeader from '~/views/pages/HomePage/components/SectionHeader';

const TrackSection: FC = () => {
  return (
    <TrackSortProvider>
      <Container>
        <SectionHeader>
          <TitleBadge>프로그램</TitleBadge>
          <SectionTitle>
            문구가 정해진다면
            <br /> 여기에 넣는게 좋겠어요.
          </SectionTitle>
        </SectionHeader>
        <TrackSortBar />
        <TrackList />
      </Container>
    </TrackSortProvider>
  );
};

const Container = styled.section`
  position: relative;
  margin-top: 240px;
  padding-bottom: 240px;
`;

export default TrackSection;
