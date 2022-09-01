import { FC, useContext, useRef } from 'react';
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
import BackgroundContext from '~/views/pages/HomePage/sections/WarpSection/contexts/BackgroundContext';

const SponsorSection: FC = () => {
  const { active } = useContext(BackgroundContext);
  const containerRef = useRef<HTMLDivElement>();
  const visible = useIntersection(containerRef, {
    once: true,
    rootMargin: '-200px 0px',
  });
  return (
    <Container ref={containerRef} active={active}>
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

const Container = styled.section<{ active: boolean }>`
  position: relative;
  padding-top: 120px;
  padding-bottom: 320px;
  &::before {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    background-image: linear-gradient(#5e53ce, #8a5ee2);
    opacity: ${({ active }) => (active ? 1 : 0)};
    transition: opacity 300ms ease-out;
  }
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
