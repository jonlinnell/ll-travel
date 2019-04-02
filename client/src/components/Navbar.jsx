import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faSubway, faTrain, faBus, faInfo } from '@fortawesome/free-solid-svg-icons'

import useRouter from './useRouter'

const StyledNavbar = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;

  margin-top: auto;
  z-index: 2;

  height: ${({
    theme: {
      navbar: { height, units },
    },
  }) => `${height}${units}`};

  background-color: white;
`

const NavbarItemList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  height: 100%;
`

const NavbarItem = styled.li`
  display: inline-block;
  margin: 0 12px;

  padding-top: ${({
    theme: {
      navbar: { height, units },
    },
  }) => `${height / 6}${units}`};
  padding-bottom: ${({ active }) => (active ? 0 : '6px')};

  text-align: center;
  height: 100%;
  width: 100%;

  & > a,
  & > a:visited {
    transition: color 0.3s ease-in-out;

    color: ${({ active, theme: { colours } }) =>
      active ? colours.mulberry.colour : colours.asphalt.colour};
  }

  & > a:focus,
  & > a:active {
    border: none;
    outline: none;
    text-decoration: none;
    color: inherit;
  }

  & > a:active {
    color: ${({ theme: { colours } }) => colours.mulberryLight.colour};
    background-color: transparent;
  }
`

const Navbar = () => {
  const { location } = useRouter()

  return (
    <StyledNavbar>
      <NavbarItemList location={location}>
        <NavbarItem active={location.pathname === '/'}>
          <Link to="/">
            <FontAwesomeIcon icon={faHome} />
          </Link>
        </NavbarItem>
        <NavbarItem active={location.pathname === '/tube'}>
          <Link to="/tube">
            <FontAwesomeIcon icon={faSubway} />
          </Link>
        </NavbarItem>
        <NavbarItem active={location.pathname.match(/^\/rail/)}>
          <Link to="/rail">
            <FontAwesomeIcon icon={faTrain} />
          </Link>
        </NavbarItem>
        <NavbarItem active={location.pathname.match(/^\/bus/)}>
          <Link to="/bus">
            <FontAwesomeIcon icon={faBus} />
          </Link>
        </NavbarItem>
        <NavbarItem active={location.pathname === '/about'}>
          <Link to="/about">
            <FontAwesomeIcon icon={faInfo} />
          </Link>
        </NavbarItem>
      </NavbarItemList>
    </StyledNavbar>
  )
}

export default Navbar
