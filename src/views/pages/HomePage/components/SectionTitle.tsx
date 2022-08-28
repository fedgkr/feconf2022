import { FC, ReactNode } from 'react';
import styled from '@emotion/styled';
import { mobile } from '~/views/pages/HomePage/styles/media-query';

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
  ${mobile`
    margin-top: 24px;
    font-size: 28px
  `}
`;

export default SectionTitle;
