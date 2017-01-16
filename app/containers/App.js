import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from '../actions'

const mapStateToProps = (state) => {
  const { pomodoro } = state

  return {
    pomodoro
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
class App extends Component {
  interval = null

  elapseTime = () => {
    const { actions, pomodoro } = this.props

    if (pomodoro.playing) {
      actions.elapseSecond()
    }
  }

  handleModeChange = mode => () => {
    this.props.actions.changeMode(mode)
  }

  componentDidMount = () => {
    this.interval = setInterval(this.elapseTime, 1000)
  }

  render = () => (
    <div>
      <h1>{this.props.pomodoro.timer}</h1>
      <button onClick={this.props.actions.start}>Start</button>
      <button onClick={this.props.actions.reset}>Reset</button>

      <hr />

      <button onClick={this.handleModeChange('focus')}>Focus</button>
      <button onClick={this.handleModeChange('short-break')}>Short Break</button>
      <button onClick={this.handleModeChange('long-break')}>Long Break</button>
    </div>
  )
}

export default App
