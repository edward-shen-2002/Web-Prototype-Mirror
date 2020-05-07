import { Service } from 'typedi'
import { Response, NextFunction, Request } from 'express'
import SubmissionPeriodService from '../../../services/SubmissionPeriod'
import SubmissionPeriod from '../../../entities/SubmissionPeriod'

const SubmissionPeriodController = Service(
  [SubmissionPeriodService],
  (submissionPeriodService) => ({ router }) => {
    router.get(
      '/submissionPeriods',
      (req: Request, res: Response, next: NextFunction) => {
        // Get query from middleware -- auth handler

        submissionPeriodService
          .findSubmissionPeriod({} as SubmissionPeriod)
          .then((submissionPeriods) => res.json({ submissionPeriods }))
          .catch(next)
      }
    )

    router.post(
      '/submissionPeriods',
      (req: Request, res: Response, next: NextFunction) => {
        submissionPeriodService
          .createSubmissionPeriod(req.body.submissionPeriod)
          .then((submissionPeriod) => res.json({ submissionPeriod }))
          .catch((error) => {
            console.error(error)
            throw error
          })
          .catch(next)
      }
    )

    router.put(
      '/submissionPeriods/:_id',
      (req: Request, res: Response, next: NextFunction) => {
        const { _id } = req.params
        const { submissionPeriod } = req.body


        submissionPeriodService
          .updateSubmissionPeriod(_id, submissionPeriod)
          .then(() => res.end())
          .catch(next)
      }
    )

    router.delete(
      '/submissionPeriods/:_id',
      (req: Request, res: Response, next: NextFunction) => {
        const { _id } = req.params

        submissionPeriodService
          .deleteSubmissionPeriod(_id)
          .then(() => res.end())
          .catch(next)
      }
    )

    return router
  }
)

export default SubmissionPeriodController
