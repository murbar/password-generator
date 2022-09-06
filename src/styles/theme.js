import { media } from 'styles/helpers';
import config from 'config';

const { strengthsEnum } = config;

const colors = {
  offWhite: 'hsl(0, 0%, 94%)',
  offBlack: 'hsl(0, 0%, 13%)',
  tomato: 'hsl(9, 100%, 70%)',
  blue: 'hsl(195, 100%, 50%)',
  green: 'hsl(150, 100%, 50%)',
  fuchsia: 'hsl(300, 100%, 65%)',
  paleYellow: 'hsl(60, 100%, 75%)',
  lightGray: 'hsl(0, 0%, 85%)',
  darkGray: 'hsl(0, 0%, 20%)',
};

const meterColors = {
  [strengthsEnum.OK]: colors.tomato,
  [strengthsEnum.GOOD]: colors.blue,
  [strengthsEnum.STRONG]: colors.green,
};

const theme = {
  colors: {
    ...colors,
    background: colors.offWhite,
    foreground: colors.offBlack,
  },
  meterColors,
  inputBorderRadius: `0.5rem`,
  inputHighlightColor: colors.offBlack,
  fontFamily: "'Roboto Mono', sans-serif",
  fontFamilyHeadings: "'Contrail One', sans-serif",
  borderRadius: '0.2rem',
  media,
};

export default theme;
