import React, { Fragment } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { faBus, faLink } from '@fortawesome/free-solid-svg-icons'
import Header from '../components/Header'
import VerticalSpacer from '../components/VerticalSpacer'
import ViewContentContainer from '../components/ViewContentContainer'

import IconTfLRoundel from '../icons/TfLRoundel'
import IconNationalRail from '../icons/NationalRail'

import mainBG from '../images/mainBG.png'
import CampusPhoto from '../images/campus.jpg'

import { getSavedCookieConsent, saveCookieConsent } from '../lib/storage'

const StyledLink = styled(Link)`
  text-decoration: none;
`

const StyledExternalLink = styled.a`
  text-decoration: none;
`

const HomeButton = styled.li`
  padding: 12px;
  margin-bottom: 12px;
  border-radius: 4px;

  -webkit-box-shadow: 1px 1px 2px 0px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 1px 1px 2px 0px rgba(0, 0, 0, 0.3);
  box-shadow: 1px 1px 2px 0px rgba(0, 0, 0, 0.3);

  background: url(${({ backgroundImage }) => backgroundImage}) center no-repeat;
  background-size: cover;
  background-color: ${({ backgroundColour, theme: { colours } }) =>
    colours[backgroundColour] ? colours[backgroundColour].colour : backgroundColour};
  color: ${({ backgroundColour, theme: { colours } }) =>
    colours[backgroundColour] ? colours.text[colours[backgroundColour].text] : 'rgb(0, 0, 0)'};
`

const StyledButtonList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

const ParagraphContainer = styled.div`
  & > p {
    margin: 0;
    margin-bottom: 12px;
  }

  & > p:last-of-type {
    margin-bottom: 0;
  }
`

const Home = () => {
  setTimeout(() => saveCookieConsent(), 3000)

  return (
    <ViewContentContainer backgroundImage={mainBG}>
      <StyledButtonList initialPose="exit" pose="enter">
        <HomeButton backgroundImage={CampusPhoto}>
          <StyledExternalLink href="https://www.lborolondon.ac.uk/" target="_blank">
            <Header
              title="Loughborough University London"
              subtitle="Click here to visit our website."
              icon={faLink}
              useFA
            />
          </StyledExternalLink>
        </HomeButton>
        {!getSavedCookieConsent() && (
          <Fragment>
            <VerticalSpacer size={12} />
            <HomeButton backgroundColour="pebble">
              <ParagraphContainer>
                <p>This app uses cookies (and other similar stuff) to work better for you.</p>
                <p>By staying on this site, you agree to this.</p>
              </ParagraphContainer>
            </HomeButton>
          </Fragment>
        )}
        <VerticalSpacer size={12} />
        <HomeButton backgroundColour="olympicGreen">
          <StyledLink to="/tube">
            <Header
              title="Tube Status"
              subtitle="Current status of the London Underground."
              icon={IconTfLRoundel}
            />
          </StyledLink>
        </HomeButton>
        <HomeButton backgroundColour="merciaRedLight">
          <StyledLink to="/bus">
            <Header
              title="Live Bus Times"
              subtitle="See live departures for any bus stop in London."
              icon={faBus}
              useFA
            />
          </StyledLink>
        </HomeButton>
        <HomeButton backgroundColour="petrolBlue">
          <StyledLink to="/rail">
            <Header
              title="Train Departure Boards"
              subtitle="See all trains leaving a station in the next two hours."
              icon={IconNationalRail}
            />
          </StyledLink>
        </HomeButton>
        <VerticalSpacer size={24} />
        <HomeButton backgroundColour="bus">
          <StyledLink to="/bus/91431,91432">
            <Header title="HereEast (388)" subtitle="London buses arriving soon outside campus." />
          </StyledLink>
        </HomeButton>
        <HomeButton backgroundColour="overground">
          <StyledLink to="/rail/HKW">
            <Header
              title="Hackney Wick"
              subtitle="Check the next London Overground trains."
              icon={IconTfLRoundel}
            />
          </StyledLink>
        </HomeButton>
        <HomeButton backgroundColour="petrolBlueLight">
          <StyledLink to="/rail/SFA">
            <Header
              title="Stratford International"
              subtitle="Check the next Southeastern High Speed services."
              icon={IconNationalRail}
            />
          </StyledLink>
        </HomeButton>
        <HomeButton backgroundColour="petrolBlue">
          <StyledLink to="/rail/SRA">
            <Header
              title="Stratford"
              subtitle="Trains from Stratford regional station, including London Overground and Greater Anglia services."
              icon={IconNationalRail}
            />
          </StyledLink>
        </HomeButton>
      </StyledButtonList>
    </ViewContentContainer>
  )
}

export default Home
