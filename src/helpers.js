export const ensureIsNotInput = event => {
  return event.target.tagName.toLowerCase() !== 'input';
};

export const fireHotKey = (e, callback) => {
  if (ensureIsNotInput(e)) {
    e.preventDefault();
    callback();
  }
};

export const padArray = (array, value, newLength) => {
  const length = array.length;
  const filler = Array(newLength - length).fill(value);
  return array.concat(filler);
};

export const convertToCharCodeArray = string => {
  return string.split('').map(ch => ch.charCodeAt(0));
};

export const convertToString = charCodeArray => {
  return charCodeArray.map(code => String.fromCharCode(Math.floor(code))).join('');
};

export const convertToStringAndFilterType = (charCodeArray, type) => {
  return convertToString(charCodeArray.filter(code => typeof code === type));
};
