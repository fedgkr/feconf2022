import { FC } from 'react';
import HeroSection from '~/views/pages/HomePage/sections/HeroSection/HeroSection';
import WarpSection from '~/views/pages/HomePage/sections/WarpSection/WarpSection';
import TrackSection from '~/views/pages/HomePage/sections/TrackSection/TrackSection';
import styled from '@emotion/styled';
import Header from '~/views/pages/HomePage/components/Header';
import SponsorSection from '~/views/pages/HomePage/sections/SponsorSection/SponsorSection';
import TicketSection from '~/views/pages/HomePage/sections/TicketSection/TicketSection';
import CoCSection from '~/views/pages/HomePage/sections/CoCSection/CoCSection';
import NoticeSection from '~/views/pages/HomePage/sections/NoticeSection/NoticeSection';
import Footer from '~/views/pages/HomePage/components/Footer';

const HomePage: FC = () => {
  return (
    <Container>
      <Header />
      <HeroSection />
      <WarpSection />
      <TrackSection />
      <SponsorSection />
      <TicketSection />
      <CoCSection />
      <NoticeSection />
      <Footer />
    </Container>
  );
};

const Container = styled.div``;

export default HomePage;
