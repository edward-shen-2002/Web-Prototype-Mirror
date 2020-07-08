import { createSelector } from 'reselect'
import cloneDeep from 'clone-deep'

export const selectFactoryRESTError = (storeSelector) =>
  createSelector([storeSelector], (restStore) => restStore.error)

export const selectFactoryRESTIsCallInProgress = (storeSelector) =>
  createSelector([storeSelector], (restStore) => restStore.isCallInProgress)

export const selectFactoryRESTResponse = (storeSelector) =>
  createSelector([storeSelector], (restStore) => restStore.response)

export const selectFactoryRESTResponseValues = (storeSelector) =>
  createSelector(
    [selectFactoryRESTResponse(storeSelector)],
    (response) => response.Values
  )

export const selectFactoryRESTResponseTableValues = (storeSelector) =>
  createSelector([selectFactoryRESTResponse(storeSelector)], (response) => {
    // console.log(response)
    return cloneDeep(response.Values)
  })

export const selectFactoryValueById = (storeSelector) => (_id) => (state) =>
  selectFactoryRESTResponseValues(storeSelector)(state).find(
    ({ _id: valueId }) => _id === valueId
  )
