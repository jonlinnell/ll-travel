import React from 'react'
import styled from 'styled-components'

const BusInfo = styled.li`
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  padding: 12px 6px;
`

const BusDestination = styled.span`
  font-size: 1.3rem;
`

const BusService = styled.span`
  font-size: 1.3rem;
  width: 32px;
  margin-right: 12px;

  color: ${({ theme }) => theme.colours.bus.colour};
`

const BusETA = styled.span`
  font-size: 1rem;
  margin-left: auto;
`

export default ({ bus: { destination, service, eta } }) => (
  <BusInfo>
    <BusService>{service}</BusService>
    <BusDestination>{destination}</BusDestination>
    <BusETA>{eta === 0 ? 'due' : `${eta} mins`}</BusETA>
  </BusInfo>
)
