import wordList from 'wordList';

export const getRandomSecure = () => crypto.getRandomValues(new Uint32Array(1))[0] / 2 ** 32;

export const getRandomElement = array => {
  return array[Math.floor(getRandomSecure() * array.length)];
};

const chars = {
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
  lower: 'abcdefghijklmnopqrstuvwxyz'.split(''),
  numbers: '0123456789'.split(''),
  symbols: '~!@#$%^&*_-+?.:;'.split('')
};

export const generatePassword = (length, flags = {}) => {
  const defaults = {
    upper: true,
    lower: true,
    numbers: true,
    symbols: true
  };
  for (const key in defaults) {
    if (!(key in flags)) flags[key] = defaults[key];
  }

  let charPool = [];
  for (const key in chars) {
    if (flags[key]) charPool = [...charPool, ...chars[key]];
  }

  return Array(length)
    .fill(null)
    .map(() => getRandomElement(charPool))
    .join('');
};

export const generatePassphrase = (numWords, options = {}) => {
  const defaults = {
    length: 5,
    delimiter: '-'
  };
  for (const key in defaults) {
    if (!(key in options)) options[key] = defaults[key];
  }

  const phrase = new Set();
  while (phrase.size < numWords) phrase.add(getRandomElement(wordList));
  return [...phrase].join(options.delimiter);
};

export const generatePasswords = (numPasswords = 3, options) => {
  return Array(numPasswords)
    .fill(null)
    .map(() => generatePassword(options.length, options));
};

export const generatePassphrases = (numPhrases = 3, options) => {
  return Array(numPhrases)
    .fill(null)
    .map(() => generatePassphrase(options.length, options));
};
