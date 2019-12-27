import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";

import Typographpy from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";

import { adminEditBundleRoleAxios } from "tools/rest";

import { REST_ADMIN_BUNDLES } from "constants/rest";
import { ROUTE_USER_BUNDLES } from "constants/routes";

import "./BundlePhase.scss";

const BundleWorkbooks = ({ workbookIds, workbookNames }) => workbookIds.map((id, index) => {
  const name = workbookNames[index];

  return (
    <Chip
      className="bundle__workbook"
      key={`${id} ${name}`}
      label={name}
      size="medium"
      clickable
    />
  );
});

const BundleWorkbooksSection = ({
  workbookNames,
  workbookIds
}) => (
  <div>
    <Typographpy variant="h6">Workbooks</Typographpy>
    <BundleWorkbooks
      workbookNames={workbookNames}
      workbookIds={workbookIds}
    />
  </div>
);

const BundlePhase = ({
  match: {
    params: {
      phase,
      _id
    }
  },
  history
}) => {
  const [ isDataFetched, setIsDataFetched ] = useState(false);
  const [ name, setName ] = useState("");
  const [ year, setYear ] = useState("");
  const [ quarter, setQuarter ] = useState("");
  const [ status, setStatus ] = useState("");
  const [ workbookIds, setWorkbookIds ] = useState([]);
  const [ workbookNames, setWorkbookNames ] = useState([]);
  const [ createdAt, setCreatedAt ] = useState("");

  const [ userNotes, setUserNotes ] = useState("");
  const [ reviewerNotes, setReviewerNotes ] = useState("");
  const [ approverNotes, setApproverNotes ] = useState("");

  useEffect(() => {
    if(!isDataFetched) {
      adminEditBundleRoleAxios.get(`${REST_ADMIN_BUNDLES}/${_id}`)
        .then(({ data: { data: { bundle } } }) => {
          const { 
            name,
            year,
            quarter,
            status,
            createdAt,
            userNotes, 
            reviewerNotes, 
            approverNotes, 
            workbooksData: { ids, names } 
          } = bundle;
          
          setName(name);
          setYear(year);
          setQuarter(quarter);
          setStatus(status);
          setCreatedAt(createdAt);
          setUserNotes(userNotes);
          setReviewerNotes(reviewerNotes);
          setApproverNotes(approverNotes);
          setWorkbookNames(names);
          setWorkbookIds(ids);
        })
        .catch((error) => {
          console.error(error);
          history.push(ROUTE_USER_BUNDLES);
        });
      setIsDataFetched(true);
    }
  });

  return (
    <Paper className="bundlePhase">
      <Typographpy variant="h5">Bundle</Typographpy>
      <Divider/>
      <BundleWorkbooksSection
        workbookNames={workbookNames}
        workbookIds={workbookIds}
      />
    </Paper>
  );
};

export default BundlePhase;