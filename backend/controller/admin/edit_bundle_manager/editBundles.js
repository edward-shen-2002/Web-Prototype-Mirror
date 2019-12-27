import { ROUTE_ADMIN_EDIT_BUNDLES, HTTP_ERROR_NOT_FOUND } from "../../../constants/rest";
import { MESSAGE_ERROR_NOT_FOUND } from "../../../constants/messages";

// user can only edit template (non-read only cells), user notes, ...

const editBundles = ({ router, OrganizationBundleModel }) => {
  router.get(`${ROUTE_ADMIN_EDIT_BUNDLES}/general`, (req, res, next) => {
    OrganizationBundleModel.find({ phase: "edit" })
      .select("_id name organization status phase")
      .then((bundles) => {
        res.json({ data: { bundles } });
      })
      .catch(next);
  });

  router.get(`${ROUTE_ADMIN_EDIT_BUNDLES}/:_id`, (req, res, next) => {
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
};

export default editBundles;