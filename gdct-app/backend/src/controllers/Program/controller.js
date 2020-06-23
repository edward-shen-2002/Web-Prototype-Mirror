import { Service } from 'typedi'
import { Router } from 'express'
import ProgramService from '../../services/Program'

const ProgramController = Service(
  [ProgramService],
  (service) => {
    const router = Router()
    return (
      () => {
        router.get(
          '/programs',
          (req, res, next) => {
            // Get query from middleware -- auth handler

            service
              .findProgram({})
              .then((programs) => res.json({ programs }))
              .catch(next)
          }
        )

        router.post(
          '/programs',
          (req, res, next) => {
            service
              .createProgram(req.body.program)
              .then((program) => res.json({ program }))
              .catch((error) => {
                console.error(error)
                throw error
              })
              .catch(next)
          }
        )

        router.put(
          '/programs/:_id',
          (req, res, next) => {
            const { _id } = req.params
            const { program } = req.body


            service
              .updateProgram(_id, program)
              .then(() => res.end())
              .catch(next)
          }
        )

        router.delete(
          '/programs/:_id',
          (req, res, next) => {
            const { _id } = req.params

            service
              .deleteProgram(_id)
              .then(() => res.end())
              .catch(next)
          })

        router.post(
          '/programs/searchProgramsByIds',
          (req, res, next) => {
            const { ids } = req.body;

            service
              .findProgramByIds(ids)
              .then((programs) => {
                res.json({programs});
              })
            })
          


        return router
      }
    )()
  }
)

export default ProgramController
