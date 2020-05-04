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
      '/templateTypes/:_id',
      (req: Request, res: Response, next: NextFunction) => {
        const { _id } = req.params
        const { templateType } = req.body


        templateTypeService
          .updateTemplateType(_id, templateType)
          .then(() => res.end())
          .catch(next)
      }
    )

    router.delete(
      '/templateTypes/:_id',
      (req: Request, res: Response, next: NextFunction) => {
        const { _id } = req.params

        templateTypeService
          .deleteTemplateType(_id)
          .then(() => res.end())
          .catch(next)
      }
    )

    return router
  }
)

export default TemplateTypeController
