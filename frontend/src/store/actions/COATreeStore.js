import {
  UPDATE_ORIGINAL_COA_TREE_UI,
  LOAD_COA_TREE_UI,
  UPDATE_LOCAL_COA_TREE_UI,
  REVERT_COA_TREE_UI
} from './actionCreators'

export const updateOriginalCOATreeUI = () => ({ type: UPDATE_ORIGINAL_COA_TREE_UI })
export const loadCOATreeUI = (treeList) => ({ type: LOAD_COA_TREE_UI, treeList })
export const updateLocalCOATreeUI = (tree) => ({ type: UPDATE_LOCAL_COA_TREE_UI, tree })
export const reverCOATreeUI = () => ({ type: REVERT_COA_TREE_UI })


// UNIMPLEMENTED
export const addCOATreeGroup = (group) => ({ type: ADD_GROUP_COA_TREE_UI, group })
export const removeCOATreeGroup = () => ({})
