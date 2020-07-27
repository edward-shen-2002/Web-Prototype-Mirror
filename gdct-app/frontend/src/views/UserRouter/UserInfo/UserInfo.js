import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getUsersRequest } from '../../../store/thunks/users';
import { getOrgsRequest } from '../../../store/thunks/organization';
import { getProgramsRequest } from '../../../store/thunks/program';
import { getTemplateTypesRequest } from '../../../store/thunks/templateType';

import MaterialTable, { MTableCell } from 'material-table';
import Paper from '@material-ui/core/Paper';

import Typography from '@material-ui/core/Typography';

import {
  selectFactoryRESTResponseTableValues,
  selectFactoryRESTIsCallInProgress,
} from '../../../store/common/REST/selectors';
import { selectUsersStore } from '../../../store/UsersStore/selectors';
import { selectOrgsStore } from '../../../store/OrganizationsStore/selectors';
import { selectProgramsStore } from '../../../store/ProgramsStore/selectors';
import { selectTemplateTypesStore } from '../../../store/TemplateTypesStore/selectors';
import Loading from '../../../components/Loading';

const HeaderActions = () => {
  return (
    <Paper className="header">
      <Typography variant="h5">User Info</Typography>
    </Paper>
  );
};

const MAX_DEPTH = 4;
const EDGE_PARAM = ['sysRole', 'org', 'program', 'template'];
const EXTRACT_INFO = [
  ['firstName', 'lastName', 'username', 'creationDate', 'phoneNumber', 'email'],
  ['role'],
  ['orgId', 'orgName'],
  ['programCode', 'programId'],
  ['templateCode', 'templateTypeId'],
];

const UserInfo = ({
    match: {
        params: { _id },
    }
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersRequest());
    dispatch(getOrgsRequest());
    dispatch(getProgramsRequest());
    dispatch(getTemplateTypesRequest());
  }, [dispatch]);

  const {
    userObject,
    isCallInProgress,
    organizations,
    programs,
    templateTypes,
  } = useSelector(state => ({
    userObject: (selectFactoryRESTResponseTableValues(selectUsersStore)(state).filter(
            elem => elem._id == _id
        ) || [{}])[0],
    isCallInProgress:
      selectFactoryRESTIsCallInProgress(selectUsersStore)(state) ||
      selectFactoryRESTIsCallInProgress(selectOrgsStore)(state) ||
      selectFactoryRESTIsCallInProgress(selectProgramsStore)(state) ||
      selectFactoryRESTIsCallInProgress(selectTemplateTypesStore)(state) ||
      false,
    organizations: selectFactoryRESTResponseTableValues(selectOrgsStore)(state),
    programs: selectFactoryRESTResponseTableValues(selectProgramsStore)(state),
    templateTypes: selectFactoryRESTResponseTableValues(selectTemplateTypesStore)(state),
  }));

  const dfs = (object, depth, path) => {
    for (let attribute of EXTRACT_INFO[depth]) path[attribute] = object[attribute];
    if (depth < MAX_DEPTH) {
      let res = [];
      if (!Object.prototype.hasOwnProperty.call(object, EDGE_PARAM[depth])) return res;
      for (let child of object[EDGE_PARAM[depth]])
        res = res.concat(dfs(child, depth + 1, Object.assign({}, path)));
      return res;
    } else return [path];
  };

  const [data, updateData] = useState([]);

  useEffect(() => {
    if(userObject){
        const extracted_data = dfs(userObject, 0, {});
        let organizations_map = {},
        programs_map = {},
        templateTypes_map = {};
        organizations.forEach(doc => (organizations_map[doc._id] = doc.name));
        programs.forEach(doc => (programs_map[doc._id] = doc.name));
        templateTypes.forEach(doc => (templateTypes_map[doc._id] = doc.name));
        updateData(() =>
            extracted_data.map(row => ({
                user: `Username: ${row.username}\nName: ${row.firstName} ${row.lastName}`,
                date: `${row.creationDate}`,
                organization: `${row.orgName}`,
                program: `(${row.programCode})\n${programs_map[row.programId]}`,
                template: `${templateTypes_map[row.templateTypeId]}`,
                permission: `${row.role}`,
                appsys: `Phone: ${row.phoneNumber}\nEmail: ${row.email}`,
            })),
        );
    }
  }, [userObject, organizations, programs, templateTypes]);

  const columns = useMemo(
    () => [
      { title: 'User', field: 'user' },
      { title: 'Date', field: 'date' },
      { title: 'Organization', field: 'organization' },
      { title: 'Program', field: 'program' },
      { title: 'Template Type', field: 'template' },
      { title: 'Permission', field: 'permission' },
      { title: 'AppSys', field: 'appsys' },
    ],
    [],
  );

  const options = useMemo(
    () => ({
      search: true,
      showTitle: false,
    }),
    [],
  );

  const components = useMemo(
    () => ({
      Cell: props => <MTableCell {...props} style={{ whiteSpace: 'pre-wrap' }} />
    }),
    [],
  );

  return isCallInProgress ? (
    <Loading />
  ) : (
    <div className="userInfo">
      <HeaderActions />
      <MaterialTable components={components} columns={columns} data={data} options={options} />
    </div>
  );
};

export default UserInfo;
