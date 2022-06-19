import {FC, ReactNode} from "react";
import Portal from "~/views/components/Portal";
import styled from "@emotion/styled";

interface Props {
  visible: boolean;
  children: ReactNode;
}

const Center: FC<Props> = ({ visible, children }) => {
  return (
    <Portal area="content">
      <FixedWrap visible={visible}>
        { children }
      </FixedWrap>
    </Portal>
  );
}

const FixedWrap = styled.div<{ visible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  pointer-events: ${({ visible }) => visible ? 'all' : 'none'};
`;

export default Center;
