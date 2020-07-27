export default class MenuEntity {
  constructor({ _id, items, name, isSubMenu, subMenus, isActive }) {
    this._id = _id;
    this.items = items;
    this.name = name;
    this.isSubMenu = isSubMenu;
    this.subMenus = subMenus;
    this.isActive = isActive;
  }
}
