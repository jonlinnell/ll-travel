import styled from 'styled-components'

const ControlForm = styled.div`
  background-color: ${({ theme, colour }) =>
    colour ? theme.colours[colour].colour : 'rgb(80, 80, 80)'};

  padding: 12px;
  width: 100%;

  position: absolute;
  bottom: ${({
    theme: {
      navbar: { height, units },
    },
  }) => `${height}${units}`};

  z-index: 1;
`

export default ControlForm
