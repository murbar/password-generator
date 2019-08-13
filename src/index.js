import React from 'react';
import ReactDOM from 'react-dom';
import styled, { ThemeProvider } from 'styled-components';
import theme from 'styles/theme';
import GlobalStyles from 'styles/global';
import App from 'App';

const AppContainer = styled.div``;

const BorderBox = styled.div`
  pointer-events: none;
  position: fixed;
  top: 0rem;
  bottom: 0rem;
  left: 0rem;
  right: 0rem;
  border: 0.5rem solid ${p => p.theme.colors.blue};
  z-index: -500;
`;

const Root = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <BorderBox />
        <GlobalStyles />
        <App />
      </AppContainer>
    </ThemeProvider>
  );
};
ReactDOM.render(<Root />, document.getElementById('root'));
