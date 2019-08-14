import React from 'react';
import styled from 'styled-components';
import Button from 'components/common/Button';
import { ReactComponent as RefreshIcon } from 'images/repeat.svg';

const Styles = styled.div`
  margin-top: 2rem;
  svg {
    transform: rotate(35deg);
    margin-right: 0.75em;
  }
`;

export default function ReGenButton({ onClick }) {
  return (
    <Styles>
      <Button onClick={onClick} title="Generate new secrets">
        <RefreshIcon /> Regenerate Secrets
      </Button>
    </Styles>
  );
}
