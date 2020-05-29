import { createSlice } from "@reduxjs/toolkit"

const OPEN_COA_GROUP_DIALOG = (state) => ({
  ...state,
  isCOAGroupDialogOpen: true,
})
const CLOSE_COA_GROUP_DIALOG = (state) => ({
  ...state,
  isCOAGroupDialogOpen: false,
})
const OPEN_COA_DIALOG = (state) => ({ ...state, isCOADialogOpen: true })
const CLOSE_COA_DIALOG = (state) => ({ ...state, isCOADialogOpen: false })

const CLOSE_USER_DIALOG = (state) => ({ ...state, isUserDialogOpen: false })
const OPEN_USER_DIALOG = (state) => ({ ...state, isUserDialogOpen: true })
const OPEN_STATUS_DIALOG = (state) => ({ ...state, isStatusDialogOpen: true })
const CLOSE_STATUS_DIALOG = (state) => ({ ...state, isStatusDialogOpen: false })
const OPEN_SUBMISSION_PERIOD_DIALOG = (state) => ({
  ...state,
  isSubmissionPeriodDialogOpen: true,
})
const CLOSE_SUBMISSION_PERIOD_DIALOG = (state) => ({
  ...state,
  isSubmissionPeriodDialogOpen: false,
})
const OPEN_TEMPLATE_TYPE_DIALOG = (state) => ({
  ...state,
  isTemplateTypeDialogOpen: true,
})
const CLOSE_TEMPLATE_TYPE_DIALOG = (state) => ({
  ...state,
  isTemplateTypeDialogOpen: false,
})
const OPEN_REPORTING_PERIOD_DIALOG = (state) => ({
  ...state,
  isReportingPeriodDialogOpen: true,
})
const CLOSE_REPORTING_PERIOD_DIALOG = (state) => ({
  ...state,
  isReportingPeriodDialogOpen: false,
})
const reducers = {
  OPEN_COA_GROUP_DIALOG,
  CLOSE_COA_GROUP_DIALOG,
  OPEN_COA_DIALOG,
  CLOSE_COA_DIALOG,

  CLOSE_USER_DIALOG,
  OPEN_USER_DIALOG,
  OPEN_STATUS_DIALOG,
  CLOSE_STATUS_DIALOG,
  OPEN_SUBMISSION_PERIOD_DIALOG,
  CLOSE_SUBMISSION_PERIOD_DIALOG,
  OPEN_TEMPLATE_TYPE_DIALOG,
  CLOSE_TEMPLATE_TYPE_DIALOG,
  OPEN_REPORTING_PERIOD_DIALOG,
  CLOSE_REPORTING_PERIOD_DIALOG,
}

const initialState = {
  isCOADialogOpen: false,
  isCOAGroupDialogOpen: false,
  isUserDialogOpen: false,
  isStatusDialogOpen: false,
  isSubmissionPeriodDialogOpen: false,
  isTemplateTypeDialogOpen: false,
  isReportingPeriodDialogOpen: false,
}

const DialogsStore = createSlice(
  {
    name: "DIALOGS",
    initialState,
    reducers
  }
)

export default DialogsStore
