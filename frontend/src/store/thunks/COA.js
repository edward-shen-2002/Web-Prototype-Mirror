import {
  requestCOAs,
  failCOAsRequest,
  receiveCOAs,
  createCOA,
  deleteCOA,
  updateCOA
} from '../actions/COAStore'

import COAController from '../../controllers/COA'

export const getCOAsRequest = (query) => (dispatch) => {
  dispatch(requestCOAs())

  COAController.fetchCOAs(query)
    .then((COAs) => {
      dispatch(receiveCOAs({ Values: COAs }))
    })
    .catch((error) => {
      dispatch(failCOAsRequest(error))
    })
}

export const createCOARequest = (COA, resolve, reject) => (dispatch) => {
  dispatch(requestCOAs())
  
  COAController.createCOA(COA)
    .then((COA) => {
      dispatch(createCOA({ Value: COA }))
      resolve()
    })
    .catch((error) => {
      dispatch(failCOAsRequest(error))
      reject()
    })
}

export const deleteCOARequest = (_id, resolve, reject) => (dispatch) => {
  dispatch(requestCOAs())

  COAController.deleteCOA(_id)
    .then(() => {
      dispatch(deleteCOA({ Value: { _id } }))
      resolve()
    })
    .catch((error) => {
      dispatch(failCOAsRequest(error))
      reject()
    })
}

export const updateCOARequest = (COA, resolve, reject) => (dispatch) => {
  dispatch(requestCOAs())

  COAController.updateCOA(COA)
    .then(() => {
      dispatch(updateCOA({ Value: COA }))
      resolve()
    })
    .catch((error) => {
      dispatch(failCOAsRequest(error))
      reject()
    })
}