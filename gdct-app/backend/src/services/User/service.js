import User from '../../entities/User';
import UserRepository from '../../repositories/User';
import AppSysRoleRepository from '../../repositories/AppSysRole';
import Container, { Service } from 'typedi';
import {
  sendUserVerficationEmail,
  sendAdminVerficationEmail,
  sendUserActiveEmail,
  sendUserRejectEmail,
} from '../../loader/mail';
import ErrorGDCT from '../../utils/errorGDCT';

// @Service()
export default class UserService {
  constructor() {
    this.UserRepository = Container.get(UserRepository);
    this.AppSysRoleReposiotry = Container.get(AppSysRoleRepository);
  }

  register(registerData) {
    // JS User object
    this.UserRepository.create(registerData).then((registerRecord) => {
      sendUserVerficationEmail(registerData);
      const hashedUsername = registerRecord.hashedUsername;
      const username = registerRecord.username;
      const userId = registerRecord._id;
      let orgList = [];
      registerData.sysRole.forEach((sysRole) => {
        sysRole.org.forEach((org) => {
          let orgInfo = orgList.find(function (element) {
            return element.orgId == org.orgId;
          });
          if (orgInfo == undefined) {
            const orgData = {
              authorizedPerson: org.authorizedPerson,
              name: org.name,
              orgId: org.orgId,
              permission: [],
            };
            orgInfo = orgData;
            orgList.push(orgInfo);
          }
          org.program.forEach((program) => {
            program.template.forEach((template) => {
              orgInfo.permission.push({
                template: template.templateCode,
                role: sysRole.role,
              });
            });
          });
        });
      });

      orgList.forEach((orgInfo) => {
        sendAdminVerficationEmail(orgInfo, hashedUsername, userId, username);
      });
    });
  }

  login(username) {
    this.UserRepository.findActiveUserByUsername(username);
  }

  logout() {}

  sendActiveEmail(approve, _id, orgId) {
    let checkActive = true;

    this.UserRepository.findById(_id)
      .then((user) => {
        if (approve == 'true') {
          user.sysRole.forEach((sysRole) => {
            sysRole.org.forEach((org) => {
              if (org.orgId == orgId) org.IsActive = true;
              checkActive = checkActive && org.IsActive;
            });
          });
          if (checkActive) {
            sendUserActiveEmail(user).catch(next);
          }
          this.UserRepository.updateSysRole(_id, user.sysRole)
            .then((model) => {
              console.log(model.sysRole[0].org);
            })
            .catch(next);
          return 'You have approved the user. The user will active the account by email.';
        } else {
          sendUserRejectEmail(user).catch(next);
          return 'You have rejected the user. The user will be notified by email.';
        }
      })
      .catch(next);
  }

  activeUser(_id) {
    this.UserRepository.findById({ _id })
      .then((model) => {
        console.log(model);
      })
      .catch(next);
    this.UserRepository.activeUser({ _id })
      .then((model) => {
        console.log(model);
        return 'The account active';
      })
      .catch(next);
  }

  changePassword() {}
  async processSignUp(user) {
    if (user.sysRole) {
      user.sysRole.forEach(async (id) => {
        await this.AppSysRoleReposiotry.findById(id);
      });
    }
    return this.UserRepository.create(user);
  }

  async processLogIn({ email, password }) {
    if (!email || !password) {
      throw new ErrorGDCT('Please provide email and password!', 400);
    }
    return this.UserRepository.checkAuthenticate(email, password);
  }

  async findById(id) {
    return this.UserRepository.findById(id);
  }
}
