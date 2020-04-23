import TemplateType from "../../entities/TemplateType";
import { IId } from "../../models/interface";

export default interface ITemplateTypeService {
  createTemplateType  : (templateType: TemplateType) => void
  deleteTemplateType  : (id: IId) => void
  updateTemplateType  : (id: IId, templateType: TemplateType) => void
  findTemplateType    : (templateType: TemplateType) => Promise<TemplateType[]>
}