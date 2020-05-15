import {
  UPDATE_ORIGINAL_COA_TREE_UI,
  LOAD_COA_TREE_UI,
  UPDATE_LOCAL_COA_TREE_UI,
  REVERT_COA_TREE_UI,
  ADD_ROOT_COA_TREE_UI,
  DELETE_COA_TREE_UI,
  UPDATE_SELECTED_NODE_COA_TREE_UI,
  SELECT_COA_COA_TREE_UI
} from './actionCreators'

export const updateOriginalCOATreeUI = () => ({ type: UPDATE_ORIGINAL_COA_TREE_UI })
export const loadCOATreeUI = (treeList) => ({ type: LOAD_COA_TREE_UI, treeList })
export const updateLocalCOATreeUI = (tree) => ({ type: UPDATE_LOCAL_COA_TREE_UI, tree })
export const reverCOATreeUI = () => ({ type: REVERT_COA_TREE_UI })

export const addRootCOATreeUI = (tree) => ({ type: ADD_ROOT_COA_TREE_UI, tree })
export const deleteCOATreeUI = (path) => ({ type: DELETE_COA_TREE_UI, path })

export const updateSelectedNodeCOATreeUI = (nodeProps) => ({ type: UPDATE_SELECTED_NODE_COA_TREE_UI, nodeProps })
export const selectCOACOATreeUI = (_id) => ({ type: SELECT_COA_COA_TREE_UI, _id })
// export const removeCOATreeGroup = () => ({})