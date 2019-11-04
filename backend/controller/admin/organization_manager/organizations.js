import { ROUTE_ADMIN_ORGANIZATIONS, ROUTE_RECONNECT } from "../../../constants/rest";

// import { ROLE_LEVEL_ADMIN, ROLE_LEVEL_LHIN } from "../../../constants/roles";

import { MESSAGE_SUCCESS_ORGANIZATIONS, MESSAGE_SUCCESS_SECTORS_UPDATE, MESSAGE_SUCCESS_SECTORS_DELETE, MESSAGE_SUCCESS_ORGANIZATIONS_CREATE } from "../../../constants/messages";

// TODO : Consider scope
const organizations = ({ router, OrganizationModel, SectorModel }) => {
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
  
  router.post(ROUTE_ADMIN_ORGANIZATIONS, (req, res, next) => {
    const { newOrganization } = req.body;

    OrganizationModel.create(newOrganization)
      .then((organization) => {
        res.json({ message: MESSAGE_SUCCESS_ORGANIZATIONS_CREATE, data: { organization } });
      })
      .catch((error) => console.error(error));
  });

  router.put(ROUTE_ADMIN_ORGANIZATIONS, (req, res, next) => {
    const { newOrganization } = req.body;

    const { _id } = newOrganization;

    OrganizationModel.findByIdAndUpdate(_id, newOrganization)
      .then(() => res.json({ message: MESSAGE_SUCCESS_SECTORS_UPDATE }))
      .catch(next);
  });

  // router.post();
  router.delete(`${ROUTE_ADMIN_ORGANIZATIONS}/:_id`, (req, res, next) => {
    const { _id } = req.params;

    OrganizationModel.findByIdAndRemove(_id)
      .then(() => res.json({ message: MESSAGE_SUCCESS_SECTORS_DELETE }))
      .catch(next);
  });
};

export default organizations;