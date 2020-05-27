import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useDispatch } from 'react-redux'

import { publicAxios } from '@tools/rest'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

import { REST_PUBLIC_DATA } from '@constants/rest'

import { filterString } from './utils'

const BusinessConceptsItems = ({ businessConcepts, type }) =>
  businessConcepts.map(({ _id, id, value }) => {
    const dispatch = useDispatch()

    const handleClick = useCallback(
      () => dispatch(setBusinessConcept({ category: type, id })),
      [dispatch]
    )

    return (
      <ListItem
        key={_id}
        className="businessConcepts__item"
        alignItems="flex-start"
        button
        onClick={handleClick}
      >
        <div className="businessConcepts__id">{id}</div>
        <div className="businessConcepts__value">{value}</div>
      </ListItem>
    )
  })

const BusinessConceptsList = ({ businessConcepts, type }) => (
  <List className="businessConcepts">
    <BusinessConceptsItems type={type} businessConcepts={businessConcepts} />
  </List>
)

const BusinessConceptDialog = ({ type }) => {
  const [businessConcepts, setBusinessConcepts] = useState([])
  const [filter, setFilter] = useState('')

  const [isDataFetched, setIsDataFetched] = useState(false)

  useEffect(() => {
    if (!isDataFetched) {
      publicAxios
        .get(`${REST_PUBLIC_DATA}/business_concepts`)
        .then(
          ({
            data: {
              data: { businessConcepts },
            },
          }) => {
            setBusinessConcepts(businessConcepts)
            setIsDataFetched(true)
          }
        )
        .catch((error) => console.error(error))
    }
  }, [isDataFetched])

  const textFieldRef = useRef()

  useEffect(() => {
    textFieldRef.current.focus()
  }, [textFieldRef])

  const filteredBusinessConcepts = businessConcepts.filter(
    ({ id, value }) => filterString(filter, value) || filterString(filter, id)
  )

  const handleChangeFilter = ({ target: { value } }) => setFilter(value)
  const handleClick = () => textFieldRef.current.focus()

  return (
    <div className="dialog" onClick={handleClick}>
      <Typography variant="h6">Set {type}</Typography>
      <TextField
        placeholder="Search concepts"
        inputRef={textFieldRef}
        onChange={handleChangeFilter}
      />
      <BusinessConceptsList
        type={type}
        businessConcepts={filteredBusinessConcepts}
      />
      {/* <DialogActions/> */}
    </div>
  )
}

export default BusinessConceptDialog
