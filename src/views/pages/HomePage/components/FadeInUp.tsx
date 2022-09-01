import { FC, PropsWithChildren } from 'react';
import styled from '@emotion/styled';

interface Props {
  visible: boolean;
  delay: number;
  range?: number;
}

const FadeInUp: FC<PropsWithChildren<Props>> = ({
  children,
  visible,
  delay,
  range = 200,
}) => {
  // return <>{children}</>;
  return (
    <Container visible={visible} delay={delay} range={range}>
      {children}
    </Container>
  );
};

const Container = styled.div<Props>`
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transform: translate3d(
    0,
    ${(props) => (props.visible ? 0 : props.range)}px,
    0
  );
  transition: ${(props) =>
    props.visible
      ? `transform 500ms ${props.delay}ms
      cubic-bezier(0.33, 1, 0.68, 1),
    opacity 600ms ${props.delay}ms ease-out`
      : ''};
`;

export default FadeInUp;
