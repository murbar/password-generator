import { media } from './helpers';
import config from 'config';

const { strengthsEnum } = config;

const colors = {
  offWhite: '#efefef',
  offBlack: '#222',
  tomato: 'hsl(9, 100%, 70%)',
  blue: 'hsl(195, 100%, 50%)',
  green: 'hsl(150, 100%, 50%)',
  fuchsia: 'hsl(300, 100%, 65%)',
  lightGrey: '#cccccc',
  darkGrey: '#333333'
};

const meterColors = {
  [strengthsEnum.OK]: colors.tomato,
  [strengthsEnum.GOOD]: colors.blue,
  [strengthsEnum.STRONG]: colors.green
};

const theme = {
  colors: {
    ...colors,
    background: colors.offWhite,
    foreground: colors.offBlack
  },
  meterColors,
  inputBorderRadius: `0.5rem`,
  fontFamily: "'Roboto Mono', sans-serif",
  fontFamilyHeadings: "'Contrail One', sans-serif",
  borderRadius: '0.2rem',
  media
};

export default theme;
