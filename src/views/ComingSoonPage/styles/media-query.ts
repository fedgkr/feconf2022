import {css, CSSObject} from "@emotion/react";

export const mobile = (cssContent: TemplateStringsArray | CSSObject) => css(`
  @media only screen and (max-width: 428px) {
    ${cssContent}
  }
`);

export const tablet = (cssContent: TemplateStringsArray | CSSObject) => css(`
  @media only screen and (max-width: 1024px) {
    ${cssContent}
  }
`);
