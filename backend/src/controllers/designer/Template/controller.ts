import { Service } from "typedi"
import TemplateService from "../../../services/TemplateService"
import Template from "../../../entities/Template"
import { Response, NextFunction, Request } from 'express'
import { convertTemplateOjectToEntity } from "../../../utils/conversion/entity"

const TemplateController = Service(
  [
    TemplateService
  ],
  (templateService) => ({ router }) => {
    router.get(
      '/templates',
      (req: Request, res: Response, next: NextFunction) => {
        // Get query from middleware -- auth handler

        templateService.findTemplate({} as Template)
          .then((templates) => res.json({ templates }))
          .catch(next)
      }
    )

    router.post(
      '/templates',
      (req: Request, res: Response, next: NextFunction) => {

        templateService.createTemplate(convertTemplateOjectToEntity(req.body.template))
          .then((template) => res.json({ template }))
          .catch(next)
      }
    )

    router.put(
      '/templates',
      (req: Request, res: Response, next: NextFunction) => {
        const { id, template } = req.body

        templateService.updateTemplate(id, template as Template)
          .then(() => res.end())
          .catch(next)
      }
    )

    return router
  }
)

export default TemplateController