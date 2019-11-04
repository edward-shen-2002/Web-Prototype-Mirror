import React from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

const RolesDialogContent = () => (
  <DialogContent>

  </DialogContent>
);

const RolesDialogActions = () => (
  <DialogActions>

  </DialogActions>
);

const RolesDialog = ({ open, roles, handleClose }) => (
  <Dialog open={open} onClose={handleClose}>
    <RolesDialogContent roles={roles}/>
    <RolesDialogActions/>
  </Dialog>
);

export default RolesDialog;