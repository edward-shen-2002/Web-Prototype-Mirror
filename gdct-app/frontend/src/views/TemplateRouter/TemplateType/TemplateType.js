import React, {useCallback, useMemo, useEffect, useState} from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import {
    getTemplateTypesRequest,
    createTemplateTypeRequest,
    deleteTemplateTypeRequest,
    updateTemplateTypeRequest
} from '../../../store/thunks/templateType'
import Loading from '../../../components/Loading/Loading'

import {
    getProgramsRequest,
    createProgramsRequest,
    deleteProgramsRequest,
    updateProgramsRequest,
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
    const isTemplateTypesCallInProgress = useSelector(
        ({ TemplateTypesStore: { isCallInProgress } }) => isCallInProgress
    )
    const isProgramsCallInProgress = useSelector(
        ({ ProgramsStore: {isCallInProgress} }) => isCallInProgress
    )
    const isCallInProgress = isTemplateTypesCallInProgress && isProgramsCallInProgress;
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
    const lookupPrograms = programs.reduce(function(acc, program) {
        acc[program._id] = program.name;
        return acc;
    }, {});
    const columns = useMemo(
        () => [
            {title: 'Program Id', field: 'programId', editable: 'never'},
            {title: 'Program Name', field: 'programName', lookup: lookupPrograms},
            {title: 'Program Code', field: 'programCode', editable: 'never'},
            {title: 'Active', type: 'boolean', field: 'isActive', editable: 'never'},
        ],[lookupPrograms]
    )
    const editable = useMemo(
        () => ({
            onRowAdd: (program) =>
                new Promise((resolve, reject) => {
                    let isRepeat = false;
                    for(let i = 0; i < templateType.programIds.length; i++)
                        if(program.programName == templateType.programIds[i]) isRepeat = true;
                    if(isRepeat) {
                        alert('This program is already linked.');
                        reject();
                    }
                    else {
                        templateType.programIds.push(program.programName);
                        dispatch(updateTemplateTypeRequest(templateType, resolve, reject));
                    }
                }),
            onRowDelete: (program) =>
                new Promise((resolve, reject) => {
                    templateType.programIds = templateType.programIds.filter(elem => elem != program.programId);
                    dispatch(updateTemplateTypeRequest(templateType, resolve, reject));
                })
        }),
        [dispatch, templateType, lookupPrograms]
    )
    const options = useMemo(
        () => ({actionsColumnIndex: -1}),
        []
    )
    
    useEffect(
        () => {
            dispatch(getTemplateTypesRequest())
            dispatch(getProgramsRequest())
        },
        [dispatch]
    )
        
    // convert programIds into data array
    let data = [];
    if(!isCallInProgress && templateType && programs) {
        for(let i = 0; i < templateType.programIds.length; i++) {
            let curProgramId = templateType.programIds[i];
            let curProgram = ( programs.filter(elem => elem._id == curProgramId) || [{}] )[0];
            data.push(
                {
                    programId: curProgramId,
                    programName: curProgram ? curProgramId : '',
                    programCode: curProgram ? curProgram.code ? curProgram.code : '' : '',
                    isActive: curProgram ? curProgram.isActive : 'false'
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
            editable = {editable}
            options = {options}
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