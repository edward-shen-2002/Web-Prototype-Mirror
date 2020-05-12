import { Service } from 'typedi'
import TemplateService from '../../services/Template'
import Template from '../../entities/Template'
import { Response, NextFunction, Request } from 'express'
import { IId } from '../../models/interface'
import { Router } from 'express'

const TemplateController = Service(
  [TemplateService],
  (templateService) => {
    const router = Router()
    return (
      (
        () => {
          router.get(
            '/templates',
            (req: Request, res: Response, next: NextFunction) => {
              // Get query from middleware -- auth handler
              templateService
                .findTemplate(new Template(req.body))
                .then((templates) => res.json({ templates: templates.map((template) => ({ ...template, templateData: undefined })) }))
                .catch(next)
            }
          )

          router.get(
            '/templates/:_id',
            (req: Request, res: Response, next: NextFunction) => {
              // Get query from middleware -- auth handler

              templateService
                .findTemplate(new Template({  _id: req.params._id }))
                .then(([ template ]) => res.json({ template }))
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
            '/templates/:_id',
            (req: Request, res: Response, next: NextFunction) => {
              const { _id } = req.params
              const { template } = req.body

              templateService
                .updateTemplate(_id, template)
                .then(() => res.end())
                .catch((error) => console.error(error))
                .catch(next)
            }
          )

          router.delete(
            '/templates/:_id',
            (req: Request, res: Response, next: NextFunction) => {
              const { _id } = req.params

              templateService
                .deleteTemplate(_id as IId)
                .then(() => res.end())
                .catch(next)
            }
          )

          return router
        }
      )()
    )
  }
)

export default TemplateController
