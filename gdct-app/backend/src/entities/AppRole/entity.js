export default class AppRoleEntity {
  constructor({ _id, code, name, isActive }) {
    this._id = _id;
    this.code = code;
    this.name = name;
    this.isActive = isActive;
  }
}
