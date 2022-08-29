import { FC } from 'react';
import styled from '@emotion/styled';
import logo from '../../resources/main-logo.png';
import { DATE, LOCATION } from '~/resources/meta';
import { Earth } from '../../components/Earth';
import {
  useWindowScrollTop,
  useWindowHeight,
} from '../../hooks/useWindowScroll';
import { StarCanvas } from '../../components/StarCanvas';
import { mobile } from '~/views/pages/HomePage/styles/media-query';
import useTicketButton from '~/views/pages/HomePage/hooks/useTicketButton';
import preventDefault from '~/views/pages/HomePage/utils/preventDefault';

const StarSection: FC = () => {
  return (
      <Container>
        <StarCanvas />
      </Container>
  );
};

const Container = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;

  .star-canvas {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
`;

export default StarSection;