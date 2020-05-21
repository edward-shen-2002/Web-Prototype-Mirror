import { Service } from 'typedi'

import SubmissionPeriod from '../../entities/SubmissionPeriod'
import { Response, NextFunction, Request, Router } from 'express'
import SubmissionPeriodService from '../../services/SubmissionPeriod'

const SubmissionPeriodController = Service(
  [SubmissionPeriodService],
  (service) => {
    const router = Router()
    return (
      () => {
        router.get(
          '/submissionPeriods',
          (req: Request, res: Response, next: NextFunction) => {
            // Get query from middleware -- auth handler

            service
              .findSubmissionPeriod({})
              .then((submissionPeriods) => res.json({ submissionPeriods }))
              .catch(next)
          }
        )

        router.post(
          '/submissionPeriods',
          (req: Request, res: Response, next: NextFunction) => {
            service
              .createSubmissionPeriod(req.body.submissionPeriod)
              .then((submissionPeriod) => res.json({ submissionPeriod }))
              .catch(next)
          }
        )

        router.put(
          '/submissionPeriods/:_id',
          (req: Request, res: Response, next: NextFunction) => {
            const { _id } = req.params
            const { submissionPeriod } = req.body


            service
              .updateSubmissionPeriod(_id, submissionPeriod)
              .then(() => res.end())
              .catch(next)
          }
        )

        router.delete(
          '/submissionPeriods/:_id',
          (req: Request, res: Response, next: NextFunction) => {
            const { _id } = req.params

            service
              .deleteSubmissionPeriod(_id)
              .then(() => res.end())
              .catch(next)
          }
        )

        return router
      }
    )()
  }
)

export default SubmissionPeriodController
