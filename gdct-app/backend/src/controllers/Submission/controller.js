import { Service } from 'typedi'

import Submission from '../../entities/Submission'
import { Router } from 'express'
import SubmissionService from '../../services/Submission'

const SubmissionController = Service(
  [SubmissionService],
  (service) => {
    const router = Router()
    return (
      () => {

        router.post(
          '/submissions/findSubmissions',
          (req, res, next) => {
            // Get query from middleware -- auth handler
            const {orgId, programIds} = req.body
            service
              .findSubmission(orgId, programIds)
              .then((submissions) => {console.log(submissions); res.json({ submissions })})
              .catch(next)
          }
        )

        router.put(
          '/submissions/updateSubmission',
          (req, res, next) => {
            // Get query from middleware -- auth handler
            const {submission} = req.body
            service
              .updateSubmission(submission)
              .then(() => res.end())
              .catch(next)
          }
        )

        router.put(
          '/submissions/updateSubmissionStatus',
          (req, res, next) => {
            // Get query from middleware -- auth handler
            const {submission, submissionNote, role} = req.body
            service
              .updateStatus(submission, submissionNote, role)
              .then(() => res.end())
              .catch(next)
          }
        )

        router.post(
          '/submissions/createSubmission',
          (req, res, next) => {
            const {submission, submissionNote} = req.body
            console.log(submission, submissionNote)
            service
              .createSubmissionWithWorkbook(submission, submission.workbookData, submissionNote)
              .then((submissions) => res.json({ submissions }))
          }
        )


        router.get(
          '/submissions/fetchSubmission',
          (req, res, next) => {
            // Get query from middleware -- auth handler

            service
              .findSubmission({}, "",[])
              .then((submissions) => res.json({ submissions }))
              .catch(next)
          }
        )

        router.get(
          '/submissions/fetchSubmission/:_id',
          (req, res, next) => {
            const { _id } = req.params

            service
              .findSubmissionById(_id)
              .then((submission) => res.json({ submission }))
              .catch(next)
          }
        )

        router.post(
          '/submissions',
          (req, res, next) => {
            service
              .createSubmission(req.body.submission)
              .then((submission) => res.json({ submission }))
              .catch(next)
          }
        )

        router.put(
          '/submissions/createSubmission/:_id',
          (req, res, next) => {
            const { _id } = req.params
            const { submission } = req.body

            service
              .updateSubmission(_id, submission)
              .then(() => res.end())
              .catch(next)
          }
        )

        router.delete(
          '/submissions/deleteSubmission/:_id',
          (req, res, next) => {
            const { _id } = req.params

            service
              .deleteSubmission(_id)
              .then(() => res.end())
              .catch(next)
          }
        )

        return router
      }
    )()
  }
)

export default SubmissionController
