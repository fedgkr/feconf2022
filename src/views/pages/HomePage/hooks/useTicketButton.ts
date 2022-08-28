import { AnchorHTMLAttributes, HTMLAttributes } from 'react';

const inactiveProps: AnchorHTMLAttributes<HTMLAnchorElement> = {
  onClick: (event) => {
    event.preventDefault();
    alert('오픈 전 입니다.');
  },
};

const activeProps: AnchorHTMLAttributes<HTMLAnchorElement> = {
  target: '_blank',
  href: '#',
};

const useTicketButton = () => {
  return {
    text: '티켓 오픈예정',
    props: inactiveProps,
  };
};

export default useTicketButton;
