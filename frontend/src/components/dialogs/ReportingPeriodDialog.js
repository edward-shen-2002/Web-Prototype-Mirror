import React, { useCallback, useEffect } from 'react'

import { closeReportingPeriodDialog } from '../../store/actions/DialogsStore'

import SelectableTableDialog from './SelectableTableDialog'

import { getReportingPeriodsRequest } from '../../store/thunks/reportingPeriod'

import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { useMemo } from 'react'

const ReportingPeriodDialog = ({ handleChange }) => {
  const dispatch = useDispatch()

  const { isReportingPeriodDialogOpen, reportingPeriods } = useSelector(
    ({
      DialogsStore: { isReportingPeriodDialogOpen },
      ReportingPeriodsStore: {
        response: { Values },
      },
    }) => ({
      isReportingPeriodDialogOpen,
      reportingPeriods: Values,
    }),
    shallowEqual
  )

  const handleClose = useCallback(
    () => dispatch(closeReportingPeriodDialog()),
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
    if (isReportingPeriodDialogOpen && !reportingPeriods.length)
      dispatch(getReportingPeriodsRequest())
  }, [dispatch, isReportingPeriodDialogOpen])

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
      title="Reporting Period"
      columns={columns}
      isOpen={isReportingPeriodDialogOpen}
      data={reportingPeriods}
      handleClose={handleClose}
      handleSelect={handleSelect}
    />
  )
}

export default ReportingPeriodDialog
