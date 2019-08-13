import React from 'react';
import PropTypes from 'prop-types';
import { animated, useSpring } from 'react-spring';
import { generatePassword } from 'cryptoLogic';

const convertToCharCodeArray = string => {
  return string.split('').map(ch => ch.charCodeAt(0));
};

const convertToString = charCodeArray => {
  return charCodeArray.map(code => String.fromCharCode(Math.floor(code))).join('');
};

// does not perform well with lengths > ~100
export default function StringTween({ children, duration = null }) {
  const from = convertToCharCodeArray(generatePassword(children.length));
  const to = convertToCharCodeArray(children);
  const config = {
    from: {
      chars: from
    },
    chars: to
  };
  if (duration) config.config = { duration };
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
