import ISheetNameRepository from './interface'
import SheetNameEntity from '../../entities/SheetName'
import Container, { Service } from 'typedi'
import BaseRepository from '../repository'
import SheetNameModel from '../../models/SheetName'
import { IId } from '../../models/interface'
import TemplateRepository from '../Template'

@Service()
export default class SheetNameRepository extends BaseRepository<SheetNameEntity>
  implements ISheetNameRepository<SheetNameEntity> {
  private templateRepository: TemplateRepository

  constructor() {
    super(SheetNameModel)

    this.templateRepository = Container.get(TemplateRepository)
  }
  public async create({
    // templateId,
    name,
    isActive
  }: SheetNameEntity): Promise<SheetNameEntity> {
    return (
      // this.templateRepository
      // .validate(templateId)
      // .then(() =>
      //   SheetNameModel.create({
      //     templateId,
      //     name,
      //     isActive
      //   })
      // )
      SheetNameModel.create({
        // templateId,
        name,
        isActive
      })
      .then((sheetName) => new SheetNameEntity(sheetName))
    )
  }

  public async update(
    id: IId, 
    {
      // templateId,
      name,
      isActive
    }: SheetNameEntity
  ): Promise<SheetNameEntity> {
    return (
      // this.templateRepository.validate(templateId)
      //   .then(
      //     () => SheetNameModel.findByIdAndUpdate(
      //       id, 
      //       {
      //         templateId,
      //         name,
      //         isActive
      //       }
      //     )
      //   )
        SheetNameModel.findByIdAndUpdate(
          id, 
          {
            // templateId,
            name,
            isActive
          }
        )
        .then(
          (sheetName) => new SheetNameEntity(sheetName.toObject())
        )

    )
  }

  public async find(query: SheetNameEntity): Promise<SheetNameEntity[]> {
    const realQuery = {}

    for (const key in query) {
      if (query[key]) realQuery[key] = query[key]
    }

    return SheetNameModel.find(realQuery).then((sheetNames) =>
      sheetNames.map((sheetName) => new SheetNameEntity(sheetName))
    )
  }

  findOne(id: IId): Promise<SheetNameEntity> {
    throw new Error('Method not implemented.')
  }

  public async delete(id: IId): Promise<SheetNameEntity> {
    return SheetNameModel.findByIdAndDelete(id).then(
      (sheetName) => new SheetNameEntity(sheetName)
    )
  }
}
