import React, { useState } from "react";

import { connect } from "react-redux";

import { updateWorkbookName } from "@actions/ui/excel/name";

import InputBase from "@material-ui/core/InputBase";

const mapStateToProps = ({
  ui: {
    excel: {
      name
    }
  }
}) => ({
  name
});

const mapDispatchToProps = (dispatch) => ({
  handleChangeName: (name) => dispatch(updateWorkbookName(name))
});

// TODO : Make input width contain text - react virtualized
// TODO : Events handler: blur, key down (escape), ...
let Title = ({ name, handleChangeName }) => {
  const handleChange = ({ target: { value } }) => handleChangeName(value);

  const handleKeyDown = ({ key, target }) => {
    if(key === "Enter") target.blur();
  };

  return (
    <InputBase 
      className="appBarMain__title" 
      type="text" 
      value={name} 
      onKeyDown={handleKeyDown} 
      onChange={handleChange}
      fullWidth
    />
  );
};

Title = connect(mapStateToProps, mapDispatchToProps)(Title);

export default Title;