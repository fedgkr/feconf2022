import { FC } from 'react';
import styled from '@emotion/styled';
import COC from '~/views/pages/HomePage/sections/CoCSection/resources/coc';
import CoCBanner from '~/views/pages/HomePage/sections/CoCSection/components/CoCBanner';
import { mobile } from '~/views/pages/HomePage/styles/media-query';

const CoCSection: FC = () => {
  return (
    <Container>
      <Title>Code Of Conduct</Title>
      <SubText>FEConf에 참여하는 모든 분은 다음 사항을 준수해주세요.</SubText>
      <List>
        {COC.map((data) => (
          <CoCBanner key={data.title} {...data} />
        ))}
      </List>
    </Container>
  );
};

const Container = styled.section`
  padding: 240px 0 160px 0;
  ${mobile`
    padding: 80px 0 100px 0;
  `}
`;

const Title = styled.h2`
  font-size: 48px;
  font-weight: 700;
  line-height: 1.4;
  color: white;
  text-align: center;
  ${mobile`
    font-size: 28px;
  `}
`;

const SubText = styled.p`
  margin-top: 12px;
  color: #a3aab1;
  font-size: 28px;
  line-height: 1.6;
  text-align: center;
  ${mobile`
    width: 220px;
    margin: 0 auto;
    font-size: 16px;
    word-break: keep-all;
  `}
`;

const List = styled.div`
  margin-top: 60px;
  & > div:not(:first-of-type) {
    margin-top: 16px;
  }
  ${mobile`
    margin-top: 48px;
  `}
`;

export default CoCSection;
