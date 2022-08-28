import { FC } from 'react';
import styled from '@emotion/styled';
import { DATE, LOCATION } from '~/resources/meta';
import useTicketButton from '~/views/pages/HomePage/hooks/useTicketButton';
import { mobile } from '~/views/pages/HomePage/styles/media-query';

const Header: FC = () => {
  const { text, props } = useTicketButton();
  return (
    <Container>
      <MenuList>
        <MenuItem>{DATE}</MenuItem>
        <MenuItem>{LOCATION}</MenuItem>
        <MenuItem>
          <Button {...props}>{text}</Button>
        </MenuItem>
      </MenuList>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100px;
  background-color: rgba(255, 255, 255, 0.08);
  z-index: 1;
  ${mobile`
    height: 68px;
    padding: 20px 22px;
  `}
`;

const MenuList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const MenuItem = styled.li`
  color: #7d8288;
  font-size: 24px;
  line-height: 1.6;
  &:not(:last-child) {
    margin-right: 191px;
  }
  ${mobile`
    font-size: 15px;
    &:not(:last-child) {
      margin-right: auto;
    }
    &:nth-of-type(2) {
      display: none;
    }
  `}
`;

const Button = styled.a`
  display: flex;
  align-items: center;
  padding: 0 20px;
  height: 48px;
  font-size: 16px;
  font-weight: 700;
  color: white;
  border: none;
  border-radius: 100px;
  background-color: #2f69ff;
  ${mobile`
    height: 40px;
    padding: 0 16px;
    font-size: 14px;
  `}
`;

export default Header;
