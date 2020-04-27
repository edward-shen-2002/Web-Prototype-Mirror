import { Service } from 'typedi'
import TemplateService from '../../../services/Template'
import Template from '../../../entities/Template'
import { Response, NextFunction, Request } from 'express'

const TemplateController = Service(
  [TemplateService],
  (templateService) => ({ router }) => {
    router.get(
      '/templates',
      (req: Request, res: Response, next: NextFunction) => {
        // Get query from middleware -- auth handler
        templateService
          .findTemplate(new Template(req.body))
          .then((templates) => res.json({ templates }))
          .catch(next)
      }
    )

    router.post(
      '/templates',
      (req: Request, res: Response, next: NextFunction) => {
        templateService
          .createTemplate(req.body.template)
          .then((template) => res.json({ template }))
          .catch(next)
      }
    )

    router.put(
      '/templates',
      (req: Request, res: Response, next: NextFunction) => {
        const { id, template } = req.body

        templateService
          .updateTemplate(id, template as Template)
          .then(() => res.end())
          .catch(next)
      }
    )

    return router
  }
)

export default TemplateController
