import React, { useEffect } from 'react'
import UserController from '../controllers/User'
import { useHistory } from 'react-router-dom'

export default function Logout({ setLoggedIn }) {
  let history = useHistory()

  useEffect(() => {
    UserController.logout().then((res) => {
      if (res.status === 'success') {
        setLoggedIn(false)
        history.push('/')
      }
    })
  }, [])
  return null
}
