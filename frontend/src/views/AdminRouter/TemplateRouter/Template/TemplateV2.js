import React, { useState, useEffect, useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";

import Excel from "@tools/components/Excel";

import { 
  getTemplateRequest,
  updateTemplateRequest
} from "@thunks/template"

import Loading from "@tools/components/Loading";

import { showAppNavigation, hideAppNavigation } from "@actions/ui/isAppNavigationOpen"; 

import "./Template.scss";

const Template = ({ match: { params: { _id } } }) => {
  const dispatch = useDispatch()

  const isCallInProgress = useSelector(
    (
      {
        TemplateStore: {
          isCallInProgress
        }
      }
    ) => isCallInProgress
  )

  const handleSaveTemplate = useCallback(
    (templateData) => {
      dispatch(updateTemplateRequest({ _id, templateData }))
    },
    []
  )

  useEffect(
    () => {
      // If fetch fails, push back to /tempaltes
      dispatch(getTemplateRequest(_id))
      dispatch(hideAppNavigation())

      return () => {
        dispatch(showAppNavigation())
        // dispatch()
      }
    }, 
    []
  );

  return (
    isCallInProgress 
      ? <Loading/>
      : <Excel 
          type="template" 
          returnLink="/designer/template"
          handleSave={handleSaveTemplate}
        />
  );
};

export default Template;
