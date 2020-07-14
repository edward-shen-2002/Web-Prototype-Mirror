import UserRepository from '../../repositories/User';
import AppSysRoleRepository from '../../repositories/AppSysRole';
import Container, { Service } from 'typedi';
import ErrorGDCT from '../../utils/errorGDCT';

// @Service()
export default class AuthService {
  constructor() {
    this.UserRepository = Container.get(UserRepository);
    this.AppSysRoleReposiotry = Container.get(AppSysRoleRepository);
  }

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

  async processAuto() {
    var temp = mongoose.Types.ObjectId('5efb8b638464c20f646049a6');
    return await this.UserRepository.find({ AppConfig: temp });
  }
}
