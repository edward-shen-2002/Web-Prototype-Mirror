import AppSysRoleEntity from "../../entities/AppSysRole";
import BaseRepository from "../repository";
import AppSysRoleModel from "../../models/AppSysRole";

export default class ReportPeriodRepository
  extends BaseRepository {
  constructor() {
    super(AppSysRoleModel)
  }
  async delete(id) {
    const appSysRole = await AppSysRoleModel.findById(id);
    appSysRole.isActive = false;
    return this.update(id, appSysRole);
  }

  async create(AppSysRole) {
    AppSysRole.isActive = true;
    return AppSysRoleModel.create(AppSysRole).then((AppSysRole) =>
      new AppSysRoleEntity(AppSysRole.toObject())
    );
  }

  async update(
    id,
    AppSysRole,
  ) {
    return AppSysRoleModel.findByIdAndUpdate(id, AppSysRole).then(
      (AppSysRole) => new AppSysRoleEntity(AppSysRole.toObject()),
    );
  }

  async find(query) {
    const realQuery = { isActive: true };

    for (const key in query) {
      if (query[key]) realQuery[key] = query[key];
    }

    //TODO: filter to be active
    return AppSysRoleModel.find(realQuery).then((AppSysRoles) =>
      AppSysRoles.filter((AppSysRole) => AppSysRole).map((AppSysRole) =>
        new AppSysRoleEntity(AppSysRole.toObject())
      )
    );
  }
}