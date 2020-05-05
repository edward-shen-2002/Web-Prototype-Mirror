import { Schema, model } from 'mongoose';
import IChartOfAccounts from './interface';

const ObjectId = Schema.Types.ObjectId;

export default model<IChartOfAccounts>(
  'ChartOfAccounts', 
  new Schema(
    {

    }, 
    { minimize: false }
  )
)
