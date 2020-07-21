import MenuEntity from '../../entities/Menu';
import BaseRepository from '../repository';
import MenuItemModel from '../../models/MenuItem';

export default class MenuRepository extends BaseRepository {
  constructor() {
    super(MenuItemModel);
  }

  async delete(id) {
    const menu = await MenuItemModel.findById(id);
    if (menu) {
      menu.isActive = false;
    }
    return this.update(id, menu);
  }

  async create(Menu) {
    return MenuItemModel.create(Menu).then(Menu => new MenuEntity(Menu.toObject()));
  }

  async update(id, Menu) {
    return MenuItemModel.findByIdAndUpdate(id, Menu).then(Menu => new MenuEntity(Menu.toObject()));
  }

  async find(query) {
    return MenuItemModel.find(query).then(Menus =>
      Menus.map(Menu => new MenuEntity(Menu.toObject())),
    );
  }
}
