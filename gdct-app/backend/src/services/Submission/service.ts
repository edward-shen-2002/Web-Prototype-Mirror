import ISubmissionService from './interface'
import Submission from '../../entities/Submission'
import { IId } from '../../models/interface'
import Container, { Service } from 'typedi'
import SubmissionRepository from '../../repositories/Submission'
import { extractCOAData, extractColumnNameIds, extractWorkbookMasterValues } from '../../utils/excel/COA'
import { IRows, ICompressedExcelState } from '../../@types/excel/state'
import Pako from 'pako'
import TemplateRepository from '../../repositories/Template'

@Service()
export default class SubmissionService implements ISubmissionService {
  private submissionRepository: SubmissionRepository
  private templateRepository: TemplateRepository

  constructor() {
    this.submissionRepository = Container.get(SubmissionRepository)
    this.templateRepository = Container.get(TemplateRepository)
  }

  public async createSubmission(submission: Submission) {
    // Clone the tempalte's workbook data to be used by the user

    return this.templateRepository.findById(submission.templateId)
      .then((template) => {
        submission.workbookData = template.templateData
        return this.submissionRepository.create(submission)
      })
  }
  
  public async findByIdSubmission(id: IId) {
    return this.submissionRepository.findById(id)
  }

  public async phaseSubmission(id: IId, phaseId: IId) {
    return this.findByIdSubmission(id)
      .then((submission) => {
        if(!submission) throw 'Submission id does not exist'

        const masterValues = extractWorkbookMasterValues(submission.workbookData as ICompressedExcelState, submission._id)
        
        console.log(masterValues)
      })

  }

  public async deleteSubmission(id: IId) {
    return this.submissionRepository.delete(id)
  }

  public async updateSubmission(id: IId, submission: Submission) {
    return this.submissionRepository.update(id, submission)
  }

  public async findSubmission(submission: Submission) {
    return this.submissionRepository.find(submission)
  }
}
