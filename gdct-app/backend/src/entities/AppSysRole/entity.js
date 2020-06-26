export default class AppSysRoleEntity {
  constructor({ _id, appSys, role, isActive }) {
    this._id = _id;
    this.appSys = appSys;
    this.role = role;
    this.isActive = isActive;
  }
}
