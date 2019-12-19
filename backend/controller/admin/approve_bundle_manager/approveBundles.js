import { ROUTE_ADMIN_APPROVE_BUNDLES } from "../../../constants/rest";

const approveBundles = ({ router, OrganizationBundleModel }) => {
  router.get(ROUTE_ADMIN_APPROVE_BUNDLES, (req, res, next) => {
    OrganizationBundleModel.find({ phase: "approve" })
      .then((bundles) => {
        res.json({ data: { bundles } });
      })
      .catch(next);
  });
};

export default approveBundles;