import { FC } from 'react';
import styled from '@emotion/styled';
import earthImage from '../../resources/globe.png';
import { DATE, LOCATION } from '~/data/event';

const TicketSection: FC = () => {
  return (
    <Container>
      <EarthImage
        src={earthImage.src}
        width={1196}
        height={754}
        alt="Earth"
        onMouseDown={(evt) => evt.preventDefault()}
      />
      <TextWrap>
        <Title>
          당신의 다음 모험을
          <br />
          펼쳐보세요
        </Title>
        <SubText>
          {DATE} {LOCATION}
        </SubText>
        <Button>티켓 구매하기</Button>
      </TextWrap>
    </Container>
  );
};

const Container = styled.section`
  padding: 200px 0 160px 0;
  text-align: center;
`;

const EarthImage = styled.img`
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  user-select: none;
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
`;

const SubText = styled.p`
  margin-top: 60px;
  font-size: 28px;
  line-height: 1.4;
  color: #dfdfdf;
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
`;

export default TicketSection;
