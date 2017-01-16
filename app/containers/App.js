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

  elapse = () => {
    const { actions, pomodoro } = this.props

    if (pomodoro.playing) {
      actions.elapseSecond()
    }
  }

  componentDidMount = () => {
    this.interval = setInterval(this.elapse, 1000)
  }

  render = () => (
    <div>
      <h1>{this.props.pomodoro.timer}</h1>
      <button onClick={this.props.actions.startTimer}>Start</button>
      <button onClick={this.props.actions.resetTimer}>Reset</button>
    </div>
  )
}

export default App
