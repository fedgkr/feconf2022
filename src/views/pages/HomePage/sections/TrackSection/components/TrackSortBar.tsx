import { FC } from 'react';
import styled from '@emotion/styled';
import {
  TrackSortType,
  useTrackSort,
} from '~/views/pages/HomePage/sections/TrackSection/contexts/TrackSortContext';
import { isEqual } from 'lodash';

const TrackSortBar: FC = () => {
  const { currentSort, setCurrentSort } = useTrackSort();
  return (
    <Container>
      <SortList>
        <SortItem
          active={isEqual(currentSort, TrackSortType.All)}
          onClick={() => setCurrentSort(TrackSortType.All)}
        >
          All
        </SortItem>
        <SortItem
          active={isEqual(currentSort, TrackSortType.A)}
          onClick={() => setCurrentSort(TrackSortType.A)}
        >
          Track A
        </SortItem>
        <SortItem
          active={isEqual(currentSort, TrackSortType.B)}
          onClick={() => setCurrentSort(TrackSortType.B)}
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
    active ? 'background-color 300ms ease-in, color 300ms ease-in' : 'none'};
`;

export default TrackSortBar;
