import pako from "pako";

import { ROUTE_ADMIN_BUNDLES_WORKFLOW } from "../../../constants/rest";
import { HTTP_ERROR_NOT_FOUND } from "../../../constants/rest";
import { MESSAGE_ERROR_NOT_FOUND } from "../../../constants/messages";
import { getListDifference, isNumber } from "../../../tools/misc";

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
      
      let dataToInsert = [];

      const workbookCount = workbooksIds.length;

      for(let i = 0; i < workbookCount; i++) {
        const workbookId = workbooksIds[i];
        const workbookName = names[i];

        await MasterValueModel.deleteMany({ organizationId, year, quarter, type: workbookName });

        const workbook = workbooks[workbookId];

        const { sheetNames, workbookData } = workbook;

        for(let form of sheetNames) {
          const sheetData = JSON.parse(pako.inflate(workbookData[form], { to: "string" }));
          const { 
            sheetCellData
          } = sheetData;

          let attributesMap = {};
          let categoriesMap = {};

          // Get attributes
          const firstRow = sheetCellData[1];
          if(firstRow) {
            for(let column in firstRow) {
              if(column > 1) {
                const { value } = firstRow[column];
  
                if(isNumber(value)) attributesMap[column] = value;
              }
            }
          }

          // Get categories
          for(let row in sheetCellData) {
            if(row > 1) {
              const firstColumn = sheetCellData[row][1];
              if(firstColumn) {
                const { value } = firstColumn;

                if(isNumber(value)) categoriesMap[row] = value;
              }
            }
          }

          const attributes = Object.values(attributesMap);
          const categories = Object.values(categoriesMap);

          // ! Check if attribute/category id exists and inform users if it doesn't
          const definedAttributes = (
            await BusinessConceptModel.find({ id: { $in: attributes }})
              .select("id")
          ).map(({ id }) => id);

          const definedCategories = (
            await BusinessConceptModel.find({ id: { $in: categories }})
              .select("id")
          ).map(({ id }) => id);

          const invalidAttributes = getListDifference(definedAttributes, attributes);
          const invalidCategories = getListDifference(definedCategories, categories);

          // ! Quadratic run time - optimize later
          // Exclude rows without defined attributes/categories
          for(let row in attributesMap) {
            if(invalidAttributes.includes(attributesMap[row])) delete attributesMap[row];
          }

          for(let column in categoriesMap) {
            if(invalidCategories.includes(categoriesMap[column])) delete categoriesMap[column];
          }

          // The remaining attributes/categories are the potential valid pairing
          // Is it possible to have a pair of similar concepts? ie (budget, budget)?
          // Column might not exist. Looping through rows ensures that undefined rows with column concept are not visited
          for(let row in categoriesMap) {
            const rowData = sheetCellData[row];
            const businessConceptId1 = categoriesMap[row];
            for(let column in attributesMap) {
              // Cell value might be rich text!
              const cellData = rowData[column];
              
              if(cellData) {
                const { value } = cellData;
                
                // Cell value might not exist even though concept pairs are defined
                // TODO : Convert rich text to plaintext
                // Value could be prepopulate
                if(value) {
                  const businessConceptId2 = attributesMap[column];
                  dataToInsert.push({
                    organizationId,
                    type: workbookName,
                    year,
                    quarter,
                    form,
                    businessConceptId1,
                    businessConceptId2,
                    value
                  });
                }
              }
            }
          }
        };
      };

      await MasterValueModel.create(dataToInsert);

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