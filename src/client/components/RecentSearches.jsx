import React from 'react'
import styled from 'styled-components'

const RecentSearches = styled.div``

const RecentSearchesTitle = styled.h4`
  margin-bottom: 6px;
`

const RecentSearchesList = styled.ul`
  text-align: left;
  list-style: none;
  padding: 0;

  & :last-child {
    margin-bottom: 0;
  }
`

const SearchItem = styled.li`
  text-decoration: underline;
  color: ${({ theme: { colours } }) => colours.asphalt.colour};

  margin-bottom: 6px;
`

export default ({ onSelect, previousSearches }) => (
  <RecentSearches>
    <RecentSearchesTitle>Recent Searches</RecentSearchesTitle>
    <RecentSearchesList>
      {previousSearches.map(({ name, code }) => (
        <SearchItem key={code} onClick={() => onSelect(code)}>
          {`${name} →`}
        </SearchItem>
      ))}
    </RecentSearchesList>
  </RecentSearches>
)
