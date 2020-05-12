import { Service } from 'typedi'
import { Response, NextFunction, Request, Router } from 'express'
import ReportingPeriodService from '../../services/ReportingPeriod'
import ReportingPeriod from '../../entities/ReportingPeriod'

const ReportingPeriodController = Service(
  [ReportingPeriodService],
  (service) => {
    const router = Router()
    return (
      () => {
        router.get(
          '/reportingPeriods',
          (req: Request, res: Response, next: NextFunction) => {
            // Get query from middleware -- auth handler

            service
              .findReportingPeriod({} as ReportingPeriod)
              .then((reportingPeriods) => res.json({ reportingPeriods }))
              .catch(next)
          }
        )

        router.post(
          '/reportingPeriods',
          (req: Request, res: Response, next: NextFunction) => {
            service
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


            service
              .updateReportingPeriod(_id, reportingPeriod)
              .then(() => res.end())
              .catch(next)
          }
        )

        router.delete(
          '/reportingPeriods/:_id',
          (req: Request, res: Response, next: NextFunction) => {
            const { _id } = req.params

            service
              .deleteReportingPeriod(_id)
              .then(() => res.end())
              .catch(next)
          }
        )

        return router
      }
    )()
  }
)

export default ReportingPeriodController
