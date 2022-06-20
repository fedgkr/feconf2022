import {FC} from "react";
import styled from "@emotion/styled";
import SafeLink from "~/views/components/SafeLink";
import {tablet} from "~/views/ComingSoonPage/styles/media-query";
import {FACEBOOK_FRONTEND_URL, FECONF_EMAIL} from "~/views/ComingSoonPage/data/meta";

interface Props {
  visible: boolean;
}

const Footer: FC<Props> = ({ visible }) => {
  return (
    <Container visible={visible}>
      <Menu>
        <li><Link href="/"><Logo src="/images/logo.png" alt="FECONF"/></Link></li>
        <Item>
          <Link href="https://2021.feconf.kr">FECONF 2021</Link>
          <span>|</span>
          <Link href={FACEBOOK_FRONTEND_URL}>프론트엔드개발그룹</Link>
          <span>|</span>
          <Link href={`mailto:${FECONF_EMAIL}`}>{FECONF_EMAIL}</Link>
        </Item>
        <li><Right>© FEconf. 2022 All rights reserved.</Right></li>
      </Menu>
    </Container>
  );
};

const Container = styled.footer<{ visible: boolean }>`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px;
  background-color: black;
  pointer-events: all;
  transform: translateY(${({ visible }) => visible ? 0 : '100%'});
  transition: transform 300ms ease-in;

  ${tablet`
    display: none;
  `}
`;

const Menu = styled.ul`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1100px;
  li {
    display: flex;
    align-items: center;
    list-style: none;
  }
`;

const Item = styled.li`
  font-size: 14px;
  line-height: 1.6;
  color: #ACACAC;
  & > span {
    display: inline-block;
    margin: 0 12px;
  }
`;

const Right = styled.span`
  font-size: 12px;
  line-height: 1.6;
  color: #595D68;
`;

const Logo = styled.img`
  width: 56px;
`;

const Link = styled(SafeLink)`
  color: #ACACAC;
`;

export default Footer;
