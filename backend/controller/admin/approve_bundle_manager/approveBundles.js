import { ROUTE_ADMIN_APPROVE_BUNDLES } from "../../../constants/rest";

const approveBundles = ({ router, OrganizationBundleModel }) => {
  router.get(`${ROUTE_ADMIN_APPROVE_BUNDLES}/general`, (req, res, next) => {
    OrganizationBundleModel.find({ phase: "approve" })
      .select("_id name organization status phase")
      .then((bundles) => {
        res.json({ data: { bundles } });
      })
      .catch(next);
  });
};

export default approveBundles;