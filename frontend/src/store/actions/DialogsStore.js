import {
  OPEN_COA_GROUP_DIALOG,
  CLOSE_COA_GROUP_DIALOG,
  OPEN_COA_DIALOG,
  CLOSE_COA_DIALOG
} from './actionCreators'

export const openCOAGroupDialog = () => ({ type: OPEN_COA_GROUP_DIALOG })
export const closeCOAGroupDialog = () => ({ type: CLOSE_COA_GROUP_DIALOG })
export const openCOADialog = () => ({ type: OPEN_COA_DIALOG })
export const closeCOADialog = () => ({ type: CLOSE_COA_DIALOG })
