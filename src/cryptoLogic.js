import wordList from 'wordList';
import config from 'config';

export const getRandomSecure = () =>
  crypto.getRandomValues(new Uint32Array(1))[0] / 2 ** 32;

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

const delimiters = {
  hyphen: '-',
  period: '.',
  space: ' ',
  number: null
};

const interleaveWithNumbers = array => {
  return array.reduce((acc, cur, i) => {
    if (i !== array.length - 1) {
      return [...acc, cur, getRandomElement(chars.numbers)];
    } else {
      return [...acc, cur];
    }
  }, []);
};

export const generatePassphrase = (numWords, options = {}) => {
  const defaults = {
    delimiter: delimiters.hyphen
  };
  for (const key in defaults) {
    if (!(key in options)) options[key] = defaults[key];
  }
  if (!(options.delimiter in delimiters)) {
    options.delimiter = delimiters.hyphen;
  }

  const phrase = new Set();
  while (phrase.size < numWords) phrase.add(getRandomElement(wordList));
  if (options.delimiter === 'number') {
    return interleaveWithNumbers([...phrase]).join('');
  } else {
    return [...phrase].join(delimiters[options.delimiter]);
  }
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

export const getEntropy = (params, mode) => {
  const { modes } = config;
  const count = params[mode].length;
  const ppWordListCount = wordList.length;
  const ppEntropyPerWord = Math.log2(ppWordListCount);
  const ppTotalEntropy =
    params[modes.PP].delimiter === 'number'
      ? ppEntropyPerWord * count + (count - 1) * 10
      : ppEntropyPerWord * count;

  let charSpace = 0;
  if (params[modes.PW].lower) charSpace += 26;
  if (params[modes.PW].upper) charSpace += 26;
  if (params[modes.PW].numbers) charSpace += 10;
  if (params[modes.PW].symbols) charSpace += 16;
  const pwEntropyPerChar = Math.log2(charSpace);
  const pwTotalEntropy = pwEntropyPerChar * count;

  return mode === modes.PW ? pwTotalEntropy : ppTotalEntropy;
};
