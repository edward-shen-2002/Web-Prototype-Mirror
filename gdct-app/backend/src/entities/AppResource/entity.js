export default class AppResourceEntity {
  constructor({ _id, resourceName, resourcePath, isProtected, isActive }) {
    this._id = _id;
    this.resourceName = resourceName;
    this.resourcePath = resourcePath;
    this.isProtected = isProtected;
    this.isActive = isActive;
  }
}
