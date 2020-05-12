import { 
  requestCOAGroups, 
  failCOAGroupsRequest, 
  receiveCOAGroups, 
  createCOAGroup, 
  deleteCOAGroup, 
  updateCOAGroup 
} from '../actions/COAGroupsStore'

import COAGroupController from '../../controllers/COAGroup'

export const getCOAGroupsRequest = (query) => (dispatch) => {
  dispatch(requestCOAGroups())

  COAGroupController.fetchCOAGroups(query)
    .then((COAGroups) => {
      dispatch(receiveCOAGroups({ Values: COAGroups }))
    })
    .catch((error) => {
      dispatch(failCOAGroupsRequest(error))
    })
}

export const createCOAGroupRequest = (COAGroup, resolve, reject) => (dispatch) => {
  dispatch(requestCOAGroups())
  
  COAGroupController.createCOAGroup(COAGroup)
    .then((COAGroup) => {
      dispatch(createCOAGroup({ Value: COAGroup }))
      resolve()
    })
    .catch((error) => {
      dispatch(failCOAGroupsRequest(error))
      reject()
    })
}

export const deleteCOAGroupRequest = (_id, resolve, reject) => (dispatch) => {
  dispatch(requestCOAGroups())

  COAGroupController.deleteCOAGroup(_id)
    .then(() => {
      dispatch(deleteCOAGroup({ Value: { _id } }))
      resolve()
    })
    .catch((error) => {
      dispatch(failCOAGroupsRequest(error))
      reject()
    })
}

export const updateCOAGroupRequest = (COAGroup, resolve, reject) => (dispatch) => {
  dispatch(requestCOAGroups())

  COAGroupController.updateCOAGroup(COAGroup)
    .then(() => {
      dispatch(updateCOAGroup({ Value: COAGroup }))
      resolve()
    })
    .catch((error) => {
      dispatch(failCOAGroupsRequest(error))
      reject()
    })
}