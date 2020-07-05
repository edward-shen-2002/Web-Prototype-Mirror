import React from 'react'
import { Tooltip, ListItem, ListItemIcon } from '@material-ui/core'
import { Link } from 'react-router-dom'

const IconItem = ({ name, icon, url, handleClick }) => (
  <Tooltip title={name} arrow>
    <ListItem component={url && Link} button to={url}>
      <ListItemIcon
        style={{ color: 'white', minWidth: '0' }}
        onClick={handleClick}
      >
        {icon}
      </ListItemIcon>
    </ListItem>
  </Tooltip>
)

export default IconItem
