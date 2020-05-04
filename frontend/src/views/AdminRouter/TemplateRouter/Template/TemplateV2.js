import React, { useState, useEffect, useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";

import Excel from "@tools/components/Excel";

import { 
  getTemplateRequest
} from "@thunks/template"

import Loading from "@tools/components/Loading";

import { showAppNavigation } from "@actions/ui/isAppNavigationOpen"; 

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

  useEffect(
    () => {
      // If fetch fails, push back to /tempaltes
      dispatch(getTemplateRequest(_id))

      return () => {
        dispatch(showAppNavigation())
      }
    }, 
    []
  );

  return (
    isCallInProgress 
      ? <Loading/>
      : <Excel type="template" returnLink="/designer/template"/>
  );
};

export default Template;
