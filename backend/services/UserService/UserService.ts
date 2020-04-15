import { Service } from 'typedi';
import IUserService from './interface';

@Service()
export default class UserService implements IUserService {
  constructor(
  ){}
}
