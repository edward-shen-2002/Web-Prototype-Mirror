import { ROUTE_ADMIN_BUSINESS_CONCEPTS } from "../../../constants/rest";

import { 
  MESSAGE_SUCCESS_BUSINESS_CONCEPTS,
  MESSAGE_SUCCESS_BUSINESS_CONCEPTS_CREATE,
  MESSAGE_SUCCESS_BUSINESS_CONCEPTS_UPDATE, 
  MESSAGE_SUCCESS_BUSINESS_CONCEPTS_DELETE,
  MESSAGE_SUCCESS_BUSINESS_CONCEPTS_TEMPLATE 
} from "../../../constants/messages";

const businessConcepts = ({ router, BusinessConceptsModel }) => {
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

  router.post(`${ROUTE_ADMIN_BUSINESS_CONCEPTS}/import`, (req, res, next) => {
    const { businessConcepts } = req.body;

    // BusinessConceptsModel
  });
};

export default businessConcepts;