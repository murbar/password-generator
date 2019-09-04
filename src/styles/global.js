import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * { 
    box-sizing: border-box;
  }
  html {
    font-size: 62.5%;
    margin: 0;
    min-height: 100%;
  }
  body {
    position: relative;
    margin: 0;
    padding: 0 2rem;
    background: linear-gradient(
      174deg,
      ${p => p.theme.colors.paleYellow},
      ${p => p.theme.colors.paleYellow} 45rem, 
      ${p => p.theme.colors.offWhite} 45rem,
      ${p => p.theme.colors.offWhite}
    ), ${p => p.theme.colors.offWhite};
    color: ${p => p.theme.colors.offBlack};
    font-family: ${p => p.theme.fontFamily};
    font-size: 1.8rem;
    line-height: 1.7;
    min-height: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  h1, h2, h3, h4, h5, h6 {
    font-family: ${p => p.theme.fontFamilyHeadings};
    margin: 0 0 0.5em;
    font-weight: 400;
    color: ${p => p.theme.colors.darkGray};
  }
  p { 
    margin: 0 0 0.5em;
  }
  ul, ol {
    margin-top: 0;
  }
  a {
    color: inherit;
    &:hover {
      color: inherit;
    }
  }
  h1, h2, h3, h4, h5, h6, p, li {
    cursor: default;
  }
  h1, h2, h3, h4, h5, h6 {
    user-select: none;
  }
`;
