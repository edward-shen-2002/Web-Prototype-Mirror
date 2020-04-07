import { Schema, Document } from "mongoose";

interface IOrganizationGroup {
  name: string
}

export default interface IOrganizationGroupModel extends IOrganizationGroup, Document {}