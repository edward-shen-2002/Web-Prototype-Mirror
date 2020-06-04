import {ROUTE_DATA, ROUTE_REGISTER, ROUTE_VERFICATION} from "../../constants/rest";
import {
  MESSAGE_SUCCESS_ORGANIZATIONS,
  MESSAGE_SUCCESS_SECTORS,
  MESSAGE_SUCCESS_TEMPLATES,
  MESSAGE_SUCCESS_BUSINESS_CONCEPTS, MESSAGE_SUCCESS_VERIFICATION
} from "../../constants/messages";
import {sendUserActiveEmail, sendUserRejectEmail} from "../../setup/mail";

// Public data available for all registered users/
// ! These data do not contain sensitive information. Content is filtered.
const data = ({ 
  router, 
  OrganizationModel,
  OrganizationGroupModel,
  AppSysModel,
  TemplateTypeModel,
  ProgramModel,
  BusinessConceptModel,
  SectorModel,
  UserModel,
  TemplateModel
}) => {
  router.get(`${ROUTE_VERFICATION}/admin`, async (req, res, next) => {
    const { approve, _id, hashedUsername, orgId } = req.query;
    console.log(approve);
    let checkActive = true;
    try {
      await UserModel.findOne({ _id})
        .then((user) => {
          console.log(approve);
          if(approve == "true"){
            console.log(approve);
            user.sysRole.forEach(sysRole => {
              sysRole.org.forEach(org =>{
                if(org.orgId == orgId) org.IsActive = true;
                checkActive = checkActive&&org.IsActive;
              })
              console.log(sysRole);
            })
            if(checkActive) {
              sendUserActiveEmail(user)
                .catch(next);
            }
            UserModel.findOneAndUpdate({_id}, {sysRole: user.sysRole})
              .then((model) => {
                console.log(model.sysRole[0].org);
              })
              .catch(next);
            res.json({ message: "You have approved the user. The user will active the account by email."});
          }
          else{
            sendUserRejectEmail(user)
              .catch(next);
            res.json({ message: "You have rejected the user. The user will be notified by email."});
          }

        })
        .catch(next);
    } catch(error) {
      next(error);
    }
  });

  router.get(`${ROUTE_VERFICATION}/user`, async (req, res, next) => {
    const { _id, hashedUsername} = req.query;
    console.log(_id);
    try {
      await UserModel.findOne({ _id})
        .then((model) => {
          console.log(model);
        })
        .catch(next);
      await UserModel.findOneAndUpdate({ _id}, {IsActive: true})
        .then((model) => {
          console.log(model);
          res.json({ message: "The account active"});
        })
        .catch(next);
    } catch(error) {
      next(error);
    }
  });

  router.get(`${ROUTE_DATA}/organizations/:organizationGroup`, (_req, res, next) => {
    const { organizationGroup } = _req.params;
    OrganizationModel.find({organizationGroupId: organizationGroup})
      .select("_id id name programId authorizedPerson")
      .then((organizations) => {
        res.json({ message: MESSAGE_SUCCESS_ORGANIZATIONS, data: { organizations } });
      })
      .catch(next);
  //   OrganizationModel.find({organizationGroupId: organizationGroup})
  //     .select("_id id name programId authorizedPerson")
  //     .then((organizations) => {
  //       console.log(organizations);
  //       res.json({ message: MESSAGE_SUCCESS_ORGANIZATIONS, data: { organizations } });
  //     })
  //     .catch(next);
   });

  // router.get(`${ROUTE_DATA}/organizations/information/:code`, (_req, res, next) => {
  //
  //   const { code } = _req.params
  //
  //   OrganizationModel.find({code})
  //     .select("_id name address contact organizationGroup")
  //     .then((organizations) => {
  //       res.json({ message: MESSAGE_SUCCESS_ORGANIZATIONS, data: { organizations } });
  //     })
  //     .catch(next);
  // });

  // router.get(`${ROUTE_DATA}/programs/:organization`, (_req, res, next) => {
  //
  //   const { organization } = _req.params
  //   ProgramModel.find({organization})
  //     .select("name submission shortName")
  //     .then((programs) => {
  //       fs.writeFile("orgChange(get program).txt", programs, function(err) {
  //         if (err) {
  //           console.log(err);
  //         }
  //       });
  //       res.json({ message: MESSAGE_SUCCESS_ORGANIZATIONS, data: { programs } });
  //     })
  //     .catch(next);
  // });

  router.post(`${ROUTE_DATA}/programs/`, (_req, res, next) => {

    const { programId } = _req.body;
    ProgramModel.find({_id: {$in: programId}}, {isActive: true})
      .select("_id name code")
      .then((programs) => {
        res.json({ message: MESSAGE_SUCCESS_ORGANIZATIONS, data: { programs } });
      })
      .catch(next);
  });

  router.post(`${ROUTE_DATA}/templateType/`, (_req, res, next) => {

    const { programList } = _req.body;
    TemplateTypeModel.find({programId: {$in: programList}})
      .select("_id name programId isApprovable isReviewable isSubmittable isInputtable isViweable isReportable")
      .then((templateTypes) => {
        res.json({ message: MESSAGE_SUCCESS_ORGANIZATIONS, data: { templateTypes } });
      })
      .catch(next);

  });

  router.post(`${ROUTE_DATA}/checkUserDup}`,(_req, res, next) => {

    const { userAndEmail } = _req.body;
    UserModel.find({ $or: [ { username: userAndEmail.username }, { email: userAndEmail.email}]})
      .then((user) => {
         res.json({ data: {user}})
      })
  })

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

  router.get(`${ROUTE_DATA}/organizationGroups`, (_req, res, next) => {
    OrganizationGroupModel.find({isActive: true})
      .select("_id name")
      .then((organizationGroups) => {
        res.json({ message: MESSAGE_SUCCESS_BUSINESS_CONCEPTS, data: { organizationGroups } });
      })
      .catch(next);
  });

  router.get(`${ROUTE_DATA}/appSys`, (_req, res, next) => {
    AppSysModel.find({})
      .select("_id code name")
      .then((appSys) => {
        res.json({ message: MESSAGE_SUCCESS_BUSINESS_CONCEPTS, data: { appSys } });
      })
      .catch(next);
  });
};

export default data;