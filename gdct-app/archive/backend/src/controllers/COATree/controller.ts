import { Service } from 'typedi'
import COATreeService from '../../services/COATree'
import COATreeEntity from '../../entities/COATree'
import { Response, NextFunction, Request, Router } from 'express'
import { IId } from '../../models/interface'

const COATreeController = Service(
  [COATreeService],
  (service) => {
    const router = Router()
    return (
      () => {
        router.get(
          '/COATrees',
          (req: Request, res: Response, next: NextFunction) => {
            // Get query from middleware -- auth 

            service
              .findCOATree(new COATreeEntity(req.body))
              .then((COATrees) => res.json({ COATrees: COATrees.map((COATree) => ({ ...COATree, COATreeData: undefined })) }))
              .catch(next)
          }
        )

        router.get(
          '/COATrees/sheetName/:_id',
          (req: Request, res: Response, next: NextFunction) => {
            // Get query from middleware -- auth 
            const { _id: sheetNameId } = req.params

            service
              .findCOATree(new COATreeEntity({ sheetNameId }))
              .then((COATrees) => res.json({ COATrees: COATrees.map((COATree) => ({ ...COATree, COATreeData: undefined })) }))
              .catch(next)
          }
        )

        router.get(
          '/COATrees/:_id',
          (req: Request, res: Response, next: NextFunction) => {
            // Get query from middleware -- auth handler
            const sheetNameId = req.params._id

            service
              .findCOATree(new COATreeEntity({  sheetNameId }))
              .then(([ COATree ]) => res.json({ COATree }))
              .catch(next)
          }
        )

        router.post(
          '/COATrees',
          (req: Request, res: Response, next: NextFunction) => {
            service
              .createCOATree(req.body.COATree)
              .then((COATree) => res.json({ COATree }))
              .catch(next)
          }
        )

        router.put(
          '/COATrees/:_id',
          (req: Request, res: Response, next: NextFunction) => {
            const { _id } = req.params
            const { COATree } = req.body

            service
              .updateCOATree(_id, COATree)
              .then(() => res.end())
              .catch(next)
          }
        )

        router.put(
          '/COATrees/sheetName/:_id',
          (req: Request, res: Response, next: NextFunction) => {
            const { _id: sheetNameId } = req.params
            const { COATrees } = req.body

            service
              .updateSheetCOATrees(sheetNameId, COATrees)
              .then(() => res.end())
              .catch((error) => console.error(error))
              .catch(next)
          }
        )

        router.delete(
          '/COATrees/:_id',
          (req: Request, res: Response, next: NextFunction) => {
            const { _id } = req.params

            service
              .deleteCOATree(_id as IId)
              .then(() => res.end())
              .catch(next)
          }
        )

        return router
      }
    )()
  }
)

export default COATreeController