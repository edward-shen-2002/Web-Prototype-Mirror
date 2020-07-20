export default class ReportingPeriodEntity {
  constructor({ _id, name, startDate, endDate }) {
    this._id = _id;
    this.name = name;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}
