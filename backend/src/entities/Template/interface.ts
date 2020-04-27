import { ITemplate } from "../../models/Template/interface";
import { IId } from "../../models/interface";

export default interface ITemplateEntity extends ITemplate {
  _id?: IId
}