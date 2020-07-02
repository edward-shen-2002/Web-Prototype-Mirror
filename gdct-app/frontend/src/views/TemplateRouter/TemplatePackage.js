import React from 'react'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'


const TemplatePackage = ({ match: { params: { _id } } }) => {
  const dispatch = useDispatch()

  useEffect(
    () => {
      if(_id) {
        console.log(_id)
      }
    },
    []
  )

  return (
    <div>

    </div>
  )
}

export default TemplatePackage
