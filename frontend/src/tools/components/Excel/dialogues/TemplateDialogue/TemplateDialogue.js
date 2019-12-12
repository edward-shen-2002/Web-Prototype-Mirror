import React from "react";

import { connect } from "react-redux";

import { closeTemplateIdMappingDialog } from "actions/ui/excel/isTemplateIdMappingDialogOpen";

import Button from "@material-ui/core/Button";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

import Switch from "@material-ui/core/Switch";

import InputBase from "@material-ui/core/InputBase";

import {
  DEFAULT_TEMPLATE_ID_ROW,
  DEFAULT_TEMPLATE_VALUE_ROW,
  DEFAULT_TEMPLATE_ID_COLUMN,
  DEFAULT_TEMPLATE_VALUE_COLUMN
} from "constants/template";

import "./TemplateDialogue.scss";

const mapStateToProps = ({
  ui: {
    excel: {
      isTemplateIdMappingDialogOpen
    }
  }
}) => ({
  isTemplateIdMappingDialogOpen
});

const mapDispatchToProps = (dispatch) => ({
  handleCloseDialog: () => dispatch(closeTemplateIdMappingDialog())
});

const MappingInput = (props) => (
  <InputBase className="mapping__input" {...props}/>
);

const TemplateDialogActions = ({ handleCloseDialog }) => (
  <DialogActions>
    <Button>Save</Button>
    <Button onClick={handleCloseDialog}>Close</Button>
  </DialogActions>
);

const Mapping = ({ type, defaultIdPosition, defaultValuePosition }) => (
  <div>
    <MappingInput defaultValue={defaultIdPosition} placeholder={`${type} of ID`}/>
    —
    <MappingInput defaultValue={defaultValuePosition} placeholder={`${type} of ID's Values`}/>
  </div>
);

const MappingEnabler = ({
  type
}) => (
  <div className="mapping__enabler">
    <h5 className="mapping_title">{type} Mapping (ID {type}—Value {type})</h5>
    <Switch color="primary"/>
  </div>
);

const MappingSection = ({
  type,
  defaultIdPosition,
  defaultValuePosition
}) => (
  <div>
    <MappingEnabler type={type}/>
    <Mapping 
      type={type}
      defaultIdPosition={defaultIdPosition} 
      defaultValuePosition={defaultValuePosition}
    />
  </div>
);

const TemplateDialogContent = () => (
  <DialogContent>
    <MappingSection 
      type="Row" 
      defaultIdPosition={DEFAULT_TEMPLATE_ID_ROW} 
      defaultValuePosition={DEFAULT_TEMPLATE_VALUE_ROW}
    />
    <MappingSection 
      type="Column" 
      defaultIdPosition={DEFAULT_TEMPLATE_ID_COLUMN} 
      defaultValuePosition={DEFAULT_TEMPLATE_VALUE_COLUMN}
    />
  </DialogContent>
);

let TemplateDialogue = ({
  isTemplateIdMappingDialogOpen,
  handleCloseDialog
}) => {

  return (
    <Dialog
      open={isTemplateIdMappingDialogOpen}
      onClose={handleCloseDialog}
    >
      <DialogTitle>Template ID Mapping</DialogTitle>
      <TemplateDialogContent/>
      <TemplateDialogActions 
        handleCloseDialog={handleCloseDialog}
      />
    </Dialog>
  );
};

TemplateDialogue = connect(mapStateToProps, mapDispatchToProps)(TemplateDialogue);

export default TemplateDialogue;