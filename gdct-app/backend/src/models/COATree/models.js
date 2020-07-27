import { Schema, model } from 'mongoose';

const { ObjectId } = Schema.Types;

const COATreeModel = model(
  'COATree',
  new Schema(
    {
<<<<<<< HEAD
      parentId: { type: ObjectId, ref: 'CategoryTree' },
      COAGroupId: { type: ObjectId, ref: 'CategoryGroup' },
      COAIds: [{ type: ObjectId, ref: 'Category' }],
=======
      parentId: { type: ObjectId, ref: 'COATree' },
      COAGroupId: { type: ObjectId, ref: 'COAGroup' },
      COAIds: [{ type: ObjectId, ref: 'COA' }],
>>>>>>> 9c3220b0b7cd82e2a65ab21362bd75fd073597ee
      sheetNameId: { type: ObjectId, ref: 'SheetName' },
    },
    { minimize: false },
  ),
  'COATree',
);

export default COATreeModel;
