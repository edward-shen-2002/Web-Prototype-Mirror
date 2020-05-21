import React, { useCallback, useEffect, useMemo } from 'react'

import { useSelector, shallowEqual, useDispatch } from 'react-redux'

import { closeCOADialog } from '../../../store/actions/DialogsStore'

import { selectCOACOATreeUI } from '../../../store/actions/COATreeStore'

import { getCOAsRequest } from "../../../store/thunks/COA"

import { selectedCOAIdsSelector, selectedCOATreeIdSelector } from '../../../store/selectors/COATreeStore'

import SelectableTableDialog from '../../../tools/components/dialogs/SelectableTableDialog'

const COAGroupDialog = () => {
  const dispatch = useDispatch()

  const {
    COAs,
    selectedCOAIds,
    isCOADialogOpen,
    COATreeId
  } = useSelector(
    (
      {
        COAsStore: {
          response: {
            Values
          },
        },
        COATreeStore,
        DialogsStore: {
          isCOADialogOpen
        }
      }
    ) => (
      {
        selectedCOAIds: selectedCOAIdsSelector(COATreeStore),
        COATreeId: selectedCOATreeIdSelector(COATreeStore),
        COAs: Values,
        isCOADialogOpen
      }
    ),
    shallowEqual
  )

  const getKey = useCallback(
    (item) => item._id,
    []
  )

  const handleSelect = useCallback(
    (item) => {
      dispatch(selectCOACOATreeUI(item._id))
    },
    [ dispatch ]
  )

  useEffect(
    () => {
      if(isCOADialogOpen) dispatch(getCOAsRequest())
    },
    [ dispatch, isCOADialogOpen ]
  )

  const handleClose = useCallback(
    () => dispatch(closeCOADialog()),
    [ dispatch ]
  )

  const columns = useMemo(
    () => [
      { title: "_id", field: "_id" },
      { title: "Name", field: "name" }
    ],
    []
  )

  return (
    <SelectableTableDialog
      title={`COAs - ${COATreeId}`}
      columns={columns}
      selectedKeys={selectedCOAIds}
      getKey={getKey}
      isOpen={isCOADialogOpen}
      data={COAs}
      handleClose={handleClose}
      handleSelect={handleSelect}
    />
  )
}

export default COAGroupDialog