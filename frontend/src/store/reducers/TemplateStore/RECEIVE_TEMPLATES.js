const RECEIVE_TEMPLATES = (
  _state,
  {
    response
  }
) => ({ 
  response,
  isCallInProgress: false, 
  error: null
})

export default RECEIVE_TEMPLATES