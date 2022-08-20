import { FC, ReactNode } from 'react';
import styled from '@emotion/styled';

interface Props {
  children: ReactNode;
}

const SectionTitle: FC<Props> = ({ children }) => {
  return <Container>{children}</Container>;
};

const Container = styled.h2`
  margin-top: 32px;
  font-size: 48px;
  font-weight: 700;
  line-height: 1.4;
`;

export default SectionTitle;
