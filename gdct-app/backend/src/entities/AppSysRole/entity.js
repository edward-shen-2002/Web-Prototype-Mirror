
export default class AppSysRoleEntity {
  constructor(
    {
      _id,
      appSys,
      role,
      isActive = true,
    }) {
    this._id = _id
    this.appSys = appSys
    this.role = role
    this.isActive = isActive;
  }
}
