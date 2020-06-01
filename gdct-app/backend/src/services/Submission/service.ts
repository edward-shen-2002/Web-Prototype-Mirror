import ISubmissionService from './interface'
import Submission from '../../entities/Submission'
import { IId } from '../../models/interface'
import Container, { Service } from 'typedi'
import SubmissionRepository from '../../repositories/Submission'
import { extractCOAData, extractColumnNameIds, extractWorkbookMasterValues } from '../../utils/excel/COA'
import { IRows, ICompressedExcelState } from '../../@types/excel/state'
import Pako from 'pako'

@Service()
export default class SubmissionService implements ISubmissionService {
  private submissionRepository: SubmissionRepository

  constructor() {
    this.submissionRepository = Container.get(SubmissionRepository)
  }

  public async createSubmission(submission: Submission) {
    return this.submissionRepository.create(submission)
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
