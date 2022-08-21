import { FC, useEffect, useState } from 'react';
import FullPage, {
  fullpageOptions as FullPageOptions,
} from '@fullpage/react-fullpage';

import HeroSection from '~/views/pages/ComingSoonPage/components/HeroSection';
import IntroSection from '~/views/pages/ComingSoonPage/components/IntroSection';
import CallForSpeakerSection from '~/views/pages/ComingSoonPage/components/CallForSpeakerSection';
import CallForSponsorSection from '~/views/pages/ComingSoonPage/components/CallForSponsorSection';
import styled from '@emotion/styled';
import ComingSoonSection from '~/views/pages/ComingSoonPage/components/ComingSoonSection';
import { anchors } from '~/views/pages/ComingSoonPage/data/anchors';
import ComingSoonMeta from '~/views/pages/ComingSoonPage/components/ComingSoonMeta';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { WarpLineProps } from '~/views/pages/ComingSoonPage/components/WarpLine';

const WarpLine = dynamic<WarpLineProps>(() =>
  import('~/views/pages/ComingSoonPage/components/WarpLine').then(
    (module) => module.WarpLine
  )
);

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
  const [state, setState] = useState<{
    origin: number;
    target: number;
    direction: 'up' | 'down';
  }>({
    origin: null,
    target: null,
    direction: 'down',
  });
  const onLeave: FullPageOptions['onLeave'] = (origin, target, direction) => {
    setState({
      origin: origin.index,
      target: target.index,
      direction: direction as 'up' | 'down',
    });
  };
  return { state, onLeave };
};

const ComingSoonPage = () => {
  const { state, onLeave } = useSlideState();
  useFirstPhaseMotion();

  return (
    <Container>
      <ComingSoonMeta />
      <FixedContainer>
        <WarpLine target={state.target} />
        <div className="gradient"></div>
      </FixedContainer>
      <FullPage
        licenseKey="uobwH@p8"
        anchors={anchors}
        onLeave={onLeave}
        render={() => (
          <FullPage.Wrapper>
            {sections.map((Section, index) => {
              const key = anchors[index];
              const visible = state.target === index;
              const out = state.origin === index;
              return (
                <Section
                  key={key}
                  state={{ visible, out, direction: state.direction }}
                />
              );
            })}
          </FullPage.Wrapper>
        )}
      />
      <div id="content" />
    </Container>
  );
};

const Container = styled.div``;

const FixedContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 0;
  top: 0;
  left: 0;
  pointer-events: none;

  .gradient {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    background: radial-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0));
  }
`;

export default ComingSoonPage;
