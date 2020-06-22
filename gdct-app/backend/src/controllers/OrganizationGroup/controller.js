import { Service } from 'typedi'
import { Router } from 'express'
import OrganizationGroupService from '../../services/OrganizationGroup'

const OrganizationGroupController = Service(
  [OrganizationGroupService],
  (service) => {
    const router = Router()
    return (
      () => {

        router.get(
          '/orgGroups/searchAllOrgGroups',
          (req, res, next) => {

            service
              .findAllOrgGroup()
              .then((orgGroups) => {
                res.json({orgGroups});
              })
          }
        )

        return router
      }
    )()
  }
)

export default OrganizationGroupController
