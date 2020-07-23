import submissionController from '../../controllers/submission';
import SubmissionsStore from '../SubmissionsStore/store';

import {
  getRequestFactory,
  createRequestFactory,
  deleteRequestFactory,
  updateRequestFactory,
} from './common/REST';
import { convertStateToReactState, extractReactAndWorkbookState } from '../../tools/excel';
import { setExcelData } from '../actions/ui/excel/commands';

export const getSubmissionsRequest = getRequestFactory(SubmissionsStore, submissionController);
export const createSubmissionRequest = createRequestFactory(SubmissionsStore, submissionController);
export const deleteSubmissionRequest = deleteRequestFactory(SubmissionsStore, submissionController);
export const updateSubmissionRequest = updateRequestFactory(SubmissionsStore, submissionController);

// Similar to submission
export const getSubmissionRequest = _id => dispatch => {
  dispatch(SubmissionsStore.actions.REQUEST());

  submissionController
    .fetchSubmission(_id)
    .then(submission => {
      dispatch(setExcelData(convertStateToReactState(submission.workbookData)));
      dispatch(SubmissionsStore.actions.RECEIVE([submission]));
      dispatch();
    })
    .catch(error => {
      dispatch(SubmissionsStore.actions.FAIL_REQUEST(error));
    });
};

export const updateSubmissionExcelRequest = () => (dispatch, getState) => {
  // dispatch(requestSubmissions())

  const {
    SubmissionsStore: {
      response: { Values },
    },
    ui: {
      excel: { present },
    },
  } = getState();

  const [submission] = Values;

  const newSubmission = {
    ...submission,
    name: present.name,
    workbookData: extractReactAndWorkbookState(present, present.inactiveSheets),
  };

  submissionController
    .update(newSubmission)
    .then(() => {
      dispatch(SubmissionsStore.actions.UPDATE(newSubmission));
    })
    .catch(error => {
      dispatch(SubmissionsStore.actions.FAIL_REQUEST(error));
    });
};
