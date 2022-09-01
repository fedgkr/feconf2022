import { FC } from 'react';
import styled from '@emotion/styled';
import { mobile } from '~/views/pages/HomePage/styles/media-query';
import useTicketButton from '~/views/pages/HomePage/hooks/useTicketButton';

const ReserveButton: FC = () => {
  const { text, props } = useTicketButton();
  return <Button {...props}>{text}</Button>;
};

const Button = styled.a`
  margin-top: 48px;
  display: inline-flex;
  align-items: center;
  padding: 0 32px;
  height: 72px;
  font-size: 20px;
  font-weight: 700;
  color: white;
  border: 3px solid white;
  border-radius: 100px;
  background-color: transparent;

  ${mobile`
    margin-top: 48px;
    padding: 0 24px;
    height: 56px;
    font-size: 16px;
  `}
`;

export default ReserveButton;
