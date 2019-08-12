const version = '2019.8.10';

const modes = {
  PW: 'password',
  PP: 'passphrase'
};

const initParams = {
  numSecrets: 5,
  [modes.PW]: {
    length: 16,
    upper: true,
    lower: true,
    numbers: true,
    symbols: true
  },
  [modes.PP]: {
    length: 5,
    delimiter: '-'
  }
};

const localStorageKeys = {
  params: `pwgen-joeb-dev-params-${version}`,
  mode: `pwgen-joeb-dev-mode-${version}`
};

export default {
  version,
  modes,
  initParams,
  localStorageKeys
};
