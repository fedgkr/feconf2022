import styled from "@emotion/styled";
import {FC, HTMLAttributes, ReactNode} from "react";

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

const Button = styled.a`
  display: inline-block;
  padding: 24px 36px;
  font-size: 16px;
  font-weight: 600;
  color: white;
  line-height: 1.2;
  border-radius: 100px;
  border: 1px solid white;
  background-color: transparent;
`;

export default ApplyButton;
