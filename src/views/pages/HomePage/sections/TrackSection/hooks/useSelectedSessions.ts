import { useMemo } from 'react';
import eq from 'lodash/eq';
import { Track } from '~/types/event';
import {
  TrackSortType,
  useTrackSort,
} from '~/views/pages/HomePage/sections/TrackSection/contexts/TrackSortContext';
import sessionList from '~/views/pages/HomePage/resources/data/event';

const getFilteredSessions = (sort: TrackSortType) =>
  sessionList.filter((session) =>
    eq(sort, 'all') ? true : session.track === sort
  );

const useSelectedSessions = () => {
  const { currentSort } = useTrackSort();
  const sessions = useMemo(
    () => getFilteredSessions(currentSort),
    [currentSort]
  );
  return {
    sessions,
  };
};

export default useSelectedSessions;
