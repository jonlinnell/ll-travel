import React, { Component } from 'react'

export default class Async extends Component {
  componentWillMount = () => {
    const { load } = this.props

    this.cancelUpdate = false

    load.then(comp => {
      this.Comp = comp
      if (!this.cancelUpdate) {
        this.forceUpdate()
      }
    })
  }

  componentWillUnmount = () => {
    this.cancelUpdate = true
  }

  cancelUpdate = null

  render() {
    const { childProps } = this.props

    return this.Comp ? <this.Comp.default {...childProps} /> : null
  }
}
