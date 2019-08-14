import React from 'react';
import styled from 'styled-components';
import config from 'config';
import PasswordParams from 'components/PasswordParams';
import PassphraseParams from 'components/PassphraseParams';
import Button from 'components/common/Button';
import { ReactComponent as RefreshIcon } from 'images/repeat.svg';
import { media } from 'styles/helpers';

const Styles = styled.div`
  background: white;
  padding: 2rem;
  margin: 0 -2rem;
  position: relative;
  p {
    font-size: 0.8em;
  }
  ${media.tablet`
    /* padding: 1.5rem 2rem; */
    border-radius: ${p => p.theme.borderRadius} ${p => p.theme.borderRadius} 0 0;
    margin: 0;
  `}
`;

const RegenerateButton = styled(Button)`
  /* margin: 1.5rem; */
  svg {
    transform: rotate(35deg);
    margin-right: 0.75em;
  }
`;

export default function Params({ mode, values, onChange, reGen }) {
  const { modes } = config;

  return (
    <Styles>
      {mode === modes.PW && <PasswordParams values={values} onChange={onChange} />}
      {mode === modes.PP && <PassphraseParams values={values} onChange={onChange} />}
      <RegenerateButton onClick={reGen} title="Generate new secrets">
        <RefreshIcon /> Regenerate Secrets
      </RegenerateButton>
    </Styles>
  );
}
