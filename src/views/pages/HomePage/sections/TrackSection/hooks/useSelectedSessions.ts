import { useMemo } from 'react';
import eq from 'lodash/eq';
import {
  trackASessionTitles,
  trackBSessionTitles,
} from '~/views/pages/HomePage/sections/TrackSection/resources/titles';
import { Track } from '~/types/event';
import {
  TrackSortType,
  useTrackSort,
} from '~/views/pages/HomePage/sections/TrackSection/contexts/TrackSortContext';
import sessionList from '~/views/pages/HomePage/sections/TrackSection/resources/event';

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
  const titles = useMemo(() => {
    if (eq(currentSort, 'all')) {
      return [...trackASessionTitles, ...trackBSessionTitles];
    }
    return eq(currentSort, Track.A) ? trackASessionTitles : trackBSessionTitles;
  }, [currentSort]);
  return {
    sessions,
    titles,
  };
};

export default useSelectedSessions;
