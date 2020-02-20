import React, { useState } from "react";

import Typography from "@material-ui/core/Typography";

import { LabeledTextField } from "./components";
import { DialogActions } from "./components";

const PrepopulatePopup = ({
  type,
  quarter,
  year,
  eventListenerRef
}) => {
  const [ newType, setNewType ] = useState(type ? type : "");
  const [ newQuarter, setNewQuarter ] = useState(quarter ? quarter : "");
  const [ newYear, setNewYear ] = useState(year ? year : "");

  const handleChangeType = ({ target: { value } }) => setNewType(value);
  const handleChangeQuarter = ({ target: { value } }) => setNewQuarter(value);
  const handleChangeYear = ({ target: { value } }) => setNewYear(value);

  const handleChangePrepopulate = () => eventListenerRef.current.setPrepopulate({ type: newType, quarter: newQuarter, year: newYear });
  const handleCloseActiveCellDialog = () => eventListenerRef.current.resetActiveCellDialog();

  return (
    <div className="dialog">
      <Typography variant="h6">Prepopulate</Typography>
      <LabeledTextField 
        label="Type" 
        text={newType} 
        handleChange={handleChangeType}
      />
      <LabeledTextField 
        label="Quarter" 
        text={newQuarter} 
        handleChange={handleChangeQuarter}
      />
      <LabeledTextField 
        label="Year" 
        text={newYear} 
        handleChange={handleChangeYear}
      />
      <DialogActions
        handleAdd={handleChangePrepopulate}
        handleCancel={handleCloseActiveCellDialog}
      />
    </div>
  );
};

export default PrepopulatePopup;