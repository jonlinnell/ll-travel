import React, { Fragment } from 'react'
import { render } from 'react-dom'
import { ThemeProvider } from 'styled-components'

import theme from './styles/theme.json'

import ViewMain from './views/Main'

import GlobalStyles from './styles/GlobalStyles'
import Normalize from './styles/Normalize'

const App = () => (
  <ThemeProvider theme={theme}>
    <Fragment>
      <GlobalStyles />
      <Normalize />
      <ViewMain />
    </Fragment>
  </ThemeProvider>
)

render(<App />, document.getElementById('root'))
