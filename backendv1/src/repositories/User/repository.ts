import IUserRepository from './interface'
import User from '../../entities/User'
import UserModel from '../../models/User'
import { IId } from '../../models/interface'
import Container, { Service } from 'typedi'
import OrganizationRepository from "../Organization";
import ProgramRepository from "../Program";
import TemplateTypeRepository from '../TemplateType'
import UserSYSRoleRepository from "../UserSYSRole";
import BaseRepository from '../repository'

@Service()

export default class UserRepository extends BaseRepository<User>
  implements IUserRepository<User>{
  private organizationRepository: OrganizationRepository
  private programRepository: ProgramRepository
  private userSYSRoleRepository: UserSYSRoleRepository
  private templateTypeRepository: TemplateTypeRepository
  findActiveUserByUsername: (username: string) => User;

  constructor() {
    super(UserModel)

    this.organizationRepository = Container.get(OrganizationRepository)
    this.programRepository = Container.get(ProgramRepository)
    this.userSYSRoleRepository = Container.get(UserSYSRoleRepository)
    this.templateTypeRepository = Container.get(TemplateTypeRepository)
  }


  public async create({
    username,
    email,
    title,
    firstName,
    lastName,
    phoneNumber,
    active,
    isVerified,
    createDate,
    approveDate,
    startDate,
    endDate
    }: User): Promise<User> {
    return (
      UserModel.create({
        username,
        email,
        title,
        firstName,
        lastName,
        phoneNumber,
        active,
        isVerified,
        createDate,
        approveDate,
        startDate,
        endDate
      })
        .then((user) => new User(user.toObject()))
    )
  }

  update(id: string, item: IUserRepository<User>): Promise<Boolean> {

    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<Boolean> {
    throw new Error("Method not implemented.");
  }
  find(item: IUserRepository<User>): Promise<IUserRepository<User>[]> {
    throw new Error("Method not implemented.");
  }
  findOne(id: string): Promise<IUserRepository<User>> {
    throw new Error("Method not implemented.");
  }
}
