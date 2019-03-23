import React, { Fragment } from 'react'
import { render } from 'react-dom'
import { ThemeProvider } from 'styled-components'

import AsyncLoader from './components/AsyncLoader'

import theme from './styles/theme.json'

import GlobalStyles from './styles/GlobalStyles'
import Normalize from './styles/Normalize'

const ViewMain = () => <AsyncLoader load={import('./views/Main')} />

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
