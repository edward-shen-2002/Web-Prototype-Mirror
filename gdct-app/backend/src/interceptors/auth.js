import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import ErrorGDCT from '../utils/errorGDCT';
import UserService from '../services/User';
import AppRoleResourceService from '../services/AppRoleResource';
import AppResourceService from '../services/AppResource';

const logTag = '[INTERCEPTOR][AUTH]: ';

export default class Auth {
  constructor() {
    this.userService = new UserService();
    this.appRoleResourceService = new AppRoleResourceService();
    this.appResourceService = new AppResourceService();
  }
  getResources = async appSysRoleIds => {
    const res = [];
    for (const appSysRoleId of appSysRoleIds) {
      const appRoleResource = await this.appRoleResourceService.findAppRoleResource({
        appSysRoleId,
      });
      for (const _id of appRoleResource[0].resourceId) {
        const resource = await this.appResourceService.findAppResource({
          _id,
        });
        res.push(resource[0].resourcePath);
      }
    }
    return res;
  };

  authenticated = async (req, res, next) => {
    let token;
    console.log('cookie-jwt:', req.cookies.jwt);
    console.log('token', req.headers.authorization);
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return next(new ErrorGDCT('You are not logged in! Please log into get access.', 401));
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await this.userService.findById(decoded.id);
    if (!currentUser) {
      return next(new ErrorGDCT('The user belonging to this token does no longer exist.', 401));
    }
    req.user = currentUser;
    next();
  };

  authorized = async (req, res, next) => {
    const isAdmin = req.user.sysRole.find(roleId => String(roleId) === '5eb02ec382c6a90c5fb1132f');
    if (!!isAdmin) {
      next();
    }
    const urls = await this.getResources(req.user.sysRole);
    if (!urls.includes(req.originalUrl.toLowerCase())) {
      return next(new ErrorGDCT('You do not have permission to perform this action.', 403));
    }
    next();
  };
}
