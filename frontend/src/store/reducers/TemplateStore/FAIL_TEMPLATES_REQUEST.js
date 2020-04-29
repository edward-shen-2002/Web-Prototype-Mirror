const FAIL_TEMPLATES_REQUEST = (
  state,
  {
    error
  }
) => ({ 
  ...state, 
  isCallInProgress: false, 
  error 
})

export default FAIL_TEMPLATES_REQUEST