import { Service } from 'typedi'
import { Response, NextFunction, Request } from 'express'
import COATreeService from '../../services/COATree'
import COATreeEntity from '../../entities/COATree'

const COATreeController = Service(
  [COATreeService],
  (COATreeService) => ({ router }) => {
    router.get(
      '/COATrees',
      (req: Request, res: Response, next: NextFunction) => {
        // Get query from middleware -- auth handler

        COATreeService
          .findCOATree({} as COATreeEntity)
          .then((COATrees) => res.json({ COATrees }))
          .catch(next)
      }
    )

    router.post(
      '/COATrees',
      (req: Request, res: Response, next: NextFunction) => {
        COATreeService
          .createCOATree(req.body.COATree)
          .then((COATree) => res.json({ COATree }))
          .catch((error) => {
            console.error(error)
            throw error
          })
          .catch(next)
      }
    )

    router.put(
      '/COATrees/:_id',
      (req: Request, res: Response, next: NextFunction) => {
        const { _id } = req.params
        const { COATree } = req.body


        COATreeService
          .updateCOATree(_id, COATree)
          .then(() => res.end())
          .catch(next)
      }
    )

    router.delete(
      '/COATrees/:_id',
      (req: Request, res: Response, next: NextFunction) => {
        const { _id } = req.params

        COATreeService
          .deleteCOATree(_id)
          .then(() => res.end())
          .catch(next)
      }
    )

    return router
  }
)

export default COATreeController
