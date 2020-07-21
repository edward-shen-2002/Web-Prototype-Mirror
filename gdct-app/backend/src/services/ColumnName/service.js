import Container from 'typedi';
import ColumnNameRepository from '../../repositories/ColumnName';

// @Service()
export default class ColumnNameService {
  constructor() {
    this.columnNameRepository = Container.get(ColumnNameRepository);
  }

  async createColumnName(columnName) {
    return this.columnNameRepository.create(columnName);
  }

  async deleteColumnName(id) {
    return this.columnNameRepository.delete(id);
  }

  async updateColumnName(id, columnName) {
    return this.columnNameRepository.update(id, columnName);
  }

  async findColumnName(columnName) {
    return this.columnNameRepository.find(columnName);
  }
}
