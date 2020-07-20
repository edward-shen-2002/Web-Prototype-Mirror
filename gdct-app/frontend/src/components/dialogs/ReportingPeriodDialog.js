import React, { useCallback, useEffect } from 'react'

import SelectableTableDialog from './SelectableTableDialog'

import { getReportingPeriodsRequest } from '../../store/thunks/reportingPeriod'

import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { useMemo } from 'react'
import DialogsStore from '../../store/DialogsStore/store'
import { selectIsReportingPeriodDialogOpen } from '../../store/DialogsStore/selectors'
import { selectFactoryRESTResponseTableValues } from '../../store/common/REST/selectors'
import { selectReportingPeriodsStore } from '../../store/ReportingPeriodsStore/selectors'

const ReportingPeriodDialog = ({ handleChange }) => {
  const dispatch = useDispatch()

  const { isReportingPeriodDialogOpen, reportingPeriods } = useSelector(
    (state) => ({
      isReportingPeriodDialogOpen: selectIsReportingPeriodDialogOpen(state),
      reportingPeriods: selectFactoryRESTResponseTableValues(
        selectReportingPeriodsStore
      )(state),
    }),
    shallowEqual
  )

  const handleClose = useCallback(
    () => dispatch(DialogsStore.actions.CLOSE_REPORTING_PERIOD_DIALOG()),
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
