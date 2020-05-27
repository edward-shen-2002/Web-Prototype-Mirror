import React, { useState } from 'react'

import uniqid from 'uniqid'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import { DeleteButton } from '@tools/components/buttons'

import './EntitiesDialog.scss'

export const deleteItemAndGetUpdatedList = (items, itemToDelete) => {
  const itemToDeleteIndex = items.indexOf(itemToDelete)

  const newItems = [
    ...items.slice(0, itemToDeleteIndex),
    ...items.slice(itemToDeleteIndex + 1),
  ]

  return newItems
}

export const addItemAndGetUpdatedList = (items, itemToAdd) => {
  let newItems = [...items]
  if (items.find(({ _id }) => _id === itemToAdd._id)) {
    console.error('Item is already present')
  } else {
    newItems.push(itemToAdd)
  }

  return newItems
}

const HierchyEntitiesListItems = ({ entities, handleAddEntity }) =>
  entities.map((entity) => {
    const { name } = entity

    const handleAddEntityItem = () => handleAddEntity(entity)

    return (
      <ListItem key={uniqid()} button onClick={handleAddEntityItem}>
        <ListItemText primary={name} />
      </ListItem>
    )
  })

const EntitiesList = ({ entities, handleAddEntity }) => (
  <List className="entity__items">
    <HierchyEntitiesListItems
      entities={entities}
      handleAddEntity={handleAddEntity}
    />
  </List>
)

const AllEntitiesDialogContent = ({
  entities,
  title,
  searchPlaceholder,
  handleAddEntity,
}) => {
  const [entitiesQuery, setEntitiesQuery] = useState('')
  let filteredEntities = entities.filter(({ name }) =>
    name.toLowerCase().includes(entitiesQuery.toLowerCase())
  )
  const handleEntityQueryChange = ({ target: { value } }) =>
    setEntitiesQuery(value)

  return (
    <div className="entity entity--all">
      <h5 className="entity__header">{title}</h5>
      <TextField
        className="entity__placeholder"
        label={searchPlaceholder}
        type="search"
        onChange={handleEntityQueryChange}
        variant="outlined"
        fullWidth
      />
      <EntitiesList
        entities={filteredEntities}
        handleAddEntity={handleAddEntity}
      />
    </div>
  )
}

const UserEntitiesListItemActions = ({ handleDeleteUserEntity }) => (
  <ListItemSecondaryAction>
    <DeleteButton handleDelete={handleDeleteUserEntity} />
  </ListItemSecondaryAction>
)

const UserEntititesListItems = ({ userEntities, handleDeleteUserEntity }) =>
  userEntities.map((userEntity) => {
    const { name } = userEntity

    const handleDeleteUserEntityItem = () => handleDeleteUserEntity(userEntity)

    return (
      <ListItem key={uniqid()} button>
        <ListItemText primary={name} />
        <UserEntitiesListItemActions
          handleDeleteUserEntity={handleDeleteUserEntityItem}
        />
      </ListItem>
    )
  })

const UserEntitiesList = ({ userEntities, handleDeleteUserEntity }) => (
  <List className="entity__items">
    <UserEntititesListItems
      userEntities={userEntities}
      handleDeleteUserEntity={handleDeleteUserEntity}
    />
  </List>
)

const UserEntitiesDialogContent = ({
  userEntities,
  title,
  searchPlaceholder,
  handleDeleteUserEntity,
}) => {
  const [userEntitiesQuery, setUserEntitiesQuery] = useState('')
  let filteredUserEntities = userEntities.filter(({ name }) =>
    name.toLowerCase().includes(userEntitiesQuery.toLowerCase())
  )
  const handleUserEntityQueryChange = ({ target: { value } }) =>
    setUserEntitiesQuery(value)

  return (
    <div className="entity entity--user">
      <h5 className="entity__header">{title}</h5>
      <TextField
        className="entity__placeholder"
        label={searchPlaceholder}
        type="search"
        onChange={handleUserEntityQueryChange}
        variant="outlined"
        fullWidth
      />
      <UserEntitiesList
        userEntities={filteredUserEntities}
        handleDeleteUserEntity={handleDeleteUserEntity}
      />
    </div>
  )
}

export const EntitiesContent = ({
  style,
  userEntities,
  entities,
  userTitle,
  allTitle,
  userSearchPlaceholder,
  allSearchPlaceholder,
  handleAddEntity,
  handleDeleteUserEntity,
}) => (
  <div className="entitiesContent" style={style}>
    <UserEntitiesDialogContent
      userEntities={userEntities}
      title={userTitle}
      searchPlaceholder={userSearchPlaceholder}
      handleDeleteUserEntity={handleDeleteUserEntity}
    />
    <div className="verticalSeparator" />
    <AllEntitiesDialogContent
      entities={entities}
      title={allTitle}
      searchPlaceholder={allSearchPlaceholder}
      handleAddEntity={handleAddEntity}
    />
  </div>
)

const EntitiesDialogContent = (props) => (
  <DialogContent>
    <EntitiesContent {...props} />
  </DialogContent>
)

const EntitiesDialogActions = ({ handleClose }) => (
  <DialogActions>
    <Button onClick={handleClose}>Close</Button>
  </DialogActions>
)

const EntitiesDialog = ({
  open,
  userEntities,
  entities,
  title,
  userTitle,
  allTitle,
  userSearchPlaceholder,
  allSearchPlaceholder,
  handleClose,
  handleAddEntity,
  handleDeleteUserEntity,
}) => (
  <Dialog open={open} onClose={handleClose}>
    <DialogTitle>{title}</DialogTitle>
    <EntitiesDialogContent
      userEntities={userEntities}
      entities={entities}
      userTitle={userTitle}
      allTitle={allTitle}
      userSearchPlaceholder={userSearchPlaceholder}
      allSearchPlaceholder={allSearchPlaceholder}
      handleAddEntity={handleAddEntity}
      handleDeleteUserEntity={handleDeleteUserEntity}
    />
    <EntitiesDialogActions handleClose={handleClose} />
  </Dialog>
)

export default EntitiesDialog
