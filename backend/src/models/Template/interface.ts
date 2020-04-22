import { Schema, Document } from 'mongoose'
import { IId } from '../interface';

export interface ITemplate {
  name?            : string
  templateData?    : object
  templateTypeId?  : IId
  userCreatorId?   : IId
  creationDate?    : Date
  expirationDate?  : Date
  statusId?        : IId
}

export default interface ITemplateDocument extends ITemplate, Document {}
