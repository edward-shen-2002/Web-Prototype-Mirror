import React from "react";

import { connect } from "react-redux";

import { closeTemplateIdMappingDialog } from "actions/ui/excel/isTemplateIdMappingDialogOpen";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

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

const TemplateDialogActions = () => (
  <DialogActions>

  </DialogActions>
);

const TemplateDialogContent = () => (
  <DialogContent>

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