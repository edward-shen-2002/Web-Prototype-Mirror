import { ROUTE_DATA } from "../../constants/rest";
import { MESSAGE_SUCCESS_ORGANIZATIONS, MESSAGE_SUCCESS_SECTORS } from "../../constants/messages";

// Public data available for all registered users/
// ! These data do not contain sensitive information. Content is filtered.
const data = ({ router, OrganizationModel, SectorModel }) => {
  router.get(`${ROUTE_DATA}/organizations`, (_req, res, next) => {
    OrganizationModel.find({})
      .select("_id code name address")
      .then((organizations) => {
        res.json({ message: MESSAGE_SUCCESS_ORGANIZATIONS, data: { organizations } });
      })
      .catch(next);
  }); 

  router.get(`${ROUTE_DATA}/sectors`, (_req, res, next) => {
    SectorModel.find({})
      .select("_id name")
      .then((sectors) => {
        res.json({ msesage: MESSAGE_SUCCESS_SECTORS, data: { sectors } });
      })
      .catch(next);
  });
};

export default data;