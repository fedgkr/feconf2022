import { Session, Timetable, Track } from '~/types/event';

const timetable: Timetable = [
  ['13:00', '13:40'],
  ['13:50', '14:30'],
  ['14:40', '15:20'],
  ['15:30', '16:10'],
  ['16:20', '17:00'],
];

const sessionList: Session[] = [
  {
    track: Track.A,
    time: timetable[0],
    title: 'ReScript 같이 해요',
    description: '',
    speaker: {
      name: '정미량',
      company: {
        name: '그린랩스',
        homepage: '',
      },
      image: '',
    },
  },
  {
    track: Track.A,
    time: timetable[1],
    title: '엣지 컴퓨팅이 가져올 웹 개발의 변화',
    description: '',
    speaker: {
      name: '김혜성',
      company: {
        name: '당근마켓',
        homepage: '',
      },
      image: '',
    },
  },
  {
    track: Track.A,
    time: timetable[2],
    title: 'UX 개발자, 대형 서비스 빠르게 프로토타입하기',
    description: '',
    speaker: {
      name: '박신연',
      company: {
        name: '구글 쇼핑 UX',
        homepage: '',
      },
      image: '',
    },
  },
  {
    track: Track.A,
    time: timetable[3],
    title: '@webtoon/psd 라이브러리 개발기',
    description: '',
    speaker: {
      name: '이동현',
      company: {
        name: '네이버웹툰',
        homepage: '',
      },
      image: '',
    },
  },
  {
    track: Track.A,
    time: timetable[4],
    title: 'React 기반의 WYSIWYG 에디터로의 도전',
    description: '',
    speaker: {
      name: '노용구',
      company: {
        name: '네이버 스마트에디터',
        homepage: '',
      },
      image: '',
    },
  },
  {
    track: Track.B,
    time: timetable[0],
    title: '디자인 시스템, 형태를 넘어서',
    description: '',
    speaker: {
      name: '이소영',
      company: {
        name: 'flex',
        homepage: '',
      },
      image: '',
    },
  },
  {
    track: Track.B,
    time: timetable[1],
    title: '일백개 패키지 모노레포 고요하게 운영하기',
    description: '',
    speaker: {
      name: '오창영',
      company: {
        name: '토스',
        homepage: '',
      },
      image: '',
    },
  },
  {
    track: Track.B,
    time: timetable[2],
    title: '프론트엔드 DDD를 만나다',
    description: '',
    speaker: {
      name: '박세문',
      company: {
        name: '라포랩',
        homepage: '',
      },
      image: '',
    },
  },
  {
    track: Track.B,
    time: timetable[3],
    title: '상태관리 이 전쟁을 끝내러 왔다',
    description: '',
    speaker: {
      name: '최수형',
      company: {
        name: '메가테라',
        homepage: '',
      },
      image: '',
    },
  },
  {
    track: Track.B,
    time: timetable[4],
    title: '내 import 문이 그렇게 이상했나요?',
    description: '',
    speaker: {
      name: '박서진',
      company: {
        name: '토스',
        homepage: '',
      },
      image: '',
    },
  },
];

export default sessionList;
