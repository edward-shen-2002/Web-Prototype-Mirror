import { batch } from 'react-redux'

import {
  requestCOATrees,
  failCOATreesRequest,
  receiveCOATrees,
  createCOATree,
  deleteCOATree,
  updateCOATree
} from '../actions/COATreesStore'

import {
  loadCOATreeUI,
  addRootCOATreeUI,
  updateOriginalCOATreeUI
} from '../actions/COATreeStore'

import {
  closeCOAGroupDialog
} from '../actions/DialogsStore'

import COATreeController from '../../controllers/COATree'

const normalizeTrees = (denormalizedCOATrees) => {
  let stack = [ ...denormalizedCOATrees ]

  let normalizedTrees = denormalizedCOATrees.map(
    (COATree) => ({ ...COATree.content, parentId: undefined, content: undefined }) 
  )

  while(stack.length) {
    const node = stack.pop()

    const { children } = node

    const parentId = node.content._id

    if(children) {
      children.forEach(
        (child) => {
          const childContent = child.content

          normalizedTrees.push({ ...childContent, parentId, content: undefined })
          
          stack.push(child)
        }
      )
    }
  }

  return normalizedTrees
}

export const getCOATreeRequest = (_id) => (dispatch) => {
  dispatch(requestCOATrees())

  COATreeController.fetchCOATree(_id)
    .then((COATree) => {
      dispatch(loadCOATreeUI(COATree))
    })
    .catch((error) => {
      dispatch(failCOATreesRequest(error))
    })
}

export const getCOATreesRequest = (query) => (dispatch) => {
  dispatch(requestCOATrees())

  COATreeController.fetchCOATrees(query)
    .then((COATrees) => {
      batch(
        () => {
          dispatch(receiveCOATrees({ Values: COATrees }))
          dispatch(loadCOATreeUI(COATrees))
        }
      )
    })
    .catch((error) => {
      dispatch(failCOATreesRequest(error))
    })
}

export const createCOATreeRequest = (COAGroup, sheetNameId) => (dispatch) => {
  const COATree = {
    sheetNameId,
    COAGroupId: COAGroup._id
  }

  dispatch(requestCOATrees())

  COATreeController.createCOATree(COATree)
    .then((COATree) => {
      batch(
        () => {
          dispatch(createCOATree({ Value: COATree }))
          dispatch(addRootCOATreeUI(COATree))
          dispatch(closeCOAGroupDialog())
        }
      )
    })
    .catch((error) => {
      dispatch(failCOATreesRequest(error))
    })
}

export const deleteCOATreeRequest = (_id) => (dispatch) => {
  dispatch(requestCOATrees())

  COATreeController.deleteCOATree(_id)
    .then(() => {
      dispatch(deleteCOATree({ Value: { _id } }))
    })
    .catch((error) => {
      dispatch(failCOATreesRequest(error))
    })
}

export const updateCOATreeRequest = (COATree, resolve, reject) => (dispatch) => {
  dispatch(requestCOATrees())

  COATreeController.updateCOATree(COATree)
    .then(() => {
      dispatch(updateCOATree({ Value: COATree }))
      resolve()
    })
    .catch((error) => {
      dispatch(failCOATreesRequest(error))
      reject()
    })
}

export const updateCOATreesRequest = (sheetNameId) => (dispatch, getState) => {
  const {
    COATreeStore: {
      localTree
    }
  } = getState()
  
  dispatch(requestCOATrees())

  const normalizedTrees = normalizeTrees(localTree)

  COATreeController.updateCOATrees(normalizedTrees, sheetNameId)
    .then(
      (_COATrees) => {
        dispatch(updateOriginalCOATreeUI())
      }
    )
    .catch(
      (error) => {
        dispatch(failCOATreesRequest(error))
      }
    )
}