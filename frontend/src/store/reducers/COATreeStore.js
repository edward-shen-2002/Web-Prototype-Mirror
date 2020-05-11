import { createReducer } from "../tools/setup"
import cloneDeep from 'clone-deep'

const UPDATE_ORIGINAL_COA_TREE_UI = (state) => (
  {
    ...state,
    originalTree: cloneDeep(state.localTree)
  }
)

const LOAD_COA_TREE_UI = (_state, { treeList }) => {
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
    originalTree,
    localTree,
    saveTimeStamp: null,
    isCallInProgress: false
  }
}

const createTreeBranch = (rootId, normalizedTreeMap, dependencyMap) => {
  let children = dependencyMap[rootId]

  return {
    title: rootId,
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

const reducersMap = {
  LOAD_COA_TREE_UI,
  UPDATE_ORIGINAL_COA_TREE_UI,
  UPDATE_LOCAL_COA_TREE_UI,
  REVERT_COA_TREE_UI
}

const defaultState = {
  originalTree: {

  },
  localTree: {

  },
  error: null,
  isCallInProgress: false,
  saveTimeStamp: null
}

const COATreeeStore = createReducer(defaultState, reducersMap)

export default COATreeeStore
