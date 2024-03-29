import { FC, ReactNode } from 'react';
import styled from '@emotion/styled';
import { mobile } from '~/views/pages/HomePage/styles/media-query';

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
  ${mobile`
    margin-bottom: 72px;
  `}
`;

export default SectionHeader;
