import React, { useCallback, useEffect, useMemo } from 'react'

import { useSelector, shallowEqual, useDispatch } from 'react-redux'

import {
  closeCOAGroupDialog
} from '../../../store/actions/DialogsStore'

import { 
  getCOAGroupsRequest
} from "../../../store/thunks/COAGroup"

import { 
  createCOATreeRequest
} from "../../../store/thunks/COATree"

import SelectableTableDialog from '../../../tools/components/dialogs/SelectableTableDialog'

const COAGroupDialog = ({ sheetNameId }) => {
  const dispatch = useDispatch()

  const {
    isCOAGroupDialogOpen,
    COAGroups
  } = useSelector(
    (
      {
        COAGroupsStore: {
          response: {
            Values
          }
        },
        DialogsStore: {
          isCOAGroupDialogOpen
        }
      }
    ) => (
      {
        isCOAGroupDialogOpen,
        COAGroups: Values
      }
    ),
    shallowEqual
  )

  const handleClose = useCallback(
    () => {
      dispatch(closeCOAGroupDialog())
    },
    [ dispatch ]
  )

  const handleSelect = useCallback(
    (COAGroup) => {
      dispatch(createCOATreeRequest(COAGroup, sheetNameId))
    },
    [ dispatch ]
  )

  useEffect(
    () => {
      if(isCOAGroupDialogOpen) dispatch(getCOAGroupsRequest())
    },
    [ dispatch, isCOAGroupDialogOpen ]
  )

  const columns = useMemo(
    () => [
      { title: "_id", field: "_id" },
      { title: "Name", field: "name" },
      { title: "Code", field: "code" }
    ],
    []
  )

  return (
    <SelectableTableDialog
      title="COA Groups"
      columns={columns}
      isOpen={isCOAGroupDialogOpen}
      data={COAGroups}
      handleClose={handleClose}
      handleSelect={handleSelect}
    />
  )
}

export default COAGroupDialog