import { FC } from 'react';
import styled from '@emotion/styled';
import TrackItem from '~/views/pages/HomePage/sections/TrackSection/components/TrackItem';
import useSelectedSessions from '~/views/pages/HomePage/sections/TrackSection/hooks/useSelectedSessions';
import { mobile } from '~/views/pages/HomePage/styles/media-query';

const TrackList: FC = () => {
  const { sessions, titles } = useSelectedSessions();
  return (
    <Container>
      <List>
        {sessions.map((session, index) => (
          <TrackItem
            key={session.title}
            session={session}
            title={titles[index]}
          />
        ))}
      </List>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  margin-top: 120px;
  ${mobile`
    margin-top: 48px;
  `}
`;

const List = styled.ul`
  position: relative;
  display: inline-flex;
  flex-direction: column;
  width: 1000px;
  & > li:not(:first-of-type) {
    margin-top: 20px;
  }
  ${mobile`
    width: 310px;
    & > li:not(:first-of-type) {
      margin-top: 32px;
    }
  `}
`;

export default TrackList;
