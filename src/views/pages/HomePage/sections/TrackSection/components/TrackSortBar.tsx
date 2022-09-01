import { FC } from 'react';
import styled from '@emotion/styled';
import { useTrackSort } from '~/views/pages/HomePage/sections/TrackSection/contexts/TrackSortContext';
import eq from 'lodash/eq';
import { Track } from '~/types/event';
import { mobile } from '~/views/pages/HomePage/styles/media-query';

const TrackSortBar: FC = () => {
  const { currentSort, setCurrentSort } = useTrackSort();
  return (
    <Container>
      <SortList>
        <SortItem
          active={eq(currentSort, 'all')}
          onClick={() => setCurrentSort('all')}
        >
          All
        </SortItem>
        <SortItem
          active={eq(currentSort, Track.A)}
          onClick={() => setCurrentSort(Track.A)}
        >
          Track A
        </SortItem>
        <SortItem
          active={eq(currentSort, Track.B)}
          onClick={() => setCurrentSort(Track.B)}
        >
          Track B
        </SortItem>
      </SortList>
    </Container>
  );
};

const Container = styled.ul`
  display: flex;
  justify-content: center;
`;

const SortList = styled.ul`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  border-radius: 12px;
  padding: 0 4px;
  background-color: rgba(255, 255, 255, 0.1);
  ${mobile`
    height: 30px;
    border-radius: 8px;
    padding: 0 2px;
  `}
`;

const SortItem = styled.li<{ active: boolean }>`
  display: inline-flex;
  align-items: center;
  height: 40px;
  padding: 0 20px;
  font-size: 20px;
  font-weight: 600;
  border-radius: 12px;
  cursor: pointer;
  color: ${({ active }) => (active ? '#333333' : 'rgba(255, 255, 255, 0.6)')};
  background-color: ${({ active }) => (active ? 'white' : 'transparent')};
  transition: ${({ active }) =>
    active ? 'background-color 100ms ease-in, color 100ms ease-in' : 'none'};
  ${mobile`
    height: 26px;
    font-size: 12px;
    border-radius: 8px;
    padding: 0 14px;
  `}
`;

export default TrackSortBar;
