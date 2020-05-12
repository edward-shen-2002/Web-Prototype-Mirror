import { Service } from 'typedi'
import { Response, NextFunction, Request } from 'express'
import COAService from '../../services/COA'
import COA from '../../entities/COA'

const COAController = Service(
  [COAService],
  (COAService) => ({ router }) => {
    router.get(
      '/COAs',
      (req: Request, res: Response, next: NextFunction) => {
        // Get query from middleware -- auth handler

        COAService
          .findCOA({} as COA)
          .then((COAs) => res.json({ COAs }))
          .catch(next)
      }
    )

    router.post(
      '/COAs',
      (req: Request, res: Response, next: NextFunction) => {
        COAService
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


        COAService
          .updateCOA(_id, COA)
          .then(() => res.end())
          .catch(next)
      }
    )

    router.delete(
      '/COAs/:_id',
      (req: Request, res: Response, next: NextFunction) => {
        const { _id } = req.params

        COAService
          .deleteCOA(_id)
          .then(() => res.end())
          .catch(next)
      }
    )

    return router
  }
)

export default COAController
