import { FC, MouseEventHandler } from 'react';
import styled from '@emotion/styled';
import { Session, Track } from '~/types/event';
import eq from 'lodash/eq';
import {
  mobile,
  mobileSelect,
} from '~/views/pages/HomePage/styles/media-query';
import { useSessionInfoModal } from '~/views/pages/HomePage/contexts/SessionInfoModalContext';
import gt from 'lodash/gt';

interface Props {
  session: Session;
}

const TrackItem: FC<Props> = ({ session }) => {
  const { setSession, setVisible } = useSessionInfoModal();
  const handleClickItem: MouseEventHandler = (evt) => {
    evt.preventDefault();
    setSession(session);
    setVisible(true);
  };
  return (
    <Container onClick={handleClickItem}>
      <Time>
        <span>{session.time[0]}</span>
      </Time>
      <TextWrap>
        <TitleSVG>{session.titleSvg({})}</TitleSVG>
        <Title>{session.title}</Title>
        <Info>
          {session.speakers.map((speaker, index) => (
            <Speaker key={speaker.name}>
              {gt(index, 0) ? '/' : ''}
              {speaker.name}
            </Speaker>
          ))}
          {session.speakers[0].company ? (
            <>
              <Divider>·</Divider>
              <Company>{session.speakers[0].company.name}</Company>
            </>
          ) : null}
          <Tag>40min</Tag>
          <Tag>{eq(session.track, Track.A) ? 'A' : 'B'} Track</Tag>
        </Info>
      </TextWrap>
    </Container>
  );
};

const TitleSVG = styled.div`
  opacity: 0.6;
  ${mobile`
    display: none;
  `}
`;

const Time = styled.div`
  display: flex;
  align-items: center;
  padding: 17px 0;
  opacity: 0.3;
  span {
    position: relative;
    font-size: 32px;
    color: white;
    &::after {
      position: absolute;
      top: 14px;
      right: -32px;
      height: 3px;
      width: 48px;
      content: '';
      background-color: white;
      transform: translateX(100%);
    }
  }
  ${mobile`
    padding: 5px 0;
    span::after {
      display: none;
    }
    span {
      font-size: 13px;
    }
  `}
`;

const TextWrap = styled.div`
  margin-left: 112px;
  ${mobile`
    margin-left: 14px;
  `}
`;

const Title = styled.div`
  display: none;
  ${mobile`
    display: block;
    max-width: 220px;
    font-size: 20px;
    font-weight: 700;
    line-height: 1.3;
    color: white;
    word-break: keep-all;
  `}
`;

const Info = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
  ${mobile`
    margin-top: 8px;
  `}
`;

const Divider = styled.div`
  font-size: 32px;
  font-weight: 600;
  color: white;
  text-align: center;
  margin: 0 12px;
  opacity: 0.3;
  ${mobile`
    font-size: 14px;
    margin: 0 4px;
  `}
`;

const SpeakerStyle = styled.h4`
  position: relative;
  font-size: 32px;
  font-weight: 600;
  color: white;
  opacity: 0.3;
  ${mobile`
    font-size: 14px;
  `}
`;

const Speaker = styled(SpeakerStyle)``;

const Company = styled(SpeakerStyle)``;

const Tag = styled.span`
  display: flex;
  align-self: center;
  padding: 6px 8px;
  color: rgba(255, 255, 255, 0.8);
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 9px;
  font-size: 16px;
  margin-left: 8px;
  opacity: 0.3;
  &:first-of-type {
    margin-left: 16px;
  }
  ${mobile`
    font-size: 10px;
    border-radius: 5px;
    padding: 4px 5px;
    margin-left: 6px;
    border: 1px solid rgba(255, 255, 255, 0.5);
    &:first-of-type {
      margin-left: 10px;
    }
  `}
`;

const Container = styled.li`
  display: flex;
  align-items: flex-start;
  cursor: pointer;
  &:hover ${TitleSVG} {
    opacity: 1;
  }
  &:hover ${Time} {
    opacity: 1;
  }
  &:hover ${Speaker} {
    opacity: 0.8;
  }
  &:hover ${Divider} {
    opacity: 0.8;
  }
  &:hover ${Company} {
    opacity: 0.8;
  }
  &:hover ${Tag} {
    opacity: 1;
  }
  ${mobileSelect} {
    ${TitleSVG} {
      opacity: 1;
    }
    ${Time} {
      opacity: 1;
    }
    ${Speaker} {
      opacity: 0.8;
    }
    ${Divider} {
      opacity: 0.8;
    }
    ${Company} {
      opacity: 0.8;
    }
    ${Tag} {
      opacity: 1;
    }
  }
`;

export default TrackItem;
