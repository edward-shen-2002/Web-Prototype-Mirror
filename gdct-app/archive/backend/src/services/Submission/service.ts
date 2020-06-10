import ISubmissionService from './interface'
import Submission from '../../entities/Submission'
import { IId } from '../../models/interface'
import Container, { Service } from 'typedi'
import SubmissionRepository from '../../repositories/Submission'
import { extractCOAData, extractColumnNameIds, extractWorkbookMasterValues } from '../../utils/excel/COA'
import { IRows, ICompressedExcelState } from '../../@types/excel/state'
import Pako from 'pako'
import TemplateRepository from '../../repositories/Template'
import StatusRepository from '../../repositories/Status'
import MasterValueRepository from '../../repositories/MasterValue'

@Service()
export default class SubmissionService implements ISubmissionService {
  private submissionRepository: SubmissionRepository
  private templateRepository: TemplateRepository
  private statusRepository: StatusRepository
  private masterValueRepository: MasterValueRepository

  constructor() {
    this.submissionRepository = Container.get(SubmissionRepository)
    this.templateRepository = Container.get(TemplateRepository)
    this.statusRepository = Container.get(StatusRepository)
    this.masterValueRepository = Container.get(MasterValueRepository)
  }

  public async createSubmission(submission: Submission) {
    // Clone the tempalte's workbook data to be used by the user

    return this.templateRepository.findById(submission.templateId)
      .then((template) => {
        submission.workbookData = template.templateData

        return this.submissionRepository.create(submission)
      })
      .then(async (submission) => {
        return this.statusRepository.findById(submission.statusId)
          .then((status) => ({ status,  submission }))
      })
      .then(({ status, submission }) => {
        if(status.name === "Approved") return this.phaseSubmission(submission._id)
          .then(() => submission)
        
        return submission
      })
  }
  
  public async findSubmissionById(id: IId) {
    return this.submissionRepository.findById(id)
  }

  public async phaseSubmission(id: IId) {
    return this.findSubmissionById(id)
      .then((submission) => {
        if(!submission) throw 'Submission id does not exist'

        const masterValues = extractWorkbookMasterValues(submission.workbookData as ICompressedExcelState, submission._id)

        return this.masterValueRepository.bulkUpdate(id, masterValues)        
      })
  }

  public async deleteSubmission(id: IId) {
    return this.submissionRepository.delete(id)
  }

  public async updateSubmission(id: IId, submission: Submission) {
    return this.submissionRepository.update(id, submission)
      .then(() => this.statusRepository.findById(submission.statusId))
      .then((status) => {
        if(status.name === "Approved") return this.phaseSubmission(id)
      })
  }

  public async findSubmission(submission: Submission) {
    return this.submissionRepository.find(submission)
  }
}
