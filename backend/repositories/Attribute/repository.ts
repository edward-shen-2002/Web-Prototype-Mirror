import IAttributeRepository from './interface'
import Attribute from '../../entities/Attribute';

export default class AttributeRepository implements IAttributeRepository<Attribute> {
  create(item: IAttributeRepository<Attribute>): Promise<Boolean> {
    throw new Error("Method not implemented.");
  }
  update(id: string, item: IAttributeRepository<Attribute>): Promise<Boolean> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<Boolean> {
    throw new Error("Method not implemented.");
  }
  find(item: IAttributeRepository<Attribute>): Promise<IAttributeRepository<Attribute>[]> {
    throw new Error("Method not implemented.");
  }
  findOne(id: string): Promise<IAttributeRepository<Attribute>> {
    throw new Error("Method not implemented.");
  }
}