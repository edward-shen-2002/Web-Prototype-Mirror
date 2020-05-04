const FAIL_REQUEST = (
  state,
  {
    error
  }
) => ({ 
  ...state, 
  isCallInProgress: false, 
  error 
})

export default FAIL_REQUEST