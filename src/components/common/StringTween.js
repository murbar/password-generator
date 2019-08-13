import React from 'react';
import PropTypes from 'prop-types';
import { animated, useSpring } from 'react-spring';

const charArrays = {
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
  lower: 'abcdefghijklmnopqrstuvwxyz'.split(''),
  numbers: '0123456789'.split('')
};

const randomChoice = array => {
  return array[Math.floor(Math.random() * array.length)];
};

const scrambleString = string => {
  const chars = string.split('');
  const { upper, lower, numbers } = charArrays;
  return chars
    .map(c => {
      if (upper.includes(c)) return randomChoice(upper);
      if (lower.includes(c)) return randomChoice(lower);
      if (numbers.includes(c)) return randomChoice(numbers);
      return c;
    })
    .join('');
};

const convertToCharCodeArray = string => {
  return string.split('').map(ch => ch.charCodeAt(0));
};

const convertToString = charCodeArray => {
  return charCodeArray.map(code => String.fromCharCode(Math.floor(code))).join('');
};

// does not perform well with lengths > 100
export default function StringTween({ children, duration = null }) {
  const from = convertToCharCodeArray(scrambleString(children));
  const to = convertToCharCodeArray(children);
  const config = {
    from: {
      chars: from
    },
    chars: to
  };
  if (duration) config.config.duration = duration;
  const spring = useSpring(config);

  return (
    <animated.span>
      {spring.chars.interpolate((...charCodes) => convertToString(charCodes))}
    </animated.span>
  );
}

StringTween.propTypes = {
  children: PropTypes.string.isRequired
};
