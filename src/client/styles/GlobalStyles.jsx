import { createGlobalStyle } from 'styled-components'

import DINExtlightEOT from '../fonts/c36d4fee-ad19-437a-ba7f-85eacfad975b.eot'
import DINExtlightTTF from '../fonts/71b25abe-e633-4b0b-b0cf-0875d2ea4c90.ttf'
import DINExtlightWoff from '../fonts/8804ad73-51dd-4dd7-a618-eb80cd20a726.woff'
import DINExtlightWoff2 from '../fonts/1ab7e009-f493-44fc-8a99-afebf8e24b20.woff2'
import DINLightEOT from '../fonts/25df6f92-ec41-4f60-91af-bddc19a3adc2.eot'
import DINLightTTF from '../fonts/9be9615e-18d6-4bf7-bb05-068341c85df3.ttf'
import DINLightWoff from '../fonts/83ff78fa-6d76-4fb5-8bff-8af8eec8e368.woff'
import DINLightWoff2 from '../fonts/e39ef3e7-91b2-45d0-8c2f-cfdcd0c0ab94.woff2'
import DINRefularWoff2 from '../fonts/6ceed230-b2b3-4422-b048-4aa11687430a.woff2'
import DINRegularEOT from '../fonts/9b63158c-0e74-4751-966c-d749c5d31cce.eot'
import DINRegularTtf from '../fonts/247437df-66d2-4605-ac03-1be0e07c31a7.ttf'
import DINRegularWoff from '../fonts/80b0143f-6f0d-4dce-aafd-f3c81b85d177.woff'

const GlobalStyle = createGlobalStyle`
  @font-face{
    font-family:"DIN Extlight";
    src:url("${DINExtlightEOT}?#iefix");
    src:
      url("${DINExtlightEOT}?#iefix") format("eot"),
      url("${DINExtlightWoff2}") format("woff2"),
      url("${DINExtlightWoff}") format("woff"),
      url("${DINExtlightTTF}") format("truetype");
  }

  @font-face{
    font-family:"DIN Light";
    src:url("${DINLightEOT}?#iefix");
    src:
      url("${DINLightEOT}?#iefix") format("eot"),
      url("${DINLightWoff2}") format("woff2"),
      url("${DINLightWoff}") format("woff"),
      url("${DINLightTTF}") format("truetype");
  }

  @font-face{
    font-family:"DIN Regular";
    src:url("${DINRegularEOT}?#iefix");
    src:
      url("${DINRegularEOT}?#iefix") format("eot"),
      url("${DINRefularWoff2}") format("woff2"),
      url("${DINRegularWoff}") format("woff"),
      url("${DINRegularTtf}") format("truetype");
  }
    
  html {
    font-size: 16px;

    box-sizing: border-box;
  }

  *, *:after, *:before {
    box-sizing: inherit;
  }

  body {
    overflow: hidden;

    font-family: 'DIN Light', 'Helvetica Neue', sans-serif;
  }
`

export default GlobalStyle
