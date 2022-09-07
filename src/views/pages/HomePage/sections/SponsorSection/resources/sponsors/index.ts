import todayHouse from './today-house1.png';
import banksalad from './banksalad.png';
import ably from './ably.png';
import yanolja from './yanolja.png';
import toss from './toss2.png';
import fastcampus from './fastcampus.png';
import superbAi from './superb-ai.png';
import musinsa from './musinsa.png';
import greenlabs from './greenlabs.png';
import yogiyo from './yogiyo.png';
import nc from './nc.png';
import imWeb from './im-web.png';
import aaant from './aaant.png';
import iamdt from './iamdt.png';
import { Sponsor } from '~/types/event';

const diamondSponsors: Sponsor[] = [
  {
    name: 'todayHouse',
    image: todayHouse.src,
    homepage: 'https://www.bucketplace.com/recruit/?team=dev',
  },
  {
    name: 'banksalad',
    image: banksalad.src,
    homepage: 'https://career.banksalad.com/',
  },
];
const platinumSponsors: Sponsor[] = [
  {
    name: 'ably',
    image: ably.src,
    homepage: 'https://ably.team/',
  },
  {
    name: 'yanolja',
    image: yanolja.src,
    homepage: 'https://careers.yanolja.co/',
  },
  {
    name: 'toss',
    image: toss.src,
    homepage: 'https://toss.im/career',
  },
  {
    name: 'fastcampus',
    image: fastcampus.src,
    homepage: 'https://fastcampus.co.kr/info/about',
  },
  {
    name: 'superbAi',
    image: superbAi.src,
    homepage: 'https://hubs.li/Q01lk-r90',
  },
];
const goldSponsors: Sponsor[] = [
  {
    name: 'imWeb',
    image: imWeb.src,
    homepage: 'https://team.imweb.me',
  },
  {
    name: 'nc',
    image: nc.src,
    homepage: 'https://careers.ncsoft.com/',
  },
  {
    name: 'yogiyo',
    image: yogiyo.src,
    homepage:
      'https://techrecruiting.wesang.com/join-us.do/?utm_source=fecon&utm_medium=2209r&utm_campaign=recruit&utm_term=social',
  },
  {
    name: 'musinsa',
    image: musinsa.src,
    homepage: 'https://musinsa.career.greetinghr.com/',
  },
  {
    name: 'greenlabs',
    image: greenlabs.src,
    homepage:
      'https://greenlabs.co.kr/%ec%b1%84%ec%9a%a9%ec%a0%95%eb%b3%b4/%ec%b1%84%ec%9a%a9%ec%a0%95%eb%b3%b4/',
  },
];
const rookieSponsors: Sponsor[] = [
  {
    name: 'aaant',
    image: aaant.src,
    homepage: 'https://www.labnote.co',
  },
  {
    name: 'iamdt',
    image: iamdt.src,
    homepage: 'https://iamdt.co.kr/',
  },
];

export { diamondSponsors, platinumSponsors, goldSponsors, rookieSponsors };
