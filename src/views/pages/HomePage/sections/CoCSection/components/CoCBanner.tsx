import { FC } from 'react';
import styled from '@emotion/styled';
import { mobile } from '~/views/pages/HomePage/styles/media-query';

interface Props {
  title: string;
  text: string;
}

const CoCBanner: FC<Props> = ({ title, text }) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Text dangerouslySetInnerHTML={{ __html: text }} />
    </Container>
  );
};

const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 32px 40px 40px 40px;
  background-color: #13151a;
  border-radius: 20px;
  ${mobile`
    padding: 24px;
    margin: 0 20px;
  `}
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: 600;
  line-height: 1.6;
  color: white;
  ${mobile`
    font-size: 16px;
  `}
`;

const Text = styled.p`
  margin-top: 12px;
  font-size: 15px;
  line-height: 1.6;
  letter-spacing: -1px;
  color: #a3aab1;
  a {
    color: #3092f7;
    text-decoration: none;
  }
  ${mobile`
    font-size: 14px;
  `}
`;

export default CoCBanner;
