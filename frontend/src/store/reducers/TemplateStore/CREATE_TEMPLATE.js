const CREATE_TEMPLATE = (
  state,
  {
    response
  }
) => ({ 
  response: { ...state.response, Values: [ ...state.response.Values, response.Value ] },
  isCallInProgress: false, 
  error: null
})

export default CREATE_TEMPLATE