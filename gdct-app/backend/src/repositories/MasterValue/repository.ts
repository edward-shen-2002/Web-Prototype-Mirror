import IMasterValueRepository from './interface'
import MasterValueEntity from '../../entities/MasterValue'
import BaseRepository from '../repository'

export default class MasterValueRepository extends BaseRepository<MasterValueEntity>
  implements IMasterValueRepository<MasterValueEntity> {

}
