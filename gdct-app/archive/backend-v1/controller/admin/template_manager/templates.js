import XlsxPopulate from "xlsx-populate";

import { 
  DEFAULT_EXCEL_ROWS, 
  DEFAULT_EXCEL_COLUMNS,
  DEFAULT_EXCEL_ROW_HEIGHT,
  DEFAULT_EXCEL_COLUMN_WIDTH
} from "../../../constants/excel";

import { ROUTE_ADMIN_TEMPLATES } from "../../../constants/rest";

import { 
  MESSAGE_SUCCESS_TEMPLATES,
  MESSAGE_SUCCESS_TEMPLATES_CREATE,
  MESSAGE_SUCCESS_TEMPLATES_UPDATE, 
  MESSAGE_SUCCESS_TEMPLATES_DELETE,
  MESSAGE_SUCCESS_TEMPLATES_TEMPLATE 
} from "../../../constants/messages";

import uniqid from "uniqid";

// ! Compression https://nodejs.org/api/zlib.html

const templates = ({ router, TemplateModel }) => {
  router.get(ROUTE_ADMIN_TEMPLATES, (req, res, next) => {
    TemplateModel.find({})
      .then((templates) => {
        res.json({ message: MESSAGE_SUCCESS_TEMPLATES, data: { templates } })
      })
      .catch(next);
  });

  // Instantiate a blank template. Change the title if there's a duplicate.
  // Default title is Untitled Workbook (?version)
  // ! NEED TO CHANGE THIS - INITIALIZE THE STATES ON THE FRONTEND?
  // router.post(ROUTE_ADMIN_TEMPLATES, async (req, res, next) => {
  //   let { newTemplate } = req.body;
    
  //   const name = newTemplate ? newTemplate.name : uniqid();

  //   try {
  //     const blankWorkbook = await XlsxPopulate.fromBlankAsync();

  //     const sheet = blankWorkbook.sheet(0);

  //     for(let row = 1; row <= DEFAULT_EXCEL_ROWS; row++) sheet.row(row).height(DEFAULT_EXCEL_ROW_HEIGHT);

  //     for(let column = 1; column <= DEFAULT_EXCEL_COLUMNS; column++) sheet.column(column).width(DEFAULT_EXCEL_COLUMN_WIDTH);

  //     sheet.row(DEFAULT_EXCEL_ROWS).cell(DEFAULT_EXCEL_COLUMNS).setValue(undefined);

  //     const blankWorkbookData = await blankWorkbook.outputAsync("base64");

  //     TemplateModel.create({ name, file: blankWorkbookData })
  //       .then((template) => {
  //         res.json({ message: MESSAGE_SUCCESS_TEMPLATES_CREATE, data: { template: { _id: template._id, name: template.name } } });
  //       })
  //       .catch(next);
  //   } catch(error) {
  //     next(error);
  //   }
  // });

  router.post(`${ROUTE_ADMIN_TEMPLATES}/upload`, async (req, res, next) => {
    let { newTemplate } = req.body;
    
    TemplateModel.create(newTemplate)
      .then((template) => {
        res.json({ message: MESSAGE_SUCCESS_TEMPLATES_CREATE, data: { template: { _id: template._id } } });
      })
      .catch(next);
  });

  router.put(ROUTE_ADMIN_TEMPLATES, (req, res, next) => {
    const { newTemplate, oldTemplate } = req.body; 
    const { _id } = oldTemplate;

    TemplateModel.findByIdAndUpdate(_id, newTemplate)
      .then(() => {
        res.json({ message: MESSAGE_SUCCESS_TEMPLATES_UPDATE });
      })
      .catch(next);
  });

  router.delete(`${ROUTE_ADMIN_TEMPLATES}/:_id`, (req, res, next) => {
    const { _id } = req.params;

    TemplateModel.findByIdAndDelete(_id)
      .then(() => {
        res.json({ message: MESSAGE_SUCCESS_TEMPLATES_DELETE });
      })
      .catch(next);
  });

  router.get(`${ROUTE_ADMIN_TEMPLATES}/:_id`, (req, res, next) => {
    const { _id } = req.params;

    TemplateModel.findById(_id)
      .then((template) => {
        res.json({ message: MESSAGE_SUCCESS_TEMPLATES_TEMPLATE, data: { template } });
      })
      .catch(next);
  });

  router.put(`${ROUTE_ADMIN_TEMPLATES}/:_id`, (req, res, next) => {
    const { _id } = req.params;
    const { newTemplate } = req.body;

    TemplateModel.findByIdAndUpdate(_id, newTemplate)
      .then(() => {
        res.json({ message: MESSAGE_SUCCESS_TEMPLATES_UPDATE });
      })
      .catch(next);
  });
};

export default templates;