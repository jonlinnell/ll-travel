/* global __CONFIG__ */

import React from 'react';
import { render } from 'react-dom';
import { ThemeProvider } from 'styled-components';

import theme from './styles/theme.json';

import GlobalStyles from './styles/GlobalStyles';
import Normalize from './styles/Normalize';

import ViewMain from './views/Main';

const App = () => (
  <ThemeProvider theme={theme}>
    <>
      <GlobalStyles />
      <Normalize />
      {!__CONFIG__.API ? (
        <div style={{ width: '100vw', padding: '10vh 5vw', textAlign: 'center' }}>
          <h1>App not configured</h1>
          <p>
            Required environment variable
            <span style={{ fontFamily: 'Courier New' }}> API </span>has not been defined.
          </p>
          <p>Please fix this before rebuilding/restarting the app.</p>
        </div>
      ) : (
        <ViewMain />
      )}
    </>
  </ThemeProvider>
);

render(<App />, document.getElementById('root'));
