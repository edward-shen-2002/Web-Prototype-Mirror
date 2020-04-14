import ITemplateRepository from "./interface";
import IMongoRepository from '../mongo';
import Template from "../../entities/Template";

export default class TemplateRepository implements IMongoRepository<ITemplateRepository<Template>> {
  create(item: ITemplateRepository<Template>): Promise<Boolean> {
    throw new Error("Method not implemented.");
  }
  update(id: string, item: ITemplateRepository<Template>): Promise<Boolean> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<Boolean> {
    throw new Error("Method not implemented.");
  }
  find(item: ITemplateRepository<Template>): Promise<ITemplateRepository<Template>[]> {
    throw new Error("Method not implemented.");
  }
  findOne(id: string): Promise<ITemplateRepository<Template>> {
    throw new Error("Method not implemented.");
  }
  
}