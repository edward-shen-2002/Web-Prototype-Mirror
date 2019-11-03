import { isValidMongooseObjectId } from "../../../tools/misc";

import { ROUTE_ADMIN_SECTORS, HTTP_ERROR_NOT_FOUND, HTTP_ERROR_DATABASE } from "../../../constants/rest";
import { MESSAGE_SUCCESS_SECTORS, MESSAGE_SUCCESS_SECTORS_CREATE, MESSAGE_SUCCESS_SECTORS_UPDATE, MESSAGE_SUCCESS_SECTORS_DELETE, MESSAGE_ERROR_ROLE_UNAUTHORIZED, MESSAGE_ERROR_CONFLICT_SECTOR } from "../../../constants/messages";
import { ROLE_LEVEL_ADMIN, ROLE_LEVEL_SECTOR } from "../../../constants/roles";

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
        res.status(HTTP_ERROR_DATABASE).json({ message: MESSAGE_ERROR_CONFLICT_SECTOR });
      } else {
        try {
          await SectorModel.create({ name });
  
          res.json({ message: MESSAGE_SUCCESS_SECTORS_CREATE });
        } catch(error) {
          next(error);
        }
      }
    } else {
      res.status(HTTP_ERROR_UNAUTHORIZED).json({ message: MESSAGE_ERROR_ROLE_UNAUTHORIZED });
    }
  });

  router.put(ROUTE_ADMIN_SECTORS, async (req, res, next) => {
    const { roleData } = res.locals;
    const { scope } = roleData;

    if(scope === ROLE_LEVEL_ADMIN) {
      const { oldSector, newSector } = req.body;

      const { _id } = oldSector;
      const { name } = newSector;

      try {
        const existingSector = await SectorModel.findById(_id);

        if(existingSector) {
          existingSector.name = name;

          await existingSector.save();
          
          res.json({ message: MESSAGE_SUCCESS_SECTORS_UPDATE });
        } else {
          res.status(HTTP_ERROR_NOT_FOUND).json({ message: MESSAGE_ERROR_NOT_FOUND });
        }
      } catch(error) {
        next(error);
      }
    } else {
      res.status(HTTP_ERROR_UNAUTHORIZED).json({ message: MESSAGE_ERROR_ROLE_UNAUTHORIZED });
    }
  });

  router.delete(`${ROUTE_ADMIN_SECTORS}/:_id`, (req, res, next) => {
    const { roleData } = res.locals;
    const { scope, sectors } = roleData;
    const { _id } = req.params;

    if(!isValidMongooseObjectId) return res.status(HTTP_ERROR_NOT_FOUND).json({ message: MESSAGE_ERROR_NOT_FOUND });

    if(scope === ROLE_LEVEL_ADMIN || (scope === ROLE_LEVEL_SECTOR && sectors.includes(_id))) {
      SectorModel.findByIdAndRemove(_id)
        .then(() => res.json({ message: MESSAGE_SUCCESS_SECTORS_DELETE }))
        .catch(next);
    } else {
      res.status(HTTP_ERROR_UNAUTHORIZED).json({ message: MESSAGE_ERROR_ROLE_UNAUTHORIZED });
    }
  });
};

export default sectors;
