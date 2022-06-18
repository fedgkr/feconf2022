import {useRef, useState} from "react";
import FullPage, { fullpageApi as FullPageApi, fullpageOptions as FullPageOptions } from '@fullpage/react-fullpage';

import HeroSection from "~/views/ComingSoonPage/components/HeroSection";
import IntroSection from "~/views/ComingSoonPage/components/IntroSection";
import CallForSpeakerSection from "~/views/ComingSoonPage/components/CallForSpeakerSection";
import CallForSponsorSection from "~/views/ComingSoonPage/components/CallForSponsorSection";
import styled from "@emotion/styled";
import ComingSoonSection from "~/views/ComingSoonPage/components/ComingSoonSection";
import { WarpLine } from "~/views/ComingSoonPage/components/WarpLine";

const ComingSoonPage = () => {
  const [state, setState] = useState<{ origin: number; target: number; direction: 'up' | 'down' }>({ origin: null, target: 0, direction: 'down' });
  const fpApi = useRef<FullPageApi>(null);
  const onSlideLeave: FullPageOptions['onLeave'] = (origin, target, direction) => {
    setState({ origin: origin.index, target: target.index, direction: direction as 'up' | 'down' });
    // console.log('onSlideLeave', origin, target, direction);
  };
  return (
    <Container>
      <FixedContainer>
        <WarpLine />
      </FixedContainer>
      <FullPage
        onLeave={onSlideLeave}
        render={({ fullpageApi }) => {
          fpApi.current = fullpageApi;
          return (
            <FullPage.Wrapper>
              <HeroSection in={state.target === 0} out={state.origin === 0} direction={state.direction}/>
              <IntroSection in={state.target === 1} out={state.origin === 1} direction={state.direction}/>
              <CallForSpeakerSection in={state.target === 2} out={state.origin === 2} direction={state.direction}/>
              <CallForSponsorSection in={state.target === 3} out={state.origin === 3} direction={state.direction}/>
              <ComingSoonSection in={state.target === 4} out={state.origin === 4} direction={state.direction}/>
            </FullPage.Wrapper>
          );
        }}
      />
      <div id="content"/>
    </Container>
  );
}
const FixedContainer = styled.div`
  position: fixed;
  point-events: none;
  width: 100%;
  height: 100%;
  z-index: 0;
  top: 0;
  left: 0;
`;
const Container = styled.div`
  background-color: black;
`;

export default ComingSoonPage;
