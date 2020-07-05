import React, { useState, useCallback, useEffect } from 'react'
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Tooltip,
  List,
  MenuItem,
  Menu,
  IconButton,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import DrawerItem from '../DrawerItem/DrawerItem'
import IconItem from '../IconItem/IconItem'

const TopItemList = ({ config }) => {
  const [isMobile, setMobile] = useState(
    window.matchMedia('(max-width: 1000px)').matches
  )

  useEffect(() => {
    const handler = (e) => setMobile(e.matches)
    window.matchMedia('(max-width: 1000px)').addListener(handler)
  }, [])
  return (
    <div style={{ display: 'flex', marginLeft: 'auto' }}>
      {!isMobile &&
        config
          .filter((item) => item.type !== 'divider')
          .map((item, index) => {
            const { type, name, icon, url, children } = item
            return item.type !== 'drawer' ? (
              <IconItem
                key={`${type}-${name}-${index}`}
                name={name}
                url={url}
                icon={icon}
              />
            ) : (
              <DrawerItem key={`${type}-${name}-${index}`} {...item} />
            )
          })}
    </div>
  )
}

export default TopItemList
