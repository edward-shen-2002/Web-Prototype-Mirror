import React from 'react'
import { ListItem, ListItemText, ListItemIcon } from '@material-ui/core'
import { Link } from 'react-router-dom'

const TopItemList = ({ config }) => (
  <div style={{ display: 'flex', marginLeft: 'auto' }}>
    {config
      .filter((item) => item.type !== 'divider')
      .map((item, index) => {
        const { type, name, icon, url } = item
        return (
          <ListItem
            key={`${type}-${name}-${index}`}
            component={url && Link}
            button
            to={url}
          >
            <ListItemIcon style={{ color: 'white', minWidth: '0' }}>
              {icon}
            </ListItemIcon>
            {/* <ListItemText primary={name} /> */}
          </ListItem>
        )
      })}
  </div>
)

export default TopItemList
