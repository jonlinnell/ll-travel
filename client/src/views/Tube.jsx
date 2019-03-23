import React, { PureComponent } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import posed from 'react-pose'

import Attribution from '../components/Attribution'
import TubeLineInfo from '../components/TubeLineInfo'
import AppError from '../components/AppError'
import Loading from '../components/Loading'

const { API } = process.env

const INTERVAL = 5 // in minutes

const TubeStatusWrapper = styled.div`
  margin: 12px;
`

const LineWrapper = styled.ul`
  padding: 0;
  margin: 0;

  list-style: none;

  & > li {
    :first-child {
      border-top-left-radius: ${props => props.theme.radius};
      border-top-right-radius: ${props => props.theme.radius};
    }

    :last-child {
      border-bottom-left-radius: ${props => props.theme.radius};
      border-bottom-right-radius: ${props => props.theme.radius};
    }
  }
`

const PosedLineContainer = posed(LineWrapper)({
  enter: { beforeChildren: true, delayChildren: 100, staggerChildren: 20 },
  exit: { staggerChildren: 10, staggerDirection: -1 },
})

class TubeStatus extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      data: [],
      loading: false,
      error: null,
      hasError: false,
    }
  }

  componentDidMount() {
    this.fetchData()
    this.intervalId = setInterval(() => this.fetchData(), INTERVAL * 60000)
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  intervalId = null

  fetchData = () => {
    this.setState({ loading: true })
    axios
      .get(`${API}/tube`)
      .then(response =>
        this.setState({
          data: response.data,
          loading: false,
          hasError: false,
          error: null,
        })
      )
      .catch(error =>
        this.setState({
          hasError: true,
          loading: false,
          error,
        })
      )
  }

  render() {
    const { data, loading, hasError, error } = this.state

    return (
      <TubeStatusWrapper>
        <Loading loading={loading && !hasError}>
          <PosedLineContainer initialPose="exit" pose={loading ? 'exit' : 'enter'}>
            {data.map(line => (
              <TubeLineInfo line={line} key={line.id} />
            ))}
          </PosedLineContainer>
        </Loading>
        {!loading && !hasError && (
          <Attribution>
            Powered by TfL Open Data. Visit tfl.gov.uk for more information.
          </Attribution>
        )}
        {hasError && <AppError error={error} callerDescription="the tube status" contained />}
      </TubeStatusWrapper>
    )
  }
}

export default TubeStatus
