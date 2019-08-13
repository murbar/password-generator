import React from 'react';
import styled from 'styled-components';
import copy from 'copy-to-clipboard';
import SecretTween from 'components/common/SecretTween';
import { media } from 'styles/helpers';

const Styles = styled.div`
  background: ${p => p.theme.colors.offBlack};
  color: ${p => p.theme.colors.offWhite};
  margin: 1.5rem -2rem;
  padding: 2rem;
  ${media.tablet`
  padding: 1.5rem;
    border-radius: ${p => p.theme.borderRadius};
    margin: 1.5rem 0;
  `}
`;

const Secret = styled.div`
  font-family: ${p => p.theme.fontFamilyFixed};
  margin-bottom: 0.75em;
  font-size: ${p => (p.length < 14 ? '1.75em' : p.length > 40 ? '1.1em' : '1.3em')};
  line-height: 1;
  text-align: center;
  padding: 0.5em;
  background: hsla(0, 0%, 100%, 0.15);
  border-radius: ${p => p.theme.borderRadius};
  overflow-wrap: break-word;
  position: relative;
  &:last-child {
    margin-bottom: 0;
  }
  &:hover {
    cursor: copy;
    background: hsla(0, 0%, 100%, 0.25);
  }
`;

export default function Secrets({ outputs }) {
  return (
    <Styles>
      {outputs.map(s => (
        <Secret
          key={s}
          onClick={() => {
            copy(s);
          }}
        >
          <SecretTween>{s}</SecretTween>
        </Secret>
      ))}
    </Styles>
  );
}
