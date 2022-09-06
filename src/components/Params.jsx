import React from 'react';
import styled from 'styled-components';
import config from 'config';
import PasswordParams from 'components/PasswordParams';
import PassphraseParams from 'components/PassphraseParams';
import { media } from 'styles/helpers';
import { useTransition, animated } from 'react-spring';

const Styles = styled.div`
  background: white;
  margin: 0 -2rem;
  position: relative;
  transition: all 300ms;
  p {
    font-size: 0.8em;
  }
  ${media.tablet`
    border-radius: ${p => p.theme.borderRadius} ${p => p.theme.borderRadius} 0 0;
    margin: 0;
  `}
`;

const AnimatedTab = ({ children, ...props }) => {
  return <animated.div {...props}>{children}</animated.div>;
};

export default function Params({ mode, values, onChange, isPwaMode }) {
  const { modes } = config;
  const tabTransitions = useTransition(mode, {
    config: { duration: 200 },
    initial: { opacity: 1 },
    from: { opacity: 0, transform: 'scale(1.05)' },
    enter: { opacity: 1, transform: 'scale(1)' },
    leave: { opacity: 0, position: 'absolute', transform: 'scale(0.8)' }
  });

  return (
    <Styles>
      {tabTransitions(( props, item ) => {
        return (
          <AnimatedTab style={props}>
            {item === modes.PW ? (
              <PasswordParams values={values} onChange={onChange} isPwaMode={isPwaMode} />
            ) : (
              <PassphraseParams
                values={values}
                onChange={onChange}
                isPwaMode={isPwaMode}
              />
            )}
          </AnimatedTab>
        );
      })}
    </Styles>
  );
}
