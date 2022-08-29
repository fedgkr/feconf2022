import { FC } from 'react';
import styled from '@emotion/styled';
import logo from '../resources/images/logo.png';
import { EMAIL } from '~/resources/meta';
import { mobile } from '~/views/pages/HomePage/styles/media-query';

const Footer: FC = () => {
  return (
    <Container>
      <Logo src={logo.src} alt="FEConf" />
      <LinkWrap>
        <Link>FEConf 2021</Link>
        <Divider>|</Divider>
        <Link>프론트엔드개발그룹</Link>
        <Divider>|</Divider>
        <Link href={`mailto:${EMAIL}`}>{EMAIL}</Link>
      </LinkWrap>
      <Right>© FEConf. 2022 All rights reserved.</Right>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1100px;
  height: 120px;
  margin: 120px auto 0 auto;
  padding: 0 24px;
  ${mobile`
    width: 100%;
    height: 100px;
  `}
`;

const Logo = styled.img`
  width: 86px;
  height: 38px;
`;

const LinkWrap = styled.div`
  display: flex;
  align-items: center;
  color: #acacac;
  ${mobile`
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
  `}
`;

const Link = styled.a`
  color: #acacac;
  font-size: 14px;
  line-height: 1.6;
`;

const Divider = styled.span`
  display: inline-block;
  margin: 0 12px;
  ${mobile`
    display: none;
  `}
`;

const Right = styled.span`
  font-size: 12px;
  line-height: 1.6;
  color: #595d68;
  ${mobile`
    display: none;
  `}
`;

export default Footer;
