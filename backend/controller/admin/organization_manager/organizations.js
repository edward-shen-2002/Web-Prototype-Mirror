import { ROUTE_ADMIN_ORGANIZATIONS } from "../../../constants/rest";

// import { ROLE_LEVEL_ADMIN, ROLE_LEVEL_LHIN } from "../../../constants/roles";

import { MESSAGE_SUCCESS_ORGANIZATIONS } from "../../../constants/messages";


const organizations = ({ router, OrganizationModel }) => {
  router.get(ROUTE_ADMIN_ORGANIZATIONS, (_req, res, next) => {
    const { filter } = res.locals;

    if(filter) {
      OrganizationModel.find(filter)
        .then((organizations) => res.json({ message: MESSAGE_SUCCESS_ORGANIZATIONS, data: { organizations } }))
        .catch(next);
    } else {
      res.json({ message: MESSAGE_SUCCESS_ORGANIZATIONS, data: { organizations: [] } });
    }
  });

  router.put(ROUTE_ADMIN_ORGANIZATIONS, (req, res, next) => {

  });

  // router.post();
  // router.delete();
};

export default organizations;