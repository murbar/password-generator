import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import GlobalStyles from 'styles/global';
import copy from 'copy-to-clipboard';
import Header from 'components/Header';
import Params from 'components/Params';
import Secrets from 'components/Secrets';
import Disclaimer from 'components/Disclaimer';
import Tips from 'components/Tips';
import Instructions from 'components/Instructions';
import useLocalStorageState from 'hooks/useLocalStorageState';
import useHotKeys from 'hooks/useHotKeys';
import config from 'config';
import { fireHotKey } from 'helpers';
import { generatePassphrases, generatePasswords } from 'cryptoLogic';
import Meter from 'components/Meter';
import { getEntropy } from 'cryptoLogic';
import { media } from 'styles/helpers';
import ChoiceToggle from 'components/common/ChoiceToggle';
import Footer from 'components/Footer';

const Styles = styled.div`
  margin: 0 auto;
  ${media.tablet`
    max-width: 66rem;
  `}
`;

function App() {
  const { localStorageKeys, modes, initParams } = config;
  const [params, setParams] = useLocalStorageState(localStorageKeys.params, initParams);
  const [mode, setMode] = useLocalStorageState(localStorageKeys.mode, modes.PW);
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
    c: e => {
      fireHotKey(e, () => {
        copy(outputs[mode][0]);
      });
    },
    r: e => {
      fireHotKey(e, () => {
        generate();
      });
    }
  });

  return (
    <Styles>
      <GlobalStyles />
      <Header />
      <ChoiceToggle
        choices={{ Password: modes.PW, Passphrase: modes.PP }}
        initial={mode === modes.PW ? 'Password' : 'Passphrase'}
        onToggle={m => setMode(m)}
      />
      <Params mode={mode} values={params} onChange={handleInputChange} reGen={() => generate()} />
      <Meter entropy={entropy} />
      <Secrets outputs={outputs[mode]} />
      <Instructions />
      <Disclaimer />
      <Tips />
      <Footer />
    </Styles>
  );
}

export default App;
