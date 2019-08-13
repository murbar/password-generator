import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import copy from 'copy-to-clipboard';
import Header from 'components/Header';
import Params from 'components/Params';
import Secrets from 'components/Secrets';
import Disclaimer from 'components/Disclaimer';
import Tips from 'components/Tips';
import Instructions from 'components/Instructions';
import Button from 'components/common/Button';
import useLocalStorageState from 'hooks/useLocalStorageState';
import useHotKeys from 'hooks/useHotKeys';
import config from 'config';
import { fireHotKey } from 'helpers';
import { generatePassphrases, generatePasswords } from 'cryptoLogic';
import Stats from 'components/Stats';
import { getEntropy } from 'cryptoLogic';
import { ReactComponent as RefreshIcon } from 'images/repeat.svg';
import { media } from 'styles/helpers';
import ChoiceToggle from 'components/common/ChoiceToggle';

const Styles = styled.div`
  margin: 0 auto;
  ${media.tablet`
    max-width: 66rem;
  `}
`;

const RegenerateButton = styled(Button)`
  svg {
    transform: rotate(35deg);
    margin-right: 0.75em;
  }
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
      <ChoiceToggle
        choices={{ Password: modes.PW, Passphrase: modes.PP }}
        initial={mode === modes.PW ? 'Password' : 'Passphrase'}
        onToggle={m => setMode(m)}
      />
      <Params mode={mode} values={params} onChange={handleInputChange} />
      <Stats entropy={entropy} />
      <Instructions />
      <RegenerateButton onClick={() => generate()} title="Generate new secrets">
        <RefreshIcon /> Re-gen
      </RegenerateButton>
      <Secrets outputs={outputs[mode]} />
      <Disclaimer />
      <Tips />
    </Styles>
  );
}

export default App;
