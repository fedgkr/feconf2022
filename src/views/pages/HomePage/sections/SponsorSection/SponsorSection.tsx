import { FC } from 'react';
import styled from '@emotion/styled';
import TitleBadge from '~/views/pages/HomePage/components/TitleBadge';
import SectionTitle from '~/views/pages/HomePage/components/SectionTitle';
import SectionHeader from '~/views/pages/HomePage/components/SectionHeader';
import SponsorList from '~/views/pages/HomePage/sections/SponsorSection/components/SponsorList';

const SponsorSection: FC = () => {
  return (
    <Container>
      <SectionHeader>
        <TitleBadge>후원사</TitleBadge>
        <SectionTitle>
          FEConf 2022를
          <br /> 함께 만드는 회사를 소개합니다.
        </SectionTitle>
      </SectionHeader>
      <List>
        <SponsorList grade="diamond" />
        <SponsorList grade="platinum" />
        <SponsorList grade="gold" />
      </List>
    </Container>
  );
};

const Container = styled.section`
  margin-top: 120px;
`;

const List = styled.div`
  & > div:not(:last-child) {
    margin-bottom: 86px;
  }
`;

export default SponsorSection;
