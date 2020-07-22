import { Service } from 'typedi'
import { Router } from 'express'
import COAService from '../../services/COA'

const COAController = Service(
  [COAService],
  (service) => {
    const router = Router()
    return (
      () => {
        router.get(
          '/categories/fetchCategories',
          (req, res, next) => {
            // Get query from middleware -- auth handler

            service
              .findCOA({})
              .then((COAs) => res.json({ COAs }))
              .catch(next)
          }
        )

        router.post(
          '/categories/createCategory',
          (req, res, next) => {
            service
              .createCOA(req.body.COA)
              .then((COA) => res.json({ COA }))
              .catch(next)
          }
        )

        router.put(
          '/categories/fetchCategory/:_id',
          (req, res, next) => {
            const { _id } = req.params
            const { COA } = req.body

            service
              .updateCOA(_id, COA)
              .then(() => res.end())
              .catch(next)
          }
        )

        router.delete(
          '/categories/deleteCategory/:_id',
          (req, res, next) => {
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
