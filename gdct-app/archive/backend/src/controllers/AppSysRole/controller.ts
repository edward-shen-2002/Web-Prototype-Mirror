import { Service } from 'typedi'
import { Response, NextFunction, Request, Router } from 'express'
import AppSysRoleService from '../../services/AppSysRole'
import AppSysRoleEntity from '../../entities/AppSysRole'

const AppSysRoleController = Service(
  [AppSysRoleService],
  (service) => {
    const router = Router()
    return (
      () => {
        router.get(
          '/appSysRoles',
          (req: Request, res: Response, next: NextFunction) => {
            // Get query from middleware -- auth handler

            service
              .findAppSysRole({} as AppSysRoleEntity)
              .then((AppSysRoles) => res.json({ AppSysRoles }))
              .catch(next)
          }
        )

        router.post(
          '/appSysRoles',
          (req: Request, res: Response, next: NextFunction) => {
            service
              .createAppSysRole(req.body.AppSysRole)
              .then((AppSysRole) => res.json({ AppSysRole }))
              .catch((error) => {
                console.error(error)
                throw error
              })
              .catch(next)
          }
        )

        router.put(
          '/appSysRoles/:_id',
          (req: Request, res: Response, next: NextFunction) => {
            const { _id } = req.params
            const { AppSysRole } = req.body

            service
              .updateAppSysRole(_id, AppSysRole)
              .then(() => res.end())
              .catch(next)
          }
        )

        router.delete(
          '/appSysRoles/:_id',
          (req: Request, res: Response, next: NextFunction) => {
            const { _id } = req.params

            service
              .deleteAppSysRole(_id)
              .then(() => res.end())
              .catch(next)
          }
        )

        return router
      }
    )()
  }
)

export default AppSysRoleController
