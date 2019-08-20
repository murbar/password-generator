import React from 'react';
import PropTypes from 'prop-types';
import { animated, useSpring } from 'react-spring';
import { generatePassword } from 'cryptoLogic';

const convertToCharCodeArray = string => {
  return string.split('').map(ch => ch.charCodeAt(0));
};

const normalizeCharCode = code => {
  // return a letter or number when when spring bounces beyond char code range
  // tried setting clamp -> true in the spring config, but it didn't seem to have the intended effect
  if (code === 64) return 66;
  if (code === 91) return 89;
  if (code === 96) return 98;
  if (code === 123) return 121;
  if (code === 47) return 49;
  if (code === 58) return 56;
  return code;
};

const convertToString = charCodeArray => {
  // return charCodeArray
  //   .map(c => Math.floor(c))
  //   .map(c => normalizeCharCode(c))
  //   .map(c => String.fromCharCode(c))
  //   .join('');

  // reduce profiles 5-20x faster than the code above
  return charCodeArray.reduce((result, code) => {
    return result + String.fromCharCode(normalizeCharCode(Math.floor(code)));
  }, '');
};

// gets sketchy with long strings, > ~500 chars
export default function StringTween({
  children,
  duration = null,
  scrambleOnClick = false
}) {
  const from = convertToCharCodeArray(generatePassword(children.length));
  const to = convertToCharCodeArray(children);
  const precision = 1;
  const friction = 50;
  const config = {
    // low precision since we're interpolating integers
    // cuts number of operations by ~1/2
    config: { precision, friction },
    from: {
      chars: from
    },
    chars: to
  };
  if (duration) config.config = { duration };
  const [spring, setSpring] = useSpring(() => config);

  const scramble = () => {
    if (scrambleOnClick) {
      setSpring({
        config: { duration: 100, precision },
        to: { chars: convertToCharCodeArray(generatePassword(children.length)) },
        onRest: () => {
          setSpring({
            config: { duration: undefined, precision, friction },
            to: { chars: convertToCharCodeArray(children) }
          });
        }
      });
    }
  };

  return (
    <animated.span onClick={scramble}>
      {spring.chars.interpolate((...charCodes) => convertToString(charCodes))}
    </animated.span>
  );
}

StringTween.propTypes = {
  children: PropTypes.string.isRequired
};
