import { FC } from 'react';
import styled from '@emotion/styled';
import earthImage from '../../resources/globe.png';
import { DATE, LOCATION } from '~/resources/meta';
import useTicketButton from '~/views/pages/HomePage/hooks/useTicketButton';
import { mobile } from '~/views/pages/HomePage/styles/media-query';
import { Earth } from '../../components/Earth';

const TicketSection: FC = () => {
  const { text, props } = useTicketButton();
  return (
    <Container>
      <Earth offset={0.4}/>
      <TextWrap>
        <Title>
          다양한 기술을 익히며
          <br />
          함께 성장해요
        </Title>
        <SubText>
          {DATE} {LOCATION}
        </SubText>
        <Button {...props}>{text}</Button>
      </TextWrap>
    </Container>
  );
};

const Container = styled.section`
  position: relative;
  width: 100%;
  padding: 200px 0 160px 0;
  text-align: center;
  overflow: hidden;
  background-image: linear-gradient(#000, #000);
  mix-blend-mode: screen;
  ${mobile`
    padding: 80px 0 100px 0;
  `}
  canvas {
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const TextWrap = styled.div`
  position: relative;
  margin-top: 546px;
  z-index: 1;
`;

const Title = styled.h2`
  font-size: 80px;
  font-weight: 900;
  line-height: 1.3;
  color: white;
  ${mobile`
    font-size: 28px;
  `}
`;

const SubText = styled.p`
  margin-top: 60px;
  font-size: 28px;
  line-height: 1.4;
  color: #dfdfdf;
  ${mobile`
    margin-top: 16px;
    font-size: 18px;
  `}
`;

const Button = styled.a`
  display: inline-flex;
  align-items: center;
  margin-top: 120px;
  padding: 0 48px;
  height: 100px;
  border: 3px solid #ffffff;
  border-radius: 100px;
  font-size: 24px;
  font-weight: 700;
  color: white;
  ${mobile`
    margin-top: 48px;
    padding: 0 24px;
    height: 56px;
    font-size: 16px;
    border: 2px solid #ffffff;
  `}
`;

export default TicketSection;
