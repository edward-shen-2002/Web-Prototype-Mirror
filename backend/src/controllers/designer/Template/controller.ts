import { Service } from "typedi"
import TemplateService from "../../../services/TemplateService"

const TemplateController = Service(
  [
    TemplateService
  ],
  (TemplateService) => ({ router }) => {
    router.get(
      '@@@path@@@',
      (req, res, next) => {
        req.params
      }
    )
  }
)

export default TemplateController