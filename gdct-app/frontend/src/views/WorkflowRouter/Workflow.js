import React, { useEffect, useMemo } from 'react'
import { FlowChart, actions,  } from '@mrblenny/react-flow-chart';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { selectFactoryRESTResponseValues } from '../../store/common/REST/selectors';
import { selectStatusesStore } from '../../store/StatusesStore/selectors';
import { getStatusesRequest } from '../../store/thunks/status';
import { StatusesStoreActions } from '../../store/StatusesStore/store';
import TextField from '@material-ui/core/TextField'
import List from '@material-ui/core/List'
import Listitem from '@material-ui/core/ListItem'
import { mapValues } from 'lodash'

import './Workflow.scss'
import { Typography } from '@material-ui/core';
import { selectWorkflowChart } from '../../store/WorkflowStore/selectors'
import { WorkflowStoreActions } from '../../store/WorkflowStore/store';

const StatusItems = ({ statuses }) => (
  <List>
    {
      statuses.map(
        ({ _id, name }) => (
          <Listitem className="status" key={_id} button>{name}</Listitem>
        )
      )
    }
  </List>
)

const WorkflowSideBar = ({ stateActions }) => {
  const dispatch = useDispatch()
  const statuses = useSelector(
    (state) => selectFactoryRESTResponseValues(selectStatusesStore)(state),
    shallowEqual
  )

  useEffect(
    () => {
      dispatch(getStatusesRequest())

      return () => {
        dispatch(StatusesStoreActions.RESET())
      }
    },
    []
  )

  return (
    <div className="workflowPicker">
      <Typography>Statuses</Typography>
      <TextField className="workflowPicker__search" variant="outlined" size="small"/>
      <StatusItems statuses={statuses}/>
    </div>
  )
}

const WorkflowPane = ({ stateActions }) => {
  const chart = useSelector(
    (state) => (
      selectWorkflowChart(state)
    ),
    shallowEqual
  )

  return (
    <FlowChart
      chart={chart}
      callbacks={stateActions}
    />
  )
}

const Workflow = () => {
  const dispatch = useDispatch()

  const stateActions = useMemo(
    () => mapValues(actions, (func) => 
      (...args) => dispatch(WorkflowStoreActions.UPDATE_WORKFLOW_CHART(func(...args)))),
    [dispatch, actions]
  )

  return (
    <div className="workflow">
      <WorkflowPane stateActions={stateActions}/>
      <WorkflowSideBar stateActions={stateActions}/>
    </div>
  )
}

export default Workflow