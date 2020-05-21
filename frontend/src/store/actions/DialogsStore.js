import {
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
  CLOSE_REPORTING_PERIOD_DIALOG
} from './actionCreators'

export const openCOAGroupDialog = () => ({ type: OPEN_COA_GROUP_DIALOG })
export const closeCOAGroupDialog = () => ({ type: CLOSE_COA_GROUP_DIALOG })

export const openCOADialog = () => ({ type: OPEN_COA_DIALOG })
export const closeCOADialog = () => ({ type: CLOSE_COA_DIALOG })

export const openUserDialog = () => ({ type: OPEN_USER_DIALOG })
export const closeUserDialog = () => ({ type: CLOSE_USER_DIALOG })

export const openStatusDialog = () => ({ type: OPEN_STATUS_DIALOG })
export const closeStatusDialog = () => ({ type: CLOSE_STATUS_DIALOG })

export const openSubmissionPeriodDialog = () => ({ type: OPEN_SUBMISSION_PERIOD_DIALOG })
export const closeSubmissionPeriodDialog = () => ({ type: CLOSE_SUBMISSION_PERIOD_DIALOG })

export const openTemplateTypeDialog = () => ({ type: OPEN_TEMPLATE_TYPE_DIALOG })
export const closeTemplateTypeDialog = () => ({ type: CLOSE_TEMPLATE_TYPE_DIALOG })

export const openReportingPeriodDialog = () => ({ type: OPEN_REPORTING_PERIOD_DIALOG })
export const closeReportingPeriodDialog = () => ({ type: CLOSE_REPORTING_PERIOD_DIALOG })
