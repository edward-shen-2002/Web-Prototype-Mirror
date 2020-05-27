const SET_SCROLL_DATA = (state, { scrollData }) => {
  let newState = { ...state }

  newState.scrollData = { ...newState.scrollData, ...scrollData }

  return newState
}

export default SET_SCROLL_DATA
