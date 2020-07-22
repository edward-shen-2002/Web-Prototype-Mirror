import { Service } from 'typedi'

import SheetName from '../../entities/SheetName'
import { Router } from 'express'
import SheetNameService from '../../services/SheetName'

const SheetNameController = Service(
  [SheetNameService],
  (service) => {
    const router = Router()
    return (
      () => {
        router.get(
          '/sheetNames/fetchSheetNames',
          (req, res, next) => {
            // Get query from middleware -- auth handler

            service
              .findSheetName({})
              .then((sheetNames) => res.json({ sheetNames }))
              .catch(next)
          }
        )

        router.post(
          '/sheetNames/createSheetName',
          (req, res, next) => {
            service
              .createSheetName(req.body.sheetName)
              .then((sheetName) => res.json({ sheetName }))
              .catch(next)
          }
        )

        router.put(
          '/sheetNames/updateSheetName/:_id',
          (req, res, next) => {
            const { _id } = req.params
            const { sheetName } = req.body


            service
              .updateSheetName(_id, sheetName)
              .then(() => res.end())
              .catch(next)
          }
        )

        router.delete(
          '/sheetNames/deleteSheetName/:_id',
          (req, res, next) => {
            const { _id } = req.params

            service
              .deleteSheetName(_id)
              .then(() => res.end())
              .catch(next)
          }
        )

        return router
      }
    )()
  }
)

export default SheetNameController
