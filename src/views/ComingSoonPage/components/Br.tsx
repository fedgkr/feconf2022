import styled from "@emotion/styled";
import { mobile, tablet } from "~/views/ComingSoonPage/styles/media-query";

// PC Br
export const PBr = styled.br`
  display: block;
  ${tablet`
    display: none;
  `}
`;

// Tablet Br
export const TBr = styled.br`
  display: none;
  ${tablet`
    display: block;
  `}
  ${mobile`
    display: none;
  `}
`;

// Mobile Br
export const MBr = styled.br`
  display: none;
  ${mobile`
    display: block;
  `}
`;
