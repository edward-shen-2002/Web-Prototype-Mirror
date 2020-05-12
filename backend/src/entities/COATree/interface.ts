import { ICOATree } from '../../models/COATree/interface'
import { IId } from '../../models/interface'

export default interface ICOATreeEntity extends ICOATree {
  _id?: IId
}
