import { Service } from 'typedi'
import { Router } from 'express'
import StatusService from '../../services/Status'

const StatusController = Service(
  [StatusService],
  (service) => {
    const router = Router()

    return (
      () => {
        router.get(
          '/statuses/fetchStatuses',
          (req, res, next) => {
            // Get query from middleware -- auth handler

            service
              .findStatus({})
              .then((statuses) => res.json({ statuses }))
              .catch(next)
          }
        )

        router.post(
          '/statuses/createStatus',
          (req, res, next) => {
            service
              .createStatus(req.body.status)
              .then((status) => res.json({ status }))
              .catch((error) => {
                console.error(error)
                throw error
              })
              .catch(next)
          }
        )

        router.put(
          '/statuses/updateStatus/:_id',
          (req, res, next) => {
            const { _id } = req.params
            const { status } = req.body


            service
              .updateStatus(_id, status)
              .then(() => res.end())
              .catch(next)
          }
        )

        router.delete(
          '/statuses/deleteStatus/:_id',
          (req, res, next) => {
            const { _id } = req.params

            service
              .deleteStatus(_id)
              .then(() => res.end())
              .catch(next)
          }
        )

        return router
      }
    )()
  }
)

export default StatusController
