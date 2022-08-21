import { FC } from 'react';
import styled from '@emotion/styled';
import Portal from '~/views/components/Portal';
import { Earth } from './Earth';
import useFadeInOutAnimation from '~/views/pages/ComingSoonPage/hooks/useFadeInOutAnimation';
import SectionContainer from '~/views/pages/ComingSoonPage/components/SectionContainer';
import Center from '~/views/pages/ComingSoonPage/components/Center';
import Footer from '~/views/pages/ComingSoonPage/components/Footer';
import { tablet } from '~/views/pages/ComingSoonPage/styles/media-query';
import LineIcon from '~/views/pages/ComingSoonPage/components/LineIcon';

interface Props {
  state: SectionState;
}

const ComingSoonSection: FC<Props> = ({ state }) => {
  const { opacity, scale, transition } = useFadeInOutAnimation(state);
  return (
    <SectionContainer>
      <Center visible={state.visible}>
        <TextWrap style={{ opacity, transform: `scale(${scale})`, transition }}>
          <h2>
            마침내,{' '}
            <span>
              오프라인
              <LineIcon visible={state.visible} />
            </span>
            에서
          </h2>
          <p>10월 8일, 잠실 롯데타워에서 만나요.</p>
        </TextWrap>
      </Center>
      <Portal area="content">
        <FixedWrap style={{ pointerEvents: 'none', zIndex: 0 }}>
          <Earth fadeIn={state.visible} />
        </FixedWrap>
        <Footer visible={state.visible} />
      </Portal>
    </SectionContainer>
  );
};

const FixedWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TextWrap = styled.div`
  text-align: center;

  h2 {
    font-weight: 700;
    font-size: 60px;
    line-height: 130%;
    color: #ffffff;
    span {
      position: relative;
    }
  }
  p {
    margin: 32px auto 0 auto;
    color: #c8ccd5;
    font-size: 24px;
    font-weight: 600;
    line-height: 1.6;
  }

  ${tablet`
    h2 {
      font-size: 32px;
    }
    p {
      margin: 16px auto 0 auto;
      font-size: 16px;
    }
  `}
`;

export default ComingSoonSection;
