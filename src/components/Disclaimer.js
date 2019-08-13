import React from 'react';
import styled from 'styled-components';

const Styles = styled.p`
  background: ${p => p.theme.colors.lightGrey};
  background: white;
  padding: 1.5rem;
  font-size: 0.8em;
  border-radius: ${p => p.theme.borderRadius};
`;

export default function Disclaimer() {
  return (
    <Styles>
      * Your secrets are generated on this device and are not transmitted or persisted in any way.
      Just look out for nosy parkers and close this browser tab when you're done.
    </Styles>
  );
}
