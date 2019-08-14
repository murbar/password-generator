import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import copy from 'copy-to-clipboard';
import SecretTween from 'components/common/SecretTween';
import { media } from 'styles/helpers';

const Styles = styled.div`
  background: ${p => p.theme.colors.offBlack};
  color: ${p => p.theme.colors.offWhite};
  margin: 0 -2rem 1.5rem;
  padding: 2rem;
  ${media.tablet`
    padding: 1.5rem;
    border-radius: 0 0 ${p => p.theme.borderRadius} ${p => p.theme.borderRadius};
    margin: 0;
  `}
`;

const SecretStyles = styled.div`
  font-family: ${p => p.theme.fontFamilyFixed};
  margin-bottom: 0.75em;
  font-size: ${p => (p.length < 14 ? '1.75em' : p.length > 38 ? '1.1em' : '1.3em')};
  height: ${p => (p.length < 14 ? '6rem' : p.length > 22 ? '10rem' : '8rem')};
  ${media.tablet`
    font-size: ${p => (p.length < 14 ? '1.75em' : p.length > 35 ? '1.1em' : '1.3em')};
    height: ${p => (p.length < 14 ? '6rem' : '8rem')};
  `}
  line-height: 1.2;
  padding: 0 1rem;
  background: hsla(0, 0%, 100%, 0.15);
  border-radius: ${p => p.theme.borderRadius};
  position: relative;
  transition: all 300ms;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow-wrap: break-word;
  word-break: break-word;
  &:last-child {
    margin-bottom: 0;
  }
  &:hover {
    cursor: copy;
    background: hsla(0, 0%, 100%, 0.25);
  }
  &:before {
    content: 'Copied!';
    display: flex;
    color: ${p => p.theme.colors.offWhite};
    font-weight: bold;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
    opacity: 0;
    transition: opacity 300ms;
  }
  &.notify {
    color: hsla(0, 0%, 100%, 0.08);
  }
  &.notify:before {
    opacity: 1;
  }
`;

const Secret = ({ children, copyValue, length }) => {
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);

  const copyAndNotify = () => {
    copy(copyValue);
    setCopied(true);
    if (!timer.current) {
      timer.current = window.setTimeout(() => {
        setCopied(false);
        timer.current = null;
      }, 2000);
    }
  };

  useEffect(() => {
    return () => {
      timer.current && window.clearTimeout(timer.current);
    };
  }, []);

  return (
    <SecretStyles
      onClick={copyAndNotify}
      className={copied && 'notify'}
      title="Click to copy"
      length={length}
    >
      {children}
    </SecretStyles>
  );
};

export default function Secrets({ outputs }) {
  return (
    <Styles>
      {outputs.map(s => (
        <Secret key={s} copyValue={s} length={s.length}>
          <SecretTween>{s}</SecretTween>
        </Secret>
      ))}
    </Styles>
  );
}
