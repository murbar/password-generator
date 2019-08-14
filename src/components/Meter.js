import React from 'react';
import styled, { withTheme } from 'styled-components';
import config from 'config';
import { animated, useSpring } from 'react-spring';
import { media } from 'styles/helpers';
import { ReactComponent as CoolFace } from 'images/cool.svg';
import { ReactComponent as HappyFace } from 'images/smile.svg';
import { ReactComponent as NervousFace } from 'images/nervous.svg';

const Styles = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 -2rem;
  padding: 1rem 1rem;
  line-height: 1;
  font-size: 0.8em;
  background: repeating-linear-gradient(
    -45deg,
    transparent,
    transparent 1rem,
    hsla(0, 0%, 0%, 0.05) 1rem,
    hsla(0, 0%, 0%, 0.05) 2rem
  );
  span:first-child {
    svg {
      height: 3em;
    }
  }
  span:nth-child(2) {
    margin: 0 1.5rem;
    font-weight: bold;
  }
  span:nth-child(3) {
  }
  ${media.tablet`
    font-size: 1em;
    margin: 0;
  `}
`;

const Animated = animated(Styles);

function Meter({ entropy, theme }) {
  const { strengthsEnum } = config;
  const getStrength = bits => {
    if (bits <= 45) return strengthsEnum.OK;
    if (bits > 45 && bits <= 60) return strengthsEnum.GOOD;
    if (bits > 60) return strengthsEnum.STRONG;
  };
  const strength = getStrength(entropy);
  const emoji =
    strength === strengthsEnum.OK ? (
      <NervousFace />
    ) : strength === strengthsEnum.GOOD ? (
      <HappyFace />
    ) : (
      <CoolFace />
    );
  const backgroundSpring = useSpring({
    config: { duration: 400 },
    backgroundColor: theme.meterColors[strength],
    boxShadow: `0 0 1rem ${theme.meterColors[strength]}`
  });

  return (
    <Animated style={backgroundSpring}>
      <span aria-label={strength}>{emoji}</span>
      <span>{strength}</span>
      <span>~{Math.round(entropy)} bits of entropy</span>
    </Animated>
  );
}

export default withTheme(Meter);
