import { FC, useRef } from 'react';
import styled from '@emotion/styled';
import SpaceshipIcon from '~/views/pages/ComingSoonPage/components/SpaceshipIcon';
import Center from '~/views/pages/ComingSoonPage/components/Center';
import useFadeInOutAnimation from '~/views/pages/ComingSoonPage/hooks/useFadeInOutAnimation';
import SectionContainer from '~/views/pages/ComingSoonPage/components/SectionContainer';
import {
  mobile,
  tablet,
} from '~/views/pages/ComingSoonPage/styles/media-query';
import Portal from '~/views/components/Portal';

interface Props {
  state: SectionState;
}

const HeroSection: FC<Props> = ({ state }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { opacity, scale, transition } = useFadeInOutAnimation(state);
  return (
    <SectionContainer ref={ref}>
      <Center visible={state.visible}>
        <TextWrap style={{ opacity, transform: `scale(${scale})`, transition }}>
          <h2>
            <span>올해도 가보자고</span>
            <SpaceshipIcon />
          </h2>
          <h4>
            국내 최대 프론트엔드 개발 컨퍼런스,
            <br /> FECONF 2022가 찾아옵니다.
          </h4>
        </TextWrap>
      </Center>
      <Portal area="content">
        <ScrollDown style={{ opacity, transition }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
          >
            <path
              d="M4 8L16 16L28 8"
              stroke="#B0BECF"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4 18L16 26L28 18"
              stroke="#B0BECF"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </ScrollDown>
      </Portal>
    </SectionContainer>
  );
};

const TextWrap = styled.div`
  h2 {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 92px;
    font-weight: 900;
    line-height: 1.1;
    color: white;
    svg {
      width: 80px;
      height: 80px;
      margin-left: 24px;
    }
    ${tablet`
      font-size: 48px;
      svg {
        width: 42px;
        height: 42px;
        margin-left: 10px;
      }
    `}
    ${mobile`
      svg {
        position: absolute;
        top: -40px;
        width: 40px;
        height: 40px;
        margin-left: 0;
        margin-top: -16px;
      }
    `}
  }
  h4 {
    margin-top: 24px;
    font-size: 24px;
    font-weight: 600;
    color: #b0becf;
    ${tablet`
      margin-top: 12px;
      font-size: 16px;
    `}
    ${mobile`
      font-size: 16px;
    `}
  }
`;

const ScrollDown = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 64px;
  pointer-events: none;
  svg {
    display: block;
    width: 32px;
    height: 32px;
    margin: 0 auto;
    animation: arrow 2.4s ease-in-out infinite;
  }
  ${tablet`
    bottom: 32px;
    svg {
      width: 24px;
      height: 24px;
    }
  `}
  @keyframes arrow {
    0% {
      opacity: 1;
      transform: translateY(0);
    }
    60% {
      opacity: 0.6;
      transform: translateY(12px);
    }
    0% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export default HeroSection;
