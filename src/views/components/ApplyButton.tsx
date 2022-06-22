import styled from "@emotion/styled";
import {FC, HTMLAttributes, ReactNode} from "react";
import SafeLink from "~/views/components/SafeLink";
import {tablet} from "~/views/ComingSoonPage/styles/media-query";

interface Props extends HTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: ReactNode;
}

const ApplyButton: FC<Props> = ({ children, ...rest }) => {
  return (
    <Button target="_blank" rel="noopener noreferrer" { ...rest }>
      { children }
    </Button>
  );
}

const Button = styled(SafeLink)`
  display: inline-block;
  padding: 22px 32px;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.2;
  color: black;
  border-radius: 100px;
  border: 1px solid white;
  background-color: white;
  transition: background-color 300ms, color 300ms;
  &:hover {
    color: white;
    background-color: transparent;
  }
  ${tablet`
    padding: 19px 32px;
    font-size: 14px;
  `}
`;

export default ApplyButton;
