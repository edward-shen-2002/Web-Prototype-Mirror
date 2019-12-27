import { ROUTE_ADMIN_BUNDLES_WORKFLOW, HTTP_ERROR_NOT_FOUND } from "../../../constants/rest";
import { MESSAGE_ERROR_NOT_FOUND } from "../../../constants/messages";

// user can only edit template (non-read only cells), user notes, ...

const editBundles = ({ router, OrganizationBundleModel }) => {
  router.get(`${ROUTE_ADMIN_BUNDLES_WORKFLOW}/general`, (req, res, next) => {
    OrganizationBundleModel.find({ phase: "edit" })
      .select("_id name organization status phase")
      .then((bundles) => {
        res.json({ data: { bundles } });
      })
      .catch(next);
  });

  router.get(`${ROUTE_ADMIN_BUNDLES_WORKFLOW}/:_id`, (req, res, next) => {
    const { _id } = req.params;
    
    OrganizationBundleModel.findOne({ _id, phase: "edit" })
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
    const { bundle: { editorNotes } } = req.body;

    OrganizationBundleModel.findOneAndUpdate({ _id, phase: "edit" }, { editorNotes })
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
    const { bundle: { editorNotes } } = req.body;

    OrganizationBundleModel.findOneAndUpdate({ _id, phase: "edit" }, { editorNotes, phase: "review" })
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

    OrganizationBundleModel.findOne({ _id: bundleId, phase: "edit" })
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

export default editBundles;