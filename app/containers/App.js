import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from '../actions'
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
      <h1>{this.props.pomodoro.timer}</h1>
      <Button onClick={this.start}>Start</Button>
      <Button onClick={this.reset}>Reset</Button>

      <hr />

      <Button onClick={this.handleModeChange('focus')}>Focus</Button>
      <Button onClick={this.handleModeChange('short-break')}>Short Break</Button>
      <Button onClick={this.handleModeChange('long-break')} disabled>Long Break</Button>
    </div>
  )
}

export default App
