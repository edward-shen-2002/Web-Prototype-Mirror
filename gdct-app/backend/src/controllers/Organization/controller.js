import { Service } from 'typedi'
import { Router } from 'express'
import OrganizationService from '../../services/Organization'

const OrganizationController = Service(
  [OrganizationService],
  (service) => {
    const router = Router()
    return (
      () => {

        router.get(
          `/appSyses/searchOrganizationsByOrgGroupId/:orgGroupId`,
          (req, res, next) => {
            const { orgGroupId } = req.params;
            service
              .findOrgByOrgGroupId(orgGroupId)
              .then((organizations) => {
                res.json({organizations});
              })
          }
        )

        return router
      }
    )()
  }
)

export default OrganizationController
