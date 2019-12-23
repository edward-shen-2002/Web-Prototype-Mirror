import { ROUTE_ADMIN_EDIT_BUNDLES } from "../../../constants/rest";

// user can only edit template (non-read only cells), user notes, ...

const editBundles = ({ router, OrganizationBundleModel }) => {
  router.get(`${ROUTE_ADMIN_EDIT_BUNDLES}/general`, (req, res, next) => {
    OrganizationBundleModel.find({ phase: "edit" })
      .select("_id name organization status phase")
      .then((bundles) => {
        console.log("edit",bundles.length)
        res.json({ data: { bundles } });
      })
      .catch(next);
  });
};

export default editBundles;