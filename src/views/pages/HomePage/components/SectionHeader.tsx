import { FC, ReactNode } from 'react';
import styled from '@emotion/styled';

interface Props {
  children: ReactNode;
}

const SectionHeader: FC<Props> = ({ children }) => {
  return <Container>{children}</Container>;
};

const Container = styled.div`
  margin-bottom: 120px;
  text-align: center;
  color: white;
`;

export default SectionHeader;
