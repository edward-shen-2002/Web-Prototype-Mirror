import React, { useState, useEffect } from "react";

import { REST_ADMIN_DATAGROUPS } from "constants/rest";

import { adminDataRoleAxios } from "tools/rest";

const DataGroup = () => {
  const [ group, setGroup ] = useState([]);
  const [ isDataFetched, setIsDataFetched ] = useState(false);

  useEffect(() => {
    if(!isDataFetched) {
      adminDataRoleAxios.get(REST_ADMIN_DATAGROUPS)
        .then(( { data: { data } }) => console.log(data))
        .catch((error) => console.error(error));
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
