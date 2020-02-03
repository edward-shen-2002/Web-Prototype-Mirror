import uniqid from "uniqid";

import pako from "pako";

import cloneDeep from "clone-deep";

import { ROUTE_ADMIN_BUNDLES, ROUTE_ADMIN_BUNDLES_WORKFLOW } from "../../../constants/rest";

import { 
  MESSAGE_SUCCESS_BUNDLES,
  MESSAGE_SUCCESS_BUNDLES_CREATE,
  MESSAGE_SUCCESS_BUNDLES_UPDATE, 
  MESSAGE_SUCCESS_BUNDLES_DELETE,
  MESSAGE_SUCCESS_BUNDLES_BUNDLE
} from "../../../constants/messages";

import { HTTP_ERROR_NOT_FOUND } from "../../../constants/rest";
import { MESSAGE_ERROR_NOT_FOUND } from "../../../constants/messages";
import { isObjectEmpty } from "../../../tools/misc";

const bundles = ({ 
  router, 
  BundleModel, 
  OrganizationBundleModel, 
  TemplateModel,
  OrganizationModel,
  MasterValueModel
}) => {
  router.get(ROUTE_ADMIN_BUNDLES, (req, res, next) => {
    BundleModel.find({})
      .then((bundles) => {
        res.json({ message: MESSAGE_SUCCESS_BUNDLES, data: { bundles } });
      })
      .catch(next);
  });
  
  router.post(ROUTE_ADMIN_BUNDLES, (req, res, next) => {
    let { newBundle } = req.body;

    if(!newBundle) newBundle = { 
      name: uniqid(),
      type: "",
      quarter: "Q1",
      year: new Date().getFullYear()
    };

    BundleModel.create(newBundle)
      .then((bundle) => {
        res.json({ message: MESSAGE_SUCCESS_BUNDLES_CREATE, data: { bundle } });
      })
      .catch(next);
  });
  
  router.put(ROUTE_ADMIN_BUNDLES, (req, res, next) => {
    const { newBundle } = req.body;

    const { _id } = newBundle;

    BundleModel.findByIdAndUpdate(_id, newBundle)
      .then(() => res.json({ message: MESSAGE_SUCCESS_BUNDLES_UPDATE }))
      .catch(next);
  });

  router.get(`${ROUTE_ADMIN_BUNDLES_WORKFLOW}/general`, (req, res, next) => {
    OrganizationBundleModel.find({ phase: "finished" })
      .then((bundles) => {
        res.json({ message: MESSAGE_SUCCESS_BUNDLES_BUNDLE, data: { bundles } });
      })
      .catch(next);
  });

  router.get(`${ROUTE_ADMIN_BUNDLES_WORKFLOW}/:_id`, (req, res, next) => {
    const { _id } = req.params;
    
    OrganizationBundleModel.findOne({ _id, phase: "finished" })
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

  router.put(`${ROUTE_ADMIN_BUNDLES_WORKFLOW}/:_id/return`, (req, res, next) => {
    const { _id } = req.params;

    OrganizationBundleModel.findOneAndUpdate({ _id, phase: "finished" }, { phase: "edit", status: "RETURNED" })
      .then((bundle) => {
        if(bundle) {
          res.end();
        } else {
          res.status(HTTP_ERROR_NOT_FOUND).json({ message: MESSAGE_ERROR_NOT_FOUND });
        }
      })
      .catch(next);
  });

  router.put(`${ROUTE_ADMIN_BUNDLES}/publish`, async (req, res, next) => {
    const { newBundle } = req.body;

    const { name, templates, sectors, organizations, year, quarter } = newBundle;

    const { _id: bundleId } = newBundle;

    try {
      await BundleModel.findByIdAndUpdate(bundleId, newBundle);

      let workbooksData = {
        workbooks: {},
        names: [],
        ids: []
      };

      const templatesCount = templates.length;
      for(let i = 0; i < templatesCount; i++) {
        const templateData = templates[i];
        const { _id: templateId, name } = templateData;
        // ! TODO ~ do prepopulation...

        workbooksData.workbooks[templateId] = (
          await TemplateModel.findById(templateId)
          .select("fileStates")
        ).fileStates;
        workbooksData.names.push(name);
        workbooksData.ids.push(templateId);
      }

      // Get organizations belonging to sector
      let sectorIds = sectors.map(({ _id }) => _id);
      let organizationIds = organizations.map(({ _id }) => _id);
      const combinedOrganizations = await OrganizationModel.find({ $or: [ { "sector.sectorId": { $in: sectorIds } }, { _id: { $in: organizationIds } } ] }).select("_id name");

      const combinedOrganizationsCount = combinedOrganizations.length;

      for(let i = 0; i < combinedOrganizationsCount; i++) {
        const organization = combinedOrganizations[i];
        const { _id: organizationId } = organization;
        const possibleDuplication = await OrganizationBundleModel.find({ "organization._id": organizationId, bundleId });

        const organizationWorkbooksData = cloneDeep(workbooksData);

        const { workbooks } = organizationWorkbooksData;
        for(let workbookId in workbooks) {
          const { workbookData } = workbooks[workbookId];
          
          for(let form in workbookData) {
            // ! Specific emplate data is still present here - not desired in bundle - will have to decompress and remove if needed
            const inflatedWorkbookData = JSON.parse(pako.inflate(workbookData[form], { to: "string" }));
            let { sheetCellData } = inflatedWorkbookData;

            for(let row in sheetCellData) {
              const columns = sheetCellData[row];
  
              for(let column in columns) {
                const { type, value } = columns[column];

                if(type === "prepopulate" && value) {
                  const groups = value.substring(1).split("&");
  
                  // ! Validation?
                  let {
                    type,
                    year,
                    quarter
                  } = groups.reduce((acc, cur) => {
                    const [ group, value ] = cur.split("=");
  
                    if(group && value !== undefined) acc[group] = value;
  
                    return acc;
                  }, {});
  
                  let attribute;
                  let category;
  
                  if(sheetCellData[1] && sheetCellData[1][column]) {
                    const { type, value } = sheetCellData[1][column];
  
                    if(type === "normal") attribute = value;
                  }
  
                  if(sheetCellData[row] && sheetCellData[row][1]) {
                    const { type, value } = sheetCellData[row][1];
  
                    if(type === "normal") category = value;
                  }
  
                  if(
                    organizationId 
                    && type 
                    && year 
                    && quarter 
                    && form 
                    && attribute 
                    && category
                  ) {
                    // Search database
  
                    // successful search => continue and skip fallback
                    const masterValue = await MasterValueModel.findOne({ organizationId, type, year, quarter, form })
                      .or([
                        { 
                          businessConceptId1: attribute, 
                          businessConceptId2: category
                        },
                        {
                          businessConceptId1: category, 
                          businessConceptId2: attribute
                        }
                      ]);
  
                    if(masterValue) {
                      sheetCellData[row][column] = { 
                        ...sheetCellData[row][column], 
                        value: masterValue.value, 
                        type: "normal" 
                      };
  
                      continue;
                    }
                  } 
  
                  // Fallback area in case something is not right
                  delete sheetCellData[row][column].value;
                  delete sheetCellData[row][column].type;
      
                  if(isObjectEmpty(sheetCellData[row][column])) delete sheetCellData[row][column];
                  if(isObjectEmpty(sheetCellData[row])) delete sheetCellData[row];
                }
              }
            }

            inflatedWorkbookData.sheetCellData = sheetCellData;
  
            workbookData[form] = pako.deflate(JSON.stringify(inflatedWorkbookData), { to: "string" });
          }
        }
        if(possibleDuplication.length) {
          await OrganizationBundleModel.findOneAndUpdate(
            { 
              bundleId,
              "organization._id": organizationId
            }, 
            {
              name, 
              // ! Removed for now since user data may be lost!
              workbooksData: possibleDuplication.workbooksData ? undefined : organizationWorkbooksData, 
              organization,
              year,
              quarter
            }
          );
        } else {
          await OrganizationBundleModel.create({ 
            bundleId,
            name, 
            workbooksData: organizationWorkbooksData, 
            organization,
            year,
            quarter
          });
        }
      }

      res.json({ message: MESSAGE_SUCCESS_BUNDLES_UPDATE });
    } catch(error) {
      next(error);
    }
  });

  router.delete(`${ROUTE_ADMIN_BUNDLES}/:_id`, async (req, res, next) => {
    const { _id } = req.params;

    try {
      await BundleModel.findByIdAndRemove(_id);

      // !change to delete one
      await OrganizationBundleModel.deleteMany({ bundleId: _id });
      res.json({ message: MESSAGE_SUCCESS_BUNDLES_DELETE });
    } catch(error) {
      next(error);
    }
  });

  router.get(`${ROUTE_ADMIN_BUNDLES}/:_id`, (req, res, next) => {
    const { _id } = req.params;

    BundleModel.findById(_id)
      .select("-workbooksData.workbooks")
      .then((bundle) => {
        res.json({ message: MESSAGE_SUCCESS_BUNDLES_BUNDLE, data: { bundle } });
      })
      .catch(next);
  });

  // https://docs.mongodb.com/manual/reference/operator/update/addToSet/
  // ! Currently overwrites the values of ids
  router.post(`${ROUTE_ADMIN_BUNDLES}/import`, (req, res, next) => {
    const { bundles } = req.body;

    let operations = [];

    for(let id in bundles) {
      const value = bundles[id];
      operations.push({
        updateOne: {
          filter: { id },
          update: { id, value },
          upsert: true
        }
      });
    }

    BundleModel.bulkWrite(operations)
      .then(() => {
        res.json({ message: MESSAGE_SUCCESS_BUNDLES_UPDATE });
      })
      .catch(next);
  });

  router.get(`${ROUTE_ADMIN_BUNDLES_WORKFLOW}/:bundleId/workbook/:workbookId`, (req, res, next) => {
    const { bundleId, workbookId } = req.params;

    OrganizationBundleModel.findOne({ _id: bundleId, phase: null })
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
          phase: null, 
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

export default bundles;