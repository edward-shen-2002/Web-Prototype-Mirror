import { ROUTE_ADMIN_REVIEW_BUNDLES } from "../../../constants/rest";
import { HTTP_ERROR_NOT_FOUND } from "../../../constants/rest";

// Reviewers can only write review notes/comments, return to editor, or pass to approver (proceed workflow)
const reviewBundles = ({ router, OrganizationBundleModel }) => {
  router.get(`${ROUTE_ADMIN_REVIEW_BUNDLES}/general`, (req, res, next) => {
    OrganizationBundleModel.find({ phase: "review" })
      .select("_id name organization status phase")
      .then((bundles) => {
        res.json({ data: { bundles } });
      })
      .catch(next);
  });

  router.get(`${ROUTE_ADMIN_REVIEW_BUNDLES}/:_id`, (req, res, next) => {
    const { _id } = req.params;
    OrganizationBundleModel.find({ _id, phase: "review" })
      .then((bundle) => {
        if(bundle) {
          res.json({ data: { bundle } });
        } else {
          res.status(HTTP_ERROR_NOT_FOUND);
        }
      })
      .catch(next);
  });
};

export default reviewBundles;
