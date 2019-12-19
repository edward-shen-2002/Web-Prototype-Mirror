import { ROUTE_ADMIN_EDIT_BUNDLES } from "../../../constants/rest";

// user can only edit template (non-read only cells), user notes, ...

const editBundles = ({ router, OrganizationBundleModel }) => {
  router.get(ROUTE_ADMIN_EDIT_BUNDLES, (req, res, next) => {
    OrganizationBundleModel.find({ phase: "edit" })
      .then((bundles) => {
        res.json({ data: { bundles } });
      })
      .catch(next);
  });
};

export default editBundles;