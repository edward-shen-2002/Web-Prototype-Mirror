import { ROUTE_DATA } from "../../constants/rest";
import { 
  MESSAGE_SUCCESS_ORGANIZATIONS, 
  MESSAGE_SUCCESS_SECTORS, 
  MESSAGE_SUCCESS_TEMPLATES, 
  MESSAGE_SUCCESS_BUSINESS_CONCEPTS
} from "../../constants/messages";
const fs = require('fs');

// Public data available for all registered users/
// ! These data do not contain sensitive information. Content is filtered.
const data = ({ 
  router, 
  OrganizationModel,
  OrganizationGroupModel,
  SubmissionModel,
  ProgramModel,
  BusinessConceptModel,
  SectorModel,
  TemplateModel
}) => {
  router.get(`${ROUTE_DATA}/organizations`, (_req, res, next) => {
    OrganizationModel.find({})
      .select("_id code name address")
      .then((organizations) => {
        fs.writeFile("getOrg.txt", organizations, function(err) {
          if (err) {
            console.log(err);
          }
        });
        res.json({ message: MESSAGE_SUCCESS_ORGANIZATIONS, data: { organizations } });
      })
      .catch(next);
  });

  router.get(`${ROUTE_DATA}/organizations/:organizationGroup`, (_req, res, next) => {

    const { organizationGroup } = _req.params

    OrganizationModel.find({organizationGroup})
      .select("_id code name address contact organizationGroup")
      .then((organizations) => {
        fs.writeFile("getOrg.txt", organizations, function(err) {
          if (err) {
            console.log(err);
          }
        });
        res.json({ message: MESSAGE_SUCCESS_ORGANIZATIONS, data: { organizations } });
      })
      .catch(next);
  });

  router.get(`${ROUTE_DATA}/organizations/information/:code`, (_req, res, next) => {

    const { code } = _req.params
    console.log(code);

    OrganizationModel.find({code})
      .select("_id name address contact organizationGroup")
      .then((organizations) => {
        res.json({ message: MESSAGE_SUCCESS_ORGANIZATIONS, data: { organizations } });
      })
      .catch(next);
  });

  router.get(`${ROUTE_DATA}/programs/:organization`, (_req, res, next) => {

    const { organization } = _req.params
    ProgramModel.find({organization})
      .select("name submission shortName")
      .then((programs) => {
        fs.writeFile("orgChange(get program).txt", programs, function(err) {
          if (err) {
            console.log(err);
          }
        });
        res.json({ message: MESSAGE_SUCCESS_ORGANIZATIONS, data: { programs } });
      })
      .catch(next);
  });

  router.post(`${ROUTE_DATA}/submissions/`, (_req, res, next) => {

    const { programList } = _req.body;
    console.log(programList);
    SubmissionModel.find({program: {$in: programList}})
      .select("shortName program ApproveAvailable ReviewAvailable SubmitAvailable InputAvailable ViewAvailable ViewCognosAvailable")
      .then((submissions) => {
        fs.writeFile("programChange(get submissions).txt", submissions, function(err) {
          if (err) {
            console.log(err);
          }
        });
        res.json({ message: MESSAGE_SUCCESS_ORGANIZATIONS, data: { submissions } });
      })
      .catch(next);

  });

  router.get(`${ROUTE_DATA}/sectors`, (_req, res, next) => {
    SectorModel.find({})
      .select("_id name")
      .then((sectors) => {
        res.json({ message: MESSAGE_SUCCESS_SECTORS, data: { sectors } });
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
      .select("id value")
      .then((businessConcepts) => {
        res.json({ message: MESSAGE_SUCCESS_BUSINESS_CONCEPTS, data: { businessConcepts } });
      })
      .catch(next);
  });
};

export default data;