import React, { useCallback, useEffect, useMemo } from 'react';

import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import SelectableTableDialog from './SelectableTableDialog';

import { getOrgsRequest } from '../../store/thunks/organization';

import DialogsStore from '../../store/DialogsStore/store';
import { selectFactoryRESTResponseTableValues } from '../../store/common/REST/selectors';
import { selectOrgsStore } from '../../store/OrganizationsStore/selectors';
import { selectIsOrganizationDialogOpen } from '../../store/DialogsStore/selectors';

const OrganizationDialog = ({ handleChange }) => {
  const dispatch = useDispatch();

  const { isOrganizationDialogOpen, templates } = useSelector(
    state => ({
      isOrganizationDialogOpen: selectIsOrganizationDialogOpen(state),
      organizations: selectFactoryRESTResponseTableValues(selectOrgsStore)(state),
    }),
    shallowEqual,
  );

  const handleClose = useCallback(() => dispatch(DialogsStore.actions.CLOSE_TEMPLATE_DIALOG()), [
    dispatch,
  ]);

  const handleSelect = useCallback(
    data => {
      handleChange(data._id);
      handleClose();
    },
    [dispatch],
  );

  useEffect(() => {
    if (isOrganizationDialogOpen && !templates.length) dispatch(getOrgsRequest());
  }, [dispatch, isOrganizationDialogOpen]);

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
    [],
  );

  return (
    <SelectableTableDialog
      title="Organization"
      columns={columns}
      isOpen={isOrganizationDialogOpen}
      data={organizations}
      handleClose={handleClose}
      handleSelect={handleSelect}
    />
  );
};

export default OrganizationDialog;
