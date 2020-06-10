import { Service } from 'typedi'

import ColumnName from '../../entities/ColumnName'
import { Response, NextFunction, Request, Router } from 'express'
import ColumnNameService from '../../services/ColumnName'

const ColumnNameController = Service(
  [ColumnNameService],
  (service) => {
    const router = Router()
    return (
      () => {
        router.get(
          '/columnNames',
          (req: Request, res: Response, next: NextFunction) => {
            // Get query from middleware -- auth handler

            service
              .findColumnName({})
              .then((columnNames) => res.json({ columnNames }))
              .catch(next)
          }
        )

        router.post(
          '/columnNames',
          (req: Request, res: Response, next: NextFunction) => {
            service
              .createColumnName(req.body.columnName)
              .then((columnName) => res.json({ columnName }))
              .catch(next)
          }
        )

        router.put(
          '/columnNames/:_id',
          (req: Request, res: Response, next: NextFunction) => {
            const { _id } = req.params
            const { columnName } = req.body


            service
              .updateColumnName(_id, columnName)
              .then(() => res.end())
              .catch(next)
          }
        )

        router.delete(
          '/columnNames/:_id',
          (req: Request, res: Response, next: NextFunction) => {
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
