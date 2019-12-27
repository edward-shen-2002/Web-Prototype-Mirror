import { ROUTE_ADMIN_BUNDLES } from "../../../constants/rest";

const approveBundles = ({ router, OrganizationBundleModel }) => {
  router.get(`${ROUTE_ADMIN_BUNDLES}/general`, (req, res, next) => {
    OrganizationBundleModel.find({ phase: "approve" })
      .select("_id name organization status phase")
      .then((bundles) => {
        res.json({ data: { bundles } });
      })
      .catch(next);
  });

  router.get(`${ROUTE_ADMIN_BUNDLES}/:_id`, (req, res, next) => {
    const { _id } = req.params;
    OrganizationBundleModel.find({ _id, phase: "approve" })
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

export default approveBundles;