import { FC } from 'react';
import styled from '@emotion/styled';
import { DATE, LOCATION } from '~/data/meta';

const Header: FC = () => {
  return (
    <Container>
      <MenuList>
        <MenuItem>{DATE}</MenuItem>
        <MenuItem>{LOCATION}</MenuItem>
        <MenuItem>
          <Button>티켓 구매하기</Button>
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
`;

const Button = styled.button`
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
`;

export default Header;
