import { Service } from 'typedi'
import { Router } from 'express'
import OrgService from '../../services/Organization'

const OrgController = Service(
  [OrgService],
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

export default OrgController
