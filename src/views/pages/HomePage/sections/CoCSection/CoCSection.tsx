import { FC, useRef } from 'react';
import styled from '@emotion/styled';
import COC from '~/views/pages/HomePage/sections/CoCSection/resources/coc';
import CoCBanner from '~/views/pages/HomePage/sections/CoCSection/components/CoCBanner';
import { mobile } from '~/views/pages/HomePage/styles/media-query';
import { useIntersection } from 'use-intersection';
import FadeInUp from '~/views/pages/HomePage/components/FadeInUp';

const CoCSection: FC = () => {
  const containerRef = useRef<HTMLDivElement>();
  const visible = useIntersection(containerRef, {
    once: true,
    rootMargin: '-200px 0px',
  });
  return (
    <Container ref={containerRef}>
      <FadeInUp visible={visible} delay={0}>
        <Title>Code Of Conduct</Title>
      </FadeInUp>

      <FadeInUp visible={visible} delay={100}>
        <SubText>
          FEConf에 참여하는 모든 분은 다음 사항을 준수해 주세요.
        </SubText>
      </FadeInUp>

      <List>
        {COC.map((data, index) => (
          <FadeInUp
            key={data.title}
            visible={visible}
            delay={200 + 100 * index}
          >
            <CoCBanner {...data} />
          </FadeInUp>
        ))}
      </List>
    </Container>
  );
};

const Container = styled.section`
  position: relative;
  padding: 120px 0 160px 0;
  ${mobile`
    padding: 60px 0 80px 0;
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
