import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import React, { useCallback, useMemo, useEffect } from 'react'
import {
  convertExcelFileToState,
  convertStateToReactState,
} from '../../tools/excel'
import { setExcelData } from '../../store/actions/ui/excel/commands'
import { getSubmissionNoteRequest } from '../../store/thunks/submissionNote'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import SubmissionsStore from '../../store/SubmissionsStore/store'
import SubmissionNoteStore from '../../store/SubmissionNoteStore/store'
import SubmissionWorkbookStore from '../../store/SubmissionWorkbookStore/store'
import { useLocation } from 'react-router-dom'
import {
  selectFactoryRESTResponse,
  selectFactoryRESTResponseTableValues,
} from '../../store/common/REST/selectors'
import { selectSubmissionsStore } from '../../store/SubmissionsStore/selectors'
import { selectSubmissionNoteStore } from '../../store/SubmissionNoteStore/selectors'
import { selectSubmissionWorkbookStore } from '../../store/SubmissionWorkbookStore/selectors'
import {
  getSubmissionByIdRequest,
  updateSubmissionStatusRequest,
} from '../../store/thunks/submission'
import DOWNLOAD from '../../store/reducerss/ui/excel/commands/DOWNLOAD'
import MaterialTable from 'material-table'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails/ExpansionPanelDetails'
import { selectSubmissionNoteHistoryStore } from '../../store/SubmissionNoteHistoryStore/selectors'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}))

const EditSubmission = ({ history }) => {
  const dispatch = useDispatch()

  const SubmissionHeader = () => (
    <Paper className="header">
      <Typography variant="h5">Submissions</Typography>
    </Paper>
  )

  let submissionNotes = []
  const checkBoxColumns = useMemo(
    () => [
      { title: 'Note', field: 'note' },
      { title: 'Updated Date', field: 'updatedDate' },
      { title: 'Updated By', field: 'updatedBy' },
      { title: 'Process', field: 'role' },
    ],
    []
  )

  const options = useMemo(
    () => ({ actionsColumnIndex: -1, search: false, showTitle: false }),
    []
  )

  const handleNoteChange = (event) => {
    dispatch(SubmissionNoteStore.actions.RECEIVE(event.target.value))
  }

  const location = useLocation()

  const { submission, submissionNote, submissionNoteHistory } = useSelector(
    (state) => ({
      submission: selectFactoryRESTResponseTableValues(selectSubmissionsStore)(
        state
      ),
      submissionNote: selectFactoryRESTResponseTableValues(
        selectSubmissionNoteStore
      )(state),
      submissionNoteHistory: selectFactoryRESTResponseTableValues(
        selectSubmissionNoteHistoryStore
      )(state),
    }),
    shallowEqual
  )
  console.log(submission)
  useEffect(() => {
    console.log(location.state)
    dispatch(SubmissionNoteStore.actions.RECEIVE(''))
    dispatch(getSubmissionByIdRequest(location.state.detail._id))
    dispatch(getSubmissionNoteRequest(location.state.detail._id))
  }, [location])

  if (submissionNoteHistory[0] !== undefined) {
    if (submissionNoteHistory[0].note !== undefined) {
      console.log(submissionNoteHistory[0].note)
      submissionNotes = submissionNoteHistory
    }
  }
  console.log(submissionNoteHistory)

  const handleOpenTemplate = () =>
    history.push(`/submission_manager/submissions/${submission._id}`)

  const handleDownloadWorkbook = () => {
    DOWNLOAD(convertStateToReactState(submission.workbookData))
  }

  const handleChangeStatus = (submission, submissionNote, role) => {
    console.log(submission)
    dispatch(updateSubmissionStatusRequest(submission, submissionNote, role))
  }

  return (
    <div className="submissions">
      <SubmissionHeader />
      <Paper className="pl-4 pr-4 pb-5 pt-4">
        <div className="submission__label">
          <Typography className="submission__inputTitle"> Note </Typography>
        </div>
        <div className="submission__noteField">
          <TextField
            variant="outlined"
            className="register__field"
            name="passwordConfirm"
            // value={values.passwordConfirm}
            multiline
            onChange={handleNoteChange}
          />
        </div>
        <div className="submission__label">
          <Typography className="submission__inputTitle">
            {' '}
            Note History{' '}
          </Typography>
        </div>
        <MaterialTable
          columns={checkBoxColumns}
          options={options}
          data={submissionNotes}
        />
        <div>
          <Button
            color="primary"
            variant="contained"
            size="large"
            onClick={handleOpenTemplate}
          >
            View Document
          </Button>
          <Button
            color="primary"
            variant="contained"
            size="large"
            onClick={handleDownloadWorkbook}
          >
            Download
          </Button>
          <Button
            color="primary"
            variant="contained"
            size="large"
            onClick={() =>
              handleChangeStatus(submission, submissionNote, 'Approved')
            }
          >
            Approve
          </Button>
          <Button
            color="primary"
            variant="contained"
            size="large"
            onClick={() =>
              handleChangeStatus(submission, submissionNote, 'Rejected')
            }
          >
            Reject
          </Button>
          <Button
            color="primary"
            variant="contained"
            size="large"
            onClick={() =>
              handleChangeStatus(submission, submissionNote, 'Submitted')
            }
          >
            Submit
          </Button>
        </div>
      </Paper>
    </div>
  )
}

export default EditSubmission
