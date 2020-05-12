import { Service } from 'typedi'
import { Response, NextFunction, Request, Router } from 'express'
import StatusService from '../../services/Status'
import Status from '../../entities/Status'

const StatusController = Service(
  [StatusService],
  (statusService) => {
    const router = Router()

    return (
      () => {
        router.get(
          '/statuses',
          (req: Request, res: Response, next: NextFunction) => {
            // Get query from middleware -- auth handler

            statusService
              .findStatus({} as Status)
              .then((statuses) => res.json({ statuses }))
              .catch(next)
          }
        )

        router.post(
          '/statuses',
          (req: Request, res: Response, next: NextFunction) => {
            statusService
              .createStatus(req.body.status)
              .then((status) => res.json({ status }))
              .catch((error) => {
                console.error(error)
                throw error
              })
              .catch(next)
          }
        )

        router.put(
          '/statuses/:_id',
          (req: Request, res: Response, next: NextFunction) => {
            const { _id } = req.params
            const { status } = req.body


            statusService
              .updateStatus(_id, status)
              .then(() => res.end())
              .catch(next)
          }
        )

        router.delete(
          '/statuses/:_id',
          (req: Request, res: Response, next: NextFunction) => {
            const { _id } = req.params

            statusService
              .deleteStatus(_id)
              .then(() => res.end())
              .catch(next)
          }
        )

        return router
      }
    )()
  }
)

export default StatusController
