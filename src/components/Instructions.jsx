import React from 'react';
import styled from 'styled-components';

const Styles = styled.div`
  margin: 3rem 0;
  ol {
    font-size: 0.9em;
  }
`;

export default function Instructions() {
  return (
    <Styles>
      <h2>How does this work?</h2>
      <ol>
        <li>Set your parameters</li>
        <li>Choose a secret, any will do</li>
        <li>Click to copy</li>
        <li>Enjoy your day</li>
      </ol>
    </Styles>
  );
}
