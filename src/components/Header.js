import React from 'react';
import styled from 'styled-components';
import SecretTween from 'components/common/SecretTween';
import { media } from 'styles/helpers';

const Styles = styled.header`
  padding: 2rem 0;
  h1 {
    line-height: 1;
  }
  span {
    display: block;
    &:first-child {
      font-size: 1.2em;
    }
    &:nth-child(2) {
      font-size: 1em;
    }
    &:nth-child(3) {
      font-size: 0.8em;
    }
  }
  ${media.tablet`
    padding: 3rem 0;
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
  `}
  ${media.desktop`
    padding: 6rem 0 3rem;
  `}
`;

export default function Header() {
  return (
    <Styles>
      <h1>
        <span>
          <SecretTween duration={500}>Generate</SecretTween>
        </span>
        <span>
          <SecretTween>secure passwords</SecretTween>
        </span>
        <span>
          <SecretTween>instantly</SecretTween>
        </span>
      </h1>
    </Styles>
  );
}
