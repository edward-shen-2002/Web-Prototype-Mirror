import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import { publicAxios } from '../../../../../tools/rest'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

import { REST_PUBLIC_DATA } from '../../../../../constants/rest'

import { filterString } from './utils'

import { DialogActions } from './components'

import {
  resetActiveCellDialog,
  setGroups,
} from '../../../../../store/actions/ui/excel/commands'

import './GroupPopup.scss'
import { getCOATreesRequest } from '../../../../../store/thunks/COATree'
import { selectFactoryRESTResponseValues } from '../../../../../store/common/REST/selectors'
import { selectCOATreesStore } from '../../../../../store/COATreesStore/selectors'

const LinkIcon = ({ handleClick }) => (
  <Button variant="contained" color="primary" onClick={handleClick}>
    <Icon>send</Icon>
  </Button>
)

const GroupLink = ({
  index,
  groupId,
  group,
  handleRemoveLink,
  handleUpdateGroupPointer,
}) => {
  const handleClickLink = () => {
    handleRemoveLink(index)
  }
  const handleClickGroup = () => handleUpdateGroupPointer(index)

  return (
    <div className="groups__groupLinksItem">
      <LinkIcon handleClick={handleClickLink} />
      <Button onClick={handleClickGroup} fullWidth>
        {groupId !== null && group !== null ? `${groupId} - ${group}` : 'EMPTY'}
      </Button>
    </div>
  )
}

const GroupLinkListItems = ({
  groups,
  handleRemoveLink,
  handleUpdateGroupPointer,
}) =>
  groups.map(({ _id, value }, index) => {
    return (
      <GroupLink
        key={`group-link-${index}`}
        index={index}
        groupId={_id}
        group={value}
        handleRemoveLink={handleRemoveLink}
        handleUpdateGroupPointer={handleUpdateGroupPointer}
      />
    )
  })

const GroupLinkList = ({
  groups,
  handleAddNewLink,
  handleRemoveLink,
  handleUpdateGroupPointer,
}) => {
  return (
    <div className="groups__groupLinks">
      <Typography variant="h6">Group Links</Typography>
      <GroupLinkListItems
        groups={groups}
        handleUpdateGroupPointer={handleUpdateGroupPointer}
        handleRemoveLink={handleRemoveLink}
      />
      <Button
        className="groups__button"
        variant="contained"
        color="primary"
        onClick={handleAddNewLink}
      >
        Add New Group
      </Button>
    </div>
  )
}

const GroupItems = ({ groups, selectedGroup, handleSelectGroup }) =>
  groups.map(({ _id, COAGroupId }, index) => {
    const handleClickGroup = () => handleSelectGroup({ _id, value: COAGroupId ? COAGroupId.name : "" })
    return (
      <ListItem
        key={`groups-group-${index}`}
        className={`${selectedGroup === _id ? 'groups__groupItem' : ''}`}
        onClick={handleClickGroup}
        button
      >
        <ListItemText primary={`${_id} - ${COAGroupId ? COAGroupId.name : ""}`} />
      </ListItem>
    )
  })

const GroupList = ({
  groups,
  selectedGroup,

  handleSelectGroup,
}) => {
  return (
    <List className="groups__groupList">
      <Typography variant="h6">Groups</Typography>
      <GroupItems
        groups={groups}
        selectedGroup={selectedGroup}
        handleSelectGroup={handleSelectGroup}
      />
    </List>
  )
}

const GroupSectionContent = ({
  groups,
  definedGroups,
  selectedGroup,
  handleRemoveLink,
  handleUpdateGroupPointer,
  handleSelectGroup,
  handleAddNewLink,
}) => (
  <div className="groups__groupSectionContent">
    <GroupLinkList
      groups={groups}
      handleUpdateGroupPointer={handleUpdateGroupPointer}
      handleRemoveLink={handleRemoveLink}
      handleAddNewLink={handleAddNewLink}
    />
    {groups.length ? (
      <GroupList
        groups={definedGroups}
        selectedGroup={selectedGroup}
        handleSelectGroup={handleSelectGroup}
      />
    ) : null}
  </div>
)

const GroupSection = ({
  type,
  groups,
  definedGroups,
  selectedGroup,
  handleRemoveLink,
  handleUpdateGroupPointer,
  handleSelectGroup,
  handleAddNewLink,
}) => (
  <div className="groups__groupSection">
    <GroupSectionContent
      groups={groups}
      definedGroups={definedGroups}
      selectedGroup={selectedGroup}
      handleRemoveLink={handleRemoveLink}
      handleUpdateGroupPointer={handleUpdateGroupPointer}
      handleSelectGroup={handleSelectGroup}
      handleAddNewLink={handleAddNewLink}
    />
  </div>
)

const isGroupsValid = (groups) => {
  if (!groups.length) return true

  for (let element of groups) {
    const { _id } = element

    if (_id === null) return false
  }

  return true
}

const GroupPopup = ({ type }) => {
  const [currentGroups, setCurrentGroups] = useState([])
  const [isDataFetched, setIsDataFetched] = useState(false)
  const [newGroups, setNewGroups] = useState([])
  const [groupPointer, setGroupPointer] = useState(
    currentGroups && currentGroups.length ? currentGroups.length - 1 : -1
  )
  const [selectedGroup, setSelectedGroup] = useState()
  // const [ filterString, setFilterString ] = useState("");

  const { COATrees } = useSelector(
    (state) => (
      {
        COATrees: selectFactoryRESTResponseValues(selectCOATreesStore)(state)
      }
    ),
    shallowEqual
  )

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCOATreesRequest())
  }, [dispatch])

  const handleAdd = useCallback(
    () => dispatch(setGroups({ category: type, newGroups })),
    [dispatch, newGroups]
  )

  const handleCancel = useCallback(() => dispatch(resetActiveCellDialog()), [
    dispatch,
  ])

  const handleUpdateGroupPointer = (index) => setGroupPointer(index)
  const handleRemoveLink = (index) => {
    setNewGroups(newGroups.slice(0, index))
    setGroupPointer(index - 1)
  }
  const handleSelectGroup = ({ _id, value }) => {
    console.log(_id)
    setNewGroups([
      ...newGroups.slice(0, groupPointer),
      { _id, value },
      ...newGroups.slice(groupPointer + 1),
    ])
    setSelectedGroup(_id)
  }

  const handleAddNewLink = () => {
    // Only add groups if there are no set groups or there's at least a consecutive group link
    if(newGroups.length && newGroups[newGroups.length - 1]._id || !newGroups.length) {
      setNewGroups([...newGroups, { _id: null, value: null }])
      setGroupPointer(groupPointer + 1)
    }
  }

  // const filteredGroups = groups.filter(({ id, value }) => filterString(filter, value) || filterString(filter, id));

  const definedGroups = useMemo(
    () => {
      let definedGroups

      if(groupPointer - 1 > -1) {
        const leafId = newGroups[groupPointer - 1]._id
        console.log(leafId)
        definedGroups = COATrees.filter((COATree) => COATree.parentId === leafId)
      } else {
        definedGroups = COATrees
      }

      return definedGroups
    },
    [COATrees, selectedGroup, newGroups, groupPointer]
  )

  return (
    <div className="dialog groups">
      <Typography variant="h6">Set {type} group</Typography>
      <GroupSection
        type={type}
        groups={newGroups}
        definedGroups={definedGroups}
        selectedGroup={selectedGroup}
        handleRemoveLink={handleRemoveLink}
        handleUpdateGroupPointer={handleUpdateGroupPointer}
        handleSelectGroup={handleSelectGroup}
        handleAddNewLink={handleAddNewLink}
      />
      <DialogActions handleAdd={handleAdd} handleCancel={handleCancel} />
    </div>
  )
}

export default GroupPopup
