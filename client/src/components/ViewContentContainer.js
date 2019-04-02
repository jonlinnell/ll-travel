import styled from 'styled-components'

const ViewContentContainer = styled.div`
  position: absolute;
  width: 100%;
  min-height: 100vh;

  padding: ${({ noPadding }) => (noPadding ? '0px' : '12px')};
  padding-bottom: ${({
    theme: {
      navbar: { height, units },
    },
  }) => `${height}${units}`};

  background: ${({ backgroundImage }) => (backgroundImage ? `url(${backgroundImage})` : 'none')};
  will-change: transform, opacity;
`

export default ViewContentContainer
