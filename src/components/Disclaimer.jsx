import React from 'react';
import styled from 'styled-components';

const Styles = styled.p`
  background: ${p => p.theme.colors.lightGray};
  background: white;
  padding: 2rem;
  font-size: 0.8em;
  border-radius: ${p => p.theme.borderRadius};
`;

export default function Disclaimer() {
  return (
    <Styles>
      Your secrets are generated on this device with a{' '}
      <a
        href="https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues"
        title="getRandomValues docs on Mozilla.org"
      >
        cryptographically strong random number generator
      </a>{' '}
      and are not transmitted or persisted in any way. Just look out for nosy parkers and
      close this browser tab when you're done.
    </Styles>
  );
}
