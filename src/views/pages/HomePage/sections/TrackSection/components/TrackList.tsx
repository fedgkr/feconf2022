import { FC } from 'react';
import styled from '@emotion/styled';
import TrackItem from '~/views/pages/HomePage/sections/TrackSection/components/TrackItem';

const TrackList: FC = () => {
  return (
    <Container>
      <List>
        <TrackItem />
        <TrackItem />
        <TrackItem />
        <TrackItem />
        <TrackItem />
        <TrackItem />
        <TrackItem />
        <TrackItem />
        <TrackItem />
        <TrackItem />
        <TrackItem />
        <TrackItem />
        <TrackItem />
        <TrackItem />
        <TrackItem />
        <TrackItem />
      </List>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  margin-top: 120px;
`;

const List = styled.ul`
  position: relative;
  display: inline-flex;
  flex-direction: column;
  & > li:not(:first-child) {
    margin-top: 20px;
  }
`;

export default TrackList;
