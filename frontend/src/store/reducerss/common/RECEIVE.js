const RECEIVE = (_state, { response }) => ({
  response,
  isCallInProgress: false,
  error: null,
})

export default RECEIVE
