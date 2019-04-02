import React, { Fragment } from 'react'
import { render } from 'react-dom'
import { ThemeProvider } from 'styled-components'

import ViewMain from './views/Main'

import theme from './styles/theme.json'

import GlobalStyles from './styles/GlobalStyles'
import Normalize from './styles/Normalize'

const App = () => (
  <ThemeProvider theme={theme}>
    <Fragment>
      <GlobalStyles />
      <Normalize />
      {!process.env.API ? (
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
    </Fragment>
  </ThemeProvider>
)

render(<App />, document.getElementById('root'))
