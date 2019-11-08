import React, { useState, useEffect } from "react";

import { adminTemplateRoleAxios } from "tools/rest";

import { REST_ADMIN_TEMPLATES } from "constants/rest";
import { ROUTE_ADMIN_TEMPLATE_TEMPLATES } from "constants/routes";

import "./Template.scss";

const Template = ({ match: { params: { _id } } }) => {
  const [ isDataFetched, setIsDataFetched ] = useState(false);

  useEffect(() => {
    if(!isDataFetched) {
      adminTemplateRoleAxios.get(`${REST_ADMIN_TEMPLATES}/${_id}`)
        .then(({ data: { data: { template } } }) => {
          console.log(template);
        })
        .catch((error) => console.error(error));

      setIsDataFetched(true);
    }
  }, [ isDataFetched ]);

  return (
    <div>
      testing
    </div>
  );
};

export default Template;