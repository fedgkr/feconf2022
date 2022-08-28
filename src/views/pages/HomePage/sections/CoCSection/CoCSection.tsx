import { FC } from 'react';
import styled from '@emotion/styled';
import COC from '~/views/pages/HomePage/sections/CoCSection/resources/coc';
import CoCBanner from '~/views/pages/HomePage/sections/CoCSection/components/CoCBanner';

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
`;

const Title = styled.h2`
  font-size: 48px;
  font-weight: 700;
  line-height: 1.4;
  color: white;
  text-align: center;
`;

const SubText = styled.p`
  margin-top: 12px;
  color: #a3aab1;
  font-size: 16px;
  line-height: 1.6;
  text-align: center;
`;

const List = styled.div`
  margin-top: 60px;
  & > div:not(:first-of-type) {
    margin-top: 16px;
  }
`;

export default CoCSection;
