import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Header from 'components/Header';
import useLocalStorageState from 'hooks/useLocalStorageState';
import useHotKeys from 'hooks/useHotKeys';
import { fireHotKey, convertToCharCodeArray, convertToString, quadOut } from 'helpers';
import {
  generatePassphrases,
  generatePasswords,
  generatePassword,
  generatePassphrase
} from 'generators';
import config from 'config';
import FormField from 'components/common/FormField';
import Label from 'components/common/Label';
import Input from 'components/common/Input';
import PasswordParams from 'components/PasswordParams';
import PassphraseParams from 'components/PassphraseParams';
import { animated, useSprings, useTransition } from 'react-spring';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const Styles = styled.div`
  margin: 0 2rem;
`;

const Output = styled.div``;

const Secrets = styled.div`
  background: teal;
  padding: 1em;
  border-radius: 0.5em;
  color: white;
`;

const Secret = styled.div`
  font-family: ${p => p.theme.fontFamilyFixed};
  /* font-weight: 500; */
  margin-bottom: 1rem;
  font-size: 1.25em;
  line-height: 1;
  &:last-child {
    margin-bottom: 0;
  }
`;

const AnimatedSecret = animated(Secret);

function App() {
  const { localStorageKeys, modes, initParams } = config;
  const [params, setParams] = useLocalStorageState(localStorageKeys.params, initParams);
  const [mode, setMode] = useLocalStorageState(localStorageKeys.mode, modes.PP);
  const [outputs, setOutputs] = useState({
    [modes.PW]: [],
    [modes.PP]: []
  });

  const handleInputChange = e => {
    let { name, value, type, checked } = e.target;

    if (type === 'range' || type === 'number') value = parseInt(value);
    if (type === 'checkbox') value = checked;

    if (type === 'checkbox' && mode === modes.PW) {
      const lastChecked =
        ['upper', 'lower', 'numbers', 'symbols'].map(n => params[mode][n]).filter(v => v).length ===
        1;
      if (!value && lastChecked) return;
    }

    setParams(prev => ({
      ...prev,
      [mode]: {
        ...prev[mode],
        [name]: value
      }
    }));
  };

  const generate = useCallback(() => {
    const generateFunction = mode === modes.PW ? generatePasswords : generatePassphrases;
    setOutputs(prev => ({
      ...prev,
      [mode]: generateFunction(params.numSecrets, params[mode])
    }));
  }, [mode, modes, params]);

  useEffect(() => {
    generate();
  }, [generate]);

  useHotKeys({
    l: e => {
      fireHotKey(e, () => {
        console.log(params);
        console.log(mode);
        console.log(outputs);
      });
    },
    c: e => {
      fireHotKey(e, () => {
        // copy secret to clipboard
      });
    },
    r: e => {
      fireHotKey(e, () => {
        generate();
      });
    }
  });

  const secrets = outputs[mode].map(s => convertToCharCodeArray(s));
  const stubs = outputs[mode].map(() =>
    convertToCharCodeArray(generatePassword(secrets[0].length))
  );
  const transitions = useSprings(
    secrets.length,
    secrets.map((s, i) => ({
      from: { string: stubs[i] },
      string: s
    }))
  );

  // maybe pad the array to 100 since teh string will never be longer than that

  return (
    <Styles>
      <Header />
      <p>
        All secrets are generated on this device and are not transmitted over any network or
        persisted in any way. Check your
      </p>

      <h2>Type</h2>
      <FormField>
        <Label>
          Password
          <Input
            type="radio"
            name="mode"
            value={modes.PW}
            checked={mode === modes.PW}
            onChange={() => setMode(modes.PW)}
          />
        </Label>
        <Label>
          Passphrase
          <Input
            type="radio"
            name="mode"
            value={modes.PP}
            checked={mode === modes.PP}
            onChange={() => setMode(modes.PP)}
          />
        </Label>
      </FormField>
      <button onClick={() => generate()}>Regenerate</button>

      <h2>Parameters</h2>

      {mode === modes.PW && <PasswordParams params={params} onChange={handleInputChange} />}
      {mode === modes.PP && <PassphraseParams params={params} onChange={handleInputChange} />}

      <Output>
        <h2>Result</h2>
        <Secrets>
          {transitions.map((s, i) => (
            <CopyToClipboard
              key={i}
              text={secrets[i]}
              onCopy={() => {
                console.log('Copied', secrets[i]);
              }}
            >
              <AnimatedSecret>
                {s.string.interpolate((...chars) => convertToString(chars))}
              </AnimatedSecret>
            </CopyToClipboard>
          ))}
        </Secrets>
      </Output>
    </Styles>
  );
}

export default App;
