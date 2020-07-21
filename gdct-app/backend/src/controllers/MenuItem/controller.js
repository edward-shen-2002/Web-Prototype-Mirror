import { Service } from 'typedi';
import { Router } from 'express';
import MenuItemService from '../../services/Menu';

const MenuItemController = Service([MenuService], service => {
  const router = Router();
  return (() => {
    router.get('/menuitems', (req, res, next) => {
      // Get query from middleware -- auth handler

      service
        .findMenu({})
        .then(Menus => res.json({ MenuItems }))
        .catch(next);
    });

    router.post('/menuitems', (req, res, next) => {
      service
        .createMenu(req.body.Menu)
        .then(Menu => res.json({ MenuItem }))
        .catch(error => {
          console.error(error);
          throw error;
        })
        .catch(next);
    });

    router.put('/menuitems/:_id', (req, res, next) => {
      const { _id } = req.params;
      const { MenuItem } = req.body;

      service
        .updateMenu(_id, MenuItem)
        .then(() => res.end())
        .catch(next);
    });

    router.delete('/menuitems/:_id', (req, res, next) => {
      const { _id } = req.params;

      service
        .deleteMenu(_id)
        .then(() => res.end())
        .catch(next);
    });

    router.get('/menuitems/searchAllMenus', (req, res, next) => {
      service
        .findAllMenu()
        .then(menuitems => {
          res.json({ menuitems });
        })
        .catch(next);
    });

    return router;
  })();
});

export default MenuItemController;
