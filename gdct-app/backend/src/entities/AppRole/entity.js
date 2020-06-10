
export default class AppRoleEntity {
  constructor(
    {
      _id,
      code,
      name,
      isActive = true,
    }) {
    this._id = _id
    this.code = code
    this.name = name
    this.isActive = isActive;
  }
}
