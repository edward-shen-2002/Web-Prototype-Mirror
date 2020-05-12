import ITemplateTypeRepository from './interface'
import TemplateTypeEntity from '../../entities/TemplateType'
import Container, { Service } from 'typedi'
import BaseRepository from '../repository'
import TemplateTypeModel from '../../models/TemplateType/model'
import { IId } from '../../models/interface'
import ProgramRepository from '../Program'

@Service()
export default class TemplateTypeRepository extends BaseRepository<TemplateTypeEntity>
  implements ITemplateTypeRepository<TemplateTypeEntity> {
  private programRepository: ProgramRepository

  constructor() {
    super(TemplateTypeModel)

    this.programRepository = Container.get(ProgramRepository)
  }
  public async create({
    name,
    description,

    programIds,

    isApprovable,
    isReviewable,
    isSubmittable,
    isInputtable,
    isViewable,
    isReportable
  }: TemplateTypeEntity): Promise<TemplateTypeEntity> {
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
          isReportable
        })
      )
      .then((templateType) => new TemplateTypeEntity(templateType))
  }

  public async update(
    id: IId, 
    {
      name,
      description,
  
      programIds,
  
      isApprovable,
      isReviewable,
      isSubmittable,
      isInputtable,
      isViewable,
      isReportable
    }: TemplateTypeEntity
  ): Promise<TemplateTypeEntity> {
    return (
      this.programRepository.validateMany(programIds)
        .then(
          () => TemplateTypeModel.findByIdAndUpdate(
            id, 
            {
              name,
              description,
          
              programIds,
          
              isApprovable,
              isReviewable,
              isSubmittable,
              isInputtable,
              isViewable,
              isReportable
            }
          )
        )
        .then(
          (templateType) => new TemplateTypeEntity(templateType.toObject())
        )

    )
  }

  public async find(query: TemplateTypeEntity): Promise<TemplateTypeEntity[]> {
    const realQuery = {}

    for (const key in query) {
      if (query[key]) realQuery[key] = query[key]
    }

    return TemplateTypeModel.find(realQuery).then((templateTypes) =>
      templateTypes.map((templateType) => new TemplateTypeEntity(templateType))
    )
  }

  findOne(id: IId): Promise<TemplateTypeEntity> {
    throw new Error('Method not implemented.')
  }

  public async delete(id: IId): Promise<TemplateTypeEntity> {
    return TemplateTypeModel.findByIdAndDelete(id).then(
      (templateType) => new TemplateTypeEntity(templateType)
    )
  }
}
