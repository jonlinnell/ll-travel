import React from 'react'
import styled from 'styled-components'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapPin } from '@fortawesome/free-solid-svg-icons'

const PristinePanel = styled.div`
  height: 100vh;
  width: 100vw;

  padding: 0 48px;
  padding-top: 10vh;

  background-color: ${({ theme: { colours } }) => colours.fountainGrey.colour};
  color: ${({ theme: { colours } }) => colours.asphalt.colour};

  text-align: center;

  display: flex;
  flex-direction: column;
  align-items: center;
`

const PristineText = styled.h3`
  font-size: 1.4rem;
  font-weight: 300;
`

const PristineChildren = styled.div`
  margin: 0 16px;
`

export default ({ children, text }) => (
  <PristinePanel>
    <FontAwesomeIcon icon={faMapPin} size="4x" />
    <PristineText>{text}</PristineText>
    <PristineChildren>{children}</PristineChildren>
  </PristinePanel>
)
