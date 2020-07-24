import { Schema, model } from 'mongoose'

const ObjectId = Schema.Types.ObjectId

const UserModel = model(
  'User',
  new Schema(
    {
        username: { type: String, required: true },

        firstName: { type: String, default: '' },
        lastName: { type: String, default: '' },
    
        email: { type: String, required: true },
            
        phoneNumber: { type: String, default: '' },
        ext: { type: String, default: '' },
        password: { type: String, default: '' },
    
        isActive: { type: Boolean, required: true, default: true },
        isEmailVerified: { type: Boolean, required: true, default: false },
        sysRole: [{type: Object, default: '' }],

        creationDate: { type: Date, default: Date.now, required: true },
        approvedDate: { type: Date, default: Date.now, required: true },
    
        startDate: { type: Date },
        endDate: { type: Date }
    }, 
    { minimize: false }
  ),
  'User'
)

export default UserModel
