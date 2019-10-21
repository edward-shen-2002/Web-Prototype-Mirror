import React, { useState, useEffect } from "react";
// import { adminOrganizationRoleAxios } from "tools/rest";

const Organizations = () => {
  const [ isDialogOpen, setIsDialogOpen ] = useState(false);
  const [ organizations, setOrganizations ] = useState([]);
  const [ isDataFetched, setIsDataFetched ] = useState(false);

  useEffect(() => {
    if(!isDataFetched) {}
  });

  return (
    <div>
      Orgs
    </div>
  );
};

export default Organizations;