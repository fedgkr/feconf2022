import { createContext, useContext, useState } from 'react';

export enum TrackSortType {
  All,
  A,
  B,
}

const TrackSortContext = createContext<{
  currentSort: TrackSortType;
  setCurrentSort: (sort: TrackSortType) => void;
}>(null);

export const TrackSortProvider = ({ children }) => {
  const [currentSort, setCurrentSort] = useState(TrackSortType.All);
  return (
    <TrackSortContext.Provider value={{ currentSort, setCurrentSort }}>
      {children}
    </TrackSortContext.Provider>
  );
};

export const useTrackSort = () => {
  return useContext(TrackSortContext);
};
