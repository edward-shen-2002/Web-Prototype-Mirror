import ITemplateTypeRepository from './interface'
import TemplateType from '../../entities/TemplateType'
import Container, { Service } from 'typedi'
import BaseRepository from '../repository'
import TemplateTypeModel from '../../models/TemplateType/model'
import { IId } from '../../models/interface'
import ProgramRepository from '../Program'

@Service()
export default class TemplateTypeRepository extends BaseRepository<TemplateType>
  implements ITemplateTypeRepository<TemplateType> {
  private programRepository: ProgramRepository

  constructor() {
    super(TemplateTypeModel)

    this.programRepository = Container.get(ProgramRepository)
  }
  create({
    name,
    description,

    programIds,

    isApprovable,
    isReviewable,
    isSubmittable,
    isInputtable,
    isViewable,
    isReportable,
  }: TemplateType): Promise<void> {
    return this.programRepository
      .validateMany(programIds)
      .then(() =>
        TemplateTypeModel.create({
          name,
          description,

          programIds,

          isApprovable,
          isReviewable,
          isSubmittable,
          isInputtable,
          isViewable,
          isReportable,
        })
      )
      .then(() => {})
  }
  update(id: IId, item: TemplateType): Promise<void> {
    throw new Error('Method not implemented.')
  }

  public async find(query: TemplateType): Promise<TemplateType[]> {
    const realQuery = {}

    for (const key in query) {
      if (query[key]) realQuery[key] = query[key]
    }

    return TemplateTypeModel.find(realQuery).then((templateTypes) =>
      templateTypes.map(
        (templateType) => new TemplateType(templateType.toObject())
      )
    )
  }

  findOne(id: IId): Promise<TemplateType> {
    throw new Error('Method not implemented.')
  }
}
