import React, { lazy } from "react";

import { FormControl, InputLabel, Select, Input, Checkbox, MenuItem, ListItemText } from "@material-ui/core";

const MaterialTable = lazy(() => import("material-table"));

const Users = () => {
  return (
    <div>
      <MaterialTable/>
    </div>
  );
};

export default Users;