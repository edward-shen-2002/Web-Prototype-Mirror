import { ROUTE_ADMIN_GROUPS } from "../../../constants/rest";

import { 
  MESSAGE_SUCCESS_GROUPS,
  MESSAGE_SUCCESS_GROUPS_CREATE,
  MESSAGE_SUCCESS_GROUPS_UPDATE, 
  MESSAGE_SUCCESS_GROUPS_DELETE
} from "../../../constants/messages";

const groups = ({ router, GroupModel }) => {
  router.get(ROUTE_ADMIN_GROUPS, (_req, res, next) => {
    GroupModel.find({})
      .then((groups) => {
        res.json({ message: MESSAGE_SUCCESS_GROUPS, data: { groups } });
      })
      .catch(next);
  });
  
  router.post(ROUTE_ADMIN_GROUPS, (req, res, next) => {
    const { newGroup } = req.body;

    GroupModel.create(newGroup)
      .then((group) => {
        res.json({ message: MESSAGE_SUCCESS_GROUPS_CREATE, data: { group } });
      })
      .catch(next);
  });
  
  router.put(ROUTE_ADMIN_GROUPS, (req, res, next) => {
    const { newGroup } = req.body;

    const { _id } = newGroup;

    GroupModel.findByIdAndUpdate(_id, newGroup)
      .then(() => res.json({ message: MESSAGE_SUCCESS_GROUPS_UPDATE }))
      .catch(next);
  });

  router.delete(`${ROUTE_ADMIN_GROUPS}/:_id`, (req, res, next) => {
    const { _id } = req.params;

    GroupModel.findByIdAndRemove(_id)
      .then(() => res.json({ message: MESSAGE_SUCCESS_GROUPS_DELETE }))
      .catch(next);
  });

  // https://docs.mongodb.com/manual/reference/operator/update/addToSet/
  // ! Currently overwrites the values of ids
  router.post(`${ROUTE_ADMIN_GROUPS}/import`, (req, res, next) => {
    const { groups } = req.body;

    let operations = [];

    for(let id in groups) {
      const value = groups[id];
      operations.push({
        updateOne: {
          filter: { id },
          update: { id, value },
          upsert: true
        }
      });
    }

    GroupModel.bulkWrite(operations)
      .then(() => {
        res.json({ message: MESSAGE_SUCCESS_GROUPS_UPDATE });
      })
      .catch(next);
  });
};

export default groups;