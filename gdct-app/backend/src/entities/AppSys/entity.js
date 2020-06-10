export default class AppSysEntity {
  constructor(
    {
      _id,
      name,
      code,
      isActive = true,
    }) {
    this._id = _id
    this.name = name
    this.code = code,
    this.isActive = isActive;
  }
}
