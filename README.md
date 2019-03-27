# london-travel
A simple mobile-first web app for checking travel information in London and the UK.

Originally built for Loughborough University London, but easily customisable.

| | |
|:-------------------------:|:-------------------------:|
| ![Home screen](https://raw.githubusercontent.com/jonlinnell/london-travel/master/docs/screenshot_main.png) | ![Tube status](https://raw.githubusercontent.com/jonlinnell/london-travel/master/docs/screenshot_tube.png)|
| Home Screen | Status of the London Underground. |
|![National Rail](https://raw.githubusercontent.com/jonlinnell/london-travel/master/docs/screenshot_rail.png) | ![London Bus](https://raw.githubusercontent.com/jonlinnell/london-travel/master/docs/screenshot_bus.png)|
| Check up-to-date train departure times for any National Rail station in the UK. | See the next buses for any London bus stop using the stop's 5-digit SMS code. |

## Description
This app is intended to be a simple, user-led app for checking travel information on-the-go. It was originally built with a specific client in mind, however the project is largely customisable, and could be rebranded and reused fairly easily.

The project consists of a Node.js backend, used to abstract APIs and cache common responses for a short periof of time, and a React frontend.

## Configuration
### Backend
Customise `.env` for your configuration before starting the backend server.
#### Options
`CERT`\*\*
The path to your server's `fullchain.pem` file; Visit [Lets Encrypt](https://letsencrypt.org/) for information on how to get an SSL certificate..

`DARWIN_TOKEN`\* Your Darwin API token. Visit the [National Rail developers page](http://www.nationalrail.co.uk/100296.aspx) for more information.

`KEY`\*\*
The path to your server's `privkey.pem` file.

`ORIGIN`
Allowed CORS origins. Use with care, and note that this app's handling of CORS is due to change in a future version.

`PORT`
Which port to run the server on. Defaults to 3000.

`TFL_APP_ID`\* and `TFL_APP_KEY`\*
Your TfL App ID and key. Visit the [TfL API portal](https://api.tfl.gov.uk/) for more information.

`USE_TEST_DATA`
Prevent the server from making API calls and returning live data, instead use saved example data in `testData/`. Useful for working on the frontend without getting rate-limited or annoying TfL.


\*\* = required only when `NODE_ENV === 'production`

\* = always required
