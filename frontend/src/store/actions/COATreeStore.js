import {
  UPDATE_ORIGINAL_COA_TREE_UI,
  LOAD_COA_TREE_UI,
  UPDATE_LOCAL_COA_TREE_UI,
  REVERT_COA_TREE_UI,
  OPEN_GROUP_COA_TREE_UI_DIALOG,
  CLOSE_GROUP_COA_TREE_UI_DIALOG,
  ADD_ROOT_COA_TREE_UI
} from './actionCreators'

export const updateOriginalCOATreeUI = () => ({ type: UPDATE_ORIGINAL_COA_TREE_UI })
export const loadCOATreeUI = (treeList) => ({ type: LOAD_COA_TREE_UI, treeList })
export const updateLocalCOATreeUI = (tree) => ({ type: UPDATE_LOCAL_COA_TREE_UI, tree })
export const reverCOATreeUI = () => ({ type: REVERT_COA_TREE_UI })

export const openGroupCOATreeUIDialog = () => ({ type: OPEN_GROUP_COA_TREE_UI_DIALOG })
export const closeGroupCOATreeUIDialog = () => ({ type: CLOSE_GROUP_COA_TREE_UI_DIALOG })

// UNIMPLEMENTED
export const addRootCOATreeUI = (tree) => ({ type: ADD_ROOT_COA_TREE_UI, tree })
// export const removeCOATreeGroup = () => ({})
