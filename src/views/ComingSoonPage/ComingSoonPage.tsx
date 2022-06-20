import {FC, useEffect, useState} from "react";
import FullPage, {fullpageOptions as FullPageOptions} from '@fullpage/react-fullpage';

import HeroSection from "~/views/ComingSoonPage/components/HeroSection";
import IntroSection from "~/views/ComingSoonPage/components/IntroSection";
import CallForSpeakerSection from "~/views/ComingSoonPage/components/CallForSpeakerSection";
import CallForSponsorSection from "~/views/ComingSoonPage/components/CallForSponsorSection";
import styled from "@emotion/styled";
import ComingSoonSection from "~/views/ComingSoonPage/components/ComingSoonSection";
import {WarpLine} from "~/views/ComingSoonPage/components/WarpLine";
import {anchors} from "~/views/ComingSoonPage/data/anchors";
import ComingSoonMeta from "~/views/ComingSoonPage/components/ComingSoonMeta";
import {useRouter} from "next/router";

type Section = FC<{ state: SectionState }>;

const sections: Section[] = [
  HeroSection,
  IntroSection,
  CallForSpeakerSection,
  CallForSponsorSection,
  ComingSoonSection,
];

const useFirstPhaseMotion = () => {
  const router = useRouter();
  useEffect(() => {
    const hash = router.asPath.split('#')[1];
    if (hash === anchors[0] || !hash) {
      window.fullpage_api.silentMoveTo(2);
      window.fullpage_api.moveTo(1);
    }
  }, []);
};

const useSlideState = () => {
  const [state, setState] = useState<{ origin: number, target: number, direction: 'up' | 'down' }>({
    origin: null,
    target: null,
    direction: 'down'
  });
  const onLeave: FullPageOptions['onLeave'] = (origin, target, direction) => {
    setState({ origin: origin.index, target: target.index, direction: direction as 'up' | 'down' });
  };
  return { state, onLeave };
}

const ComingSoonPage = () => {
  const { state, onLeave } = useSlideState();
  useFirstPhaseMotion();

  return (
    <Container>
      <ComingSoonMeta/>
      <FixedContainer>
        <WarpLine/>
      </FixedContainer>
      <FullPage
        licenseKey="uobwH@p8"
        anchors={anchors}
        onLeave={onLeave}
        render={() => (
          <FullPage.Wrapper>
            { sections.map((Section, index) => {
              const key = anchors[index];
              const visible = state.target === index;
              const out = state.origin === index;
              return <Section key={key} state={{ visible, out, direction: state.direction }}/>;
            })}
          </FullPage.Wrapper>
        )}
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
