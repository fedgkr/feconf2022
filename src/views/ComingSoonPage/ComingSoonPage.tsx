import {FC, useRef, useState} from "react";
import FullPage, {fullpageApi as FullPageApi, fullpageOptions as FullPageOptions} from '@fullpage/react-fullpage';

import HeroSection from "~/views/ComingSoonPage/components/HeroSection";
import IntroSection from "~/views/ComingSoonPage/components/IntroSection";
import CallForSpeakerSection from "~/views/ComingSoonPage/components/CallForSpeakerSection";
import CallForSponsorSection from "~/views/ComingSoonPage/components/CallForSponsorSection";
import styled from "@emotion/styled";
import ComingSoonSection from "~/views/ComingSoonPage/components/ComingSoonSection";
import {WarpLine} from "~/views/ComingSoonPage/components/WarpLine";
import {anchors} from "~/views/ComingSoonPage/data/anchors";
import ComingSoonMeta from "~/views/ComingSoonPage/components/ComingSoonMeta";

type Section = FC<{ state: SectionState }>;

const sections: Section[] = [
  HeroSection,
  IntroSection,
  CallForSpeakerSection,
  CallForSponsorSection,
  ComingSoonSection,
];

const ComingSoonPage = () => {
  const [state, setState] = useState<{ origin: number, target: number, direction: 'up' | 'down' }>({
    origin: null,
    target: 0,
    direction: 'down'
  });
  const fpApi = useRef<FullPageApi>(null);
  const onSlideLeave: FullPageOptions['onLeave'] = (origin, target, direction) => {
    setState({ origin: origin.index, target: target.index, direction: direction as 'up' | 'down' });
  };
  return (
    <Container>
      <ComingSoonMeta/>
      <FixedContainer>
        <WarpLine/>
      </FixedContainer>
      <FullPage
        licenseKey="uobwH@p8"
        anchors={anchors}
        onLeave={onSlideLeave}
        dragAndMove={true}
        debug={true}
        render={({fullpageApi}) => {
          fpApi.current = fullpageApi;
          return (
            <FullPage.Wrapper>
              { sections.map((Section, index) => {
                const key = anchors[index];
                const visible = state.target === index;
                const out = state.origin === index;
                return <Section key={key} state={{ visible, out, direction: state.direction }}/>;
              })}
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
  width: 100%;
  height: 100%;
  z-index: 0;
  top: 0;
  left: 0;
  pointer-events: none;
`;

const Container = styled.div`
  background-color: black;
`;

export default ComingSoonPage;
