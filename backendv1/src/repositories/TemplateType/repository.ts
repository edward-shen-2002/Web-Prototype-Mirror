import ITemplateTypeRepository from "./interface";
import Template from "../../entities/Template";
import TemplateTypeModel from "../../models/TemplateType";

export default class TemplateRepository  {
  create(item: ITemplateTypeRepository<Template>): Promise<Boolean> {
    throw new Error("Method not implemented.");
  }
  update(id: string, item: ITemplateTypeRepository<Template>): Promise<Boolean> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<Boolean> {
    throw new Error("Method not implemented.");
  }
  find(item: ITemplateTypeRepository<Template>): Promise<ITemplateTypeRepository<Template>[]> {
    throw new Error("Method not implemented.");
  }
  findOne(id: string): Promise<ITemplateTypeRepository<Template>> {
    throw new Error("Method not implemented.");
  }
  async findById (templateTypeId) {
    TemplateTypeModel.find({_id: templateTypeId})
      .then((templateType) => {
        return templateType;
      })
  }

}
