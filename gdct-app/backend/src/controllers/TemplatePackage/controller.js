import { Service } from 'typedi'
import TemplatePackageService from '../../services/TemplatePackage'
import TemplatePackage from '../../entities/TemplatePackage'
import { Router } from 'express'

const TemplatePackageController = Service(
  [TemplatePackageService],
  (service) => {
    const router = Router()
    return (
      () => {
        router.get(
          '/templatePackages/fetchTemplatePackage',
          (req, res, next) => {
            // Get query from middleware -- auth handler
            service
              .findTemplatePackage(new TemplatePackage(req.body))
              .then((templatePackages) => res.json({ templatePackages: templatePackages.map((templatePackage) => ({ ...templatePackage, templatePackageData: undefined })) }))
              .catch(next)
          }
        )

        router.get(
          '/templatePackages/fetchTemplatePackage/:_id',
          (req, res, next) => {
            // Get query from middleware -- auth handler

            service
              .findTemplatePackage(new TemplatePackage({  _id: req.params._id }))
              .then(([ templatePackage ]) => res.json({ templatePackage }))
              .catch(next)
          }
        )

        router.get(
          '/templatePackages/fetchPopulatedTemplatePackage/:_id',
          (req, res, next) => {
            // Get query from middleware -- auth handler

            service
              .findTemplatePackage(new TemplatePackage({  _id: req.params._id }), true)
              .then(([ templatePackage ]) => res.json({ templatePackage }))
              .catch(next)
          }
        )

        router.post(
          '/templatePackages/createTemplatePackage',
          (req, res, next) => {
            service
              .createTemplatePackage(req.body.templatePackage)
              .then((templatePackage) => res.json({ templatePackage }))
              .catch(next)
          }
        )

        router.put(
          '/templatePackages/updateTemplatePackage/:_id',
          (req, res, next) => {
            const { _id } = req.params
            const { templatePackage } = req.body

            service
              .updateTemplatePackage(_id, templatePackage)
              .then(() => res.end())
              .catch((error) => console.error(error))
              .catch(next)
          }
        )

        router.put(
          '/templatePackages/updatePopulatedTemplatePackage/:_id',
          (req, res, next) => {
            const { _id } = req.params
            const { templatePackage } = req.body

            service
              .updateTemplatePackage(_id, templatePackage, true)
              .then((templatePackage) => res.json({ templatePackage }))
              .catch((error) => console.error(error))
              .catch(next)
          }
        )

        router.delete(
          '/templatePackages/deleteTemplatePackage/:_id',
          (req, res, next) => {
            const { _id } = req.params

            service
              .deleteTemplatePackage(_id)
              .then(() => res.end())
              .catch(next)
          }
        )

        return router
      }
    )()
  }
)

export default TemplatePackageController
