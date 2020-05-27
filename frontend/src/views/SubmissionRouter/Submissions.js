import React, { useMemo, useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import {
  getSubmissionsRequest,
  createSubmissionRequest,
  deleteSubmissionRequest,
  updateSubmissionRequest,
} from '../../store/thunks/submission'

import MaterialTable from 'material-table'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'

import Typography from '@material-ui/core/Typography'
import { useHistory } from 'react-router-dom'

const HeaderActions = () => {
  const history = useHistory()

  const handleCreateTemplate = () =>
    history.push('/submission_manager/submission')

  return (
    <div>
      <Button
        color="primary"
        variant="contained"
        size="large"
        onClick={handleCreateTemplate}
      >
        Create
      </Button>
    </div>
  )
}

const SubmissionHeader = () => (
  <Paper className="header">
    <Typography variant="h5">Submissions</Typography>
    <HeaderActions />
  </Paper>
)

const Submission = () => {
  const dispatch = useDispatch()

  const { submissions } = useSelector(
    ({
      SubmissionsStore: {
        response: { Values },
      },
    }) => ({
      submissions: Values,
    }),
    shallowEqual
  )

  const columns = useMemo(
    () => [
      { title: '_id', field: '_id' },
      { title: 'Name', field: 'name' },
      { title: 'Start Date', type: 'date', field: 'startDate' },
      { title: 'End Date', type: 'date', field: 'endDate' },
      { title: 'ReportingId', field: 'reportingId' },
    ],
    []
  )

  const options = useMemo(
    () => ({ actionsColumnIndex: -1, search: false, showTitle: false }),
    []
  )

  const editable = useMemo(
    () => ({
      onRowAdd: (submission) =>
        new Promise((resolve, reject) => {
          dispatch(createSubmissionRequest(submission, resolve, reject))
        }),
      onRowUpdate: (submission) =>
        new Promise((resolve, reject) => {
          dispatch(updateSubmissionRequest(submission, resolve, reject))
        }),
      onRowDelete: (submission) =>
        new Promise((resolve, reject) => {
          dispatch(deleteSubmissionRequest(submission._id, resolve, reject))
        }),
    }),
    [dispatch]
  )

  useEffect(() => {
    dispatch(getSubmissionsRequest())
  }, [dispatch])

  return (
    <div className="submissions">
      <SubmissionHeader />
      <MaterialTable
        columns={columns}
        data={submissions}
        editable={editable}
        options={options}
      />
    </div>
  )
}

export default Submission
