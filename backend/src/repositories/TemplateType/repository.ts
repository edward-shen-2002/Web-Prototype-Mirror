import ITemplateTypeRepository from "./interface";
import TemplateType from "../../entities/TemplateType";
import { Service } from "typedi";
import BaseRepository from "../repository";
import TemplateTypeModel from "../../models/TemplateType/model";

@Service()
export default class TemplateTypeRepository extends BaseRepository<TemplateType> implements ITemplateTypeRepository<TemplateType> {
  constructor() {
    super(TemplateTypeModel)
  }
  create(item: TemplateType): Promise<void> {
    throw new Error("Method not implemented.");
  }
  update(id: import("../../models/interface").IId, item: TemplateType): Promise<void> {
    throw new Error("Method not implemented.");
  }
  delete(id: import("../../models/interface").IId): Promise<void> {
    throw new Error("Method not implemented.");
  }
  find(item: TemplateType): Promise<TemplateType[]> {
    throw new Error("Method not implemented.");
  }
  findOne(id: import("../../models/interface").IId): Promise<TemplateType> {
    throw new Error("Method not implemented.");
  }
  validate(id: import("../../models/interface").IId): Promise<void> {
    throw new Error("Method not implemented.");
  }


}