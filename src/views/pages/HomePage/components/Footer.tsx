import { FC } from 'react';
import styled from '@emotion/styled';
import logo from '../resources/logo.png';
import { EMAIL } from '~/resources/meta';

const Footer: FC = () => {
  return (
    <Container>
      <Logo src={logo.src} width={56} height={33} alt="FEConf" />
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
`;

const Logo = styled.img``;

const LinkWrap = styled.div`
  display: flex;
  align-items: center;
  color: #acacac;
`;

const Link = styled.a`
  color: #acacac;
  font-size: 14px;
  line-height: 1.6;
`;

const Divider = styled.span`
  display: inline-block;
  margin: 0 12px;
`;

const Right = styled.span`
  font-size: 12px;
  line-height: 1.6;
  color: #595d68;
`;

export default Footer;
