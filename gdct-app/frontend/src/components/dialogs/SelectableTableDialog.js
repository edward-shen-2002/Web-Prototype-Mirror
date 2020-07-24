import React from 'react';

import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import SelectableTable from '../SelectableTable';

const SelectableTableDialogActions = ({ handleClose }) => (
  <DialogActions>
    <Button color="secondary" variant="contained" onClick={handleClose}>
      Finish
    </Button>
  </DialogActions>
);

const SelectableTableDialogContent = ({ data, columns, selectedKeys, getKey, handleSelect }) => (
  <DialogContent style={{ width: 400 }}>
    <SelectableTable
      columns={columns}
      data={data}
      selectedKeys={selectedKeys}
      getKey={getKey}
      handleSelect={handleSelect}
    />
  </DialogContent>
);

const SelectableTableDialog = ({
  selectedKeys,
  getKey,
  title,
  columns,
  isOpen,
  data,
  handleClose,
  handleSelect,
}) => {
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <SelectableTableDialogContent
        columns={columns}
        data={data}
        handleSelect={handleSelect}
        selectedKeys={selectedKeys}
        getKey={getKey}
      />
      <SelectableTableDialogActions handleClose={handleClose} />
    </Dialog>
  );
};

export default SelectableTableDialog;
