import { Service } from 'typedi'
import { Router } from 'express'
import ProgramService from '../../services/Program'

const ProgramController = Service(
  [ProgramService],
  (service) => {
    const router = Router()
    return (
      () => {

        router.post(
          '/programs/searchProgramsByIds',
          (req, res, next) => {
            const { ids } = req.body;

            service
              .findProgramByIds(ids)
              .then((programs) => {
                res.json({programs});
              })
          }
        )

        return router
      }
    )()
  }
)

export default ProgramController
