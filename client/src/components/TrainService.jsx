import React from 'react'
import styled from 'styled-components'
import { get } from 'lodash'

const StyledTrainService = styled.li`
  & > :first-child {
    padding-bottom: 3px;
  }

  & > :last-child {
    padding-top: 3px;
  }
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 6px;
`

const Destination = styled.p`
  font-size: 1.2rem;
  margin: 0;
  margin-left: 12px;
`

const Time = styled.p`
  font-size: 1rem;
  line-height: 1.3rem;

  margin: 0;
`

const LateText = styled.p`
  font-size: 0.9rem;
  line-height: 1rem;

  margin: 0;

  color: rgb(244, 113, 66);

  margin-right: 12px;
`

const Platform = styled.p`
  margin: 0;
  margin-left: auto;
  font-family: 'DIN Extlight';
  font-size: 0.7rem;
  line-height: 1rem;
`

const renderServiceInfo = etd => {
  let infoElement

  if (etd === 'Cancelled') {
    infoElement = <LateText>This service has been cancelled.</LateText>
  } else if (etd === 'Delayed') {
    infoElement = <LateText>This service is delayed.</LateText>
  } else if (etd !== 'On time') {
    infoElement = <LateText>This service is delayed, and now expected to depart at {etd}.</LateText>
  }

  return infoElement
}

const TrainService = ({ std, etd, destination, platform }) => (
  <StyledTrainService>
    <Row>
      <Time>{std}</Time>
      <Destination>{get(destination, 'name', null)}</Destination>
    </Row>
    <Row>
      {renderServiceInfo(etd)}
      <Platform>{platform}</Platform>
    </Row>
  </StyledTrainService>
)

export default TrainService
