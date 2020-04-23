import { Types } from 'mongoose'
import Template from "../../entities/Template"

const ObjectId = Types.ObjectId

export const convertTemplateOjectToEntity = (
  {
    name,
    templateData,
    templateTypeId,
    userCreatorId,
    creationDate,
    expirationDate,
    statusId
  }
) => (
  new Template(
    {
      name,
      templateData,
      templateTypeId: ObjectId(templateTypeId),
      userCreatorId: ObjectId(userCreatorId),
      creationDate: new Date(creationDate),
      expirationDate: new Date(expirationDate),
      statusId: ObjectId(statusId)
    }
  )
)