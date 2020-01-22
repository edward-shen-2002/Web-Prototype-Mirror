import { ROUTE_ADMIN_BUNDLES_WORKFLOW } from "../../../constants/rest";
import { HTTP_ERROR_NOT_FOUND } from "../../../constants/rest";
import { MESSAGE_ERROR_NOT_FOUND } from "../../../constants/messages";

const approveBundles = ({ 
  router, 
  OrganizationBundleModel,
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

  router.put(`${ROUTE_ADMIN_BUNDLES_WORKFLOW}/:_id/submit`, (req, res, next) => {
    const { _id } = req.params;
    const { bundle: { approverNotes } } = req.body;

    OrganizationBundleModel.findOneAndUpdate({ _id, phase: "approve" }, { approverNotes, phase: "finished", status: "APPROVED" })
      .then((bundle) => {
        if(bundle) {
          // ! Populate master table !
          


          res.end();
        } else {
          res.status(HTTP_ERROR_NOT_FOUND).json({ message: MESSAGE_ERROR_NOT_FOUND });
        }
      })
      .catch(next);
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