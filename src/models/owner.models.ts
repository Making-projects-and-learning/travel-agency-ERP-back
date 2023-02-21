import { Types, type Document, Schema, model } from 'mongoose'
import type Owner from '../interfaces/owner.interface'

type OwnerDocument = Owner & Document

const OwnerSchema = new Schema<OwnerDocument>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  picture_url: {
    type: String,
    default: 'SomeDefaultProfileUrlHere',
  },
  drivers: [
    {
      type: Types.ObjectId,
      ref: 'drivers',
    },
  ],
  admins: [
    {
      type: Types.ObjectId,
      ref: 'admins',
    },
  ],
})

const OwnerModel = model('owners', OwnerSchema)

export default OwnerModel
