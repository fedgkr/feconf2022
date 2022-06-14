import styled from "@emotion/styled";
import HeroSection from "~/views/ComingSoonPage/components/HeroSection";
import IntroSection from "~/views/ComingSoonPage/components/IntroSection";
import CallForSpeakerSection from "~/views/ComingSoonPage/components/CallForSpeakerSection";
import CallForSponsorSection from "~/views/ComingSoonPage/components/CallForSponsorSection";

const ComingSoonPage = () => {
  return (
    <Container>
      <HeroSection/>
      <IntroSection/>
      <CallForSpeakerSection/>
      <CallForSponsorSection/>
    </Container>
  );
}

const Container = styled.main`
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
`;

export default ComingSoonPage;
