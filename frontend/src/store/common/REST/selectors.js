import { createSelector } from "reselect";
import cloneDeep from "clone-deep";

export const selectFactoryRESTError = (storeSelector) => (state) => createSelector(
  [storeSelector(state)],
  (restStore) => restStore.error
)(state)

export const selectFactoryRESTIsCallInProgress = (storeSelector) => (state) => createSelector(
  [storeSelector(state)],
  (restStore) => restStore.isCallInProgress
)

export const selectFactoryRESTResponse = (storeSelector) => (state) => createSelector(
  [storeSelector],
  (restStore) => restStore.response
)(state)

export const selectFactoryRESTResponseValues = (storeSelector) => (state) => createSelector(
  [selectFactoryRESTResponse(storeSelector)],
  (response) => response.Values
)(state)

export const selectFactoryRESTResponseTableValues = (storeSelector) => (state) => createSelector(
  [selectFactoryRESTResponse(storeSelector)],
  (response) => cloneDeep(response.Values)
)(state)
