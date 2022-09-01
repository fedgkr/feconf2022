import { FC } from 'react';
import styled from '@emotion/styled';
import usePathLength from '~/views/pages/ComingSoonPage/hooks/usePathLength';
import { tablet } from '~/views/pages/ComingSoonPage/styles/media-query';

interface Props {
  visible: boolean;
}

const animation =
  'circleDash 500ms 600ms cubic-bezier(0.33, 1, 0.68, 1) forwards';

const CircleIcon: FC<Props> = ({ visible }) => {
  const { ref, length } = usePathLength();

  return (
    <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 193 95" fill="none">
      <path
        ref={ref}
        style={{
          strokeDashoffset: length,
          strokeDasharray: length,
          animation: visible ? animation : '',
        }}
        d="M165.752 12.0096C150.442 3.58801 104.51 -3.52935 50.1581 12.9316C-17.2674 33.3518 -8.00087 76.5527 50.1581 87.1938C81.5411 92.9358 120.295 95.9406 156.563 81.9901C196.373 66.6767 214.942 19.0382 129.005 12.9316C121.835 12.4221 113.942 12.2038 105.276 12.3218"
        stroke="#57B0F8"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </SVG>
  );
};

const SVG = styled.svg`
  position: absolute;
  width: 193px;
  height: 95px;
  top: -15px;
  left: -20px;
  z-index: -1;

  ${tablet`
    width: 124px;
    height: 60px;
    top: -12px;
    left: -15px;
  `}

  @keyframes circleDash {
    to {
      stroke-dashoffset: 0;
    }
  }
`;

export default CircleIcon;
