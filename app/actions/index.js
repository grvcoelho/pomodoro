export const ELAPSE_SECOND = 'ELAPSE_SECOND'
export const CHANGE_MODE = 'CHANGE_MODE'
export const RESET_TIMER = 'RESET_TIMER'
export const START_TIMER = 'START_TIMER'

export const elapseSecond = () => ({
  type: ELAPSE_SECOND
})

const minutesByMode = {
  'short-break': 5,
  'long-break': 10,
  focus: 25
}

export const changeMode = (mode) => {
  const timer = minutesByMode[mode] * 60

  return {
    type: CHANGE_MODE,
    payload: {
      mode,
      timer
    }
  }
}

export const resetTimer = () => ({
  type: RESET_TIMER
})

export const reset = () => (dispatch, getState) => {
  const state = getState()
  const mode = state.pomodoro.mode

  dispatch(resetTimer())
  dispatch(changeMode(mode))
}

export const start = () => ({
  type: START_TIMER
})

