export const ensureIsNotInput = event => {
  return event.target.tagName.toLowerCase() !== 'input';
};

export const fireHotKey = (e, callback) => {
  if (ensureIsNotInput(e)) {
    e.preventDefault();
    callback();
  }
};

export const convertToCharCodeArray = string => {
  return string.split('').map(ch => ch.charCodeAt(0));
};

export const convertToString = charCodeArray => {
  return charCodeArray.map(code => String.fromCharCode(Math.floor(code))).join('');
};
