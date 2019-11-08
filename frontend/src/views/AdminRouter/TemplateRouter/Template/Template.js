import React, { useState, useEffect } from "react";

import { adminTemplateRoleAxios } from "tools/rest";

import Excel from "tools/components/Excel";

import { REST_ADMIN_TEMPLATES } from "constants/rest";
import { ROUTE_ADMIN_TEMPLATE_TEMPLATES } from "constants/routes";

import "./Template.scss";

const Template = ({ match: { params: { _id } } }) => {
  const [ template, setTemplate ] = useState({});
  const [ isDataFetched, setIsDataFetched ] = useState(false);

  useEffect(() => {
    if(!isDataFetched) {
      adminTemplateRoleAxios.get(`${REST_ADMIN_TEMPLATES}/${_id}`)
        .then(({ data: { data: { template } } }) => {
          setTemplate(template);
        })
        .catch((error) => console.error(error));

      setIsDataFetched(true);
    }
  }, [ isDataFetched ]);

  const { name } = template;

  return (
    <div>
      <Excel name={name} homeLink={ROUTE_ADMIN_TEMPLATE_TEMPLATES}/>
    </div>
  );
};

export default Template;