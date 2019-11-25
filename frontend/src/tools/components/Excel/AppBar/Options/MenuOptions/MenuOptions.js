import React from "react";

import Paper from "@material-ui/core/Paper";

const MenuOptionsItems = ({ options }) => options.map(() => {
  <div>
    
  </div>
});

const MenuOptionsContainer = ({ options }) => (
  <Paper>
    <MenuOptionsItems options={options}/>
  </Paper>
);

const MenuOptions = ({
  options
}) => {

  return (
    <div>
      <MenuOptionsContainer options={options}/>
    </div>
  );
};

export default MenuOptions;