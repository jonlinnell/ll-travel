import React from 'react'
import styled from 'styled-components'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

const LineContainer = styled.li`
  padding: 12px;
  font-family: 'DIN Light';

  background-color: ${({ id, theme }) => theme.lines[id].colour};
  color: ${({ id, theme }) => theme.lines[id].text};
`

const LineName = styled.h4`
  margin: 0;
  font-size: 1rem;
`

const LineStatusSummary = styled.p`
  margin: 0;
  font-size: 0.9rem;
  text-align: right;
  font-family: 'DIN Extlight';
`

const Summary = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
`

const TubeLineInfo = ({ line: { id, name, lineStatuses } }) => (
  <LineContainer id={id}>
    <Summary>
      <LineName>{name}</LineName>
      <LineStatusSummary>
        {lineStatuses[0].statusSeverityDescription === 'Good Service' ? (
          <FontAwesomeIcon icon={faCheck} />
        ) : (
          lineStatuses
            .map(status => status.statusSeverityDescription)
            .filter((v, i, a) => a.indexOf(v) === i) // Unique strings only
            .map(i => i.replace(' ', '\xa0')) // Prevent status messages getting split over lines
            .join(', ')
        )}
      </LineStatusSummary>
    </Summary>
  </LineContainer>
)

export default TubeLineInfo
