import { FC, useRef } from 'react';
import styled from '@emotion/styled';
import useFadeInOutAnimation from '~/views/pages/ComingSoonPage/hooks/useFadeInOutAnimation';
import SectionContainer from '~/views/pages/ComingSoonPage/components/SectionContainer';
import Center from '~/views/pages/ComingSoonPage/components/Center';
import { tablet } from '~/views/pages/ComingSoonPage/styles/media-query';
import { MBr, PBr, TBr } from '~/views/pages/ComingSoonPage/components/Br';

interface Props {
  state: SectionState;
}

const IntroSection: FC<Props> = ({ state }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { opacity, scale, transition } = useFadeInOutAnimation(state);
  return (
    <SectionContainer ref={ref}>
      <Center visible={state.visible}>
        <TextWrap style={{ opacity, transform: `scale(${scale})`, transition }}>
          <p>
            프론트엔드 엔지니어의 다양한 도전과 경험, <PBr />
            <TBr /> 개발
            <MBr />
            하며 마주한 치열한 고민과 깊은 인사이트를 나누
            <MBr />고 <PBr />
            <TBr /> 새로운 기술을 익히며 함께 성장해요.
          </p>
        </TextWrap>
      </Center>
    </SectionContainer>
  );
};

const TextWrap = styled.div`
  width: 100%;
  text-align: center;
  opacity: 1;
  transform: scale(1);
  p {
    margin: 0 auto;
    color: #b0becf;
    font-size: 24px;
    font-weight: 600;
    line-height: 1.6;
  }
  ${tablet`
    p {
      font-size: 16px;
    }
  `}
`;

export default IntroSection;
