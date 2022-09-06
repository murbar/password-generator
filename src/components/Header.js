import React from 'react';
import styled, { css } from 'styled-components';
import SecretTween from 'components/common/SecretTween';
import { media } from 'styles/helpers';

const Styles = styled.header`
  padding: 4rem 0 2rem;
  text-transform: uppercase;
  h1 {
    line-height: 1;
    margin: 0;
  }
  h1 > span {
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
  ${(p) =>
    p.isPwaMode &&
    css`
      padding: 2rem 0 1.5rem;
      h1 > span {
        display: inline-block;
        transform: rotate(0);
        &:first-child,
        &:nth-child(2),
        &:nth-child(3) {
          font-size: 1em;
          margin-right: 0.25em;
        }
      }
    `}
`;

export default function Header({ isPwaMode }) {
  return (
    <Styles isPwaMode={isPwaMode}>
      {!isPwaMode ? (
        <h1>
          <span>
            <SecretTween scrambleOnClick alphaNumeric>
              Secure
            </SecretTween>
          </span>
          <span>
            <SecretTween scrambleOnClick alphaNumeric>
              Password
            </SecretTween>
          </span>
          <span>
            <SecretTween scrambleOnClick alphaNumeric>
              Generator
            </SecretTween>
          </span>
        </h1>
      ) : (
        <h1>
          <span>
            <SecretTween scrambleOnClick alphaNumeric>
              Secure
            </SecretTween>
          </span>
          <span>
            <SecretTween scrambleOnClick alphaNumeric>
              PW
            </SecretTween>
          </span>
          <span>
            <SecretTween scrambleOnClick alphaNumeric>
              Gen
            </SecretTween>
          </span>
        </h1>
      )}
    </Styles>
  );
}
