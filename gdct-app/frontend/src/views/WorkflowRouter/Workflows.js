import React, { useMemo, useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import {
  getWorkflowsRequest,
  deleteWorkflowRequest,
} from '../../store/thunks/workflow'

import MaterialTable from 'material-table'
import Paper from '@material-ui/core/Paper'
import LaunchIcon from '@material-ui/icons/Launch'

import Typography from '@material-ui/core/Typography'

import { selectFactoryRESTResponseTableValues } from '../../store/common/REST/selectors'
import { selectWorkflowsStore } from '../../store/WorkflowsStore/selectors'
import { useHistory } from 'react-router-dom'
import {
  ROUTE_WORKFLOW_WORKFLOWS_CREATE,
  ROUTE_WORKFLOW_WORKFLOWS,
} from '../../constants/routes'
import { Button } from '@material-ui/core'

const WorkflowHeader = () => {
  const history = useHistory()
  const handleCreate = () => history.push(ROUTE_WORKFLOW_WORKFLOWS_CREATE)

  return (
    <Paper className="header">
      <Typography variant="h5">Workflows</Typography>
      <Button variant="contained" color="primary" onClick={handleCreate}>
        Create
      </Button>
    </Paper>
  )
}

const Workflows = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { workflows } = useSelector(
    (state) => ({
      workflows: selectFactoryRESTResponseTableValues(selectWorkflowsStore)(
        state
      ),
    }),
    shallowEqual
  )

  const columns = useMemo(() => [{ title: 'Name', field: 'name' }], [])

  const options = useMemo(
    () => ({ actionsColumnIndex: -1, search: false, showTitle: false }),
    []
  )

  const editable = useMemo(
    () => ({
      onRowDelete: (workflow) =>
        new Promise((resolve, reject) => {
          dispatch(deleteWorkflowRequest(workflow._id, resolve, reject))
        }),
    }),
    [dispatch]
  )

  const actions = useMemo(
    () => [
      {
        icon: LaunchIcon,
        tooltip: 'Open Workflow',
        onClick: (_event, workflow) =>
          history.push(`${ROUTE_WORKFLOW_WORKFLOWS}/${workflow._id}`),
      },
    ],
    [history]
  )

  useEffect(() => {
    dispatch(getWorkflowsRequest())
  }, [dispatch])

  return (
    <div>
      <WorkflowHeader />
      <MaterialTable
        columns={columns}
        data={workflows}
        editable={editable}
        options={options}
        actions={actions}
      />
    </div>
  )
}

export default Workflows
