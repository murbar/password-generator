import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Header from 'components/Header';
import useLocalStorageState from 'hooks/useLocalStorageState';
import useHotKeys from 'hooks/useHotKeys';
import { fireHotKey } from 'helpers';
import { generatePassphrases, generatePasswords } from 'generators';
import config from 'config';
import FormField from 'components/common/FormField';
import Label from 'components/common/Label';
import Input from 'components/common/Input';
import PasswordParams from 'components/PasswordParams';
import PassphraseParams from 'components/PassphraseParams';
import Outputs from 'components/Outputs';

const Styles = styled.div`
  margin: 0 2rem;
`;

function App() {
  const { localStorageKeys, modes, initPrefs, initParams } = config;
  const [prefs, setPrefs] = useLocalStorageState(localStorageKeys.prefs, initPrefs);
  const [params, setParams] = useLocalStorageState(localStorageKeys.params, initParams);
  const [mode, setMode] = useLocalStorageState(localStorageKeys.mode, modes.PP);
  const [outputs, setOutputs] = useState({
    [modes.PW]: [],
    [modes.PP]: []
  });

  const handleInputChange = e => {
    let { name, value, type, checked } = e.target;
    const prefsNames = ['autoCopy'];

    if (type === 'range' || type === 'number') value = parseInt(value);
    if (type === 'checkbox') value = checked;
    if (type === 'checkbox' && mode === modes.PW) {
      const lastChecked =
        ['upper', 'lower', 'numbers', 'symbols'].map(n => params[mode][n]).filter(v => v).length ===
        1;
      // user should select at least one option
      if (!value && lastChecked) return;
    }

    if (prefsNames.includes(name)) {
      console.log('pref');
      setPrefs(prev => ({ ...prev, [name]: value }));
    } else {
      console.log('param');
      setParams(prev => ({
        ...prev,
        [mode]: {
          ...prev[mode],
          [name]: value
        }
      }));
    }
  };

  const generate = useCallback(() => {
    const generateFunction = mode === modes.PW ? generatePasswords : generatePassphrases;
    setOutputs(prev => {
      console.log('generate running');

      return {
        ...prev,
        [mode]: generateFunction(params.numSecrets, params[mode])
      };
    });
  }, [mode, modes.PW, params]);

  useEffect(() => {
    console.log('effect running');
    generate();
  }, [generate]);

  useHotKeys({
    l: e => {
      fireHotKey(e, () => {
        console.log('params', params);
        console.log('prefs', prefs);
        console.log('mode', mode);
        console.log('outputs', outputs);
      });
    },
    c: e => {
      fireHotKey(e, () => {
        // copy secret to clipboard
      });
    },
    g: e => {
      fireHotKey(e, () => {
        generate();
      });
    }
  });

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
      <FormField>
        <Label>
          Auto copy
          <Input
            type="checkbox"
            name="autoCopy"
            checked={prefs.autoCopy}
            onChange={handleInputChange}
          />
        </Label>
      </FormField>
      <button onClick={() => generate()}>Regenerate</button>

      <h2>Parameters</h2>

      {mode === modes.PW && <PasswordParams params={params} onChange={handleInputChange} />}
      {mode === modes.PP && <PassphraseParams params={params} onChange={handleInputChange} />}

      <Outputs secrets={outputs[mode]} />
    </Styles>
  );
}

export default App;
