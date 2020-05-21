import React, { useCallback, useEffect } from 'react'

import {
  closeTemplateTypeDialog
} from '../../../store/actions/DialogsStore'

import SelectableTableDialog from './SelectableTableDialog'

import { 
  getTemplateTypesRequest
} from '../../../store/thunks/templateType'

import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { useMemo } from 'react'

const TemplateTypeDialog = ({ handleChange }) => {
  const dispatch = useDispatch()

  const {
    isTemplateTypeDialogOpen,
    templateTypes
  } = useSelector(
    (
      {
        DialogsStore: {
          isTemplateTypeDialogOpen
        },
        TemplateTypesStore: {
          response: {
            Values
          }
        }
      }
    ) => (
      {
        isTemplateTypeDialogOpen,
        templateTypes: Values
      }
    ),
    shallowEqual
  )

  const handleClose = useCallback(
    () => dispatch(closeTemplateTypeDialog()),
    [ dispatch ]
  )

  const handleSelect = useCallback(
    (data) => {
      handleChange(data._id)
      handleClose()
    },
    [ dispatch ]
  )

  useEffect(
    () => {
      if(isTemplateTypeDialogOpen && !templateTypes.length) dispatch(getTemplateTypesRequest())
    },
    [ dispatch, isTemplateTypeDialogOpen ]
  )

  const columns = useMemo(
    () => [
      {
        title: '_id',
        field: '_id',
      },
      {
        title: 'Name',
        field: 'name'
      }
    ],
    []
  )

  return (
    <SelectableTableDialog
      title="Template Type"
      columns={columns}
      isOpen={isTemplateTypeDialogOpen}
      data={templateTypes}
      handleClose={handleClose}
      handleSelect={handleSelect}
    />
  )
}

export default TemplateTypeDialog