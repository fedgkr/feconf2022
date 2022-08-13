import { FC, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import WarpScene from '~/views/pages/HomePage/sections/WarpSection/components/WarpScene';

const WarpSection: FC = () => {
  return (
    <Container>
      <WarpScene />
    </Container>
  );
};

const sectionRatio = (1440 / 2560) * 100;
const sectionHeight = sectionRatio * 10;

const Container = styled.section`
  position: relative;
  padding-bottom: ${sectionHeight}%;
  background-color: white;
`;

export default WarpSection;
