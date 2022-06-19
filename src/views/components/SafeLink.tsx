import styled from "@emotion/styled";

const SafeLink = styled.a``;

SafeLink.defaultProps = {
  target: '_blank',
  rel: 'noopener noreferrer',
};

export default SafeLink;
