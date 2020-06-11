import { Service } from 'typedi'
import TemplateService from '../../services/Template'
import Template from '../../entities/Template'
import { Router } from 'express'

const TemplateController = Service(
  [TemplateService],
  (service) => {
    const router = Router()
    return (
      (
        () => {
          router.get(
            '/templates',
            (req, res, next) => {
              // Get query from middleware -- auth handler
              service
                .findTemplate(new Template(req.body))
                .then((templates) => res.json({ templates: templates.map((template) => ({ ...template, templateData: undefined })) }))
                .catch(next)
            }
          )

          router.get(
            '/templates/:_id',
            (req, res, next) => {
              // Get query from middleware -- auth handler

              service
                .findTemplateById(req.params._id)
                .then((template) => res.json({ template }))
                .catch(next)
            }
          )

          router.post(
            '/templates',
            (req, res, next) => {
              service
                .createTemplate(req.body.template)
                .then((template) => res.json({ template }))
                .catch(next)
            }
          )

          router.put(
            '/templates/:_id',
            (req, res, next) => {
              const { _id } = req.params
              const { template } = req.body

              service
                .updateTemplate(_id, template)
                .then(() => res.end())
                .catch((error) => console.error(error))
                .catch(next)
            }
          )

          router.delete(
            '/templates/:_id',
            (req, res, next) => {
              const { _id } = req.params

              service
                .deleteTemplate(_id)
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