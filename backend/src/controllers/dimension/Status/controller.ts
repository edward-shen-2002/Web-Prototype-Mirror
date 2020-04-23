import { Service } from "typedi"
import { Response, NextFunction, Request } from 'express'
import StatusService from "../../../services/Status"
import Status from "../../../entities/Status"

const StatusController = Service(
  [
    StatusService
  ],
  (statusService) => ({ router }) => {
    router.get(
      '/statuses',
      (req: Request, res: Response, next: NextFunction) => {
        // Get query from middleware -- auth handler
        
        statusService.findStatus({} as Status)
          .then((statuses) => res.json({ statuses }))
          .catch(next)
      }
    )

    router.post(
      '/statuses',
      (req: Request, res: Response, next: NextFunction) => {
        statusService.createStatus(req.body.status)
          .then(() => res.end())
          .catch(next)
      }
    )

    router.put(
      '/statuses',
      (req: Request, res: Response, next: NextFunction) => {
        const { id, status } = req.body

        statusService.updateStatus(id, status)
          .then(() => res.end())
          .catch(next)
      }
    )

    return router
  }
)

export default StatusController