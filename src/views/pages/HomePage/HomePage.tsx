import { FC } from 'react';
import StarSection from '~/views/pages/HomePage/sections/StarSection/StarSection';
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
import HomePageMeta from '~/views/pages/HomePage/components/HomePageMeta';
import { BackgroundContextProvider } from '~/views/pages/HomePage/sections/WarpSection/contexts/BackgroundContext';
import { SessionInfoModalProvider } from '~/views/pages/HomePage/contexts/SessionInfoModalContext';
import SessionInfoModal from '~/views/pages/HomePage/components/SessionInfoModal/SessionInfoModal';

const HomePage: FC = () => {
  return (
    <SessionInfoModalProvider>
      <Container>
        <HomePageMeta />
        <Header />
        <StarSection />
        <HeroSection />
        <BackgroundContextProvider>
          <WarpSection />
          <TrackSection />
          <SponsorSection />
        </BackgroundContextProvider>
        <TicketSection />
        <CoCSection />
        <NoticeSection />
        <Footer />
        <SessionInfoModal />
      </Container>
    </SessionInfoModalProvider>
  );
};

const Container = styled.div``;

export default HomePage;
