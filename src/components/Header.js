import React from 'react';
import styled from 'styled-components';

const Styles = styled.header`
  h1 {
    padding: 2.5rem 0;
    font-weight: 400;
    line-height: 1;
    color: #ff4dff;
    span {
      display: block;
      &:first-child {
      }
      &:nth-child(2) {
        font-size: 1.2em;
      }
      &:nth-child(3) {
        font-size: 0.9em;
      }
    }
  }
`;

export default function Header() {
  return (
    <Styles>
      <h1>
        <span>Generate</span> <span>secure passwords</span>
        <span>instantly</span>
      </h1>
    </Styles>
  );
}
