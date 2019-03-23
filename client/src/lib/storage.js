export const saveCookieConsent = () => localStorage.setItem('cookiesAcknowledged', true)

export const getSavedCookieConsent = () => localStorage.getItem('cookiesAcknowledged')

export const getPreviousRailStations = () =>
  JSON.parse(localStorage.getItem('previousRailStations'))

export const getPreviousBusStops = () => JSON.parse(localStorage.getItem('previousBusStops'))

export const addRailStation = ({ name, code }) => {
  const prevStations = getPreviousRailStations() || []

  if (!prevStations.find(element => element.code === code)) {
    localStorage.setItem(
      'previousRailStations',
      JSON.stringify([{ name, code }].concat(prevStations.slice(-4)))
    )
  }
}

export const addBusStop = ({ name, code }) => {
  const prevStops = getPreviousBusStops() || []

  if (!prevStops.find(element => element.code === code)) {
    localStorage.setItem(
      'previousBusStops',
      JSON.stringify([{ name, code }].concat(prevStops.slice(-4)))
    )
  }
}
