import { FC } from 'react';
import styled from '@emotion/styled';
import earthImage from '../../resources/images/globe.png';
import { DATE, LOCATION } from '~/resources/meta';
import useTicketButton from '~/views/pages/HomePage/hooks/useTicketButton';
import { mobile } from '~/views/pages/HomePage/styles/media-query';
import { Earth } from '../../components/Earth';

const TicketSection: FC = () => {
  const { text, props } = useTicketButton();
  return (
    <Container>
      <EarthContainer>
        <Earth offset={0.4} scaleOffset={-0.1}  />
      </EarthContainer>
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
  padding: 200px 0;
  text-align: center;
  overflow: hidden;
  // mix-blend-mode: screen;
  ${mobile`
    padding: 60px 0 80px 0;
  `}
`;
const EarthContainer = styled.div`
position: relative;
height: 897px;
overflow: hidden;
${mobile`
height: 763px;
`}

canvas {
  position: absolute;
  left: 0;
  bottom: 190px;
  width: 100%;
  height: 100%;
  pointer-events: none;
  opacity: 0.7;
  ${mobile`
bottom: 104px;
`}
}
`;

const TextWrap = styled.div`
  position: absolute;
  bottom: 200px;
  width: 100%;
  z-index: 1;
  ${mobile`
  bottom: 80px;
`}
`;

const Title = styled.h2`
  font-size: 72px;
  line-height: 1.3;
  font-weight: 900;
  color: white;
  ${mobile`
    font-size: 28px;
  `}
`;

const SubText = styled.p`
  margin-top: 24px;
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
  margin-top: 48px;
  padding: 0 32px;
  height: 72px;
  border: 3px solid #ffffff;
  border-radius: 33px;
  font-size: 20px;
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
