import ITemplateRepository from "./interface";
import Template from "../../entities/Template";
import TemplateModel from "../../models/Template";
import { IId } from "../../models/interface";
import StatusRepository from "../Status";

// MongoDB implementation
export default class TemplateRepository implements ITemplateRepository<Template> {
  constructor(
    private statusRepository: StatusRepository
  ) {}

  create(
    {
      name,
      templateData,
      templateTypeId,
      userCreatorId,
      creationDate,
      expirationDate,
      statusId
    }: Template
  ): Promise<Boolean> {
    return (
      TemplateModel.create(
        {
          name,
          templateData,
          templateTypeId,
          userCreatorId,
          creationDate,
          expirationDate,
          statusId
        }
      )
      .then(() => true)
      .catch(() => false)
    )
  }

  update(id: IId, item: Template): Promise<Boolean> {
    throw new Error("Method not implemented.");
  }

  delete(id: IId): Promise<Boolean> {
    throw new Error("Method not implemented.");
  }

  find(item: Template): Promise<Template[]> {
    throw new Error("Method not implemented.");
  }

  findOne(id: IId): Promise<Template> {
    throw new Error("Method not implemented.");
  }
}