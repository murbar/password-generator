import React from 'react';
import styled, { withTheme } from 'styled-components';
import config from 'config';
import { animated, useSpring } from 'react-spring';

const Styles = styled.div`
  display: flex;
  align-items: center;
  margin: 2rem 0;
  border-radius: 0.2rem;
  padding: 1.25rem 1.5rem;
  line-height: 1;
  span:first-child {
    font-size: 2em;
    margin-right: 1.5rem;
  }
  span:nth-child(2) {
    margin-right: 1.5rem;
    font-weight: bold;
    text-align: center;
    /* flex: 1; */
  }
  span:nth-child(3) {
    text-align: center;
    /* flex: 1; */
  }
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
