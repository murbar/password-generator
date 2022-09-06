import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import theme from 'styles/theme';
import App from 'App';
import * as serviceWorker from './serviceWorker';

const Root = () => {
  return (
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  );
};
ReactDOM.render(<Root />, document.getElementById('root'));
serviceWorker.register();
