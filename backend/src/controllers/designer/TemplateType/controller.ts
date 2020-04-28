import { Service } from 'typedi'

import TemplateType from '../../../entities/TemplateType'
import { Response, NextFunction, Request } from 'express'
import TemplateTypeService from '../../../services/TemplateType'

const TemplateTypeController = Service(
  [TemplateTypeService],
  (templateTypeService) => ({ router }) => {
    router.get(
      '/templateTypes',
      (req: Request, res: Response, next: NextFunction) => {
        // Get query from middleware -- auth handler

        templateTypeService
          .findTemplateType({})
          .then((templateTypes) => res.json({ templateTypes }))
          .catch(next)
      }
    )

    router.post(
      '/templateTypes',
      (req: Request, res: Response, next: NextFunction) => {
        templateTypeService
          .createTemplateType(req.body.templateType)
          .then((templateType) => res.json({ templateType }))
          .catch(next)
      }
    )

    router.put(
      '/templateTypes',
      (req: Request, res: Response, next: NextFunction) => {
        const { id, templateType } = req.body

        templateTypeService
          .updateTemplateType(id, templateType)
          .then(() => res.end())
          .catch(next)
      }
    )

    return router
  }
)

export default TemplateTypeController
