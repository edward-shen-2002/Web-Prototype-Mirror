import AppSysEntity from "../../entities/AppSys";
import BaseRepository from "../repository";
import AppSysModel from "../../models/AppSys";

export default class ReportPeriodRepository extends BaseRepository {
  constructor() {
    super(AppSysModel)
  }
  async delete(id) {
    const appSys = await AppSysModel.findById(id);
    appSys.isActive = false;
    return this.update(id, appSys);
  }

  async create(AppSys) {
    AppSys.isActive = true;
    return AppSysModel.create(AppSys).then((AppSys) =>
      new AppSysEntity(AppSys.toObject())
    );
  }

  async update(id, AppSys) {
    return AppSysModel.findByIdAndUpdate(id, AppSys).then(
      (AppSys) => new AppSysEntity(AppSys.toObject()),
    );
  }

  async find(query) {
    const realQuery = { isActive: true };

    for (const key in query) {
      if (query[key]) realQuery[key] = query[key];
    }

    //TODO: filter to be active
    return AppSysModel.find(realQuery).then((AppSyses) =>
      AppSyses.filter((AppSys) => AppSys).map((AppSys) =>
        new AppSysEntity(AppSys.toObject())
      )
    );
  }
}