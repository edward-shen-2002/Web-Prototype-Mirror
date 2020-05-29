import submissionController from '../../controllers/submission'
import SubmissionsStore from '../SubmissionsStore/store'

import { getRequestFactory, createRequestFactory, deleteRequestFactory, updateRequestFactory } from './common/REST'

export const getSubmissionsRequest = getRequestFactory(SubmissionsStore, submissionController)
export const createSubmissionRequest = createRequestFactory(SubmissionsStore, submissionController)
export const deleteSubmissionRequest = deleteRequestFactory(SubmissionsStore, submissionController)
export const updateSubmissionRequest = updateRequestFactory(SubmissionsStore, submissionController)