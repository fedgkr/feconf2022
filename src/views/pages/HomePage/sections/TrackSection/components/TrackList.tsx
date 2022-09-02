import { FC } from 'react';
import styled from '@emotion/styled';
import TrackItem from '~/views/pages/HomePage/sections/TrackSection/components/TrackItem';
import useSelectedSessions from '~/views/pages/HomePage/sections/TrackSection/hooks/useSelectedSessions';
import { mobile } from '~/views/pages/HomePage/styles/media-query';
import FadeInUp from '~/views/pages/HomePage/components/FadeInUp';

interface Props {
  visible: boolean;
  delay: number;
}

const TrackList: FC<Props> = ({ visible, delay }) => {
  const { sessions } = useSelectedSessions();
  return (
    <Container>
      <List>
        {sessions.map((session, index) => (
          <FadeInUp
            key={session.title}
            visible={visible}
            delay={delay + 50 * index}
          >
            <TrackItem session={session} />
          </FadeInUp>
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
