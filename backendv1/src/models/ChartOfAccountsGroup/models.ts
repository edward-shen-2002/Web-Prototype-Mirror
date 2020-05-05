import { Schema, model } from 'mongoose';
import IChartOfAccountsGroup from './interface';

const ObjectId = Schema.Types.ObjectId;

export default model<IChartOfAccountsGroup>(
  'ChartOfAccountsGroup', 
  new Schema(
    {

    }, 
    { minimize: false }
  )
)
