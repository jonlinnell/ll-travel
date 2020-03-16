import React, { PureComponent } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import posed from 'react-pose'
import { get } from 'lodash'

import { faSearch } from '@fortawesome/free-solid-svg-icons'

import AppError from '../components/AppError'
import Attribution from '../components/Attribution'
import Header from '../components/Header'
import Loading from '../components/Loading'
import Pristine from '../components/Pristine'
import RecentSearches from '../components/RecentSearches'
import TrainService from '../components/TrainService'
import TrainStationLookup from '../components/TrainStationLookup'

import IconNationalRail from '../icons/NationalRail'

import { addRailStation, getPreviousRailStations } from '../lib/storage'

const { API } = process.env

const INTERVAL = 1 // in minutes

const contentContainerId = 'train-services-wrapper'

const ViewNationalRailWrapper = styled.div`
  height: 100%;
  margin-bottom: 15vh;
`

const DepartureBoardWrapper = styled.div`
  padding: 12px;
  margin-bottom: 48px;
`

const TrainServices = styled.ul`
  list-style: none;

  margin: 0;
  padding: 0;
`

const StyledControlForm = styled.div`
  background-color: ${({ theme }) => theme.colours.rail.colour};

  padding: 12px;
  width: 100%;

  position: fixed;
  z-index: 1;
  bottom: ${({
    theme: {
      navbar: { height, units },
    },
  }) => `${height}${units}`};
`

const PosedTrainServiceContainer = posed(TrainServices)({
  enter: { opacity: 1, delayChildren: 50, staggerChildren: 50 },
  exit: { opacity: 0, staggerChildren: 10, staggerDirection: -1 },
})

const validateStationCode = stationCode => stationCode && stationCode.match(/[A-Z]{3}/)

class ViewNationalRail extends PureComponent {
  intervalId = null

  constructor(props) {
    super(props)

    this.state = {
      data: [],
      destinationCode: null,
      destinationName: null,
      error: null,
      hasError: false,
      loading: false,
      pristine: true,
      stationCode: null,
      stationName: null,
    }

    this.setStationCode = this.setStationCode.bind(this)
    this.setDestinationCode = this.setDestinationCode.bind(this)
    this.clearStationCode = this.clearStationCode.bind(this)
    this.clearDestinationCode = this.clearDestinationCode.bind(this)
  }

  componentDidMount() {
    const { initialCode } = this.props

    document.getElementById(contentContainerId).scrollIntoView()

    if (initialCode) {
      this.setStationCode(initialCode)
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  setStationCode = newStationCode => {
    clearInterval(this.intervalId)

    this.setState(
      {
        pristine: false,
        stationCode: newStationCode,
      },
      () => {
        const { stationCode } = this.state

        if (validateStationCode(stationCode)) {
          this.fetchData()
          this.intervalId = setInterval(() => this.fetchData(), INTERVAL * 60000)
        } else {
          clearInterval(this.intervalId)
        }
      }
    )
  }

  setDestinationCode = newDestinationCode => {
    clearInterval(this.intervalId)

    this.setState(
      {
        pristine: false,
        destinationCode: newDestinationCode,
      },
      () => {
        const { destinationCode } = this.state

        if (validateStationCode(destinationCode)) {
          this.fetchData()
          this.intervalId = setInterval(() => this.fetchData(), INTERVAL * 60000)
        } else {
          clearInterval(this.intervalId)
        }
      }
    )
  }

  clearStationCode = () => this.setState({ stationCode: null, stationName: null, data: [] })

  clearDestinationCode = () =>
    this.setState({ destinationCode: null, destinationName: null }, () => this.fetchData())

  fetchData = () => {
    const { stationCode, destinationCode } = this.state

    this.setState({ loading: true })
    axios
      .get(`${API}/rail/${stationCode}${destinationCode ? `/${destinationCode}` : ''}`)
      .then(response => {
        this.setState({
          data: response.data.trainServices,
          destinationName: get(response.data.destination, 'name', null),
          error: null,
          hasError: false,
          loading: false,
          stationName: get(response.data.station, 'name', null),
        })

        addRailStation({ name: response.data.station.name, code: stationCode })
        document.getElementById(contentContainerId).scrollIntoView()
      })
      .catch(error =>
        this.setState({
          data: [],
          destinationCode: null,
          destinationName: null,
          error,
          hasError: true,
          loading: false,
          stationCode: null,
          stationName: null,
        })
      )
  }

  render() {
    const { data, destinationName, error, hasError, loading, pristine, stationName } = this.state

    const previousRailStations = getPreviousRailStations()

    return (
      <ViewNationalRailWrapper id={contentContainerId}>
        <Loading loading={loading && !hasError && !data.length}>
          {pristine ? (
            <Pristine text="Lookup a train station below to get started">
              {previousRailStations && (
                <RecentSearches
                  previousSearches={previousRailStations}
                  onSelect={this.setStationCode}
                />
              )}
            </Pristine>
          ) : (
            <DepartureBoardWrapper>
              {stationName && (
                <Header
                  title={stationName}
                  subtitle={`Next trains departing from this station${
                    destinationName ? ` calling at ${destinationName}.` : '.'
                  }`}
                  icon={IconNationalRail}
                  backgroundColour="rail"
                  topFill
                />
              )}
              <PosedTrainServiceContainer initialPose="exit" pose={loading ? 'exit' : 'enter'}>
                {data.map((service, i) => (
                  <TrainService key={service.rsid} secondary={i % 2} {...service} />
                ))}
              </PosedTrainServiceContainer>
              {!hasError && stationName && data && (
                <Attribution>Powered by National Rail Enquiries.</Attribution>
              )}
            </DepartureBoardWrapper>
          )}
        </Loading>
        {hasError && <AppError error={error} callerDescription="train departure board" contained />}
        <StyledControlForm>
          <Header title="Enter a station..." icon={faSearch} useFA small />
          <TrainStationLookup
            label="Station"
            id="stationCode"
            onSubmit={this.setStationCode}
            onClear={this.clearStationCode}
          />
          <TrainStationLookup
            label="Show trains calling at"
            id="destination"
            onSubmit={this.setDestinationCode}
            onClear={this.clearDestinationCode}
            disabled={!stationName}
          />
        </StyledControlForm>
      </ViewNationalRailWrapper>
    )
  }
}

export default ViewNationalRail
