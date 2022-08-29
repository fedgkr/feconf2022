import { FC, MouseEventHandler } from 'react';
import styled from '@emotion/styled';
import { useSessionInfoModal } from '~/views/pages/HomePage/contexts/SessionInfoModalContext';
import SessionInfoHeader from '~/views/pages/HomePage/components/SessionInfoModal/components/SessionInfoHeader';
import SpeakerBadge from '~/views/pages/HomePage/components/SessionInfoModal/components/SpeakerBadge';
import { mobile } from '~/views/pages/HomePage/styles/media-query';

const SessionInfoModal: FC = () => {
  const { session, setSession } = useSessionInfoModal();
  const handleClickOverlay: MouseEventHandler = () => {
    setSession(null);
  };
  const visible = !!session;
  return (
    <>
      <Overlay visible={visible} onClick={handleClickOverlay} />
      <Container visible={visible}>
        <SessionInfoHeader session={session} />
        <Title>{session?.title}</Title>
        {session?.speakers.map((speaker) => (
          <SpeakerBadge key={speaker.name} speaker={speaker} />
        ))}
        <Description
          dangerouslySetInnerHTML={{ __html: session?.description }}
        />
      </Container>
    </>
  );
};

const Overlay = styled.div<{ visible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0);
  opacity: ${({ visible }) => (visible ? 0.6 : 0)};
  pointer-events: ${({ visible }) => (visible ? 'all' : 'none')};
  transition: opacity 300ms ease-in-out;
  z-index: 999;
`;

const Container = styled.div<{ visible: boolean }>`
  position: fixed;
  top: 280px;
  right: 0;
  left: 0;
  margin: 0 auto;
  width: 640px;
  padding: 34px 40px 72px 40px;
  background-color: white;
  box-sizing: border-box;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  pointer-events: ${({ visible }) => (visible ? 'all' : 'none')};
  border-radius: 16px;
  z-index: 1000;
  transition: opacity 300ms ease-in-out;
  ${mobile`
    top: auto;
    bottom: 0;
    width: 100%;
    padding: 42px 24px 60px 24px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  `}
`;

const Title = styled.h2`
  max-width: 280px;
  font-size: 32px;
  font-weight: 700;
  line-height: 1.3;
  color: #333333;
  margin: 32px 0 24px 0;
  word-break: keep-all;
  ${mobile`
    max-width: auto;
    font-size: 24px;
    margin: 16px 0 20px 0;
  `}
`;

const Description = styled.p`
  margin-top: 40px;
  font-size: 18px;
  line-height: 1.5;
  color: rgba(33, 33, 33, 0.8);
  ${mobile`
    margin-top: 20px;
    font-size: 14px;
  `}
`;

export default SessionInfoModal;
