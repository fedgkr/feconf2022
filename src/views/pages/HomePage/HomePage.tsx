import { FC } from 'react';
import HeroSection from '~/views/pages/HomePage/sections/HeroSection/HeroSection';
import WarpSection from '~/views/pages/HomePage/sections/WarpSection/WarpSection';
import TrackSection from '~/views/pages/HomePage/sections/TrackSection/TrackSection';
import styled from '@emotion/styled';
import Header from '~/views/pages/HomePage/components/Header';
import SponsorSection from '~/views/pages/HomePage/sections/SponsorSection/SponsorSection';

const HomePage: FC = () => {
  return (
    <Container>
      <Header />
      {/* <HeroSection /> */}
      {/* <WarpSection /> */}
      <TrackSection />
      <SponsorSection />
    </Container>
  );
};

const Container = styled.div``;

export default HomePage;
