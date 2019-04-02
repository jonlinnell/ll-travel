import React, { PureComponent } from 'react'
import styled from 'styled-components'

const SpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-bottom: -${({
      theme: {
        navbar: { height, units },
      },
    }) => `${height}${units}`};

  position: relative;
  top: 100px;

  & > :nth-child(2) {
    top: -10px;
  }

  & > :nth-child(3) {
    top: -20px;
  }

  & > :nth-child(4) {
    top: -30px;
  }

  @keyframes rotate {
    0% {
      transform: rotateZ(-360deg);
    }
    100% {
      transform: rotateZ(0deg);
    }
  }

  @keyframes rotate2 {
    0% {
      transform: rotateZ(360deg);
    }
    100% {
      transform: rotateZ(0deg);
    }
  }
`

const SpinnerRing = styled.div`
  margin: 0;
  padding: 0;

  position: absolute;
  border: 3px solid ${({ secondary }) => (secondary ? 'rgb(183, 0, 98)' : 'rgb(54, 17, 99)')};
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 50%;
  border-left-color: transparent;
  border-right-color: transparent;
  animation: ${({ secondary }) => (secondary ? 'rotate' : 'rotate2')} 2s
    cubic-bezier(0.26, 1.36, 0.74, -0.29) infinite;
`

const Spinner = () => (
  <SpinnerContainer>
    <SpinnerRing size={200} />
    <SpinnerRing size={220} secondary />
    <SpinnerRing size={240} />
    <SpinnerRing size={260} secondary />
  </SpinnerContainer>
)

class Loading extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      showSpinners: false,
    }
  }

  componentDidUpdate(prevProps) {
    const { loading } = this.props

    if (prevProps.loading !== loading) {
      this.timeoutId = setTimeout(() => this.setState({ showSpinners: true }), 500)
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutId)
  }

  timeoutId = null

  render() {
    const { showSpinners } = this.state
    const { children, loading } = this.props

    return <React.Fragment>{loading && showSpinners ? <Spinner /> : children}</React.Fragment>
  }
}

export default Loading
