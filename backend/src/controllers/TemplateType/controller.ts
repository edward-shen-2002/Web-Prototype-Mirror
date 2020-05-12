import { Service } from 'typedi'

import TemplateType from '../../entities/TemplateType'
import { Response, NextFunction, Request, Router } from 'express'
import TemplateTypeService from '../../services/TemplateType'

const TemplateTypeController = Service(
  [TemplateTypeService],
  (service) => {
    const router = Router()
    return (
      () => {
        router.get(
          '/templateTypes',
          (req: Request, res: Response, next: NextFunction) => {
            // Get query from middleware -- auth handler

            service
              .findTemplateType({})
              .then((templateTypes) => res.json({ templateTypes }))
              .catch(next)
          }
        )

        router.post(
          '/templateTypes',
          (req: Request, res: Response, next: NextFunction) => {
            service
              .createTemplateType(req.body.templateType)
              .then((templateType) => res.json({ templateType }))
              .catch(next)
          }
        )

        router.put(
          '/templateTypes/:_id',
          (req: Request, res: Response, next: NextFunction) => {
            const { _id } = req.params
            const { templateType } = req.body


            service
              .updateTemplateType(_id, templateType)
              .then(() => res.end())
              .catch(next)
          }
        )

        router.delete(
          '/templateTypes/:_id',
          (req: Request, res: Response, next: NextFunction) => {
            const { _id } = req.params

            service
              .deleteTemplateType(_id)
              .then(() => res.end())
              .catch(next)
          }
        )

        return router
      }
    )()
  }
)

export default TemplateTypeController
