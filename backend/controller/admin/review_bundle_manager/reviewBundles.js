import { ROUTE_ADMIN_REVIEW_BUNDLES } from "../../../constants/rest";
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
};

export default reviewBundles;