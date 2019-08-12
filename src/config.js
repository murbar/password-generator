const version = '2019.8.10';

const modes = {
  PW: 'password',
  PP: 'passphrase'
};

const initPrefs = {
  numSecrets: 3,
  autoCopy: false
};

const initParams = {
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
  prefs: `pwgen-joeb-dev-prefs-${version}`,
  mode: `pwgen-joeb-dev-mode-${version}`
};

export default {
  version,
  modes,
  initPrefs,
  initParams,
  localStorageKeys
};
