import { Service } from 'typedi'
import TemplatePackageService from '../../../services/TemplatePackage'
import TemplatePackage from '../../../entities/TemplatePackage'
import { Response, NextFunction, Request } from 'express'
import { IId } from '../../../models/interface'

const TemplatePackageController = Service(
  [TemplatePackageService],
  (templatePackageService) => ({ router }) => {
    router.get(
      '/templatePackages',
      (req: Request, res: Response, next: NextFunction) => {
        // Get query from middleware -- auth handler
        templatePackageService
          .findTemplatePackage(new TemplatePackage(req.body))
          .then((templatePackages) => res.json({ templatePackages: templatePackages.map((templatePackage) => ({ ...templatePackage, templatePackageData: undefined })) }))
          .catch(next)
      }
    )

    router.get(
      '/templatePackages/:_id',
      (req: Request, res: Response, next: NextFunction) => {
        // Get query from middleware -- auth handler

        templatePackageService
          .findTemplatePackage(new TemplatePackage({  _id: req.params._id }))
          .then(([ templatePackage ]) => res.json({ templatePackage }))
          .catch(next)
      }
    )

    router.post(
      '/templatePackages',
      (req: Request, res: Response, next: NextFunction) => {
        templatePackageService
          .createTemplatePackage(req.body.templatePackage)
          .then((templatePackage) => res.json({ templatePackage }))
          .catch(next)
      }
    )

    router.put(
      '/templatePackages/:_id',
      (req: Request, res: Response, next: NextFunction) => {
        const { _id } = req.params
        const { templatePackage } = req.body

        templatePackageService
          .updateTemplatePackage(_id, templatePackage)
          .then(() => res.end())
          .catch((error) => console.error(error))
          .catch(next)
      }
    )

    router.delete(
      '/templatePackages/:_id',
      (req: Request, res: Response, next: NextFunction) => {
        const { _id } = req.params

        templatePackageService
          .deleteTemplatePackage(_id as IId)
          .then(() => res.end())
          .catch(next)
      }
    )

    return router
  }
)

export default TemplatePackageController
