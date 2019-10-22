import { 
  ROUTE_ADMIN_DATAGROUPS, 
  ROUTE_ADMIN_DATAGROUPS_CREATE,

  HTTP_ERROR_DATABASE, 

  MESSAGE_ERROR_DATABASE 
} from "../../../constants/rest";

// TODO : Pagination
const datagroups = ({ router, DataGroupModel }) => {
  router.post(ROUTE_ADMIN_DATAGROUPS, (_req, res) => {
    DataGroupModel.find({})
      .then((dataGroups) => res.json({ message: MESSAGE_SUCCESS_USERS, data: { dataGroups } }))
      .catch((error) => res.status(HTTP_ERROR_DATABASE).json({ message: MESSAGE_ERROR_DATABASE, error }));
  });

  // router.post(ROUTE_ADMIN_DATAGROUPS_CREATE)
};

export default datagroups;