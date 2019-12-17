import { ROUTE_ADMIN_BUSINESS_CONCEPTS, ROUTE_GROUP_ADMIN_TEMPLATE } from "../../../constants/rest";

import { 
  MESSAGE_SUCCESS_BUSINESS_CONCEPTS,
  MESSAGE_SUCCESS_BUSINESS_CONCEPTS_CREATE,
  MESSAGE_SUCCESS_BUSINESS_CONCEPTS_UPDATE, 
  MESSAGE_SUCCESS_BUSINESS_CONCEPTS_DELETE,
  MESSAGE_SUCCESS_BUSINESS_CONCEPTS_TEMPLATE 
} from "../../../constants/messages";

const businessConcepts = ({ router, BusinessConceptModel }) => {
  router.get(ROUTE_ADMIN_BUSINESS_CONCEPTS, (req, res, next) => {
    BusinessConceptModel.find({})
      .then((businessConcepts) => {
        res.json({ message: MESSAGE_SUCCESS_BUSINESS_CONCEPTS, data: { businessConcepts } });
      })
      .catch(next);
  });
  
  router.post(ROUTE_ADMIN_BUSINESS_CONCEPTS, (req, res, next) => {
    res.end();
  });
  
  router.put(ROUTE_ADMIN_BUSINESS_CONCEPTS, (req, res, next) => {
    res.end();
  });

  router.delete(ROUTE_ADMIN_BUSINESS_CONCEPTS, (req, res, next) => {
    res.end();
  });

  // https://docs.mongodb.com/manual/reference/operator/update/addToSet/
  // ! Currently overwrites the values of ids
  router.post(`${ROUTE_ADMIN_BUSINESS_CONCEPTS}/import`, (req, res, next) => {
    const { businessConcepts } = req.body;

    let operations = [];

    for(let id in businessConcepts) {
      const value = businessConcepts[id];
      operations.push({
        updateOne: {
          filter: { id },
          update: { id, value },
          upsert: true
        }
      });
    }

    BusinessConceptModel.bulkWrite(operations)
      .then(() => {
        res.json({ message: MESSAGE_SUCCESS_BUSINESS_CONCEPTS_UPDATE });
      })
      .catch(next);
  });
};

export default businessConcepts;