import { Service } from 'typedi'
import { Router } from 'express'
import UserService from '../../services/User'

const UserController = Service(
  [UserService],
  (service) => {
    const router = Router()
    return (
      () => {

        router.get(
          `/users/registerUser`,
          (req, res, next) => {
            const {registerData} = req.body;
            service
              .register(registerData)
          }
        )

        router.get(
          `/users/verifyUser`,
          (req, res, next) => {
            const { approve, _id, hashedUsername, orgId } = req.query;
            service
              .sendActiveEmail(approve, _id, orgId)
          }
        )

        router.get(
          `/users/activeUser`,
          (req, res, next) => {
            const { _id, hashedUsername} = req.query;
            service
              .activeUser(_id)
          }
        )

        return router
      }
    )()
  }
)

export default UserController
