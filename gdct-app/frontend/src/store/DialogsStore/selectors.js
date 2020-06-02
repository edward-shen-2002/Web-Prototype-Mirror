import { createSelector } from 'reselect'

const selectDialogsStore = (store) => store.DialogsStore

export const selectIsCOADialogOpen = createSelector(
  [selectDialogsStore],
  (dialogsStore) => dialogsStore.isCOADialogOpen
)
export const selectIsCOAGroupDialogOpen = createSelector(
  [selectDialogsStore],
  (dialogsStore) => dialogsStore.isCOAGroupDialogOpen
)
export const selectIsUserDialogOpen = createSelector(
  [selectDialogsStore],
  (dialogsStore) => dialogsStore.isUserDialogOpen
)
export const selectIsStatusDialogOpen = createSelector(
  [selectDialogsStore],
  (dialogsStore) => dialogsStore.isStatusDialogOpen
)
export const selectIsSubmissionPeriodDialogOpen = createSelector(
  [selectDialogsStore],
  (dialogsStore) => dialogsStore.isSubmissionPeriodDialogOpen
)
export const selectIsTemplateTypeDialogOpen = createSelector(
  [selectDialogsStore],
  (dialogsStore) => dialogsStore.isTemplateTypeDialogOpen
)
export const selectIsReportingPeriodDialogOpen = createSelector(
  [selectDialogsStore],
  (dialogsStore) => dialogsStore.isReportingPeriodDialogOpen
)
export const selectIsTemplateDialogOpen = createSelector(
  [selectDialogsStore],
  (dialogsStore) => dialogsStore.isTemplateDialogOpen
)
// isCOADialogOpen: false,
// isCOAGroupDialogOpen: false,
// isUserDialogOpen: false,
// isStatusDialogOpen: false,
// isSubmissionPeriodDialogOpen: false,
// isTemplateTypeDialogOpen: false,
// isReportingPeriodDialogOpen: false,
