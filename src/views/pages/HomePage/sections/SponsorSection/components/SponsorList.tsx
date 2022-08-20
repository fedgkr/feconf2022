import { FC } from 'react';
import styled from '@emotion/styled';

interface Props {
  grade: 'diamond' | 'gold' | 'platinum';
}

const SponsorList: FC<Props> = ({ grade }) => {
  return (
    <Container>
      <Title>{grade}</Title>
      <List></List>
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
  margin-top: 17px;
`;

export default SponsorList;
