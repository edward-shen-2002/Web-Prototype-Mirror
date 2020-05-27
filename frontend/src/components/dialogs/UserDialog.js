import React, { useCallback, useEffect } from 'react'

import { closeUserDialog } from '../../store/actions/DialogsStore'

import SelectableTableDialog from './SelectableTableDialog'

import { getUsersRequest } from '../../store/thunks/user'

import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { useMemo } from 'react'

const UserDialog = ({ handleChange }) => {
  const dispatch = useDispatch()

  const { isUserDialogOpen, users } = useSelector(
    ({
      DialogsStore: { isUserDialogOpen },
      UsersStore: {
        response: { Values },
      },
    }) => ({
      isUserDialogOpen,
      users: Values,
    }),
    shallowEqual
  )

  const handleClose = useCallback(() => dispatch(closeUserDialog()), [dispatch])

  const handleSelect = useCallback(
    (data) => {
      handleChange(data._id)
      handleClose()
    },
    [dispatch]
  )

  useEffect(() => {
    if (isUserDialogOpen && !users.length) dispatch(getUsersRequest())
  }, [dispatch, isUserDialogOpen])

  const columns = useMemo(
    () => [
      {
        title: '_id',
        field: '_id',
      },
      {
        title: 'Username',
        field: 'username',
      },
    ],
    []
  )

  return (
    <SelectableTableDialog
      title="User"
      columns={columns}
      isOpen={isUserDialogOpen}
      data={users}
      handleClose={handleClose}
      handleSelect={handleSelect}
    />
  )
}

export default UserDialog
