import React from 'react';
import styled from 'styled-components';
import { animated, useSpring } from 'react-spring';
import config from 'config';
import { media } from 'styles/helpers';
import useTheme from 'hooks/useTheme';
import { ReactComponent as CoolFace } from 'images/cool.svg';
import { ReactComponent as HappyFace } from 'images/smile.svg';
import { ReactComponent as NervousFace } from 'images/eek.svg';

const Styles = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin: 0 -2rem;
  padding: 1rem 0.5rem;
  line-height: 1;
  font-size: 0.8em;
  background: repeating-linear-gradient(
    -45deg,
    transparent,
    transparent 1rem,
    hsla(0, 0%, 0%, 0.05) 1rem,
    hsla(0, 0%, 0%, 0.05) 2rem
  );
  cursor: default;
  span:nth-child(1) {
    svg {
      height: 3em;
    }
  }
  span:nth-child(2) {
    font-weight: bold;
  }
  ${media.tablet`
    font-size: 1em;
    margin: 0;
  `}
`;

const Animated = animated(Styles);

const { strengthsEnum } = config;
const strengthGlyphs = {
  [strengthsEnum.OK]: <NervousFace />,
  [strengthsEnum.GOOD]: <HappyFace />,
  [strengthsEnum.STRONG]: <CoolFace />
};

const getStrength = bits => {
  if (bits <= 45) return strengthsEnum.OK;
  if (bits > 45 && bits <= 60) return strengthsEnum.GOOD;
  return strengthsEnum.STRONG;
};

export default function Meter({ entropy }) {
  const theme = useTheme();
  const strength = getStrength(entropy);
  const emoji = strengthGlyphs[strength];
  const backgroundSpring = useSpring({
    config: { duration: 400 },
    backgroundColor: theme.meterColors[strength],
    boxShadow: `0 0 1rem ${theme.meterColors[strength]}`
  });

  entropy = Math.round(entropy);

  return (
    <Animated style={backgroundSpring}>
      <span aria-label={strength}>{emoji}</span>
      <span>{strength}</span>
      <span title={`About ${entropy} bits of entropy`}>~{entropy} bits</span>
    </Animated>
  );
}
