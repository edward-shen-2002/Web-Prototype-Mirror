const DOUBLE_CLICK_EDITABLE_CELL = (state) => {
  const { isSelectionMode } = state

  if (isSelectionMode) return state

  let newState = { ...state }

  newState.isEditMode = true

  return newState
}

export default DOUBLE_CLICK_EDITABLE_CELL
