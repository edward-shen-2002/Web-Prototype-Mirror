import React, { useCallback, useMemo, useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import MaterialTable from 'material-table';
import LaunchIcon from '@material-ui/icons/Launch';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { List } from '@material-ui/core';
import {
  getTemplateTypesRequest,
  createTemplateTypeRequest,
  deleteTemplateTypeRequest,
  updateTemplateTypeRequest,
} from '../../../store/thunks/templateType';
import Loading from '../../../components/Loading/Loading';
import ProgramList from '../../OrganizationRouter/ProgramList';

import {
  getProgramsRequest,
  createProgramsRequest,
  deleteProgramsRequest,
  updateProgramsRequest,
} from '../../../store/thunks/program';

import './TemplateType.scss';
import { selectFactoryRESTResponseTableValues } from '../../../store/common/REST/selectors';
import { selectTemplateTypesStore } from '../../../store/TemplateTypesStore/selectors';
import { selectProgramsStore } from '../../../store/ProgramsStore/selectors';

const TemplateTypeHeader = () => {
  return (
    <Paper className="header">
      <Typography variant="h5">Template Type Viewer</Typography>
      {/* <HeaderActions/> */}
    </Paper>
  );
};

const TemplateTypeTable = ({
  history,
  match: {
    params: { _id },
  },
}) => {
  const dispatch = useDispatch();

  const { templateType } = useSelector(
    state => ({
      templateType: selectFactoryRESTResponseTableValues(selectTemplateTypesStore)(state).filter(
        elem => elem._id == _id,
      ) || [{}],
    }),
    shallowEqual,
  );

  const columns = useMemo(
    () => [
      // { title: '_id', field: '_id', editable: 'never' },
      { title: 'Name', field: 'name' },
      { title: 'Description', field: 'description' },
      { title: 'Approvable', type: 'boolean', field: 'isApprovable' },
      { title: 'Reviewable', type: 'boolean', field: 'isReviewable' },
      { title: 'Submittable', type: 'boolean', field: 'isSubmittable' },
      { title: 'Inputtable', type: 'boolean', field: 'isInputtable' },
      { title: 'Viewable', type: 'boolean', field: 'isViewable' },
      { title: 'Reportable', type: 'boolean', field: 'isReportable' },
      { title: 'Active', type: 'boolean', field: 'isActive' },
    ],
    [],
  );

  const options = useMemo(
    () => ({
      actionsColumnIndex: -1,
      search: false,
      showTitle: true,
      paging: false,
    }),
    [],
  );

  useEffect(() => {
    dispatch(getTemplateTypesRequest());
  }, [dispatch]);

  return (
    <MaterialTable
      title="Current Template Type"
      columns={columns}
      data={templateType}
      options={options}
    />
  );
};

const LinkProgramTable = ({
  history,
  match: {
    params: { _id },
  },
}) => {
  const dispatch = useDispatch();
  const { templateType } = useSelector(
    state => ({
      templateType: (selectFactoryRESTResponseTableValues(selectTemplateTypesStore)(state).filter(
        elem => elem._id == _id,
      ) || [{}])[0],
    }),
    shallowEqual,
  );
  const isTemplateTypesCallInProgress = useSelector(
    ({ TemplateTypesStore: { isCallInProgress } }) => isCallInProgress,
  );
  const isProgramsCallInProgress = useSelector(
    ({ ProgramsStore: { isCallInProgress } }) => isCallInProgress,
  );
  const isCallInProgress = isTemplateTypesCallInProgress && isProgramsCallInProgress;
  const accept = result => {
    redirect();
  };
  const reject = error => {
    // reflect error message on form somehow o.O
    alert('Missing or invalid parameters');
  };
  const onClickAdd = (_event, program) => {
    templateType.programIds.push(program._id);
    dispatch(updateTemplateTypeRequest(templateType), accept, reject);
  };
  const onClickDelete = (_event, program) => {
    templateType.programIds = templateType.programIds.filter(elem => elem != program._id);
    dispatch(updateTemplateTypeRequest(templateType), accept, reject);
  };
  return !templateType || isCallInProgress ? (
    <Loading />
  ) : (
    <ProgramList
      programIds={templateType.programIds}
      isEditable
      onClickAdd={onClickAdd}
      onClickDelete={onClickDelete}
    />
  );
};

const TemplateType = props => (
  <div className="templateTypePage">
    <TemplateTypeHeader />
    {/* <FileDropzone/> */}
    <TemplateTypeTable {...props} />
    <LinkProgramTable {...props} />
  </div>
);

export default TemplateType;
