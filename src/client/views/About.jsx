import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

import LogoImg from '../images/logo.png';

const ViewAboutWrapper = styled.div`
  margin: 2vh 12px 0 12px;
  height: 100vh;

  overflow-x: hidden;
`;

const About = () => (
  <ViewAboutWrapper>
    <img width={240} src={LogoImg} alt="Loughborough University London" />
    <h2>Travel</h2>
    <p>A app for making travel queries simple and straightforward.</p>
    <p>
      Please send any comments, suggestions, bug reports, and feedback to
      <a href="mailto:london-facilities@lboro.ac.uk"> London Facilities</a>.
    </p>
    <p>{`Built by Jon Linnell, ${moment().format('YYYY')}.`}</p>
  </ViewAboutWrapper>
);

export default About;
