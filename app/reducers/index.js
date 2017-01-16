import { combineReducers } from 'redux'

import {
  CHANGE_MODE,
  ELAPSE_SECOND,
  RESET_TIMER,
  START_TIMER
} from '../actions'

const initialState = {
  playing: false,
  mode: 'focus',
  timer: 1500
}

function pomodoro (state = initialState, action) {
  const { type, payload } = action

  if (type === CHANGE_MODE) {
    return {
      ...state,
      mode: payload.mode,
      timer: payload.timer
    }
  }

  if (type === ELAPSE_SECOND) {
    return {
      ...state,
      timer: state.timer - 1
    }
  }

  if (type === START_TIMER) {
    return {
      ...state,
      playing: true
    }
  }

  if (type === RESET_TIMER) {
    return {
      ...state,
      playing: false
    }
  }

  return state
}
const reducers = combineReducers({
  pomodoro
})

export default reducers

