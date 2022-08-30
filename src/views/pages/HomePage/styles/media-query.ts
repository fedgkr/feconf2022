import { css, CSSObject, SerializedStyles } from '@emotion/react';

export const mobileSelect = '@media only screen and (max-width: 1024px)';

export const mobile = (
  cssContent: TemplateStringsArray | CSSObject | SerializedStyles
) =>
  css(`
  @media only screen and (max-width: 1024px) {
    ${cssContent}
  }
`);

export const tablet = (cssContent: TemplateStringsArray | CSSObject) =>
  css(`
  @media only screen and (max-width: 1280px) {
    ${cssContent}
  }
`);
