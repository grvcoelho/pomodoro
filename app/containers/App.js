import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from '../actions'
import { formatSeconds } from '../helpers'
import Button from '../components/button'

const mapStateToProps = (state) => {
  const { pomodoro } = state

  return {
    pomodoro
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
})

@connect(mapStateToProps, mapDispatchToProps)
class App extends Component {
  componentDidMount = () => {
    this.interval = setInterval(this.elapseTime, 1000)
  }

  componentWillUnmount = () => {
    clearInterval(this.interval)
  }

  interval = null

  elapseTime = () => {
    const { actions, pomodoro } = this.props

    if (pomodoro.playing) {
      actions.elapseSecond()
    }
  }

  handleModeChange = mode => () => {
    this.props.actions.changeMode(mode)
    this.reset()
  }

  isActive = mode =>
    this.props.pomodoro.mode === mode


  start = () => {
    if (this.props.pomodoro.playing) {
      return
    }

    this.props.actions.start()
    clearInterval(this.interval)
    this.interval = setInterval(this.elapseTime, 1000)
  }

  reset = () => {
    this.props.actions.reset()
    clearInterval(this.interval)
  }

  render = () => (
    <div>
      <h1>{formatSeconds(this.props.pomodoro.timer)}</h1>

      <Button onClick={this.start} disabled={this.props.pomodoro.playing}>Start</Button>
      <Button onClick={this.reset} disabled={!this.props.pomodoro.playing}>Reset</Button>

      <hr />

      <Button
        onClick={this.handleModeChange('focus')}
        disabled={this.isActive('focus')}
      >
        Focus
      </Button>

      <Button
        onClick={this.handleModeChange('short-break')}
        disabled={this.isActive('short-break')}
      >
        Short Break
      </Button>

      <Button
        onClick={this.handleModeChange('long-break')}
        disabled={this.isActive('long-break')}
      >
        Long Break
      </Button>
    </div>
  )
}

export default App
