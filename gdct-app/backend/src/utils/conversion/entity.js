// import { Types } from 'mongoose';
// import Template from '../../entities/Template/entity'
// import TemplateType from '../../entities/TemplateType'
// import { ITemplateType } from '../../models/TemplateType/interface'
// import { ITemplate } from '../../models/Template/interface'

// const ObjectId = Types.ObjectId;

// export const convertTemplateOjectToEntity = (
//   {
//     name,
//     templateData,
//     templateTypeId,
//     userCreatorId,
//     creationDate,
//     expirationDate,
//     statusId
//   }: ITemplate
// ) => (
//   new Template(
//     {
//       name,
//       templateData,
//       templateTypeId: ObjectId(templateTypeId),
//       userCreatorId: ObjectId(userCreatorId),
//       creationDate: new Date(creationDate),
//       expirationDate: new Date(expirationDate),
//       statusId: ObjectId(statusId)
//     }
//   )
// )

// export const convertTemplateTypeOjectToEntity = (
//   {

//   }: ITemplateType
// ) => (
//   new TemplateType(
//     {

//     }
//   )
// )
