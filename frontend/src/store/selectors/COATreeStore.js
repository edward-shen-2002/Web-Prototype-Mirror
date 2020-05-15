import { createSelector } from "reselect";

const getCOAIds = (
  {
    selectedNodeProps: {
      node
    }
  }
) => node && node.content ? node.content.COAIds : []

export const selectedCOAIdsSelector = createSelector(
  [ getCOAIds ],
  (COAIds) => {
    let selectedCOAIds = {}

    COAIds.forEach((COAId) => selectedCOAIds[COAId] = true)

    return selectedCOAIds
  }
);
