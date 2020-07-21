export default class MenuItemEntity {
  constructor({ _id, name, url, description, role = 'USER', isActive = true }) {
    this._id = _id;
    this.name = name;
    this.url = url;
    this.description = description;
    this.role = role;
    this.isActive = isActive;
  }
}
