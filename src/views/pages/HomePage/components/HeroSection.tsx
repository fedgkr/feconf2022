import { FC } from 'react';
import styled from '@emotion/styled';

const HeroSection: FC = () => {
  return (
    <Container>
      <Title>Hello FEConf2022</Title>
    </Container>
  );
};

const Container = styled.section`
  position: relative;
  height: 1000px;
`;

const Title = styled.h2`
  text-align: center;
  color: white;
  font-size: 84px;
  margin-top: 240px;
`;

export default HeroSection;
