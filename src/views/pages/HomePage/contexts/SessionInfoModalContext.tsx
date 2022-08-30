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
  visible: boolean;
  session: Session | null;
  setSession: (val: Session | null) => void;
  setVisible: (val: boolean) => void;
}>({
  visible: false,
  session: null,
  setSession: noop,
  setVisible: noop,
});

export const SessionInfoModalProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [session, setSession] = useState<Session>(null);
  useEffect(() => {
    if (visible) {
      disableBodyScroll(document.body);
    } else {
      enableBodyScroll(document.body);
    }
  }, [visible]);
  return (
    <SessionInfoModalContext.Provider
      value={{ session, visible: visible, setSession, setVisible }}
    >
      {children}
    </SessionInfoModalContext.Provider>
  );
};

export const useSessionInfoModal = () => useContext(SessionInfoModalContext);
