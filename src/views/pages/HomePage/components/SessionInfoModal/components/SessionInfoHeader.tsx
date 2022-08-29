import { FC, MouseEventHandler } from 'react';
import styled from '@emotion/styled';
import { Session, Track } from '~/types/event';
import close from '../resources/close.png';
import { useSessionInfoModal } from '~/views/pages/HomePage/contexts/SessionInfoModalContext';

interface Props {
  session: Session;
}

const SessionInfoHeader: FC<Props> = ({ session }) => {
  const { setSession } = useSessionInfoModal();
  const trackLabel = `${session?.track === Track.A ? 'A' : 'B'} Track`;
  const [start, end] = session?.time || [];
  const handleClickClose: MouseEventHandler = () => {
    setSession(null);
  };
  return (
    <Container>
      <div>
        <TrackLabel>{trackLabel}</TrackLabel>
        <Time>
          {start} - {end}
        </Time>
      </div>
      <Close src={close.src} onClick={handleClickClose} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TrackLabel = styled.span`
  display: inline-flex;
  color: rgba(33, 33, 33, 0.8);
  padding: 6px 8px;
  border: 1px solid rgba(33, 33, 33, 0.1);
  border-radius: 9px;
  font-size: 16px;
`;

const Time = styled.span`
  display: inline-flex;
  margin-left: 10px;
  font-size: 16px;
  color: rgba(33, 33, 33, 0.8);
  padding: 6px 8px;
`;

const Close = styled.img`
  display: inline-block;
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

export default SessionInfoHeader;
