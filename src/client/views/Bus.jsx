import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import posed from 'react-pose';

import { faBus } from '@fortawesome/free-solid-svg-icons';

import AppError from '../components/AppError';
import Attribution from '../components/Attribution';
import BusControlForm from '../components/BusControlForm';
import BusInfo from '../components/BusInfo';
import Header from '../components/Header';
import Loading from '../components/Loading';
import Pristine from '../components/Pristine';
import RecentSearches from '../components/RecentSearches';

import { addBusStop, getPreviousBusStops } from '../lib/storage';

import useApi from '../lib/use-api';

const INTERVAL = 30; // in seconds
const contentContainerId = 'bus-departures-wrapper';

const ViewBusWrapper = styled.div`
  height: 100%;
  margin-bottom: 15vh;
`;

const BusDeparturesWrapper = styled.div`
  padding: 12px;
`;

const BusContainer = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;

  & > :nth-child(odd) {
    background-color: rgba(253, 246, 225, 0.5);
  }
`;

const PosedBusContainer = posed(BusContainer)({
  enter: { opacity: 1, delayChildren: 50, staggerChildren: 50 },
  exit: { opacity: 0, staggerChildren: 10, staggerDirection: -1 },
});

const parseError = (error) => {
  if (error.response) {
    const { data, status } = error.response;
    let response;

    if (status === 500) {
      if (data.match(/416/)) {
        response = { errorString: "This bus stop code doesn't seem to exist." };
      } else if (data.match(/response\.data\.replace is not a function/)) {
        response = { errorString: 'No results for this stop.' };
      } else {
        response = { errorString: data };
      }

      if (response) {
        return response;
      }
    }
  }

  return error;
};

function ViewBus({ initialStopCode }) {
  const previousBusStops = getPreviousBusStops();

  const [stopCode, setStopCode] = useState(initialStopCode);
  const [stopName, setStopName] = useState();

  const pristine = !stopCode;

  const { response, error, loading } = useApi({
    endpoint: `bus/${stopCode}`,
    initialFetch: !pristine,
  });


  useEffect(() => {
    if (response.data) {
      setStopName(response?.data.stopName);
    }
  }, [response]);

  // @TODO: Use PoseGroup for buses, once exit bug is fixed by maintainer
  return (
    <ViewBusWrapper id={contentContainerId}>
      <Loading loading={loading}>
        {pristine ? (
          <Pristine text="Enter a stop code below to get started">
            {previousBusStops && (
              <RecentSearches previousSearches={previousBusStops} onSelect={setStopCode} />
            )}
          </Pristine>
        ) : (
          stopName && (
            <BusDeparturesWrapper>
              <Header
                title={stopName}
                subtitle="Next buses at this stop."
                icon={faBus}
                backgroundColour="bus"
                topFill
                useFA
              />
              <PosedBusContainer initialPose="exit" pose={loading ? 'exit' : 'enter'}>
                {response.data?.buses.map(bus => (
                  <BusInfo bus={bus} key={bus.journeyId} />
                ))}
              </PosedBusContainer>
              <Attribution>
                Powered by TfL Open Data. Visit tfl.gov.uk for more information.
              </Attribution>
            </BusDeparturesWrapper>
          )
        )}
      </Loading>

      {
        error && (
          <AppError
            error={parseError(error)}
            callerDescription="bus departure information"
            contained
          />
        )
      }

      <BusControlForm onSetStopCode={setStopCode} />
    </ViewBusWrapper>
  );
}

export default ViewBus;
