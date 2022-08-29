import { FC, memo, useContext } from 'react';
import styled from '@emotion/styled';
import WarpScene from '~/views/pages/HomePage/sections/WarpSection/components/WarpScene';
import BackgroundContext from '~/views/pages/HomePage/sections/WarpSection/contexts/BackgroundContext';

const WarpSection: FC = memo(() => {
  const { active } = useContext(BackgroundContext);
  return (
    <Container active={active}>
      <WarpScene />
    </Container>
  );
});
WarpSection.displayName = 'WarpSection';

const sectionRatio = (1440 / 2560) * 100;
const sectionHeight = sectionRatio * 10;

const Container = styled.section<{ active: boolean }>`
  position: relative;
  padding-bottom: ${sectionHeight}%;
  transition: background-image 800ms ease-in;
  background: #000;
  mix-blend-mode: screen;
  &::before {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    background-image: linear-gradient(transparent 0%, #0a132a 10%, #304ab7);
    opacity: ${({ active }) => (active ? 1 : 0)};
    transition: opacity 300ms ease-out;
  }
`;

export default WarpSection;
