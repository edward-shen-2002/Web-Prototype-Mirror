export default class OrgEntity {
  constructor({
    _id,
    id,
    name,
    address,
    organizationGroupId,
    programId,
    users,
    authorizedPerson,
    locationName
  }) {
    this._id = _id
    this.id = id
    this.name = name
    this.address = address
    this.organizationGroupId = organizationGroupId
    this.programId = programId
    this.users = users
    this.authorizedPerson = authorizedPerson
    this.locationName = locationName
  }
}
