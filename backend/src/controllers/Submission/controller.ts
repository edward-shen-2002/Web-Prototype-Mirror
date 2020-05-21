import { Service } from 'typedi'

import Submission from '../../entities/Submission'
import { Response, NextFunction, Request, Router } from 'express'
import SubmissionService from '../../services/Submission'

const SubmissionController = Service(
  [SubmissionService],
  (service) => {
    const router = Router()
    return (
      () => {
        router.get(
          '/submissions',
          (req: Request, res: Response, next: NextFunction) => {
            // Get query from middleware -- auth handler

            service
              .findSubmission({})
              .then((submissions) => res.json({ submissions }))
              .catch(next)
          }
        )

        router.post(
          '/submissions',
          (req: Request, res: Response, next: NextFunction) => {
            service
              .createSubmission(req.body.submission)
              .then((submission) => res.json({ submission }))
              .catch(next)
          }
        )

        router.put(
          '/submissions/:_id',
          (req: Request, res: Response, next: NextFunction) => {
            const { _id } = req.params
            const { submission } = req.body


            service
              .updateSubmission(_id, submission)
              .then(() => res.end())
              .catch(next)
          }
        )

        router.delete(
          '/submissions/:_id',
          (req: Request, res: Response, next: NextFunction) => {
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
