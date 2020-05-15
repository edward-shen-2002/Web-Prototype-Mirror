import { Service } from 'typedi'
import { Response, NextFunction, Request, Router } from 'express'
import AppSysService from '../../services/AppSys'
import AppSysEntity from '../../entities/AppSys'

const AppSysController = Service(
  [AppSysService],
  (service) => {
    const router = Router()
    return (
      () => {
        router.get(
          '/appsys',
          (req: Request, res: Response, next: NextFunction) => {
            // Get query from middleware -- auth handler

            service
              .findAppSys({} as AppSysEntity)
              .then((AppSysList) => res.json({ AppSysList }))
              .catch(next)
          }
        )

        router.post(
          '/appsys',
          (req: Request, res: Response, next: NextFunction) => {
            service
              .createAppSys(req.body.AppSys)
              .then((AppSys) => res.json({ AppSys }))
              .catch((error) => {
                console.error(error)
                throw error
              })
              .catch(next)
          }
        )

        router.put(
          '/appsys/:_id',
          (req: Request, res: Response, next: NextFunction) => {
            const { _id } = req.params
            const { AppSys } = req.body

            service
              .updateAppSys(_id, AppSys)
              .then(() => res.end())
              .catch(next)
          }
        )

        router.delete(
          '/appsys/:_id',
          (req: Request, res: Response, next: NextFunction) => {
            const { _id } = req.params

            service
              .deleteAppSys(_id)
              .then(() => res.end())
              .catch(next)
          }
        )

        return router
      }
    )()
  }
)

export default AppSysController
