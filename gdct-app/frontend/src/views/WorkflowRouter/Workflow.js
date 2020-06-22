import React, { useEffect, useMemo, useCallback } from 'react'
import { FlowChart, actions, REACT_FLOW_CHART,  } from '@mrblenny/react-flow-chart';
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
import { Typography, Button } from '@material-ui/core';
import { selectWorkflowChart, selectSelectedNodeId, selectSelectedNodeType, selectWorkflowFilter } from '../../store/WorkflowStore/selectors'
import { WorkflowStoreActions } from '../../store/WorkflowStore/store';

const createNodeDragData = (name) => JSON.stringify({ 
  type: name, 
  ports: {
    port1: {
      id: 'port1',
      type: 'input',
    },
    port2: {
      id: 'port2',
      type: 'output',
    },
  }, 
  properties: {
    label: 'example link label',
  },
})

const StatusItems = ({ statuses }) => (
  <List className="statuses">
    {
      statuses.map(
        ({ _id, name }) => (
          <Listitem 
            className="statuses__status" 
            key={_id} 
            button
            draggable={true}
            onDragStart={(event) => {
              event.dataTransfer.setData(
                REACT_FLOW_CHART, 
                createNodeDragData(name)
              )
            }}
          >
            {name}
          </Listitem>
        )
      )
    }
  </List>
)

const SelectedNodeActions = ({ type, stateActions }) => (
  <div className="sections">
    <Typography gutterBottom>Selected node: {type}</Typography>
    <Button onClick={() => stateActions.onDeleteKey({})} color="secondary" variant="contained" fullWidth>Delete</Button>
  </div>
)

const SelectedNode = ({ stateActions }) => {
  const { selectedNodeId, selectedNodeType } = useSelector(
    (state) => ({
      selectedNodeId: selectSelectedNodeId(state),
      selectedNodeType: selectSelectedNodeType(state)
    }), 
    shallowEqual
  )

  if(!selectedNodeId) return null

  return selectedNodeId && <SelectedNodeActions stateActions={stateActions} type={selectedNodeType}/>
}

const WorkflowStatuses = () => {
  const dispatch = useDispatch()
  let { statuses, workflowFilter } = useSelector(
    (state) => ({
      statuses: selectFactoryRESTResponseValues(selectStatusesStore)(state),
      workflowFilter: selectWorkflowFilter(state)
    }), 
    shallowEqual
  )

  statuses = useMemo(
    () => statuses.filter(({ name }) => name.toLowerCase().includes(workflowFilter.toLowerCase())),
    [statuses, workflowFilter]
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

  const handleChangeFilter = useCallback(
    ({ target: { value } }) => dispatch(WorkflowStoreActions.UPDATE_WORKFLOW_FILTER(value)),
    [dispatch]
  )

  return (
    <div className="sections">
      <Typography className="workflowPicker__title" variant="h5" >Status Picker</Typography>
      <TextField className="workflowPicker__search" variant="outlined" size="small" placeholder="Search statuses..." onChange={handleChangeFilter}/>
      <StatusItems statuses={statuses}/>
    </div>
  )
}

const WorkflowSideBar = ({ stateActions }) => (
  <div className="workflowPicker">
    <WorkflowStatuses/>
    <SelectedNode stateActions={stateActions}/>
  </div>
)

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

const WorkflowContainer = () => (
  <div>

  </div>
)


export default Workflow