import React from 'react'
import styled from 'styled-components'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapPin } from '@fortawesome/free-solid-svg-icons'

const PristinePanel = styled.div`
  width: 100vw;
  height: 100vh;

  position: absolute;

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

export default ({ children, text }) => {
  return (
    <PristinePanel>
      <FontAwesomeIcon icon={faMapPin} size="4x" />
      <PristineText>{text}</PristineText>
      {children}
    </PristinePanel>
  )
}
