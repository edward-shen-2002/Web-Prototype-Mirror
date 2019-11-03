import { ROUTE_ADMIN_SECTORS, HTTP_ERROR_NOT_FOUND, HTTP_ERROR_DATABASE } from "../../../constants/rest";
import { MESSAGE_SUCCESS_SECTORS, MESSAGE_SUCCESS_ORGANIZATIONS_CREATE, MESSAGE_ERROR_ROLE_UNAUTHORIZED, MESSAGE_ERROR_CONFLICT_SECTOR } from "../../../constants/messages";
import { ROLE_LEVEL_ADMIN } from "../../../constants/roles";

const sectors = ({ router, SectorModel }) => {
  router.get(ROUTE_ADMIN_SECTORS, (req, res, next) => {
    const { filter } = res.locals;

    if(filter) {
      SectorModel.find(filter)
        .then((sectors) => res.json({ message: MESSAGE_SUCCESS_SECTORS, data: { sectors } }))
        .catch(next);
    } else {
      res.json({ message: MESSAGE_SUCCESS_SECTORS, data: { organizations: [] } });
    }
  });

  router.post(ROUTE_ADMIN_SECTORS, async (req, res, next) => {
    const { roleData } = res.locals;
    const { scope } = roleData;

    if(scope === ROLE_LEVEL_ADMIN) {
      const { name } = req.body;

      const existingSector = await SectorModel.findOne({ name });

      if(existingSector) {
        res.status(HTTP_ERROR_DATABASE).json({ message: MESSAGE_ERROR_CONFLICT_SECTOR })
      } else {
        await SectorModel.create({ name });

        res.json({ message: MESSAGE_SUCCESS_ORGANIZATIONS_CREATE });
      }
    } else {
      res.status(HTTP_ERROR_NOT_FOUND).json({ message: MESSAGE_ERROR_ROLE_UNAUTHORIZED });
    }
  });
};

export default sectors;
