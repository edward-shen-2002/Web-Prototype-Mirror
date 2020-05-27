import React, { useCallback, useEffect } from 'react'

import { closeStatusDialog } from '../../store/actions/DialogsStore'

import SelectableTableDialog from './SelectableTableDialog'

import { getStatusesRequest } from '../../store/thunks/status'

import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { useMemo } from 'react'

const StatusDialog = ({ handleChange }) => {
  const dispatch = useDispatch()

  const { isStatusDialogOpen, statuses } = useSelector(
    ({
      DialogsStore: { isStatusDialogOpen },
      StatusesStore: {
        response: { Values },
      },
    }) => ({
      isStatusDialogOpen,
      statuses: Values,
    }),
    shallowEqual
  )

  const handleClose = useCallback(() => dispatch(closeStatusDialog()), [
    dispatch,
  ])

  const handleSelect = useCallback(
    (data) => {
      handleChange(data._id)
      handleClose()
    },
    [dispatch]
  )

  useEffect(() => {
    if (isStatusDialogOpen && !statuses.length) dispatch(getStatusesRequest())
  }, [dispatch, isStatusDialogOpen])

  const columns = useMemo(
    () => [
      {
        title: '_id',
        field: '_id',
      },
      {
        title: 'Name',
        field: 'name',
      },
    ],
    []
  )

  return (
    <SelectableTableDialog
      title="Status"
      columns={columns}
      isOpen={isStatusDialogOpen}
      data={statuses}
      handleClose={handleClose}
      handleSelect={handleSelect}
    />
  )
}

export default StatusDialog
