import { media } from './helpers';

const colors = {
  offWhite: '#efefef',
  offBlack: '#222',
  green: '#3cc473'
};

const theme = {
  colors: {
    ...colors,
    background: colors.offWhite,
    foreground: colors.offBlack,
    primary: colors.green
  },
  inputBorderRadius: `0.5rem`,
  fontFamily: "'Nunito', sans-serif",
  media
};

export default theme;
