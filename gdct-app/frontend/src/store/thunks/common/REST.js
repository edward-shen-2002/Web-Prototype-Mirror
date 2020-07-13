export const getRequestFactory = (store, controller) => (
  query,
  resolve,
  reject,
  isPopulated = false
) => (dispatch) => {
  dispatch(store.actions.REQUEST())

  controller[isPopulated ? 'fetchPopulated' : 'fetch'](query)
    .then((values) => {
      dispatch(store.actions.RECEIVE(values ? values : []))
      if (resolve) resolve()
    })
    .catch((error) => {
      dispatch(store.actions.FAIL_REQUEST(error))
      if (reject) reject()
    })
}

export const createRequestFactory = (store, controller) => (
  value,
  resolve,
  reject,
  isPopulated = false
) => (dispatch) => {
  dispatch(store.actions.REQUEST())

  controller[isPopulated ? 'createPopulated' : 'create'](value)
    .then((value) => {
      dispatch(store.actions.CREATE(value))
      if (resolve) resolve()
    })
    .catch((error) => {
      dispatch(store.actions.FAIL_REQUEST(error))
      if (reject) reject()
    })
}

export const deleteRequestFactory = (store, controller) => (
  _id,
  resolve,
  reject,
  isPopulated = false
) => (dispatch) => {
  dispatch(store.actions.REQUEST())

  controller[isPopulated ? 'deletePopulated' : 'delete'](_id)
    .then(() => {
      dispatch(store.actions.DELETE(_id))
      if (resolve) resolve()
    })
    .catch((error) => {
      dispatch(store.actions.FAIL_REQUEST(error))
      if (reject) reject()
    })
}

export const updateRequestFactory = (store, controller) => (
  value,
  resolve,
  reject,
  isPopulated = false
) => (dispatch) => {
  dispatch(store.actions.REQUEST())

  controller[isPopulated ? 'updatePopulated' : 'update'](value)
    .then((result) => {
      dispatch(store.actions.UPDATE(result))
      if (resolve) resolve()
    })
    .catch((error) => {
      dispatch(store.actions.FAIL_REQUEST(error))
      if (reject) reject()
    })
}
