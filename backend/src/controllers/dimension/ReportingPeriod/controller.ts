import { Service } from 'typedi'
import { Response, NextFunction, Request } from 'express'
import ReportingPeriodService from '../../../services/ReportingPeriod'
import ReportingPeriod from '../../../entities/ReportingPeriod'

const ReportingPeriodController = Service(
  [ReportingPeriodService],
  (reportingPeriodService) => ({ router }) => {
    router.get(
      '/reportingPeriods',
      (req: Request, res: Response, next: NextFunction) => {
        // Get query from middleware -- auth handler

        reportingPeriodService
          .findReportingPeriod({} as ReportingPeriod)
          .then((reportingPeriods) => res.json({ reportingPeriods }))
          .catch(next)
      }
    )

    router.post(
      '/reportingPeriods',
      (req: Request, res: Response, next: NextFunction) => {
        reportingPeriodService
          .createReportingPeriod(req.body.reportingPeriod)
          .then((reportingPeriod) => res.json({ reportingPeriod }))
          .catch((error) => {
            console.error(error)
            throw error
          })
          .catch(next)
      }
    )

    router.put(
      '/reportingPeriods/:_id',
      (req: Request, res: Response, next: NextFunction) => {
        const { _id } = req.params
        const { reportingPeriod } = req.body


        reportingPeriodService
          .updateReportingPeriod(_id, reportingPeriod)
          .then(() => res.end())
          .catch(next)
      }
    )

    router.delete(
      '/reportingPeriods/:_id',
      (req: Request, res: Response, next: NextFunction) => {
        const { _id } = req.params

        reportingPeriodService
          .deleteReportingPeriod(_id)
          .then(() => res.end())
          .catch(next)
      }
    )

    return router
  }
)

export default ReportingPeriodController
