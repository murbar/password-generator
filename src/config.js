const version = '2022.09.06';

const modes = {
  PW: 'password',
  PP: 'passphrase'
};

const initParams = {
  [modes.PW]: {
    length: 16,
    upper: true,
    lower: true,
    numbers: true,
    symbols: false
  },
  [modes.PP]: {
    length: 5,
    delimiter: 'hyphen'
  }
};

const localStorageKeys = {
  params: `pwgen-joeb-dev-params-${version}`,
  mode: `pwgen-joeb-dev-mode-${version}`
};

const strengthsEnum = {
  OK: 'kinda weak',
  GOOD: 'pretty decent',
  STRONG: 'super strong'
};

export default {
  version,
  modes,
  initParams,
  localStorageKeys,
  strengthsEnum,
  GAPropertyId: 'UA-140727716-6'
};
