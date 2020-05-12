import { Service } from 'typedi'
import { Response, NextFunction, Request, Router } from 'express'
import COAService from '../../services/COA'
import COAEntity from '../../entities/COA'

const COAController = Service(
  [COAService],
  (service) => {
    const router = Router()
    return (
      () => {
        router.get(
          '/COAs',
          (req: Request, res: Response, next: NextFunction) => {
            // Get query from middleware -- auth handler

            service
              .findCOA({} as COAEntity)
              .then((COAs) => res.json({ COAs }))
              .catch(next)
          }
        )

        router.post(
          '/COAs',
          (req: Request, res: Response, next: NextFunction) => {
            service
              .createCOA(req.body.COA)
              .then((COA) => res.json({ COA }))
              .catch((error) => {
                console.error(error)
                throw error
              })
              .catch(next)
          }
        )

        router.put(
          '/COAs/:_id',
          (req: Request, res: Response, next: NextFunction) => {
            const { _id } = req.params
            const { COA } = req.body

            service
              .updateCOA(_id, COA)
              .then(() => res.end())
              .catch(next)
          }
        )

        router.delete(
          '/COAs/:_id',
          (req: Request, res: Response, next: NextFunction) => {
            const { _id } = req.params

            service
              .deleteCOA(_id)
              .then(() => res.end())
              .catch(next)
          }
        )

        return router
      }
    )()
  }
)

export default COAController
