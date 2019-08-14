import React from 'react';
import styled from 'styled-components';
import SecretTween from 'components/common/SecretTween';
import { media } from 'styles/helpers';

const Styles = styled.header`
  padding: 4rem 0 2rem;
  text-transform: uppercase;
  h1 {
    line-height: 1;
    margin: 0;
  }
  span {
    transform: rotate(-3deg);
    transform-origin: bottom left;
    display: block;
    white-space: nowrap;
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
    padding: 5rem 0 3rem;
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
    padding: 7rem 0 4rem;
  `}
`;

export default function Header() {
  return (
    <Styles>
      <h1>
        <span>
          <SecretTween scrambleOnClick>Generate</SecretTween>
        </span>
        <span>
          <SecretTween scrambleOnClick>secure passwords</SecretTween>
        </span>
        <span>
          <SecretTween scrambleOnClick>instantly</SecretTween>
        </span>
      </h1>
    </Styles>
  );
}
