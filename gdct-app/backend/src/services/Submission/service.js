import Container, { Service } from 'typedi'
import SubmissionRepository from '../../repositories/Submission'
import { extractCOAData, extractColumnNameIds, extractWorkbookMasterValues } from '../../utils/excel/COA'
import TemplateRepository from '../../repositories/Template'
import StatusRepository from '../../repositories/Status'
import MasterValueRepository from '../../repositories/MasterValue'

// @Service()
export default class SubmissionService {
  constructor() {
    this.submissionRepository = Container.get(SubmissionRepository)
    this.templateRepository = Container.get(TemplateRepository)
    this.statusRepository = Container.get(StatusRepository)
    this.masterValueRepository = Container.get(MasterValueRepository)
  }

  async createSubmission(submission) {
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
  
  async findSubmissionById(id) {
    return this.submissionRepository.findById(id)
  }

  async phaseSubmission(id) {
    return this.findSubmissionById(id)
      .then((submission) => {
        if(!submission) throw 'Submission id does not exist'

        const masterValues = extractWorkbookMasterValues(submission.workbookData, submission._id)

        return this.masterValueRepository.bulkUpdate(id, masterValues)        
      })
  }

  async deleteSubmission(id) {
    return this.submissionRepository.delete(id)
  }

  async updateSubmission(id, submission) {
    return this.submissionRepository.update(id, submission)
      .then(() => this.statusRepository.findById(submission.statusId))
      .then((status) => {
        if(status.name === "Approved") return this.phaseSubmission(id)
      })
  }

  async findSubmission(submission) {
    return this.submissionRepository.find(submission)
  }
}
