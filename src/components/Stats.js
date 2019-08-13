import React from 'react';
import styled, { withTheme } from 'styled-components';
import config from 'config';
import { animated, useSpring } from 'react-spring';
import { media } from 'styles/helpers';

const Styles = styled.div`
  display: flex;
  align-items: center;
  margin: 0 -2rem 2rem;
  padding: 1.25rem 2rem;
  line-height: 1;
  font-size: 0.9em;
  span:first-child {
    font-size: 2em;
    margin-right: 1.5rem;
  }
  span:nth-child(2) {
    margin-right: 1.5rem;
    font-weight: bold;
    text-align: center;
  }
  span:nth-child(3) {
    text-align: center;
  }
  ${media.tablet`
  font-size: 1em;
    padding: 1.25rem 1.5rem;
    border-radius: 0 0 ${p => p.theme.borderRadius} ${p => p.theme.borderRadius};
    margin: 0 0 2rem;
  `}
`;

const Animated = animated(Styles);

function Stats({ entropy, theme }) {
  const { strengthsEnum } = config;
  const getStrength = bits => {
    if (bits <= 45) return strengthsEnum.OK;
    if (bits > 45 && bits <= 60) return strengthsEnum.GOOD;
    if (bits > 60) return strengthsEnum.STRONG;
  };
  const strength = getStrength(entropy);
  const emoji =
    strength === strengthsEnum.OK ? '😬' : strength === strengthsEnum.GOOD ? '🙂' : '😎';
  const backgroundSpring = useSpring({
    config: { duration: 400 },
    backgroundColor: theme.meterColors[strength]
  });

  return (
    <Animated style={backgroundSpring}>
      <span role="img" aria-label={strength}>
        {emoji}
      </span>
      <span>{strength}</span> <span>~{Math.round(entropy)} bits of entropy</span>
    </Animated>
  );
}

export default withTheme(Stats);
