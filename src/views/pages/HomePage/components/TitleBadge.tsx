import { FC, PropsWithChildren } from 'react';
import styled from '@emotion/styled';
import { mobile } from '~/views/pages/HomePage/styles/media-query';

const TitleBadge: FC<PropsWithChildren> = ({ children }) => {
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
  ${mobile`
    font-size: 14px;
    padding: 0 16px;
    height: 28px;
  `}
`;

export default TitleBadge;
