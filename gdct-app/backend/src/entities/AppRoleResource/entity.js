export default class AppRoleResourceEntity {
  constructor({ _id, appSysRoleId, resourceId, isActive }) {
    this._id = _id;
    this.appSysRoleId = appSysRoleId;
    this.resourceId = resourceId;
    this.isActive = isActive;
  }
}
