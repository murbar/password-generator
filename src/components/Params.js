import React from 'react';
import styled from 'styled-components';
import config from 'config';
import PasswordParams from 'components/PasswordParams';
import PassphraseParams from 'components/PassphraseParams';
import { media } from 'styles/helpers';

const Styles = styled.div`
  background: white;
  padding: 2rem;
  margin: 0 -2rem;
  p {
    font-size: 0.8em;
  }
  ${media.tablet`
    border-radius: ${p => p.theme.borderRadius} ${p => p.theme.borderRadius} 0 0;
    margin: 0;
  `}
`;

export default function Params({ mode, values, onChange, reGen }) {
  const { modes } = config;

  return (
    <Styles>
      {mode === modes.PW && <PasswordParams values={values} onChange={onChange} />}
      {mode === modes.PP && <PassphraseParams values={values} onChange={onChange} />}
    </Styles>
  );
}
