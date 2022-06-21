import {FC, useRef} from "react";
import styled from '@emotion/styled';
import ApplyButton from "~/views/components/ApplyButton";
import useFadeInOutAnimation from "~/views/ComingSoonPage/hooks/useFadeInOutAnimation";
import SectionContainer from "~/views/ComingSoonPage/components/SectionContainer";
import Center from "~/views/ComingSoonPage/components/Center";
import {tablet} from "~/views/ComingSoonPage/styles/media-query";
import {SPONSOR_FORM} from "~/views/ComingSoonPage/data/meta";
import CircleIcon from "~/views/ComingSoonPage/components/CircleIcon";
import Portal from "~/views/components/Portal";
import {MBr, PBr, TBr} from "~/views/ComingSoonPage/components/Br";

interface Props {
  state: SectionState;
}

const CallForSponsorSection: FC<Props> = ({ state }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { opacity, scale, transition } = useFadeInOutAnimation(state);
  return (
    <SectionContainer ref={ref}>
      <Center visible={state.visible}>
        <TextWrap style={{ opacity, transform: `scale(${scale})`, transition }}>
          <h2>
            FE 개발 생태계와 함께하는<br/>
            <span>후원사<CircleIcon visible={state.visible}/></span>가 되어주세요.
          </h2>
          <p>
            FECONF 후원사가 되어 개발 문화를 만들고,<br/>
            기업 홍보와 채용 활동을 계획하세요.
          </p>
          <ApplyButton href={SPONSOR_FORM} style={{ pointerEvents: state.visible ? 'all' : 'none' }}>
            사전 등록하기
          </ApplyButton>
        </TextWrap>
      </Center>
      <Portal area="content">
        <AdditionalNote style={{ opacity, transition }}>
          <img src="/images/icons/bolt.png" alt="Notes"/>
          <p>금액 및 자세한 프로그램은 7월 중순<br/> 입력해주신 연락처를 통해 별도 안내 예정입니다.</p>
        </AdditionalNote>
      </Portal>
    </SectionContainer>
  );
};

const TextWrap = styled.div`
  width: 100%;
  text-align: center;

  h2 {
    font-size: 60px;
    font-weight: 700;
    line-height: 1.3;
    color: #FFFFFF;
    span {
      position: relative;
    }
  }
  p {
    margin: 24px auto 42px auto;
    color: #B0BECF;
    font-size: 24px;
    font-weight: 600;
    line-height: 1.6;
    opacity: 0.9;
  }

  ${tablet`
    h2 {
      font-size: 32px;
    }
    p {
      margin: 16px auto 32px auto;
      font-size: 16px;
    }
  `}
`;

const AdditionalNote = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 80px;
  text-align: center;

  img {
    display: inline-block;
    width: 32px;
    height: 32px;
  }

  p {
    margin-top: 12px;
    font-size: 17px;
    font-weight: 600;
    line-height: 1.6;
    color: white;
  }
  ${tablet`
    bottom: 40px;
      p {
      font-size: 14px;
    }
  `}
`;

export default CallForSponsorSection;
