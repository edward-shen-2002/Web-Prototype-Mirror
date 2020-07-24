import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom';
import navigationConfig from '../../components/AuthPage/config';

const MenuHeader = () => {
  return navigationConfig
    .filter(item => item.type !== 'divider')
    .map((e, i) => {
      const { name, type, url, icon, children } = e;
      return (
        <ListItem key={i} component={url && Link} button to={url} style={{ display: 'block' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <ListItemIcon
              style={{ color: '#3F51B5' }}
              // onClick={handleClick}
            >
              {icon}
            </ListItemIcon>
            <ListItemText primary={name} />
          </div>
          <ListItemText secondary={'Simple description can be here about the menu'} />
        </ListItem>
      );
    });
};

const GDCTMenu = () => {
  return (
    <div
      style={{
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(400px, auto))',
        gap: '1em',
      }}
    >
      <MenuHeader />
    </div>
  );
};

export default GDCTMenu;
