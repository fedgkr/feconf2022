import { createContext, useContext, useState } from 'react';
import { Track } from '~/types/event';

export type TrackSortType = Track | 'all';

const TrackSortContext = createContext<{
  currentSort: TrackSortType;
  setCurrentSort: (sort: TrackSortType) => void;
}>(null);

export const TrackSortProvider = ({ children }) => {
  const [currentSort, setCurrentSort] = useState<TrackSortType>('all');
  return (
    <TrackSortContext.Provider value={{ currentSort, setCurrentSort }}>
      {children}
    </TrackSortContext.Provider>
  );
};

export const useTrackSort = () => {
  return useContext(TrackSortContext);
};
