import React from 'react';
import styled from 'styled-components';
import copy from 'copy-to-clipboard';
import StringTween from 'components/common/StringTween';

const Styles = styled.div`
  background: ${p => p.theme.colors.offBlack};
  padding: 0.75em;
  border-radius: 0.2rem;
  color: ${p => p.theme.colors.offWhite};
  margin: 1.5rem 0;
`;

const Secret = styled.div`
  font-family: ${p => p.theme.fontFamilyFixed};
  margin-bottom: 0.75em;
  font-size: ${p => (p.length < 14 ? '1.75em' : p.length > 40 ? '1.1em' : '1.3em')};
  line-height: 1;
  text-align: center;
  padding: 0.5em;
  background: hsla(0, 0%, 100%, 0.15);
  border-radius: 0.2rem;
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
          <StringTween>{s}</StringTween>
        </Secret>
      ))}
    </Styles>
  );
}
