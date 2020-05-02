import React from 'react';
import styled from 'styled-components';
import posed from 'react-pose';

import Attribution from '../components/Attribution';
import TubeLineInfo from '../components/TubeLineInfo';
import AppError from '../components/AppError';
import Loading from '../components/Loading';

import useApi from '../lib/use-api';

const INTERVAL = 5 * 60 * 1000; // 5 minutes

const TubeStatusWrapper = styled.div`
  margin: 12px;
`;

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
`;

const PosedLineContainer = posed(LineWrapper)({
  enter: { beforeChildren: true, delayChildren: 100, staggerChildren: 20 },
  exit: { staggerChildren: 10, staggerDirection: -1 },
});

const TubeStatus = () => {
  const { response, error, loading } = useApi({
    endpoint: 'tube',
    interval: INTERVAL,
  });

  return (
    <TubeStatusWrapper>
      <Loading loading={loading}>
        <PosedLineContainer initialPose="exit" pose={response.data ? 'enter' : 'exit'}>
          {response.data?.map(line => (
            <TubeLineInfo line={line} key={line.id} />
          ))}
        </PosedLineContainer>
        <Attribution>
          Powered by TfL Open Data. Visit tfl.gov.uk for more information.
        </Attribution>
      </Loading>
      {error && <AppError error={response.statusText} callerDescription="the tube status" contained />}
    </TubeStatusWrapper>
  );
};

export default TubeStatus;
