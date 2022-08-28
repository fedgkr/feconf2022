import { FC } from 'react';
import styled from '@emotion/styled';
import { Session, Track } from '~/types/event';
import eq from 'lodash/eq';
import { mobile } from '~/views/pages/HomePage/styles/media-query';

interface Props {
  session: Session;
  title: FC;
}

const TrackItem: FC<Props> = ({ session, title }) => {
  return (
    <Container>
      <Time>
        <span>{session.time[0]}</span>
      </Time>
      <TextWrap>
        <TitleSVG>{title({})}</TitleSVG>
        <Title>{session.title}</Title>
        <Info>
          <Speaker>{session.speaker.name}</Speaker>
          {session.speaker.company ? (
            <>
              <Divider>·</Divider>
              <Company>{session.speaker.company.name}</Company>
            </>
          ) : null}
          <Tag>45min</Tag>
          <Tag>{eq(session.track, Track.A) ? 'A' : 'B'} Track</Tag>
        </Info>
      </TextWrap>
    </Container>
  );
};

const Container = styled.li`
  display: flex;
  align-items: flex-start;
  cursor: pointer;

  svg path {
    opacity: 0.6;
  }
  &:hover {
    svg path {
      opacity: 1;
    }
  }
`;

const Time = styled.div`
  display: flex;
  align-items: center;
  padding: 17px 0;
  span {
    position: relative;
    font-size: 32px;
    color: rgba(255, 255, 255, 0.3);
    &::after {
      position: absolute;
      top: 14px;
      right: -32px;
      height: 3px;
      width: 48px;
      content: '';
      background-color: rgba(255, 255, 255, 0.3);
      transform: translateX(100%);
    }
  }
  ${mobile`
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

const TitleSVG = styled.div`
  ${mobile`
    display: none;
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

export default TrackItem;
