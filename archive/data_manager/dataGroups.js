import { ROUTE_ADMIN_DATAGROUPS } from "../../../constants/rest";

import { MESSAGE_SUCCESS_DATAGROUPS } from "../../../constants/messages";

// TODO : Pagination
const datagroups = ({ router, DataGroupModel }) => {
  router.get(ROUTE_ADMIN_DATAGROUPS, (_req, res, next) => {
    DataGroupModel.find({})
      .then((dataGroups) => res.json({ message: MESSAGE_SUCCESS_DATAGROUPS, data: { dataGroups } }))
      .catch(next);
  });

  // Whenever we create a group, include id in response
  router.post(ROUTE_ADMIN_DATAGROUPS, async (req, res, next) => {
    const { groups } = req.body;

    // Overwrite everything?
    /**
     * TODO : Optimize
     * Possible solutions:
     * - remove ids not present in the groups then update the remaining ids with non-identical structures
     * - Overwrite - not too costly with minimal groups
     */
    try {
      const dataGroups = await DataGroupModel.find({});

      
    } catch(error) {
      console.error(error);
      next(error);
    }
  });
};

export default datagroups;