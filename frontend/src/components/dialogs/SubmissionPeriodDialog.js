import React, { useCallback, useEffect } from 'react'

import { closeSubmissionPeriodDialog } from '../../store/actions/DialogsStore'

import SelectableTableDialog from './SelectableTableDialog'

import { getSubmissionPeriodsRequest } from '../../store/thunks/submissionPeriod'

import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { useMemo } from 'react'

const SubmissionPeriodDialog = ({ handleChange }) => {
  const dispatch = useDispatch()

  const { isSubmissionPeriodDialogOpen, submissionPeriods } = useSelector(
    ({
      DialogsStore: { isSubmissionPeriodDialogOpen },
      SubmissionPeriodsStore: {
        response: { Values },
      },
    }) => ({
      isSubmissionPeriodDialogOpen,
      submissionPeriods: Values,
    }),
    shallowEqual
  )

  const handleClose = useCallback(
    () => dispatch(closeSubmissionPeriodDialog()),
    [dispatch]
  )

  const handleSelect = useCallback(
    (data) => {
      handleChange(data._id)
      handleClose()
    },
    [dispatch]
  )

  useEffect(() => {
    if (isSubmissionPeriodDialogOpen && !submissionPeriods.length)
      dispatch(getSubmissionPeriodsRequest())
  }, [dispatch, isSubmissionPeriodDialogOpen])

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
      title="Submission Period"
      columns={columns}
      isOpen={isSubmissionPeriodDialogOpen}
      data={submissionPeriods}
      handleClose={handleClose}
      handleSelect={handleSelect}
    />
  )
}

export default SubmissionPeriodDialog
