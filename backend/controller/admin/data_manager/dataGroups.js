import { ROUTE_ADMIN_DATAGROUPS } from "../../../constants/rest";

import { MESSAGE_SUCCESS_DATAGROUPS } from "../../../constants/messages";

// TODO : Pagination
const datagroups = ({ router, DataGroupModel }) => {
  router.get(ROUTE_ADMIN_DATAGROUPS, (_req, res, next) => {
    DataGroupModel.find({})
      .then((dataGroups) => res.json({ message: MESSAGE_SUCCESS_DATAGROUPS, data: { dataGroups } }))
      .catch(next);
  });

  router.post(ROUTE_ADMIN_DATAGROUPS, (req, res, next) => {
    
  });
};

export default datagroups;