import { FC } from 'react';
import styled from '@emotion/styled';
import { Sponsor } from '~/types/event';
import { mobile, tablet } from '~/views/pages/HomePage/styles/media-query';
import slice from 'lodash/slice';
import size from 'lodash/size';
import gt from 'lodash/gt';

interface Props {
  grade: 'diamond' | 'gold' | 'platinum' | 'rookie';
  list: Sponsor[];
}

const SponsorList: FC<Props> = ({ grade, list }) => {
  const firstRow = slice(list, 0, 3);
  const secondRow = slice(list, 3, list.length);
  return (
    <Container>
      <Title>{grade}</Title>
      <MobileList>
        <MobileRow>
          {firstRow.map((sponsor) => (
            <Item key={sponsor.name} href={sponsor.homepage}>
              <img src={sponsor.image} alt={sponsor.name} />
            </Item>
          ))}
        </MobileRow>
        {gt(size(secondRow), 0) ? (
          <MobileRow>
            {secondRow.map((sponsor) => (
              <Item key={sponsor.name} href={sponsor.homepage}>
                <img src={sponsor.image} alt={sponsor.name} />
              </Item>
            ))}
          </MobileRow>
        ) : null}
      </MobileList>
    </Container>
  );
};

const Container = styled.div`
  text-align: center;
`;

const Title = styled.h4`
  font-size: 24px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.4);
  text-transform: capitalize;
  ${mobile`
    font-size: 16px;
  `}
`;

const List = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: 80px;
  justify-content: center;
  margin-top: 17px;
  font-size: 0;
  ${mobile`
    height: 40px;
    margin-top: 16px;
  `}
  ${tablet`
    display: none;
  `}
`;

const MobileList = styled.div`
  display: flex;
  flex-direction: column;
  ${tablet`
    display: flex;
    flex-direction: column;
  `}
`;

const MobileRow = styled(List)`
  ${tablet`
    display: flex;
    &:nth-of-type(2) {
      margin-top: 12px;
    }
  `}
  ${mobile`
    &:nth-of-type(2) {
      margin-top: 10px;
    }
  `}
`;

const Item = styled.a`
  height: 100%;
  padding: 0 24px;
  border-radius: 15px;
  overflow: hidden;
  transition: background-color 100ms ease-in;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  img {
    height: 100%;
  }
  &:not(:first-of-type) {
    margin-left: 8px;
  }
  ${mobile`
    padding: 0 12px;
    &:hover {
      background-color: none;
    }
    &:not(:first-of-type) {
      margin-left: 0;
    }
  `}
`;
Item.defaultProps = {
  target: '_blank',
  rel: 'noopener noreferrer',
};

export default SponsorList;
