export default class MenuItemEntity {
  constructor({ _id, items, isActive = true }) {
    this._id = _id;
    this.items = items;
    this.isActive = isActive;
  }
}
