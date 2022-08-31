import { FC } from 'react';
import styled from '@emotion/styled';
import { DATE, LOCATION, LOCATION_LINK } from '~/resources/meta';
import useTicketButton from '~/views/pages/HomePage/hooks/useTicketButton';
import { mobile } from '~/views/pages/HomePage/styles/media-query';
import SafeLink from '~/views/components/SafeLink';

const Header: FC = () => {
  const { text, props } = useTicketButton();
  return (
    <Container>
      <MenuList>
        <MenuItem>{DATE}</MenuItem>
        <MenuItem>
          <SafeLink href={LOCATION_LINK}>{LOCATION}</SafeLink>
        </MenuItem>
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
  justify-content: center;
  width: 100%;
  height: 60px;
  background-color: rgb(20, 20, 20);
  z-index: 1;
  ${mobile`
    height: 68px;
    padding: 20px 22px;
  `}
`;

const MenuList = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 960px;
`;

const MenuItem = styled.li`
  color: #cfcfcf;
  font-size: 15px;
  line-height: 24px;
  a {
    color: inherit;
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
  padding: 0 12px;
  height: 36px;
  font-size: 14px;
  font-weight: 600;
  color: #cfcfcf;
  border-radius: 18px;
  line-height: 32px;
  box-sizing: border-box;
  border: 1px solid #cfcfcf;
  ${mobile`
    height: 40px;
    padding: 0 16px;
    font-size: 14px;
  `}
`;

export default Header;
