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
import LaunchIcon from '@material-ui/icons/Launch'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Typography from '@material-ui/core/Typography'
import { useHistory } from 'react-router-dom'
import { selectSubmissionsStore } from '../../store/SubmissionsStore/selectors'
import { selectFactoryRESTResponseTableValues } from '../../store/common/REST/selectors'
import { TemplateIdButton, StatusIdButton } from '../../components/buttons'



const SubmissionHeader = () => (
  <Paper className="header">
    <Typography variant="h5">Submissions</Typography>
  </Paper>
)

const SubmissionDashboard = ({ history }) => {
  const dispatch = useDispatch()

  const publishedSubmission = []
  const approvedSubmission = []
  const rejectedSubmission = []
  const expiredSubmission = []
  const submittedSubmission = []
  const unsubmittedSubmission = []
  const { submissions } = useSelector(
    (state) => ({
      submissions: selectFactoryRESTResponseTableValues(selectSubmissionsStore)(
        state
      ),
    }),
    shallowEqual
  )

  console.log(submissions)
  if(submissions[0] !== undefined)
    submissions.forEach((submission) => {
      if(submission !== undefined)
      switch (submission.phase) {
        case "Unsubmitted": unsubmittedSubmission.push(submission); break;
        case "Submitted": submittedSubmission.push(submission); break;
        case "Expired": expiredSubmission.push(submission); break;
        case "Rejected": rejectedSubmission.push(submission); break;
        case "Approved": approvedSubmission.push(submission); break;
        case "Published": publishedSubmission.push(submission); break;
      }
    })

  console.log(unsubmittedSubmission)
  console.log(approvedSubmission)

  const checkBoxColumns = useMemo(
    () => [
      { title: "Year", field: "year" },
      { title: "Period", field: "period" },
      { title: "Submission", field: "name"},
      { title: "Program", field: "programName"},
      { title: "Approver", field: "approver"},
      { title: "Health Service Provider", field: "hsp"},
      { title: "Status", field: "phase"},
      { title: "Created On", field: "createdAt"},
      { title: "Modified By", field: "updatedBy"},
      { title: "Modified on", field: "updatedAt"},
      { title: "version", field: "version"},
      { title: "Template Name", field: "workbookData.name"}
    ],
    []
  )

  const options = useMemo(
    () => ({ actionsColumnIndex: -1, search: false, showTitle: false }),
    []
  )

  const actions = useMemo(
    () => [
      {
        icon: LaunchIcon,
        tooltip: 'Create Submission',
        onClick: (_event, submission) =>
          history.push({
            pathname:`/submission_manager/createSubmission/${submission._id}`,
            state: {detail: submission}
          })
      },
      {
        icon: LaunchIcon,
        tooltip: 'Edit Submission',
        onClick: (_event, submission) =>

          history.push({
            pathname:`/submission_manager/editSubmission/${submission._id}`,
            state: {detail: submission}
          })
      },
    ],
    [history]
  )


  useEffect(() => {
    dispatch(getSubmissionsRequest(739, ["5eadbe676a04912f04e389c9","5eac9e579a8fe3217fe81fc2"]))
  }, [dispatch])

  return (
    <div className="submissions">
      <SubmissionHeader />

      <ExpansionPanel>

        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon/>}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography> Published</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <MaterialTable
            columns={checkBoxColumns}
            options={options}
            data={publishedSubmission}
            actions={actions}
          />
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon/>}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography> Approved</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <MaterialTable
            columns={checkBoxColumns}
            options={options}
            data={approvedSubmission}
            actions={actions}
          />
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon/>}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography> Rejected</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <MaterialTable
            columns={checkBoxColumns}
            options={options}
            data={rejectedSubmission}
            actions={actions}
          />
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon/>}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography> Expired</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <MaterialTable
            columns={checkBoxColumns}
            options={options}
            data={expiredSubmission}
            actions={actions}
          />
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon/>}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography> Submitted</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <MaterialTable
            columns={checkBoxColumns}
            options={options}
            data={submittedSubmission}
            actions={actions}
          />
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon/>}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography> Unsubmitted</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <MaterialTable
            columns={checkBoxColumns}
            options={options}
            data={unsubmittedSubmission}
            actions={actions}
          />
        </ExpansionPanelDetails>

      </ExpansionPanel>
    </div>
  )
}

export default SubmissionDashboard