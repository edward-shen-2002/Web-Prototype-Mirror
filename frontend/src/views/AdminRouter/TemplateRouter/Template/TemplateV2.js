import React, { useState, useEffect, useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";

import { showAppNavigation, hideAppNavigation } from "../../../../store/actions/ui/isAppNavigationOpen";
import Loading from "../../../../tools/components/Loading/Loading";

import { updateTemplateRequest, getTemplateRequest } from "../../../../store/thunks/template";
import { Excel } from "../../../../tools/components/Excel";

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
