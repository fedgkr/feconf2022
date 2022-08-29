import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { enableBodyScroll, disableBodyScroll } from 'body-scroll-lock';
import noop from 'lodash/noop';
import { Session } from '~/types/event';

const SessionInfoModalContext = createContext<{
  session: Session | null;
  setSession: (val: Session | null) => void;
}>({
  session: null,
  setSession: noop,
});

export const SessionInfoModalProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [session, setSession] = useState<Session>(null);
  useEffect(() => {
    if (session) {
      disableBodyScroll(document.body);
    } else {
      enableBodyScroll(document.body);
    }
  }, [session]);
  return (
    <SessionInfoModalContext.Provider value={{ session, setSession }}>
      {children}
    </SessionInfoModalContext.Provider>
  );
};

export const useSessionInfoModal = () => useContext(SessionInfoModalContext);
