import { createReducer } from "../tools/setup"
import cloneDeep from 'clone-deep'

const generateTitle = ({ _id, COAGroupId }) => `(${COAGroupId}) ${_id}`

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

const OPEN_GROUP_COA_TREE_UI_DIALOG = (state) => (
  {
    ...state,
    isGroupDialogOpen: true
  }
) 

const CLOSE_GROUP_COA_TREE_UI_DIALOG = (state) => (
  {
    ...state,
    isGroupDialogOpen: false
  }
)

const ADD_ROOT_COA_TREE_UI = (state, { tree }) => {
  const newRootNode = { content: tree, title: generateTitle(tree) }

  return {
    ...state,
    localTree: [ ...state.localTree, newRootNode ],
    isGroupDialogOpen: false
  }
}

const reducersMap = {
  LOAD_COA_TREE_UI,
  UPDATE_ORIGINAL_COA_TREE_UI,
  UPDATE_LOCAL_COA_TREE_UI,
  REVERT_COA_TREE_UI,
  OPEN_GROUP_COA_TREE_UI_DIALOG,
  CLOSE_GROUP_COA_TREE_UI_DIALOG,
  ADD_ROOT_COA_TREE_UI
}

const defaultState = {
  originalTree: {

  },
  localTree: [],
  error: null,
  isCallInProgress: false,
  saveTimeStamp: null,
  isGroupDialogOpen: false
}

const COATreeeStore = createReducer(defaultState, reducersMap)

export default COATreeeStore
