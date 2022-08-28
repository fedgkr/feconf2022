import { createContext, FC, PropsWithChildren, useState } from 'react';
import noop from 'lodash/noop';

const BackgroundContext = createContext({
  active: false,
  setActive: noop,
});

export const BackgroundContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [active, setActive] = useState(false);
  return (
    <BackgroundContext.Provider
      value={{
        active,
        setActive,
      }}
    >
      {children}
    </BackgroundContext.Provider>
  );
};

export default BackgroundContext;
