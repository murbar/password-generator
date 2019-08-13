import React, { useState } from 'react';
import styled from 'styled-components';
import copy from 'copy-to-clipboard';
import SecretTween from 'components/common/SecretTween';
import { media } from 'styles/helpers';

const Styles = styled.div`
  background: ${p => p.theme.colors.offBlack};
  color: ${p => p.theme.colors.offWhite};
  margin: 1.5rem -2rem;
  padding: 2rem;
  ${media.tablet`
  padding: 1.5rem;
    border-radius: ${p => p.theme.borderRadius};
    margin: 1.5rem 0;
  `}
`;

const SecretStyles = styled.div`
  font-family: ${p => p.theme.fontFamilyFixed};
  margin-bottom: 0.75em;
  font-size: ${p => (p.length < 14 ? '1.75em' : p.length > 40 ? '1.1em' : '1.3em')};
  line-height: 1;
  text-align: center;
  padding: 0.5em;
  background: hsla(0, 0%, 100%, 0.15);
  border-radius: ${p => p.theme.borderRadius};
  overflow-wrap: break-word;
  position: relative;
  transition: all 300ms;
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
    color: ${p => p.theme.colors.offBlack};
    background: hsla(0, 0%, 100%, 0.9);
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
  &.notify:before {
    opacity: 1;
  }
`;

const Secret = ({ children, copyValue }) => {
  const [copied, setCopied] = useState(false);
  const timer = React.useRef(null);

  // React.useEffect(() => console.log(copied), [copied]);

  const copyAndNotify = () => {
    console.log(copyValue);
    copy(copyValue);
    setCopied(true);
    if (!timer.current) {
      timer.current = window.setTimeout(() => {
        setCopied(false);
        timer.current = null;
      }, 2000);
    }
  };

  return (
    <SecretStyles onClick={copyAndNotify} className={copied && 'notify'}>
      {children}
    </SecretStyles>
  );
};

export default function Secrets({ outputs }) {
  return (
    <Styles>
      {outputs.map(s => (
        <Secret key={s} copyValue={s}>
          <SecretTween>{s}</SecretTween>
        </Secret>
      ))}
    </Styles>
  );
}
