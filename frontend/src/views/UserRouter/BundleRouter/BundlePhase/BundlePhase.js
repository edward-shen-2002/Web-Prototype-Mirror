import React, { useState, useEffect, useMemo } from "react";

import Paper from "@material-ui/core/Paper";

import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";

import { 
  adminEditBundleRoleAxios, 
  adminReviewBundleRoleAxios, 
  adminApproveBundleRoleAxios,
  adminBundleRoleAxios
} from "tools/rest";

import TextDialog from "tools/components/TextDialog";

import { REST_ADMIN_BUNDLES_WORKFLOW } from "constants/rest";
import { ROUTE_USER_BUNDLES } from "constants/routes";

import "./BundlePhase.scss";

const BundleWorkbooks = ({ 
  workbookIds, 
  workbookNames, 
  history, 
  bundleId, 
  phase 
}) => workbookIds.map((id, index) => {
  const name = workbookNames[index];
  const handleClick = () => history.push(`${ROUTE_USER_BUNDLES}/${phase}/${bundleId}/workbook/${id}`);

  return (
    <Chip
      className="bundleWorkbooks__workbook"
      key={`${id} ${name}`}
      label={name}
      size="medium"
      clickable
      onClick={handleClick}
    />
  );
});

const BundleWorkbooksSection = ({
  workbookIds, 
  workbookNames, 
  history, 
  bundleId, 
  phase 
}) => (
  <div>
    <Typography variant="h6">Workbooks</Typography>
    <BundleWorkbooks
      workbookIds={workbookIds} 
      workbookNames={workbookNames} 
      history={history} 
      bundleId={bundleId} 
      phase={phase} 
    />
  </div>
);

const LabeledTextField = ({ label, text, textFieldProps, handleChange }) => (
  <div className="field">
    <Typography className="field__label">{label}</Typography>
    <TextField className="field__input" value={text} onChange={handleChange} {...textFieldProps} fullWidth/>
  </div>
);

const DisabledLabledTextField = (props) => (
  <LabeledTextField {...props} textFieldProps={{ disabled: true }}/>
);

const BundlePhaseNotes = ({ notesPhase, phase, label, text, handleChange }) => (
  <LabeledTextField 
    label={label} 
    text={text} 
    textFieldProps={{ 
      disabled: notesPhase !== phase,
      variant: "outlined",
      multiline: true,
      InputProps: {
        style: {
          minHeight: 100
        }
      }
    }}
    handleChange={handleChange}
  />
);

const BundlePhaseActions = ({ phase, handleSave, handleSubmit, handleCancel }) => (
  <ButtonGroup className="bundleActions" variant="contained" fullWidth>
    {phase !== "null" && <Button color="primary" onClick={handleSave}>Save</Button>}
    {phase !== "null" && <Button color="secondary" onClick={handleSubmit}>Submit</Button>}
    <Button onClick={handleCancel}>Cancel</Button>
  </ButtonGroup>
);

const BundlePhaseMisc = ({ phase, status, createdAt, year, quarter }) => (
  <div className="bundleMisc">
    <DisabledLabledTextField label="Phase" text={phase}/>
    <DisabledLabledTextField label="Status" text={status}/>
    <DisabledLabledTextField label="Created At" text={createdAt}/>
    <DisabledLabledTextField label="Year" text={year}/>
    <DisabledLabledTextField label="Quarter" text={quarter}/>
  </div>
);

const BundleNotesSection = ({
  phase,
  editorNotes,
  reviewerNotes,
  approverNotes,
  handleChangeEditorNotes,
  handleChangeReviewerNotes,
  handleChangeApproverNotes
}) => (
  <div>
    <BundlePhaseNotes 
      label="Editor Notes" 
      text={editorNotes} 
      phase={phase} 
      notesPhase="edit"
      handleChange={handleChangeEditorNotes}
    />
    <BundlePhaseNotes 
      label="Reviewer Notes" 
      text={reviewerNotes} 
      phase={phase} 
      notesPhase="review"
      handleChange={handleChangeReviewerNotes}
    />
    <BundlePhaseNotes 
      label="Approver Notes" 
      text={approverNotes} 
      phase={phase} 
      notesPhase="approve"
      handleChange={handleChangeApproverNotes}
    />
  </div>
);

const BundleHeader = ({ name, phase, handleOpenReturnBundleDialog }) => (
  <div className="bundleHeader">
    <Typography variant="h4">Bundle: {name}</Typography>
    {phase !== "edit" && <Button variant="contained" color="secondary" onClick={handleOpenReturnBundleDialog}>Return Bundle</Button>}
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

  const [ editorNotes, setEditorNotes ] = useState("");
  const [ reviewerNotes, setReviewerNotes ] = useState("");
  const [ approverNotes, setApproverNotes ] = useState("");

  const [ isBundleSubmitDialogOpen, setIsBundleSubmitDialogOpen ] = useState(false);
  const [ isReturnBundleDialogOpen, setIsReturnBundleDialogOpen ] = useState(false);

  const bundlePhaseRoleAxios = useMemo(() => {
    if(phase === "edit") {
      return adminEditBundleRoleAxios;
    } else if(phase === "review") {
      return adminReviewBundleRoleAxios;
    } else if(phase === "approve") {
      return adminApproveBundleRoleAxios;
    }

    return adminBundleRoleAxios;
  }, [ phase ]);

  const handleChangeEditorNotes = ({ target: { value } }) => setEditorNotes(value);
  const handleChangeReviewerNotes = ({ target: { value } }) => setReviewerNotes(value);
  const handleChangeApproverNotes = ({ target: { value } }) => setApproverNotes(value);

  const bundle = useMemo(() => {
    let bundle = {};
    if(phase === "edit") {
      bundle.editorNotes = editorNotes;
    } else if(phase === "review") {
      bundle.reviewerNotes = reviewerNotes;
    } else if(phase === "approve") {
      bundle.approverNotes = approverNotes;
    } 

    return bundle;
  });

  const handleGoBack = () => {
    history.push(ROUTE_USER_BUNDLES);
  };

  const handleSaveBundle = () => {
    bundlePhaseRoleAxios.put(`${REST_ADMIN_BUNDLES_WORKFLOW}/${_id}`, { bundle })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmitBundle = () => {
    bundlePhaseRoleAxios.put(`${REST_ADMIN_BUNDLES_WORKFLOW}/${_id}/submit`, { bundle })
      .then(() => handleGoBack())
      .catch((error) => {
        console.error(error);
      });
  };

  const handleOpenBundleSubmitDialog = () => setIsBundleSubmitDialogOpen(true);
  const handleCloseBundleSubmitDialog = () => setIsBundleSubmitDialogOpen(false);

  const handleOpenReturnBundleDialog = () => setIsReturnBundleDialogOpen(true);
  const handleCloseReturnBundleDialog = () => setIsReturnBundleDialogOpen(false);

  const handleReturnBundle = () => {
    bundlePhaseRoleAxios.put(`${REST_ADMIN_BUNDLES_WORKFLOW}/${_id}/return`, { bundle })
      .then(() => handleGoBack())
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if(!isDataFetched) {
      bundlePhaseRoleAxios.get(`${REST_ADMIN_BUNDLES_WORKFLOW}/${_id}`)
        .then(({ data: { data: { bundle } } }) => {
          const { 
            name,
            year,
            quarter,
            status,
            createdAt,
            editorNotes, 
            reviewerNotes, 
            approverNotes, 
            workbooksData: { ids, names } 
          } = bundle;
          
          setName(name);
          setYear(year);
          setQuarter(quarter);
          setStatus(status);
          setCreatedAt(createdAt);
          setEditorNotes(editorNotes);
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
      <BundleHeader 
        name={name} 
        phase={phase}
        handleOpenReturnBundleDialog={handleOpenReturnBundleDialog}
      />
      <Divider/>
      <BundleWorkbooksSection
        workbookNames={workbookNames}
        workbookIds={workbookIds}
        bundleId={_id}
        history={history}
        phase={phase}
      />
      <BundlePhaseMisc 
        phase={phase}
        status={status}
        createdAt={createdAt}
        quarter={quarter} 
        year={year}
      />
      <BundleNotesSection
        phase={phase}
        editorNotes={editorNotes}
        reviewerNotes={reviewerNotes}
        approverNotes={approverNotes}
        handleChangeEditorNotes={handleChangeEditorNotes}
        handleChangeReviewerNotes={handleChangeReviewerNotes}
        handleChangeApproverNotes={handleChangeApproverNotes}
      />
      <BundlePhaseActions
        phase={phase}
        handleSave={handleSaveBundle}
        handleSubmit={handleOpenBundleSubmitDialog}
        handleCancel={handleGoBack}
      />
      <TextDialog
        open={isBundleSubmitDialogOpen}
        title="Submit Bundle"
        message="Are you sure you want to submit this bundle? It will proceed to the next stage, which you may not have access to."
        handleConfirm={handleSubmitBundle}
        handleClose={handleCloseBundleSubmitDialog}
      />
      <TextDialog
        open={isReturnBundleDialogOpen}
        title="Return Bundle"
        message="Are you sure you want to return this bundle? It will go to the previous stage, which you may not have access to."
        handleConfirm={handleReturnBundle}
        handleClose={handleCloseReturnBundleDialog}
      />
    </Paper>
  );
};

export default BundlePhase;