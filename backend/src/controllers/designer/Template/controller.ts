import { Service } from "typedi"
import TemplateService from "../../../services/TemplateService"
import Template from "../../../entities/Template"
import { Response, NextFunction, Request } from 'express'

const TemplateController = Service(
  [
    TemplateService
  ],
  (templateService) => ({ router }) => {
    router.get(
      '/test/router',
      (req: Request, res: Response, next: NextFunction) => {
        const query = new Template(req.query) 

        templateService.findTemplate(query)
          .then((templates) => res.json({ templates }))
          .catch(next)
      }
    )

    router.post(
      '/test/router',
      (req: Request, res: Response, next: NextFunction) => {
        const template = req.body.template as Template 

        templateService.createTemplate(template)
          .then((template) => res.json({ template }))
          .catch(next)
      }
    )

    router.put(
      '/test/router',
      (req: Request, res: Response, next: NextFunction) => {
        const { id, template } = req.body

        templateService.updateTemplate(id, template as Template)
          .then(() => res.end())
          .catch((error) => console.error(error))
      }
    )

    return router
  }
)

export default TemplateController