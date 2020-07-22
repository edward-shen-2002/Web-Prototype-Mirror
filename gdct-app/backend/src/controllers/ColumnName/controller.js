import { Service } from 'typedi'
import { Router } from 'express'
import ColumnNameService from '../../services/ColumnName'

const ColumnNameController = Service(
  [ColumnNameService],
  (service) => {
    const router = Router()
    return (
      () => {
        router.get(
          '/columnNames/fetchColumnNames',
          (req, res, next) => {
            // Get query from middleware -- auth handler

            service
              .findColumnName({})
              .then((columnNames) => res.json({ columnNames }))
              .catch(next)
          }
        )

        router.post(
          '/columnNames/createColumnName',
          (req, res, next) => {
            service
              .createColumnName(req.body.columnName)
              .then((columnName) => res.json({ columnName }))
              .catch(next)
          }
        )

        router.put(
          '/columnNames/updateColumnName/:_id',
          (req, res, next) => {
            const { _id } = req.params
            const { columnName } = req.body


            service
              .updateColumnName(_id, columnName)
              .then(() => res.end())
              .catch(next)
          }
        )

        router.delete(
          '/columnNames/deleteColumnName/:_id',
          (req, res, next) => {
            const { _id } = req.params

            service
              .deleteColumnName(_id)
              .then(() => res.end())
              .catch(next)
          }
        )

        return router
      }
    )()
  }
)

export default ColumnNameController
