export default class MenuEntity {
  constructor({ _id, items, name, isActive = true }) {
    this._id = _id;
    this.items = items;
    this.name = name;
    this.isActive = isActive;
  }
}
