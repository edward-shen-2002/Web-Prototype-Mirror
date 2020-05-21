import { createReducer } from "../tools/setup"

const OPEN_COA_GROUP_DIALOG = (state) => ({ ...state, isCOAGroupDialogOpen: true })
const CLOSE_COA_GROUP_DIALOG = (state) => ({ ...state, isCOAGroupDialogOpen: false })
const OPEN_COA_DIALOG = (state) => ({ ...state, isCOADialogOpen: true })
const CLOSE_COA_DIALOG = (state) => ({ ...state, isCOADialogOpen: false })

const reducersMap = {
  OPEN_COA_GROUP_DIALOG,
  CLOSE_COA_GROUP_DIALOG,
  OPEN_COA_DIALOG,
  CLOSE_COA_DIALOG
}

const defaultState = {
  isCOADialogOpen: false,
  isCOAGroupDialogOpen: false
}

const DialogsStore = createReducer(defaultState, reducersMap)

export default DialogsStore