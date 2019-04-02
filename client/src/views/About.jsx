import React from 'react'
import moment from 'moment'

import LogoImg from '../images/logo.png'

const About = () => (
  <div>
    <img width={240} src={LogoImg} alt="Loughborough University London" />
    <h2>Travel</h2>
    <p>A app for making travel queries simple and straightforward.</p>
    <p>
      Please send any comments, suggestions, bug reports, and feedback to
      <a href="mailto:london-facilities@lboro.ac.uk"> London Facilities</a>.
    </p>
    <p>{`Built by Jon Linnell, ${moment().format('YYYY')}.`}</p>
  </div>
)

export default About
