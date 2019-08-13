import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import copy from 'copy-to-clipboard';
import Header from 'components/Header';
import Label from 'components/common/Label';
import Input from 'components/common/Input';
import PasswordParams from 'components/PasswordParams';
import PassphraseParams from 'components/PassphraseParams';
import Secrets from 'components/Secrets';
import Inputs from 'components/Inputs';
import FormField from 'components/common/FormField';
import useLocalStorageState from 'hooks/useLocalStorageState';
import useHotKeys from 'hooks/useHotKeys';
import config from 'config';
import { fireHotKey } from 'helpers';
import { generatePassphrases, generatePasswords } from 'cryptoLogic';
import Stats from 'components/Stats';
import { getEntropy } from 'cryptoLogic';

const Styles = styled.div`
  margin: 0 auto;
  max-width: 66rem;
`;

function App() {
  const { localStorageKeys, modes, initParams } = config;
  const [params, setParams] = useLocalStorageState(localStorageKeys.params, initParams);
  const [mode, setMode] = useLocalStorageState(localStorageKeys.mode, modes.PP);
  const [outputs, setOutputs] = useState({
    [modes.PW]: [],
    [modes.PP]: []
  });
  const entropy = getEntropy(params, mode);

  const handleInputChange = e => {
    let { name, value, type, checked } = e.target;
    // const prefsNames = ['autoCopy'];

    if (type === 'range' || type === 'number') value = parseInt(value);
    if (type === 'checkbox') value = checked;
    if (type === 'checkbox' && mode === modes.PW) {
      const lastChecked =
        ['upper', 'lower', 'numbers', 'symbols'].map(n => params[mode][n]).filter(v => v).length ===
        1;
      // user should select at least one option
      if (!value && lastChecked) return;
    }
    setParams(prev => ({
      ...prev,
      [mode]: {
        ...prev[mode],
        [name]: value
      }
    }));
    // }
  };

  const generate = useCallback(() => {
    const generateFunction = mode === modes.PW ? generatePasswords : generatePassphrases;
    setOutputs(prev => {
      return {
        ...prev,
        [mode]: generateFunction(params.numSecrets, params[mode])
      };
    });
  }, [mode, modes.PW, params]);

  useEffect(() => {
    generate();
  }, [generate]);

  useHotKeys({
    l: e => {
      fireHotKey(e, () => {
        console.log('params', params);
        console.log('mode', mode);
        console.log('outputs', outputs);
      });
    },
    c: e => {
      fireHotKey(e, () => {
        copy(outputs[mode][0]);
      });
    },
    g: e => {
      fireHotKey(e, () => {
        generate();
      });
    }
  });

  return (
    <Styles>
      <Header />

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

      <h2>Options</h2>
      {mode === modes.PW && <PasswordParams params={params} onChange={handleInputChange} />}
      {mode === modes.PP && <PassphraseParams params={params} onChange={handleInputChange} />}

      <Stats entropy={entropy} />

      <h2>Secrets</h2>
      <ol>
        <li>Pick one, any one</li>
        <li>Click to copy</li>
        <li>Enjoy the rest of your day</li>
      </ol>
      <Secrets outputs={outputs[mode]} />

      <p>
        * Your secrets are generated on this device and are not transmitted or persisted in any way.
        Just look out for nosy parkers and close this browser tab when you're done.
      </p>

      <h2>Tips</h2>
      <Inputs />
    </Styles>
  );
}

export default App;
