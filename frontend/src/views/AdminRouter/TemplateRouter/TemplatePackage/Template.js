import React, { useState, useEffect, useCallback } from "react";

import { batch, useDispatch } from "react-redux";

import { showAppNavigation, hideAppNavigation } from "@actions/ui/isAppNavigationOpen"; 

import { adminTemplateRoleAxios } from "@tools/rest";
import Excel from "@tools/components/Excel";

import { convertStateToReactState } from "@tools/excel";

import { REST_ADMIN_TEMPLATES } from "@constants/rest";
import { ROUTE_ADMIN_TEMPLATE_TEMPLATES } from "@constants/routes";

import Loading from "@tools/components/Loading";

import "./Template.scss";

const Template = ({ 
  match: { params: { _id } }, 
  history
}) => {
  const [ isDataFetched, setIsDataFetched ] = useState(false);

  const dispatch = useDispatch();

  const openNavigation = useCallback(
    () => {
      dispatch(showAppNavigation());
    },
    [ dispatch ]
  );

  const openExcelFile = useCallback(
    (excelData) => {
      batch(
        () => {
          dispatch(hideAppNavigation());
          dispatch(setExcelData(excelData));
        }
      );
    },
    [ dispatch ]
  );

  const closeExcelFile = useCallback(
    () => {
      batch(
        () => {
          openNavigation();
          dispatch(resetExcelData());
        }
      );
    },
    [ dispatch ]
  );

  useEffect(() => {
    if(!isDataFetched) {
      adminTemplateRoleAxios.get(`${REST_ADMIN_TEMPLATES}/${_id}`)
        .then(({ data: { data: { template } } }) => {
          let { fileStates, published } = template;
          fileStates.isTemplatePublished = published;
          fileStates.type = "template";
          fileStates.templateId = _id;

          openExcelFile(convertStateToReactState(fileStates));
          setIsDataFetched(true);
        })
        .catch((error) => {
          console.error(error);
          openNavigation();
          history.push(ROUTE_ADMIN_TEMPLATE_TEMPLATES);
        });
    }

    return () => {
      if(isDataFetched) closeExcelFile();
    };
  }, [ isDataFetched ]);

  return (
    isDataFetched 
      ? <Excel type="template" returnLink={ROUTE_ADMIN_TEMPLATE_TEMPLATES}/>
      : <Loading/>
  );
};

export default Template;
