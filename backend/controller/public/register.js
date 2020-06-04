import { PASSPORT_REGISTER } from "../../constants/passport";
import {ROUTE_REGISTER, HTTP_ERROR_CONFLICT, ROUTE_DATA, ROUTE_VERFICATION} from "../../constants/rest";
import {
  MESSAGE_SUCCESS_REGISTRATION,
  MESSAGE_ERROR_CONFLICT_PARAMS,
  MESSAGE_SUCCESS_VERIFICATION
} from "../../constants/messages";
import {
  sendUserVerficationEmail,
  sendAdminVerficationEmail,
  sendUserActiveEmail,
  sendUserRejectEmail
} from "../../setup/mail";

const register = ({ router, passport, UserModel }) => {
  // ? For now, the secrete code for verification is the mongodb entry id
  // TODO : Change id to something more secure
  // TODO : Send an html email to the user, which contains the id and user for verification

  router.post(ROUTE_REGISTER, (req, res, next) => {
    const registerData = req.body.registerData;
    UserModel.create(registerData)
      .then((registerRecord) => {
        sendUserVerficationEmail(registerData)
          .then((info) => {
            res.json({ message: MESSAGE_SUCCESS_REGISTRATION });
          })
          .catch(next);
        const hashedUsername = registerRecord.hashedUsername;
        const username = registerRecord.username;
        const userId = registerRecord._id;
        let orgList = [];
        registerData.sysRole.forEach(sysRole => {
          sysRole.org.forEach(org => {
            let orgInfo = orgList.find(function(element){
              return element.orgId == org.orgId;
            });
            if(orgInfo == undefined) {
              const orgData = {
                authorizedPerson: org.authorizedPerson,
                name: org.name,
                orgId: org.orgId,
                permission: []
              }
              orgInfo = orgData;
              orgList.push(orgInfo);
            }
            org.program.forEach(program => {
              program.template.forEach(template => {
                orgInfo.permission.push({template: template.templateCode, role: sysRole.role})
              })
            })
          })
        });

        orgList.forEach(orgInfo => {
          sendAdminVerficationEmail( orgInfo, hashedUsername, userId, username)

            .catch(next);
        })
      })
      .catch(next);


  })
  // router.post(ROUTE_REGISTER, (req, res, next) => {
  //   passport.authenticate(PASSPORT_REGISTER, (error, user) => {
  //     if(error) {
  //       if(error.username || error.email || error.password) {
  //         res.status(HTTP_ERROR_CONFLICT).json({ message: MESSAGE_ERROR_CONFLICT_PARAMS, error });
  //       } else {
  //         next(error);
  //       }
  //     } else {
  //       RegisterVerificationModel.create({ ...user })
  //         .then(({ _id }) => {
  //           const { username, email } = user;
  //           sendVerficationEmail(_id, username, email)
  //             .then(() => {
  //               res.json({ message: MESSAGE_SUCCESS_REGISTRATION });
  //             })
  //             .catch(next);
  //         })
  //         .catch(next);
  //     }
  //   })(req, res, next);
  // });
};

export default register;