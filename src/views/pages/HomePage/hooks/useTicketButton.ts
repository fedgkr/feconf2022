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
  onClick: () => {
    window.gtag('event', 'CLICK', {
      event_category: '티켓',
      event_label: '티켓_구매하기',
    });
  },
};

const useTicketButton = () => {
  return {
    text: '유튜브 보러가기',
    props: {
      onClick: (event) => {
        event.preventDefault();
        location.href = "https://www.youtube.com/channel/UCWEzfYIpFBIG5jh6laXC6hA/videos";
        window.gtag('event', 'CLICK', {
          event_category: '유튜브',
          event_label: '유튜브_보러가기',
        });
      },
    },
  };
};

export default useTicketButton;
