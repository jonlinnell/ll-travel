import React, { PureComponent } from 'react'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

import Header from './Header'
import Row from './Row'
import Input from './Input'
import ControlForm from './ControlForm'

class BusControlForm extends PureComponent {
  updateTimeoutId = null

  constructor(props) {
    super(props)

    this.state = {
      stopCode: null,
    }
  }

  handleChange = e => {
    const { setStopCode } = this.props

    e.persist()

    const updatedStopCode = e.target.value === '' ? null : e.target.value

    clearTimeout(this.updateTimeoutId)

    this.setState({ stopCode: updatedStopCode }, () => {
      const { stopCode } = this.state

      this.updateTimeoutId = setTimeout(() => {
        setStopCode(stopCode)

        if (stopCode !== null && stopCode.length === 5) {
          e.target.blur()
        }
      }, 1000)
    })
  }

  render() {
    return (
      <ControlForm colour="bus">
        <Header title="Enter a stop code" icon={faSearch} useFA small />
        <Row>
          <Input
            placeholder="5-digit stop code"
            type="number"
            name="stopCode"
            id="stopCode"
            onChange={this.handleChange}
          />
        </Row>
      </ControlForm>
    )
  }
}

export default BusControlForm
