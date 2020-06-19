import React, {useCallback, useMemo, useEffect, useState} from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import {
    getTemplateTypesRequest,
    updateTemplateTypesRequest
} from '../../../store/thunks/templateType'
import Loading from '../../../components/Loading/Loading'

import {
    getProgramsRequest
} from '../../../store/thunks/Program'

import MaterialTable from 'material-table'
import LaunchIcon from '@material-ui/icons/Launch'
import Paper from '@material-ui/core/Paper'

import Typography from '@material-ui/core/Typography'

import './TemplateType.scss'
import { selectFactoryRESTResponseTableValues } from '../../../store/common/REST/selectors'
import { selectTemplateTypesStore } from '../../../store/TemplateTypesStore/selectors'
import { selectProgramsStore } from '../../../store/ProgramsStore/selectors'

const TemplateTypeHeader = () => {
    return (
        <Paper className="header">
          <Typography variant="h5">Template Type Viewer</Typography>
          {/* <HeaderActions/> */}
        </Paper>
    )
}

const TemplateTypeTable = ({
    history,
    match: {
        params: {_id}
    }
}) => {
    const dispatch = useDispatch()

    const { templateType } = useSelector(
      (state) => ({
        templateType: ( selectFactoryRESTResponseTableValues(
          selectTemplateTypesStore
        )(state).filter(elem => elem._id == _id) || [{}] ),
      }),
      shallowEqual
    )
  
    const columns = useMemo(
      () => [
        //{ title: '_id', field: '_id', editable: 'never' },
        { title: 'Name', field: 'name' },
        { title: 'Description', field: 'description' },
        { title: 'Approvable', type: 'boolean', field: 'isApprovable' },
        { title: 'Reviewable', type: 'boolean', field: 'isReviewable' },
        { title: 'Submittable', type: 'boolean', field: 'isSubmittable' },
        { title: 'Inputtable', type: 'boolean', field: 'isInputtable' },
        { title: 'Viewable', type: 'boolean', field: 'isViewable' },
        { title: 'Reportable', type: 'boolean', field: 'isReportable' },
        { title: 'Active', type: 'boolean', field: 'isActive'}
      ],
      []
    )
  
    const options = useMemo(
      () => ({ actionsColumnIndex: -1, search: false, showTitle: true, paging: false }),
      []
    )
  
    useEffect(() => {
      dispatch(getTemplateTypesRequest())
    }, [dispatch])
  
    return (
      <MaterialTable
        title = 'Current Template Type'
        columns={columns}
        data={templateType}
        options={options}
      />
    )
}

const LinkProgramsTable = ({history, match:{params:{_id}}}) => {
    const dispatch = useDispatch()
    const isCallInProgress = useSelector(
        ({ TemplatesStore: { isCallInProgress } }) => isCallInProgress
    )
    const { templateType, programs } = useSelector(
        (state) => ({
          templateType: ( selectFactoryRESTResponseTableValues(
            selectTemplateTypesStore
          )(state).filter(elem => elem._id == _id) || [{}] )[0],
          programs: selectFactoryRESTResponseTableValues(selectProgramsStore)(
            state
          ),
        }),
        shallowEqual
    )
    const columns = useMemo(
        () => [
            {title: 'Program Id', field: 'programIds'}
        ],[]
    )
    // convert programIds into data array
    let data = [];
    if(templateType) {
        for(let i = 0; i < templateType.programIds.length; i++) {
            data.push(
                {
                    programIds: templateType.programIds[i]
                }
            );
        }
    }
    return isCallInProgress ? (
        <Loading />
    ) : (
        <MaterialTable
            title = 'Linked Programs'
            data = {data}
            columns = {columns}
        />
    )
}

const TemplateType = (props) => (
    <div className="templateTypePage">
      <TemplateTypeHeader />
      {/* <FileDropzone/> */}
      <TemplateTypeTable {...props} />
      <LinkProgramsTable {...props} />
    </div>
)

export default TemplateType