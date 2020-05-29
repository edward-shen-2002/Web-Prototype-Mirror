import { createSelector } from 'reselect'

const getCOANode = ({ selectedNodeProps: { node } }) =>
  node ? node : { content: { COAIds: [] } }

export const selectedCOAIdsSelector = createSelector(
  [getCOANode],
  ({ content: { COAIds } }) => {
    let selectedCOAIds = {}

    COAIds.forEach((COAId) => (selectedCOAIds[COAId] = true))

    return selectedCOAIds
  }
)

export const selectedCOATreeIdSelector = createSelector(
  [getCOANode],
  ({ content: { _id } }) => _id
)
