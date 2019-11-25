import React, { useState } from "react";

import InputBase from "@material-ui/core/InputBase";

const Title = ({ name, handleSubmitName }) => {
  const [ title, setTitle ] = useState(name);

  const handleChange = ({ target: { value } }) => setTitle(value);

  const handleKeyDown = ({ key, target }) => {
    if(key === "Enter") target.blur();
  };

  // Changes the workbook title when and only when blur occurs
  const handleBlur = () => {
    handleSubmitName(title)
      .catch(() => setTitle(name));
  };

  return (
    <InputBase 
      className="appBarTitle" 
      type="text" 
      value={title} 
      onBlur={handleBlur} 
      onKeyDown={handleKeyDown} 
      onChange={handleChange}
    />
  );
};

export default Title;