import { FC } from 'react';
import styled from '@emotion/styled';
import { Speaker } from '~/types/event';

interface Props {
  speaker: Speaker;
}

const SpeakerBadge: FC<Props> = ({ speaker }) => {
  return (
    <Container>
      <Image src={speaker.image} alt={speaker.name} />
      <TextWrap>
        <Name>{speaker.name}</Name>
        {speaker.company ? <Title>{speaker.company.name}</Title> : null}
      </TextWrap>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  margin-top: 8px;
`;

const Image = styled.img`
  width: 44px;
  height: 44px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  overflow: hidden;
`;

const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 14px;
`;

const Name = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #333;
`;

const Title = styled.span`
  font-size: 13px;
  color: rgba(33, 33, 33, 0.6);
  margin-top: 1px;
`;

export default SpeakerBadge;
