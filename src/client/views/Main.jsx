import React from 'react'
import { Router, Location } from '@reach/router'
import posed, { PoseGroup } from 'react-pose'
import styled from 'styled-components'

import Navbar from '../components/Navbar'

import Home from './Home'
import Bus from './Bus'
import NationalRail from './NationalRail'
import Tube from './Tube'
import About from './About'

const ViewMainContainer = styled.div``

const ContentWrapper = styled.div`
  height: 100%;

  margin-bottom: ${({
    theme: {
      navbar: { height, units },
    },
  }) => `${height}${units}`};
`

const RouteContainer = posed(ContentWrapper)({
  enter: { opacity: 1, transition: { duration: 350 } },
  exit: { opacity: 0, transition: { duration: 350 } },
})

const PosedRouter = ({ children }) => (
  <Location>
    {({ location }) => (
      <PoseGroup>
        <RouteContainer key={location.key}>
          <Router location={location}>{children}</Router>
        </RouteContainer>
      </PoseGroup>
    )}
  </Location>
)

const ViewMain = () => (
  <ViewMainContainer>
    <PosedRouter>
      <Home path="/" />
      <Tube path="/tube" />
      <NationalRail path="/rail" />
      <NationalRail path="/rail/:initialCode" />
      <Bus path="/bus/" />
      <Bus path="/bus/:initialCode" />
      <About path="/about" />
    </PosedRouter>
    <Navbar />
  </ViewMainContainer>
)

export default ViewMain
