import { FC, useRef } from 'react';
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
import { useIntersection } from 'use-intersection';
import FadeInUp from '~/views/pages/HomePage/components/FadeInUp';

const SponsorSection: FC = () => {
  const containerRef = useRef<HTMLDivElement>();
  const visible = useIntersection(containerRef, {
    once: true,
    rootMargin: '-200px 0px',
  });
  return (
    <Container ref={containerRef}>
      <SectionHeader>
        <FadeInUp visible={visible} delay={0}>
          <TitleBadge>후원사</TitleBadge>
        </FadeInUp>
        <FadeInUp visible={visible} delay={100}>
          <SectionTitle>
            FEConf와 함께 하는 <br />
            기업을 소개합니다.
          </SectionTitle>
        </FadeInUp>
      </SectionHeader>
      <List>
        <FadeInUp visible={visible} delay={200}>
          <SponsorList grade="diamond" list={diamondSponsors} />
        </FadeInUp>
        <FadeInUp visible={visible} delay={300}>
          <SponsorList grade="platinum" list={platinumSponsors} />
        </FadeInUp>
        <FadeInUp visible={visible} delay={400}>
          <SponsorList grade="gold" list={goldSponsors} />
        </FadeInUp>
        <FadeInUp visible={visible} delay={500}>
          <SponsorList grade="rookie" list={rookieSponsors} />
        </FadeInUp>
      </List>
    </Container>
  );
};

const Container = styled.section`
  position: relative;
  padding-top: 120px;
  padding-bottom: 320px;
  background-image: linear-gradient(#5e53ce, #8a5ee2);
  ${mobile`
    padding-top: 60px;
    padding-bottom: 160px;
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
