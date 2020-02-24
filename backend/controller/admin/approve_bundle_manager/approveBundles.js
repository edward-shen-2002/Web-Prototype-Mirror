import pako from "pako";

import { ROUTE_ADMIN_BUNDLES_WORKFLOW } from "../../../constants/rest";
import { HTTP_ERROR_NOT_FOUND } from "../../../constants/rest";
import { MESSAGE_ERROR_NOT_FOUND } from "../../../constants/messages";
import { getListDifference, isNumber } from "../../../tools/misc";
import { isGroupString, getGroupData } from "../../../tools/workbook";

const approveBundles = ({ 
  router, 
  OrganizationBundleModel,
  BusinessConceptModel,
  MasterValueModel,
  GroupModel
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
      const bundle = await OrganizationBundleModel.findOneAndUpdate({ _id, phase: "approve" }, {});
      
      if(!bundle) return res.status(HTTP_ERROR_NOT_FOUND).json({ message: MESSAGE_ERROR_NOT_FOUND });

      // ! Remove existing data with parameters?
      const { 
        organization: { _id: organizationId }, 
        year, 
        quarter, 
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

        let attributes = new Set();
        let categories = new Set();

        let groupIds = new Set();
        let groupValues = new Set();

        // Todo: attribute groups
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
  
                if(value !== "" && isNumber(value)) {
                  attributesMap[column] = { id: +value };
                }
              }
            }
          }

          // Get categories
          for(let row in sheetCellData) {
            if(row > 1) {
              const firstColumn = sheetCellData[row][1];
              const secondColumn = sheetCellData[row][2];
              const thirdColumn = sheetCellData[row][3];
              if(firstColumn) {
                const { value } = firstColumn;

                if(value) {
                  if(isNumber(value)) {
                    let currentGroups;
                    if(secondColumn && secondColumn.value) {
                      currentGroups = secondColumn.value.split(" - ").map((id) => ({ id }));
                      currentGroups.forEach(({ id }) => id);
                       
                    } else if(thirdColumn && thirdColumn.value) {
                      currentGroups = thirdColumn.value.split(" - ").map((value) => ({ value }));
                      currentGroups.forEach(({ value }) => groupValues.add(value));
                    }

                    categoriesMap[row] = { id: +value, groups: currentGroups };
                    attributes.add(+value);
                  }
                }
              }
            }
          }

          //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
          // ! TODO : Shouldn't this also be verified in the template (when published check)? 
          // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

          // Convert set to array
          attributes = Array.from(attributes);
          categories = Array.from(categories);

          groupIds = Array.from(groupIds);
          groupValues = Array.from(groupValues);

          // ! Check if attribute/category id exists and inform users if it doesn't
          const definedAttributes = (
            await BusinessConceptModel.find({ id: { $in: attributes }})
              .select("id")
          ).map(({ id }) => id);

          const definedCategories = (
            await BusinessConceptModel.find({ id: { $in: categories }})
              .select("id")
          ).map(({ id }) => id);
          
          const definedGroups = (
            await GroupModel.find({ $or: [ { id: { $in: groupIds } }, { value: { $in: groupValues } } ]})
              .select("id value")
          );

          const definedGroupsIdsMap = definedGroups.reduce((acc, { id, value }) => {
            acc[ id ] = value;
            return acc;
          }, {});
          const definedGroupsValuesMap = definedGroups.reduce((acc, { value, id }) => {
            acc[ value ] = id;
            return acc;
          }, {});

          const invalidAttributes = getListDifference(definedAttributes, attributes);
          const invalidCategories = getListDifference(definedCategories, categories);
          const invalidGroupIds = getListDifference(Object.keys(definedGroupsIdsMap), groupIds);
          const invalidGroupValues = getListDifference(Object.keys(definedGroupsValuesMap), groupValues);

          if(
            invalidAttributes.length 
            || invalidCategories.length 
            || invalidGroupIds.length
            || invalidGroupValues.length
          ) {
            return res.status(HTTP_ERROR_NOT_FOUND).json({ 
              message: MESSAGE_ERROR_NOT_FOUND, 
              invalidAttributes, 
              invalidCategories,
              invalidGroupIds,
              invalidGroupValues
            });
          }

          // The remaining attributes/categories are the potential valid pairing
          // Is it possible to have a pair of similar concepts? ie (budget, budget)?
          // Column might not exist. Looping through rows ensures that undefined rows with column concept are not visited
          for(let row in categoriesMap) {
            const rowData = sheetCellData[row];
            let businessConceptId1 = categoriesMap[row];

            if(businessConceptId1.groups) {
              let newGroups = [];
              businessConceptId1.groups.forEach((group) => {
                if(!group.id) {
                  group.id = definedGroupsValuesMap[group.value];
                } else if(!group.value) {
                  group.value = definedGroupsIdsMap[group.id];
                } 

                newGroups.push(group);
              });

              businessConceptId1.groups = newGroups;
            }
            
            for(let column in attributesMap) {
              // Cell value might be rich text!
              const cellData = rowData[column];
              
              if(cellData) {
                const { value } = cellData;
                
                // Cell value might not exist even though concept pairs are defined
                // TODO : Convert rich text to plaintext
                // Value could be prepopulate
                if(value) {
                  let businessConceptId2 = attributesMap[column];

                  if(businessConceptId2.groups) {
                    let newGroups = [];
                    businessConceptId2.groups.forEach((group) => {
                      if(!group.id) {
                        group.id = definedGroupsValuesMap[group.value];
                      } else if(!group.value) {
                        group.value = definedGroupsIdsMap[group.id];
                      } 

                      newGroups.push(group);
                    });
      
                    businessConceptId2.groups = newGroups;
                  }
                  
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