import { Service } from 'typedi'
import { Response, NextFunction, Request, Router } from 'express'
import AppRoleService from '../../services/AppRole'
import AppRoleEntity from '../../entities/AppRole'

const AppRoleController = Service(
  [AppRoleService],
  (service) => {
    const router = Router()
    return (
      () => {
        router.get(
          '/appRoles',
          (req: Request, res: Response, next: NextFunction) => {
            // Get query from middleware -- auth handler

            service
              .findAppRole({} as AppRoleEntity)
              .then((AppRoles) => res.json({ AppRoles }))
              .catch(next)
          }
        )

        router.post(
          '/appRoles',
          (req: Request, res: Response, next: NextFunction) => {
            service
              .createAppRole(req.body.AppRole)
              .then((AppRole) => res.json({ AppRole }))
              .catch((error) => {
                console.error(error)
                throw error
              })
              .catch(next)
          }
        )

        router.put(
          '/appRoles/:_id',
          (req: Request, res: Response, next: NextFunction) => {
            const { _id } = req.params
            const { AppRole } = req.body

            service
              .updateAppRole(_id, AppRole)
              .then(() => res.end())
              .catch(next)
          }
        )

        router.delete(
          '/appRoles/:_id',
          (req: Request, res: Response, next: NextFunction) => {
            const { _id } = req.params

            service
              .deleteAppRole(_id)
              .then(() => res.end())
              .catch(next)
          }
        )

        return router
      }
    )()
  }
)

export default AppRoleController
