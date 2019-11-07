import xlsxPopulate from "xlsx-populate";

import { ROUTE_ADMIN_TEMPLATES } from "../../../constants/rest";

// import {  } from "../../../constants/messages";

// TODO : Consider scope
const templates = ({ router }) => {
  router.get(ROUTE_ADMIN_TEMPLATES, (req, res, next) => {
    res.end();
  });

  // Instantiate a blank template. Change the title if there's a duplicate.
  // Default title is Untitled Workbook (?version)
  router.post(ROUTE_ADMIN_TEMPLATES, (req, res, next) => {
    res.end();
  });

  router.put(ROUTE_ADMIN_TEMPLATES, (req, res, next) => {

  });

  router.delete(ROUTE_ADMIN_TEMPLATES, (req, res, next) => {

  });

};

export default templates;