import { ROUTE_ADMIN_ORGANIZATIONS } from "../../../constants/rest";

// import { ROLE_LEVEL_ADMIN, ROLE_LEVEL_LHIN } from "../../../constants/roles";

import { MESSAGE_SUCCESS_ORGANIZATIONS, MESSAGE_SUCCESS_SECTORS, MESSAGE_SUCCESS_SECTORS_UPDATE } from "../../../constants/messages";


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

  router.put(ROUTE_ADMIN_ORGANIZATIONS, async (req, res, next) => {
    const { newOrganization } = req.body;

    const { _id } = newOrganization;
    
    try {
      OrganizationModel.findByIdAndUpdate(_id, newOrganization)
        .then(() => res.json({ message: MESSAGE_SUCCESS_SECTORS_UPDATE }))
        .catch(next);
    } catch(error) {
      next(error);
    }
  });

  // router.post();
  // router.delete();

  router.get(`${ROUTE_ADMIN_ORGANIZATIONS}/sectors`, (_req, res, next) => {
    SectorModel.find({})
      .then((sectors) => {
        sectors = sectors.map(({ _id, name }) => ({ sectorId: _id, name }));
        res.json({ message: MESSAGE_SUCCESS_SECTORS, data: { sectors } });
      })
      .catch(next);
  });
};

export default organizations;