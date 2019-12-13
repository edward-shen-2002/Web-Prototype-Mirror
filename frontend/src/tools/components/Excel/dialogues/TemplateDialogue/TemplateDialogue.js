import React from "react";

import { connect } from "react-redux";

import { updateSheetTemplateIdMapping } from "actions/ui/excel/sheetTemplateIdMapping";
import { closeTemplateIdMappingDialog } from "actions/ui/excel/isTemplateIdMappingDialogOpen";

import Button from "@material-ui/core/Button";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

import Switch from "@material-ui/core/Switch";

import InputBase from "@material-ui/core/InputBase";

import "./TemplateDialogue.scss";

const mapStateToProps = ({
  ui: {
    excel: {
      isTemplateIdMappingDialogOpen,
      sheetTemplateIdMapping
    }
  }
}) => ({
  isTemplateIdMappingDialogOpen,
  sheetTemplateIdMapping
});

const mapDispatchToProps = (dispatch) => ({
  handleUpdateTemplateIdMapping: (sheetTemplateIdMapping) => dispatch(updateSheetTemplateIdMapping(sheetTemplateIdMapping)),
  handleCloseDialog: () => dispatch(closeTemplateIdMappingDialog())
});

const MappingInput = (props) => (
  <InputBase className="mapping__input" {...props}/>
);

const TemplateDialogActions = ({ handleCloseDialog }) => (
  <DialogActions>
    <Button onClick={handleCloseDialog}>Close</Button>
  </DialogActions>
);

const Mapping = ({ 
  type, 
  isEnabled,
  idPosition, 
  valuePosition,
  handleChangeIdPosition,
  handleChangeValuePosition
}) => (
  <div>
    <MappingInput value={idPosition} disabled={!isEnabled} placeholder={`${type} of ID`} onChange={handleChangeIdPosition}/>
    —
    <MappingInput value={valuePosition} disabled={!isEnabled} placeholder={`${type} of ID's Values`} onChange={handleChangeValuePosition}/>
  </div>
);

const MappingEnabler = ({
  type,
  isEnabled,
  handleToggleEnabler
}) => (
  <div className="mapping__enabler">
    <h5 className="mapping_title">{type} Mapping (ID {type}—Value {type})</h5>
    <Switch color="primary" checked={isEnabled} onChange={handleToggleEnabler}/>
  </div>
);

const MappingSection = ({
  type,
  idPosition,
  valuePosition,
  isEnabled,
  handleUpdateTemplateIdMapping
}) => {
  const handleChangeIdPosition = ({ target: { value } }) => handleUpdateTemplateIdMapping({ [`id${type}`]: value });
  const handleChangeValuePosition = ({ target: { value } }) => handleUpdateTemplateIdMapping({ [`value${type}`]: value });
  const handleToggleEnabler = ({ target: { checked } }) => handleUpdateTemplateIdMapping({ [`is${type}Enabled`]: checked });
  return (
    <div>
      <MappingEnabler 
        type={type}
        isEnabled={isEnabled}
        handleToggleEnabler={handleToggleEnabler}
      />
      <Mapping 
        type={type}
        isEnabled={isEnabled}
        idPosition={idPosition} 
        valuePosition={valuePosition}
        handleChangeIdPosition={handleChangeIdPosition}
        handleChangeValuePosition={handleChangeValuePosition}
      />
    </div>
  );
};

const TemplateDialogContent = ({ 
  sheetTemplateIdMapping: {
    idRow,
    valueRow,
    isRowEnabled,
    idColumn,
    valueColumn,
    isColumnEnabled
  },
  handleUpdateTemplateIdMapping
}) => (
  <DialogContent>
    <MappingSection 
      type="Row" 
      idPosition={idRow} 
      valuePosition={valueRow}
      isEnabled={isRowEnabled}
      handleUpdateTemplateIdMapping={handleUpdateTemplateIdMapping}
    />
    <MappingSection 
      type="Column" 
      idPosition={idColumn} 
      valuePosition={valueColumn}
      isEnabled={isColumnEnabled}
      handleUpdateTemplateIdMapping={handleUpdateTemplateIdMapping}
    />
  </DialogContent>
);

let TemplateDialogue = ({
  isTemplateIdMappingDialogOpen,
  sheetTemplateIdMapping,
  handleCloseDialog,
  handleUpdateTemplateIdMapping
}) => (
  <Dialog
    open={isTemplateIdMappingDialogOpen}
    onClose={handleCloseDialog}
  >
    <DialogTitle>Template ID Mapping</DialogTitle>
    <TemplateDialogContent 
      sheetTemplateIdMapping={sheetTemplateIdMapping}
      handleUpdateTemplateIdMapping={handleUpdateTemplateIdMapping}
    />
    <TemplateDialogActions 
      handleCloseDialog={handleCloseDialog}
    />
  </Dialog>
);

TemplateDialogue = connect(mapStateToProps, mapDispatchToProps)(TemplateDialogue);

export default TemplateDialogue;