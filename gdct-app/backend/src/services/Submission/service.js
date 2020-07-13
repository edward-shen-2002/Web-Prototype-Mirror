import Container, { Service } from 'typedi'
import SubmissionRepository from '../../repositories/Submission'
import SubmissionNoteRepository from "../../repositories/SubmissionNote";
import { extractCOAData, extractColumnNameIds, extractWorkbookMasterValues } from '../../utils/excel/COA'
import TemplateRepository from '../../repositories/Template'
import StatusRepository from '../../repositories/Status'
import TemplatePackageRepository from '../../repositories/TemplatePackage'
import MasterValueRepository from '../../repositories/MasterValue'
import ProgramRepository from '../../repositories/Program'
import cloneDeep from 'clone-deep'
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

// @Service()
export default class SubmissionService {
  constructor() {
    this.submissionRepository = Container.get(SubmissionRepository)
    this.submissionNoteRepository = Container.get(SubmissionNoteRepository)
    this.templateRepository = Container.get(TemplateRepository)
    this.statusRepository = Container.get(StatusRepository)
    this.templatePackageRepository = Container.get(TemplatePackageRepository)
    this.masterValueRepository = Container.get(MasterValueRepository)
    this.programRepository = Container.get(ProgramRepository)
  }

  async createSubmissionBaseOnTemplatePackage(submission) {
    // Clone the tempalte's workbook data to be used by the user

    return this.templateRepository.findById(submission.templateId)
      .then((template) => {
        submission.workbookData = template.templateData

        return this.submissionRepository.create(submission)
      })
  }

  //whether keep the history
  async createSubmissionWithWorkbook(submission, workbookData, submissionNote) {


    submission.workbookData = workbookData
    submission.version = submission.version + 1
    submission.isLatest = true;
    submission.updatedDate = new Date();

    const submissionNotes = {
      note: submissionNote,
      submissionId: submission._id,
      updatedDate: submission.updatedDate,
      role: "Submitted"
    }

    return this.statusRepository.findByName("Submitted")
      .then((status) => {
        submission.statusId = status[0].id
         return this.submissionRepository.findAndSetFalse(submission._id)
           .then(()=> {
             delete submission._id
             return this.submissionRepository.create(submission)
            // return this.submissionRepository.update(submission._id, submission)
              .then(() => {
                return this.submissionNoteRepository.create(submissionNotes)
              })
           })
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
        console.log(masterValues)

        return this.masterValueRepository.bulkUpdate(id, masterValues)        
      })
  }

  async deleteSubmission(id) {
    return this.submissionRepository.delete(id)
  }

  async updateSubmission(submission) {

    return this.submissionRepository.update(submission._id, submission)
      .then((submission) => {
        if(submission.phase === "Approved") return this.phaseSubmission(id)
      })
  }

  async updateStatus(submission, submissionNote, role) {
    const submissionNotes = {
      note: submissionNote,
      submissionId: submission._id,
      updatedDate: new Date(),
      role: role
    }

    return this.statusRepository.findByName(role)
      .then((status) => {
        submission.statusId = status[0].id
        submission.updatedDate = new Date();

        return this.submissionNoteRepository.create(submissionNotes)
          .then(() => {
            if(role == "Submitted") {
              submission.version = submission.version + 1
              submission.isLatest = true;
              return this.submissionRepository.findAndSetFalse(submission._id)
                .then(()=> {
                  delete submission._id
                  return this.submissionRepository.create(submission)
                    .then((submission) => {
                      if (role === "Approved") return this.phaseSubmission(submission._id)
                    })
                })
            }
            else {
              return this.submissionRepository.update(submission._id, submission)
                .then((submission) => {
                  if(role === "Approved") return this.phaseSubmission(submission._id)
                })
            }
          })
      })
  }


  // async updateSubmission(id, submission) {
  //   return this.submissionRepository.update(id, submission)
  //     .then(() => this.statusRepository.findById(submission.statusId))
  //     .then((status) => {
  //       if(status.name === "Approved") return this.phaseSubmission(id)
  //     })
  // }

  async showStatusInSubmissions(submissions) {

    return;
  }

  async findSubmission(orgId, programIds) {
    return this.templatePackageRepository.findByProgramIds(programIds)
      .then((templatePackages) => {
        const name  = 'Unsubmitted'
        return this.statusRepository.findByName(name)
          .then((status) => {
            let promiseQuery1 = []
            templatePackages.forEach((templatePackage) => {
              promiseQuery1.push(this.submissionRepository.findByTemplatePackageId(templatePackage._id)
                .then((submissions) => {
                  if(!submissions[0]) {

                    const templateIds = templatePackage.templateIds
                    let promiseQuery3 = [];
                    if (templateIds !== undefined) {
                      templateIds.forEach((templateId) => {
                        if(templatePackage.programId !== undefined)
                          {
                            templatePackage.programId.forEach((programId)=> {
                              if(programIds.find(program => program == programId) != undefined) {

                                promiseQuery3.push(this.createSubmissionBaseOnTemplatePackage(
                                  {
                                    orgId: orgId,
                                    templateId: templateId,
                                    name: templatePackage.name,
                                    templatePackageId: templatePackage._id,
                                    programId: programId,
                                    statusId: status[0]._id,
                                    version: 0,
                                    isLatest: true
                                  }
                                ))
                              }
                          })}
                      })
                      return Promise.all(promiseQuery3)
                    }
                  }
                }))
            })
            return Promise.all(promiseQuery1)
              .then(() => {
                let changedSubmissions = [];
                return this.submissionRepository.findByOrgIdAndProgramId(orgId, programIds)
                  .then((submissions) => {
                    let promiseQuery2 = [];

                    submissions.forEach((submission) => {
                      promiseQuery2.push(
                        this.statusRepository.findById(submission.statusId)
                          .then((status) => {
                            return this.programRepository.findById(submission.programId)
                              .then((program) => {
                                let changedSubmission = {}
                                changedSubmission._id = submission._id
                                changedSubmission.id = submission.id
                                changedSubmission.name = submission.name
                                changedSubmission.orgId = submission.orgId
                                changedSubmission.templateId = submission.templateId
                                changedSubmission.templatePackageId = submission.templatePackageId
                                changedSubmission.programName = program.name
                                changedSubmission.programId = program._id
                                changedSubmission.workbookData = submission.workbookData
                                changedSubmission.submittedDate = submission.submittedDate
                                changedSubmission.year = submission.year
                                changedSubmission.submissionPeriodId = submission.submissionPeriodId
                                changedSubmission.phase = submission.phase
                                changedSubmission.statusId = submission.statusId
                                changedSubmission.createdAt = submission.createdAt
                                changedSubmission.updatedAt = submission.updatedAt
                                changedSubmission.updatedBy = submission.updatedBy
                                changedSubmission.isPublished = submission.isPublished
                                changedSubmission.phase = status.name
                                changedSubmission.parentId = (submission.parentId)? submission.parentId: submission._id
                                changedSubmission.version = submission.version
                                changedSubmission.isLatest = submission.isLatest
                                changedSubmissions.push(cloneDeep(changedSubmission))
                              })
                          })
                      )
                    })
                    return Promise.all(promiseQuery2)
                      .then(() => { return changedSubmissions})
                  })
              })

            })

      })
  }
}
