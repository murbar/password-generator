import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import theme from 'styles/theme';
import GlobalStyles from 'styles/global';
import App from './App';
// import * as serviceWorker from './serviceWorker';

const Root = () => {
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <App />
      </>
    </ThemeProvider>
  );
};
ReactDOM.render(<Root />, document.getElementById('root'));
// serviceWorker.unregister();
