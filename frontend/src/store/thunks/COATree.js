import {
  requestCOATrees,
  failCOATreesRequest,
  receiveCOATrees,
  createCOATree,
  deleteCOATree,
  updateCOATree
} from '../actions/COATreesStore'

import {

} from '../actions/COATreeStore'

import COATreeController from '../../controllers/COATree'

const normalizeTree = () => {}

export const getCOATreeRequest = (_id) => (dispatch) => {
  dispatch(requestCOATrees())

  COATreeController.fetchCOATree(_id)
    .then((COATree) => {
      
    })
    .catch((error) => {
      dispatch(failCOATreesRequest(error))
    })
}

export const getCOATreesRequest = (query) => (dispatch) => {
  dispatch(requestCOATrees())

  COATreeController.fetchCOATrees(query)
    .then((COATrees) => {
      dispatch(receiveCOATrees({ Values: COATrees }))
    })
    .catch((error) => {
      dispatch(failCOATreesRequest(error))
    })
}

export const createCOATreeRequest = (COATree, resolve, reject) => (dispatch) => {
  dispatch(requestCOATrees())
  
  COATreeController.createCOATree(COATree)
    .then((COATree) => {
      dispatch(createCOATree({ Value: COATree }))
      resolve()
    })
    .catch((error) => {
      dispatch(failCOATreesRequest(error))
      reject()
    })
}

export const deleteCOATreeRequest = (_id, resolve, reject) => (dispatch) => {
  dispatch(requestCOATrees())

  COATreeController.deleteCOATree(_id)
    .then(() => {
      dispatch(deleteCOATree({ Value: { _id } }))
      resolve()
    })
    .catch((error) => {
      dispatch(failCOATreesRequest(error))
      reject()
    })
}

export const updateCOATreeRequest = (COATree, resolve, reject) => (dispatch) => {
  dispatch(requestCOATrees())

  COATreeController.updateCOATree(COATree)
    .then(() => {
      dispatch(updateCOATree({ Value: COATree }))
      resolve()
    })
    .catch((error) => {
      dispatch(failCOATreesRequest(error))
      reject()
    })
}