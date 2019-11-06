import React from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

const TemplatesDialogContent = () => {
  
  return (
    <DialogContent>

    </DialogContent>
  );
};

const TemplatesDialog = ({ open, handleClose }) => (
  <Dialog open={open} onClose={handleClose}>
    <DialogTitle>Create Template</DialogTitle>
    <TemplatesDialogContent/>
  </Dialog>
);

export default TemplatesDialog;