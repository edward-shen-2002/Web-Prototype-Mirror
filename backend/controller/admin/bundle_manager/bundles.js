import uniqid from "uniqid";

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

const bundles = ({ 
  router, 
  BundleModel, 
  OrganizationBundleModel, 
  TemplateModel,
  OrganizationModel
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
    OrganizationBundleModel.find({ phase: undefined })
      .then((bundles) => {
        res.json({ message: MESSAGE_SUCCESS_BUNDLES_BUNDLE, data: { bundles } });
      })
      .catch(next);
  });

  router.get(`${ROUTE_ADMIN_BUNDLES_WORKFLOW}/:_id`, (req, res, next) => {
    const { _id } = req.params;
    
    OrganizationBundleModel.findOne({ _id, phase: undefined })
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

    OrganizationBundleModel.findOneAndUpdate({ _id, phase: null }, { phase: "edit", status: "RETURNED" })
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
        // ! Specific emplate data is still present here - not desired in bundle - will have to decompress and remove if needed
        workbooksData.workbooks[templateId] = (
          await TemplateModel.findById(templateId)
            .select("-published")
        );
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

        if(possibleDuplication.length) {
          await OrganizationBundleModel.findOneAndUpdate({ 
              bundleId
            }, 
            {
              name, 
              // ! Removed for now since user data may be lost!
              workbooksData: possibleDuplication.workbooksData ? undefined : workbooksData, 
              organization,
              year,
              quarter
            });
        } else {
          await OrganizationBundleModel.create({ 
            bundleId,
            name, 
            workbooksData, 
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
};

export default bundles;