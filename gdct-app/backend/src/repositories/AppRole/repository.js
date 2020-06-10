import AppRoleEntity from "../../entities/AppRole";
import BaseRepository from "../repository";
import AppRoleModel from "../../models/AppRole";

export default class ReportPeriodRepository
  extends BaseRepository {
  constructor() {
    super(AppRoleModel)
  }
  async delete(id) {
    const appRole = await AppRoleModel.findById(id);
    appRole.isActive = false;
    return this.update(id, appRole);
  }

  async create(AppRole) {
    AppRole.isActive = true;
    return AppRoleModel.create(AppRole).then((AppRole) =>
      new AppRoleEntity(AppRole.toObject())
    );
  }

  async update(id, AppRole) {
    return AppRoleModel.findByIdAndUpdate(id, AppRole).then(
      (AppRole) => new AppRoleEntity(AppRole.toObject()),
    );
  }

  async find(query) {
    const realQuery = { isActive: true };

    for (const key in query) {
      if (query[key]) realQuery[key] = query[key];
    }

    //TODO: filter to be active
    return AppRoleModel.find(realQuery).then((AppRoles) =>
      AppRoles.filter((AppRole) => AppRole).map((AppRole) =>
        new AppRoleEntity(AppRole.toObject())
      )
    );
  }
}