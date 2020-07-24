export default class ProgramEntity {
  constructor({ _id, name, code, isActive }) {
    this._id = _id;
    this.name = name;
    this.code = code;
    this.isActive = isActive;
  }
}
