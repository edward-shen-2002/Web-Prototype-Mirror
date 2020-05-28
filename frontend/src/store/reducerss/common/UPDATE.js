const UPDATE = (state, { response }) => ({
  response: {
    ...state.response,
    Values: state.response.Values.map((value) =>
      value._id === response.Value._id ? response.Value : value
    ),
  },
  isCallInProgress: false,
  error: null,
})

export default UPDATE
