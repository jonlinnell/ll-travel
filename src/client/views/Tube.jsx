import React from 'react';
import styled from 'styled-components';
import posed from 'react-pose';

import Attribution from '../components/Attribution';
import TubeLineInfo from '../components/TubeLineInfo';
import AppError from '../components/AppError';
import Loading from '../components/Loading';

import useApi from '../lib/use-api';

const INTERVAL = 1 * 60 * 500; // 5 minutes

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
  const response = useApi({
    endpoint: '/tube',
    interval: INTERVAL,
  });

  return (
    <TubeStatusWrapper>
      <Loading loading={!response}>
        <PosedLineContainer initialPose="exit" pose={response ? 'enter' : 'exit'}>
          {response && response.data.map(line => (
            <TubeLineInfo line={line} key={line.id} />
          ))}
        </PosedLineContainer>
      </Loading>
      {response && (
        <Attribution>
          Powered by TfL Open Data. Visit tfl.gov.uk for more information.
        </Attribution>
      )}
      {response && response.status !== 200 && <AppError error={response.statusText} callerDescription="the tube status" contained />}
    </TubeStatusWrapper>
  );
};

export default TubeStatus;
