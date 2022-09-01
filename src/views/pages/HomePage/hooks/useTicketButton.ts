import { AnchorHTMLAttributes } from 'react';

const inactiveProps: AnchorHTMLAttributes<HTMLAnchorElement> = {
  onClick: (event) => {
    event.preventDefault();
    alert('티켓 예매는 9월 5일 오픈 예정입니다.');
  },
};

const activeProps: AnchorHTMLAttributes<HTMLAnchorElement> = {
  rel: 'noopener noreferrer',
  target: '_blank',
  href: 'https://booking.naver.com/booking/5/bizes/263881/items/4589753',
};

const useTicketButton = () => {
  return {
    text: '티켓 구매하기',
    props: activeProps,
  };
};

export default useTicketButton;
