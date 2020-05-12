import { Service } from 'typedi'
import { Response, NextFunction, Request } from 'express'
import COAGroupService from '../../services/COAGroup'
import COAGroupEntity from '../../entities/COAGroup'

const COAGroupController = Service(
  [COAGroupService],
  (COAGroupService) => ({ router }) => {
    router.get(
      '/COAGroups',
      (req: Request, res: Response, next: NextFunction) => {
        // Get query from middleware -- auth handler

        COAGroupService
          .findCOAGroup({} as COAGroupEntity)
          .then((COAGroups) => res.json({ COAGroups }))
          .catch(next)
      }
    )

    router.post(
      '/COAGroups',
      (req: Request, res: Response, next: NextFunction) => {
        COAGroupService
          .createCOAGroup(req.body.COAGroup)
          .then((COAGroup) => res.json({ COAGroup }))
          .catch((error) => {
            console.error(error)
            throw error
          })
          .catch(next)
      }
    )

    router.put(
      '/COAGroups/:_id',
      (req: Request, res: Response, next: NextFunction) => {
        const { _id } = req.params
        const { COAGroup } = req.body


        COAGroupService
          .updateCOAGroup(_id, COAGroup)
          .then(() => res.end())
          .catch(next)
      }
    )

    router.delete(
      '/COAGroups/:_id',
      (req: Request, res: Response, next: NextFunction) => {
        const { _id } = req.params

        COAGroupService
          .deleteCOAGroup(_id)
          .then(() => res.end())
          .catch(next)
      }
    )

    return router
  }
)

export default COAGroupController
