import WorkflowsStore from '../WorkflowsStore/store';
import workflowController from '../../controllers/workflow';
import {
  selectWorkflowLinks,
  selectWorkflowNodes,
  selectWorkflowName,
  selectWorkflowId,
} from '../WorkflowStore/selectors';
import { WorkflowStoreActions } from '../WorkflowStore/store';
import { initialWorkflowState } from '../WorkflowStore/store';
import { getRequestFactory, deleteRequestFactory, updateRequestFactory } from './common/REST';
import { cloneDeep } from 'lodash';
import uniqid from 'uniqid';

export const getWorkflowsRequest = getRequestFactory(WorkflowsStore, workflowController);

export const deleteWorkflowRequest = deleteRequestFactory(WorkflowsStore, workflowController);

export const updateWorkflowRequest = updateRequestFactory(WorkflowsStore, workflowController);

const _createWorkflow = (dispatch, getState) => {
  const state = getState();

  const workflowNodes = selectWorkflowNodes(state);
  const workflowLinks = selectWorkflowLinks(state);
  const workflowName = selectWorkflowName(state);
  const workflowId = selectWorkflowId(state);

  const linkMapSet = {};
  const endNodes = new Set();
  const startNodes = new Set();

  for (let link in workflowLinks) {
    const { from, to } = workflowLinks[link];
    const fromId = from.nodeId;
    const toId = to.nodeId;

    if (!linkMapSet[fromId]) linkMapSet[fromId] = new Set();

    linkMapSet[fromId].add(toId);
    endNodes.add(toId);
    startNodes.add(fromId);
  }

  let initialNode = null;
  let isSingleInitialNode = true;
  startNodes.forEach(node => {
    if (!endNodes.has(node)) {
      if (initialNode) {
        isSingleInitialNode = false;
      } else {
        initialNode = node;
      }
    }
  });

  if (!isSingleInitialNode || !Object.keys(workflowNodes).length)
    return dispatch(
      WorkflowStoreActions.UPDATE_WORKFLOW_ERROR('There must be only one starting node'),
    );

  let visited = new Set();

  markVisitableNodes(initialNode, linkMapSet, visited);

  let isGraphConnected = true;
  for (let node in workflowNodes) {
    if (!visited.has(node)) {
      isGraphConnected = false;
      break;
    }
  }

  if (!isGraphConnected)
    return dispatch(
      WorkflowStoreActions.UPDATE_WORKFLOW_ERROR(
        'Graphs must be connected and have at least two nodes',
      ),
    );

  // Create the data structure of workflow process
  const workflow = { name: workflowName, _id: workflowId };
  const workflowProcessesData = [];
  const statusData = [];

  for (let nodeId in workflowNodes) {
    const {
      type: { _id: statusId },
    } = workflowNodes[nodeId];
    statusData.push({ id: nodeId, statusId });
  }

  for (let linkId in linkMapSet) {
    const node = workflowNodes[linkId];
    workflowProcessesData.push({
      id: linkId,
      statusId: node.type._id,
      to: [...linkMapSet[linkId]].map(toId => ({
        id: toId,
        statusId: workflowNodes[toId].type._id,
      })),
      position: node.position,
    });
  }

  return { workflow, workflowProcessesData, statusData };
};

export const updateWorkflow = () => (dispatch, getState) => {
  workflowController
    .update(_createWorkflow(dispatch, getState))
    .catch(error => dispatch(WorkflowStoreActions.UPDATE_WORKFLOW_ERROR(error)));
};

export const loadWorkflow = workflowId => dispatch => {
  workflowController.fetchById(workflowId).then(({ workflow, workflowProcesses }) => {
    const workflowState = cloneDeep(initialWorkflowState);
    workflowState.name = workflow.name;
    workflowState._id = workflow._id;

    for (let workflowProcess of workflowProcesses) {
      const {
        _id,
        to,
        statusId: { _id: statusId, name },
        position,
      } = workflowProcess;

      workflowState.chart.nodes[_id] = {
        id: _id,
        position,
        orientation: 0,
        type: {
          _id: statusId,
          name,
        },
        ports: {
          port1: {
            id: 'port1',
            type: 'input',
            position: { x: 100, y: 0 },
          },
          port2: {
            id: 'port2',
            type: 'output',
            position: { x: 100, y: 100 },
          },
        },
        properties: {
          label: 'example link label',
        },
        size: { width: 200, height: 100 },
      };

      for (let connectionId of to) {
        const linkId = uniqid();
        workflowState.chart.links[linkId] = {
          id: linkId,
          from: {
            nodeId: _id,
            portId: 'port2',
          },
          to: {
            nodeId: connectionId,
            portId: 'port1',
          },
        };
      }
    }

    dispatch(WorkflowStoreActions.UPDATE(workflowState));
  });
};

const markVisitableNodes = (startingNode, linkMapSet, visited) => {
  visited.add(startingNode);
  const adjacentNodes = linkMapSet[startingNode];

  if (adjacentNodes) {
    adjacentNodes.forEach(adjacentNode => {
      if (!visited.has(adjacentNode)) markVisitableNodes(adjacentNode, linkMapSet, visited);
    });
  }
};

export const submitWorkflow = () => (dispatch, getState) => {
  workflowController
    .create(_createWorkflow(dispatch, getState))
    .catch(error => dispatch(WorkflowStoreActions.UPDATE_WORKFLOW_ERROR(error)));
};