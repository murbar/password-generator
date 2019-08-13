import React from 'react';
import styled from 'styled-components';
import { media } from 'styles/helpers';

const Styles = styled.div`
  font-size: 0.9em;
  border-bottom: 1rem;
`;

export default function Tips() {
  return (
    <Styles>
      <ol>
        <li>Choose one</li>
        <li>Click to copy</li>
        <li>Enjoy your day</li>
      </ol>
    </Styles>
  );
}
