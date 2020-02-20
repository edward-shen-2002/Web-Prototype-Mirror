import { ROUTE_DATA } from "../../constants/rest";
import { 
  MESSAGE_SUCCESS_ORGANIZATIONS, 
  MESSAGE_SUCCESS_SECTORS, 
  MESSAGE_SUCCESS_TEMPLATES, 
  MESSAGE_SUCCESS_BUSINESS_CONCEPTS
} from "../../constants/messages";

// Public data available for all registered users/
// ! These data do not contain sensitive information. Content is filtered.
const data = ({ 
  router, 
  OrganizationModel, 
  BusinessConceptModel,
  GroupModel,
  SectorModel,
  TemplateModel
}) => {
  router.get(`${ROUTE_DATA}/groups`, (_req, res, next) => {
    GroupModel.find({})
      .select("_id id value")
      .then((groups) => {
        res.json({ data: { groups } });
      })
      .catch(next);
  }); 

  router.get(`${ROUTE_DATA}/organizations`, (_req, res, next) => {
    OrganizationModel.find({})
      .select("_id code name address")
      .then((organizations) => {
        res.json({ message: MESSAGE_SUCCESS_ORGANIZATIONS, data: { organizations } });
      })
      .catch(next);
  }); 

  router.get(`${ROUTE_DATA}/sectors`, (_req, res, next) => {
    SectorModel.find({})
      .select("_id name")
      .then((sectors) => {
        res.json({ msesage: MESSAGE_SUCCESS_SECTORS, data: { sectors } });
      })
      .catch(next);
  });

  router.get(`${ROUTE_DATA}/templates`, (_req, res, next) => {
    TemplateModel.find({ published: true })
      .select("_id name")
      .then((templates) => {
        res.json({ message: MESSAGE_SUCCESS_TEMPLATES, data: { templates } });
      })
      .catch(next);
  });

  router.get(`${ROUTE_DATA}/business_concepts`, (_req, res, next) => {
    BusinessConceptModel.find({})
      .select("_id id value")
      .then((businessConcepts) => {
        res.json({ message: MESSAGE_SUCCESS_BUSINESS_CONCEPTS, data: { businessConcepts } });
      })
      .catch(next);
  });
};

export default data;