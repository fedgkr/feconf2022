import { FC } from 'react';
import styled from '@emotion/styled';
import { Sponsor } from '~/types/event';

interface Props {
  grade: 'diamond' | 'gold' | 'platinum' | 'rookie';
  list: Sponsor[];
}

const SponsorList: FC<Props> = ({ grade, list }) => {
  return (
    <Container>
      <Title>{grade}</Title>
      <List>
        {list.map((sponsor) => (
          <Item key={sponsor.name} href={sponsor.homepage} target="_blank">
            <img src={sponsor.image} alt={sponsor.name} />
          </Item>
        ))}
      </List>
    </Container>
  );
};

const Container = styled.div`
  text-align: center;
`;

const Title = styled.h4`
  font-size: 24px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.4);
  text-transform: capitalize;
`;

const List = styled.div`
  display: flex;
  height: 80px;
  justify-content: center;
  margin-top: 17px;
  font-size: 0;
`;

const Item = styled.a`
  img {
    height: 100%;
  }
  &:not(:first-child) {
    margin-left: 56px;
  }
`;

export default SponsorList;
