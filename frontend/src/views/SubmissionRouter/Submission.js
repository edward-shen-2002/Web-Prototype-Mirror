import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Paper from '@material-ui/core/Paper'

// const

const Submission = ({
  match: {
    params: { _id },
  },
}) => {
  const dispatch = useDispatch()

  useEffect(() => {
    if (_id) console.log(_id)
    // dispatch()
  }, [dispatch])

  return <Paper>tess</Paper>
}

export default Submission
