import { ROUTE_ADMIN_BUNDLES_WORKFLOW } from "../../../constants/rest";
import { HTTP_ERROR_NOT_FOUND } from "../../../constants/rest";
import { MESSAGE_ERROR_NOT_FOUND } from "../../../constants/messages";

// Reviewers can only write review notes/comments, return to editor, or pass to approver (proceed workflow)
const reviewBundles = ({ router, OrganizationBundleModel }) => {
  router.get(`${ROUTE_ADMIN_BUNDLES_WORKFLOW}/general`, (req, res, next) => {
    OrganizationBundleModel.find({ phase: "review" })
      .select("_id name organization status phase")
      .then((bundles) => {
        res.json({ data: { bundles } });
      })
      .catch(next);
  });

  router.get(`${ROUTE_ADMIN_BUNDLES_WORKFLOW}/:_id`, (req, res, next) => {
    const { _id } = req.params;
    
    OrganizationBundleModel.findOne({ _id, phase: "review" })
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
    const { bundle: { reviewerNotes } } = req.body;

    OrganizationBundleModel.findOneAndUpdate({ _id, phase: "review" }, { reviewerNotes })
      .then((bundle) => {
        if(bundle) {
          res.end();
        } else {
          res.status(HTTP_ERROR_NOT_FOUND).json({ message: MESSAGE_ERROR_NOT_FOUND });
        }
      })
      .catch(next);
  });

  router.put(`${ROUTE_ADMIN_BUNDLES_WORKFLOW}/:_id/return`, (req, res, next) => {
    const { _id } = req.params;
    const { bundle: { reviewerNotes } } = req.body;

    OrganizationBundleModel.findOneAndUpdate({ _id, phase: "review" }, { reviewerNotes, phase: "edit", status: "RETURNED" })
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
    const { bundle: { reviewerNotes } } = req.body;

    OrganizationBundleModel.findOneAndUpdate({ _id, phase: "review" }, { reviewerNotes, phase: "approve" })
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

    OrganizationBundleModel.findOne({ _id: bundleId, phase: "review" })
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

export default reviewBundles;
