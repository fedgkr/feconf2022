import { FC } from 'react';
import styled from '@emotion/styled';
import { DATE, LOCATION } from '~/data/event';
import earthImage from './resources/globe.png';

const HeroSection: FC = () => {
  return (
    <Container>
      <Title>올해도 가보자고!</Title>
      <Info>
        {DATE} {LOCATION}
      </Info>
      <Button>티켓 구매하기</Button>
      <EarthImage
        src={earthImage.src}
        width={earthImage.width}
        height={earthImage.height}
        alt="Earth"
      />
    </Container>
  );
};

const Container = styled.section`
  position: relative;
  padding-top: 266px;
  padding-bottom: 180px;
  text-align: center;
`;

const Title = styled.h2`
  color: white;
  font-size: 100px;
  font-weight: 900;
  letter-spacing: -1px;
`;

const Info = styled.h4`
  margin-top: 32px;
  font-size: 40px;
  font-weight: normal;
  line-height: 1.3;
  color: #b5b5b7;
`;

const Button = styled.a`
  margin-top: 80px;
  display: inline-flex;
  align-items: center;
  padding: 0 48px;
  height: 100px;
  font-size: 24px;
  font-weight: 700;
  color: white;
  border: 3px solid white;
  border-radius: 100px;
  background-color: transparent;
`;

const EarthImage = styled.img`
  margin: 84px auto 0 auto;
`;

export default HeroSection;
