import { FC } from 'react';
import styled from '@emotion/styled';
import TitleBadge from '~/views/pages/HomePage/components/TitleBadge';
import SectionTitle from '~/views/pages/HomePage/components/SectionTitle';
import SectionHeader from '~/views/pages/HomePage/components/SectionHeader';
import SponsorList from '~/views/pages/HomePage/sections/SponsorSection/components/SponsorList';
import {
  diamondSponsors,
  goldSponsors,
  platinumSponsors,
  rookieSponsors,
} from '~/views/pages/HomePage/sections/SponsorSection/resources/sponsors';
import { mobile } from '~/views/pages/HomePage/styles/media-query';

const SponsorSection: FC = () => {
  return (
    <Container>
      <SectionHeader>
        <TitleBadge>후원사</TitleBadge>
        <SectionTitle>
          FEConf 2022를 함께 만드는 <br />
          회사를 소개합니다.
        </SectionTitle>
      </SectionHeader>
      <List>
        <SponsorList grade="diamond" list={diamondSponsors} />
        <SponsorList grade="platinum" list={platinumSponsors} />
        <SponsorList grade="gold" list={goldSponsors} />
        <SponsorList grade="rookie" list={rookieSponsors} />
      </List>
    </Container>
  );
};

const Container = styled.section`
  padding-top: 120px;
  padding-bottom: 280px;
  background-image: linear-gradient(#5e53ce, #8a5ee2);
  ${mobile`
    padding-top: 80px;
  `}
`;

const List = styled.div`
  & > div:not(:last-child) {
    margin-bottom: 86px;
  }
  ${mobile`
    & > div:not(:last-child) {
      margin-bottom: 40px;
    }
  `}
`;

export default SponsorSection;
