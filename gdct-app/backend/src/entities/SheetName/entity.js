export default class SheetNameEntity {
  constructor({
    _id,
    name,
    isActive,
    // templateId
  }) {
    this._id = _id;
    this.name = name;
    this.isActive = isActive;
    // this.templateId = templateId
  }
}
