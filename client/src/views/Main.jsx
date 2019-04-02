import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useTransition, animated } from 'react-spring'
import styled from 'styled-components'

import useRouter from '../components/useRouter'

import Navbar from '../components/Navbar'

import Home from './Home'
import NationalRail from './NationalRail'
import Tube from './Tube'
import About from './About'
import Bus from './Bus'

const ContentWrapper = styled.div`
  padding-bottom: ${({
    theme: {
      navbar: { height, units },
    },
  }) => `${height}${units}`};
`

const Routes = () => {
  const { location } = useRouter()

  const transitions = useTransition(location, location => location.pathname, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  return transitions.map(({ item, props, key }) => (
    <animated.div key={key} style={props}>
      <Switch location={item}>
        <Route path="/" exact component={Home} />
        <Route path="/tube" component={Tube} />
        <Route path="/rail" component={NationalRail} />
        <Route path="/rail/:initialCode" component={NationalRail} />
        <Route path="/bus/" component={Bus} />
        <Route path="/bus/:initialCode" component={Bus} />
        <Route path="/about" component={About} />
      </Switch>
      <Navbar />
    </animated.div>
  ))
}

const ViewMain = () => {
  return (
    <ContentWrapper>
      <Router>
        <Routes />
      </Router>
    </ContentWrapper>
  )
}

export default ViewMain
