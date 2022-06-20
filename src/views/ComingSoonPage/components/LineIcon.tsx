import {FC} from "react";
import styled from "@emotion/styled";
import usePathLength from "~/views/ComingSoonPage/hooks/usePathLength";
import {tablet} from "~/views/ComingSoonPage/styles/media-query";

interface Props {
  visible: boolean;
}

const animation = 'lineDash 800ms 600ms cubic-bezier(0.33, 1, 0.68, 1) forwards';

const LineIcon: FC<Props> = ({ visible}) => {
  const { ref, length } = usePathLength();
  return (
    <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 27" fill="none">
      <defs>
        <clipPath id="lineClipPath">
          <rect x="0" y="0" width="0" height="27" style={{ animation: visible ? animation : '' }} />
        </clipPath>
      </defs>
      <path
        ref={ref}
        style={{ strokeDashoffset: length, strokeDasharray: length }}
        d="M9.48996 25.8321C12.3312 25.2243 15.4028 24.9811 18.3208 24.738C20.0102 24.6164 21.6228 24.5557 23.3122 24.4949C25.6927 24.3733 28.0732 24.3125 30.5304 24.3125C35.1378 24.2518 39.6685 24.191 44.2759 24.191C53.4139 24.191 62.5519 24.1302 71.7667 23.7655C81.2887 23.4008 90.7338 23.0361 100.256 22.6714C109.24 22.3068 118.225 21.9421 127.286 21.6989C136.27 21.395 145.332 21.1519 154.316 20.7264C163.531 20.2402 172.746 19.9971 181.96 19.8147C186.337 19.6932 190.715 19.5716 195.092 19.2069C197.395 19.0246 199.622 18.7814 201.926 18.5383C204.153 18.2952 206.38 18.1736 208.607 17.9913C210.68 17.8089 212.676 17.8697 214.75 17.9913C216.209 17.8697 217.361 17.2619 218.129 16.2286C218.512 15.56 218.973 14.9522 219.357 14.2836C220.125 12.5817 220.509 10.8191 220.432 8.99564C220.432 7.1722 220.125 5.40954 219.357 3.70766C218.973 3.03907 218.512 2.43125 218.129 1.76266C217.361 0.729376 216.286 0.182344 214.75 0C213.598 0.0607813 212.523 0.182344 211.371 0.243125C210.373 0.303907 209.298 0.303907 208.299 0.303907C206.073 0.303907 203.922 0.364688 201.695 0.425469C197.088 0.547032 192.557 0.790157 187.95 0.91172C179.042 1.09406 170.135 1.15485 161.304 1.58031C156.543 1.82344 151.782 2.06657 147.021 2.24891C142.721 2.43125 138.344 2.55282 134.043 2.67438C124.829 2.9175 115.614 3.28219 106.399 3.64688C97.3378 4.01157 88.1998 4.37626 79.1385 4.74094C74.1472 4.92329 69.0791 5.16641 64.0877 5.34876C59.5571 5.5311 55.1033 5.5311 50.5726 5.59188C41.3578 5.65266 32.143 5.71345 22.9282 6.13892C20.6245 6.26048 18.3976 6.38204 16.1707 6.62517C14.3277 6.80751 12.4848 7.05064 10.7186 7.35454C9.33638 7.59767 7.95416 7.96236 6.64873 8.32704C5.88083 8.50939 5.11293 8.87408 4.42182 9.23876C3.0396 10.0897 2.11812 11.1838 1.58059 12.521C0.351947 15.0738 0.198367 18.1128 0.735897 20.7872C1.04306 22.3675 1.73417 23.8871 2.80923 25.2243C3.34676 25.6497 3.88429 26.0752 4.42182 26.5007C5.65046 27.1085 6.8791 27.1085 8.03095 26.5007C8.33811 26.2575 8.95243 26.0144 9.48996 25.8321Z"
        fill="#57B0F8" clipPath="url(#lineClipPath)" />
    </SVG>
  );
}

const SVG = styled.svg`
  position: absolute;
  width: 220px;
  height: 27px;
  left: -10px;
  bottom: -2px;
  z-index: -1;

  ${tablet`
    width: 117px;
    height: 14px;
    bottom: -3px;
    left: -5px;
  `}

  @keyframes lineDash {
    to {
      width: 220px;
    }
  }
`;

export default LineIcon;
