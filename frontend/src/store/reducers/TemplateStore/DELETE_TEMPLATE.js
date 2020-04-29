const DELETE_TEMPLATE = (
  state,
  {
    response
  }
) => ({ 
  response: { ...state.response, Values: state.response.Values.filter((value) => value._id != response.Value._id) },
  isCallInProgress: false, 
  error: null
})

export default DELETE_TEMPLATE