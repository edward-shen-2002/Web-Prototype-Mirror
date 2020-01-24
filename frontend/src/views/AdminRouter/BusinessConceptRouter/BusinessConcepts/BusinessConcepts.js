import React, { useState, useEffect, lazy } from "react";

import { adminTemplateRoleAxios } from "@tools/rest";

import { REST_ADMIN_BUSINESS_CONCEPTS } from "@constants/rest";

import "./BusinessConcepts.scss";

const MaterialTable = lazy(() => import("material-table"));

const BusinessConcepts = () => {
  const [ businessConcepts, setBusinessConcepts ] = useState([]);
  const [ isDataFetched, setIsDataFetched ] = useState(false);
  
  useEffect(() => {
    if(!isDataFetched) {
      adminTemplateRoleAxios.get(REST_ADMIN_BUSINESS_CONCEPTS)
        .then(({ data: { data: { businessConcepts } } }) => setBusinessConcepts(businessConcepts))
        .catch((error) => console.error(error));
      setIsDataFetched(true);
    }
  });

  const columns = [
    { title: "ID", field: "id" },
    { title: "Value", field: "value" }
  ];

  const handleRowAdd = (newBusinessConcept) => new Promise((resolve, reject) => {
    setTimeout(() => {
      adminTemplateRoleAxios.post(REST_ADMIN_BUSINESS_CONCEPTS, { newBusinessConcept })
        .then(({ data: { data: { businessConcept } } }) => {
          setBusinessConcepts([ ...businessConcepts, businessConcept ]);
          resolve();
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    }, 600);
  });

  const handleRowUpdate = (newBusinessConcept, oldBusinessConcept) => new Promise((resolve, reject) => {
    setTimeout(() => {
      adminTemplateRoleAxios.put(REST_ADMIN_BUSINESS_CONCEPTS, { newBusinessConcept })
        .then(() => {
          const oldBusinessConceptIndex = businessConcepts.indexOf(oldBusinessConcept);
          setBusinessConcepts([ ...businessConcepts.slice(0, oldBusinessConceptIndex), newBusinessConcept, ...businessConcepts.slice(oldBusinessConceptIndex + 1) ]);
          resolve();
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    }, 1000);
  });

  const handleRowDelete = (oldBusinessConcept) => new Promise((resolve, reject) => {
    setTimeout(() => {
      adminTemplateRoleAxios.delete(`${REST_ADMIN_BUSINESS_CONCEPTS}/${oldBusinessConcept._id}`)
        .then(() => {
          const oldBusinessConceptIndex = businessConcepts.indexOf(oldBusinessConcept);
          setBusinessConcepts([ ...businessConcepts.slice(0, oldBusinessConceptIndex), ...businessConcepts.slice(oldBusinessConceptIndex + 1) ]);
          resolve();
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    }, 1000);
  });

  const editable = { onRowAdd: handleRowAdd, onRowUpdate: handleRowUpdate, onRowDelete: handleRowDelete };

  const options = { actionsColumnIndex: -1 };

  return (
    <div className="businessConcepts">
      <MaterialTable
        title="Business Concepts"
        columns={columns}
        data={businessConcepts}
        editable={editable}
        options={options}
      />
    </div>
  );
};

export default BusinessConcepts;
