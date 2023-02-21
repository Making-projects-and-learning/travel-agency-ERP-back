import { Types, type Document, Schema, model } from 'mongoose'
import type Admin from '../interfaces/admin.interface'

type AdminDocument = Admin & Document

const AdminSchema = new Schema<AdminDocument>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile_url: {
    type: String,
    default: 'SomeUrlToSomeDefaultProfilePics',
  },
  drivers: [
    {
      type: Types.ObjectId,
      ref: 'drivers',
    },
  ],
  trips: [
    {
      type: Types.ObjectId,
      ref: 'trips',
    },
  ],
})

const AdminModel = model('admins', AdminSchema)

export default AdminModel
