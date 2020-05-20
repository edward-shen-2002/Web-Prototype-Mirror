import { createReducer } from "../tools/setup"
import cloneDeep from 'clone-deep'

import { removeNode, changeNodeAtPath } from 'react-sortable-tree'

const generateTitle = ({ _id, COAGroupId }) => `(${COAGroupId}) ${_id}`

const getNodeKey = ({ treeIndex }) => treeIndex

const UPDATE_ORIGINAL_COA_TREE_UI = (state) => (
  {
    ...state,
    originalTree: cloneDeep(state.localTree)
  }
)

const LOAD_COA_TREE_UI = (state, { treeList }) => {
  let dependencyMap = {}

  // Hash table of the tree
  let normalizedTreeMap = {}

  let parentNodes = []

  treeList.forEach(
    (node) => {
      const { _id, parentId } = node

      if(!dependencyMap[parentId]) dependencyMap[parentId] = []

      if(parentId) {
        dependencyMap[parentId].push(_id)
      } else {
        parentNodes.push(node)
      }
      normalizedTreeMap[_id] = node
    }
  )

  let originalTree = parentNodes.map(
    (parentNode) => createTreeBranch(parentNode._id, normalizedTreeMap, dependencyMap)
  )

  let localTree = cloneDeep(originalTree)

  return {
    ...state,
    originalTree,
    localTree,
    saveTimeStamp: null,
    isCallInProgress: false
  }
}

const createTreeBranch = (rootId, normalizedTreeMap, dependencyMap) => {
  let children = dependencyMap[rootId]
  const content = normalizedTreeMap[rootId]

  return {
    content,
    title: generateTitle(content),
    children: children 
      ? children.map((child) => createTreeBranch(child, normalizedTreeMap, dependencyMap))
      : undefined
  }
}

const UPDATE_LOCAL_COA_TREE_UI = (state, { tree }) => (
  {
    ...state,
    localTree: tree
  }
)

const REVERT_COA_TREE_UI = () => (
  {
    ...state,
    localTree: cloneDeep(state.originalTree)
  }
)

const ADD_ROOT_COA_TREE_UI = (state, { tree }) => {
  const newRootNode = { content: tree, title: generateTitle(tree) }

  return {
    ...state,
    localTree: [ ...state.localTree, newRootNode ]
  }
}

export const DELETE_COA_TREE_UI = (state, { path }) => {
  const newLocalTree = removeNode(
    {
      treeData: state.localTree,
      path,
      getNodeKey
    }
  ).treeData

  return {
    ...state,
    localTree: newLocalTree
  }
}

const UPDATE_SELECTED_NODE_COA_TREE_UI = (state, { nodeProps }) => (
  {
    ...state,
    selectedNodeProps: nodeProps
  }
)

const SELECT_COA_COA_TREE_UI = (state, { _id }) => {
  // TODO: Clean this up
  const newSelectNodeProps = {
    ...state.selectedNodeProps,
    node: {
      ...state.selectedNodeProps.node,
      content: {
        ...state.selectedNodeProps.node.content,
        COAIds: (
          state.selectedNodeProps.node.content.COAIds.includes(_id)
            ? state.selectedNodeProps.node.content.COAIds.filter((curCOAId) => curCOAId !== _id)
            : [ ...state.selectedNodeProps.node.content.COAIds, _id ]
        ) 
      }
    }
  }

  const newLocalTree = changeNodeAtPath(
    {
      treeData: state.localTree,
      path: newSelectNodeProps.path,
      getNodeKey,
      newNode: newSelectNodeProps.node
    }
  )

  return {
    ...state,
    localTree: newLocalTree,
    selectedNodeProps: newSelectNodeProps
  }
}


const reducersMap = {
  LOAD_COA_TREE_UI,
  UPDATE_ORIGINAL_COA_TREE_UI,
  UPDATE_LOCAL_COA_TREE_UI,
  REVERT_COA_TREE_UI,
  ADD_ROOT_COA_TREE_UI,
  DELETE_COA_TREE_UI,
  UPDATE_SELECTED_NODE_COA_TREE_UI,
  SELECT_COA_COA_TREE_UI
}

const defaultState = {
  originalTree: {

  },
  localTree: [],
  error: null,
  isCallInProgress: false,
  saveTimeStamp: null,
  selectedNodeProps: {}
}

const COATreeeStore = createReducer(defaultState, reducersMap)

export default COATreeeStore
