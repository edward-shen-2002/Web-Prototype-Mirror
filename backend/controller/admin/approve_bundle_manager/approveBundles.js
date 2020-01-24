import pako from "pako";


import { ROUTE_ADMIN_BUNDLES_WORKFLOW } from "../../../constants/rest";
import { HTTP_ERROR_NOT_FOUND } from "../../../constants/rest";
import { MESSAGE_ERROR_NOT_FOUND } from "../../../constants/messages";

const approveBundles = ({ 
  router, 
  OrganizationBundleModel,
  BusinessConceptModel,
  MasterValueModel 
}) => {
  router.get(`${ROUTE_ADMIN_BUNDLES_WORKFLOW}/general`, (req, res, next) => {
    OrganizationBundleModel.find({ phase: "approve" })
      .select("_id name organization status phase")
      .then((bundles) => {
        res.json({ data: { bundles } });
      })
      .catch(next);
  });

  router.get(`${ROUTE_ADMIN_BUNDLES_WORKFLOW}/:_id`, (req, res, next) => {
    const { _id } = req.params;
    
    OrganizationBundleModel.findOne({ _id, phase: "approve" })
      .select("-workbooksData.workbooks")
      .then((bundle) => {
        if(bundle) {
          res.json({ data: { bundle } });
        } else {
          res.status(HTTP_ERROR_NOT_FOUND).json({ message: MESSAGE_ERROR_NOT_FOUND });
        }
      })
      .catch(next);
  });

  router.put(`${ROUTE_ADMIN_BUNDLES_WORKFLOW}/:_id`, (req, res, next) => {
    const { _id } = req.params;
    const { bundle: { approverNotes } } = req.body;

    OrganizationBundleModel.findOneAndUpdate({ _id, phase: "approve" }, { approverNotes })
      .then((bundle) => {
        if(bundle) {
          res.end();
        } else {
          res.status(HTTP_ERROR_NOT_FOUND).json({ message: MESSAGE_ERROR_NOT_FOUND });
        }
      })
      .catch(next);
  });

  router.put(`${ROUTE_ADMIN_BUNDLES_WORKFLOW}/:_id/submit`, async (req, res, next) => {
    const { _id } = req.params;
    const { bundle: { approverNotes } } = req.body;

    try {
      // const bundle = await OrganizationBundleModel.findOneAndUpdate({ _id, phase: "approve" }, { approverNotes, phase: "finished", status: "APPROVED" });
      const bundle = await OrganizationBundleModel.findOne({ _id, phase: "approve" });

      if(!bundle) return res.status(HTTP_ERROR_NOT_FOUND).json({ message: MESSAGE_ERROR_NOT_FOUND });

      // ! Remove existing data with parameters?
      const { 
        organization: { _id: organizationId }, 
        year, 
        quarter, 
        type, 
        workbooksData: { names, ids: workbooksIds, workbooks }
      } = bundle;
      
      await MasterValueModel.deleteMany({ organizationId, year, quarter, type });

      let dataToInsert = [];

      for(let workbookId of workbooksIds) {
        const workbook = workbooks[workbookId];

        const { sheetNames, workbookData } = workbook;

        for(let sheetName of sheetNames) {
          const sheetData = JSON.parse(pako.inflate(workbookData[sheetName], { to: "string" }));
          const { 
            sheetCellData
          } = sheetData;

          let attributes = {};
          let categories = {};

          // Get attributes
          const firstRow = sheetCellData[1];
          if(firstRow) {
            for(let column in firstRow) {
              if(column > 1) {
                const { value } = firstRow[column];
  
                if(+value === +value) attributes[column] = value;
              }
            }
          }

          // Get categories
          for(let row in sheetCellData) {
            if(row > 1) {
              const firstColumn = sheetCellData[row][1];
              if(firstColumn) {
                const { value } = firstColumn;

                if(+value === +value) categories[row] = value;
              }
            }
          }

          // Check if attribute/category id exists
          // ! inform users if it doesn't?
          const definedAttributes = await BusinessConceptModel.find({ id: { $in: Object.values(attributes) }});
          const definedCategories = await BusinessConceptModel.find({ id: { $in: Object.values(categories) }});

          console.log(definedAttributes, definedCategories)
          // ! Need to convert rich text to regular text

        };
      };

      // res.json({ bIds })

      res.end();
    } catch(error) {
      next(error);
    }
  });

  router.put(`${ROUTE_ADMIN_BUNDLES_WORKFLOW}/:_id/return`, (req, res, next) => {
    const { _id } = req.params;
    const { bundle: { approverNotes } } = req.body;

    OrganizationBundleModel.findOneAndUpdate({ _id, phase: "approve" }, { approverNotes, phase: "edit", status: "RETURNED" })
      .then((bundle) => {
        if(bundle) {
          res.end();
        } else {
          res.status(HTTP_ERROR_NOT_FOUND).json({ message: MESSAGE_ERROR_NOT_FOUND });
        }
      })
      .catch(next);
  });

  router.get(`${ROUTE_ADMIN_BUNDLES_WORKFLOW}/:bundleId/workbook/:workbookId`, (req, res, next) => {
    const { bundleId, workbookId } = req.params;

    OrganizationBundleModel.findOne({ _id: bundleId, phase: "approve" })
      .then((bundle) => {
        if(bundle && bundle.workbooksData.workbooks[workbookId]) {
          res.json({ data: { workbook: bundle.workbooksData.workbooks[workbookId] } });
        } else {
          res.status(HTTP_ERROR_NOT_FOUND).json({ message: MESSAGE_ERROR_NOT_FOUND });
        }
      })
      .catch(next);
  });

  router.put(`${ROUTE_ADMIN_BUNDLES_WORKFLOW}/:bundleId/workbook/:workbookId`, (req, res, next) => {
    const { bundleId, workbookId } = req.params;
    const { workbook } = req.body;
    let isWorkbooksDataValid = true;

    // ! Do validation here

    if(isWorkbooksDataValid) {
      OrganizationBundleModel.findOneAndUpdate(
        { 
          _id: bundleId, 
          phase: "approve", 
          [`workbooksData.workbooks.${workbookId}`]: { $ne: undefined } 
        }, 
        { 
          [`workbooksData.workbooks.${workbookId}`]: workbook 
        }
      )
        .then((bundle) => {
          if(bundle && bundle.workbooksData.workbooks[workbookId]) {
            res.end();
          } else {
            res.status(HTTP_ERROR_NOT_FOUND).json({ message: MESSAGE_ERROR_NOT_FOUND });
          }
        })
        .catch(next);
      } else {
        // ! Change this - excel invalid syntax/modification
        res.status(HTTP_ERROR_UNAUTHORIZED).json({ message: MESSAGE_ERROR_AUTH_FAIL });
      }
  });
};

export default approveBundles;