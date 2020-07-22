import { Service } from 'typedi'
import COATreeService from '../../services/COATree'
import COATreeEntity from '../../entities/COATree'
import { Router } from 'express'

const COATreeController = Service(
  [COATreeService],
  (service) => {
    const router = Router()
    return (
      () => {
        router.get(
          '/categoryTrees/fetchCOATrees',
          (req, res, next) => {
            // Get query from middleware -- auth 

            service
              .findCOATree(new COATreeEntity(req.body))
              .then((COATrees) => res.json({ COATrees: COATrees.map((COATree) => ({ ...COATree, COATreeData: undefined })) }))
              .catch(next)
          }
        )

        router.get(
          '/categoryTrees/fetchCOATreeBySheetName/:_id',
          (req, res, next) => {
            // Get query from middleware -- auth 
            const { _id: sheetNameId } = req.params

            service
              .findCOATree(new COATreeEntity({ sheetNameId }))
              .then((COATrees) => res.json({ COATrees: COATrees.map((COATree) => ({ ...COATree, COATreeData: undefined })) }))
              .catch(next)
          }
        )

        router.get(
          '/categoryTrees/:_id',
          (req, res, next) => {
            // Get query from middleware -- auth handler
            const sheetNameId = req.params._id

            service
              .findCOATree(new COATreeEntity({  sheetNameId }))
              .then(([ COATree ]) => res.json({ COATree }))
              .catch(next)
          }
        )

        router.post(
          '/categoryTrees',
          (req, res, next) => {
            service
              .createCOATree(req.body.COATree)
              .then((COATree) => res.json({ COATree }))
              .catch(next)
          }
        )

        router.put(
          '/categoryTrees/:_id',
          (req, res, next) => {
            const { _id } = req.params
            const { COATree } = req.body

            service
              .updateCOATree(_id, COATree)
              .then(() => res.end())
              .catch(next)
          }
        )

        router.put(
          '/categoryTrees/sheetName/:_id',
          (req, res, next) => {
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
          '/categoryTrees/:_id',
          (req, res, next) => {
            const { _id } = req.params

            service
              .deleteCOATree(_id)
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
