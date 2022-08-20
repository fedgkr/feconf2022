import { FC, ReactNode } from 'react';
import styled from '@emotion/styled';

interface Props {
  children: ReactNode;
}

const TitleBadge: FC<Props> = ({ children }) => {
  return <Container>{children}</Container>;
};

const Container = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0 20px;
  height: 40px;
  font-size: 20px;
  font-weight: 600;
  border-radius: 100px;
  border: 1px solid white;
`;

export default TitleBadge;
