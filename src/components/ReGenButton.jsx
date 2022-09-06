import React from 'react';
import styled from 'styled-components';
import Button from 'components/common/Button';
import { ReactComponent as RefreshIcon } from 'images/repeat.svg';

const Styles = styled.div`
  margin: 2rem 0;
  button {
    width: 100%;
    text-align: center;
    justify-content: center;
  }
  svg {
    transform: rotate(35deg);
    margin-right: 0.75em;
  }
`;

export default function ReGenButton({ onClick }) {
  return (
    <Styles>
      <Button onClick={onClick} title="Generate new secrets (R)">
        <RefreshIcon /> Regenerate Secrets
      </Button>
    </Styles>
  );
}
