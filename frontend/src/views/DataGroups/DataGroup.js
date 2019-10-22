import React, { useState, useEffect } from "react";

import { ROUTE_ADMIN_DATA_DATAGROUPS } from "constants/rest";

const DataGroup = () => {
  const [ group, setGroup ] = useState([]);
  const [ isDataFetched, setIsDataFetched ] = useState(false);

  useEffect(() => {
    if(!isDataFetched) {
      
      setIsDataFetched(true);
    }
  });

  return (
    <div>
      Data group
    </div>
  );
};

export default DataGroup;
