import React, { useState, useEffect, useCallback } from "react";

import { batch, useDispatch, useSelector } from "react-redux";

import { showAppNavigation, hideAppNavigation } from "@actions/ui/isAppNavigationOpen"; 


import Excel from "@tools/components/Excel";

import { convertStateToReactState } from "@tools/excel";

import { REST_ADMIN_TEMPLATES } from "@constants/rest";
import { ROUTE_ADMIN_TEMPLATE_TEMPLATES } from "@constants/routes";

import { 
  getTemplateRequest
} from "@thunks/templates"

import Loading from "@tools/components/Loading";

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
    }, 
    []
  );

  return (
    isCallInProgress 
      ? <Loading/>
      : <Excel type="template" returnLink={ROUTE_ADMIN_TEMPLATE_TEMPLATES}/>
  );
};

export default Template;
