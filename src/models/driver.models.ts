import { Types, type Document, Schema, model } from 'mongoose'
import type Driver from 'interfaces/driver.interface'

type DriverDocument = Driver & Document

const DriverSchema = new Schema<DriverDocument>({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  car: {
    type: Types.ObjectId,
    ref: 'cars',
  },
  phone_number: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  picture_url: {
    type: String,
    default: 'someDefaultUrlIfNotSpecified',
  },
})

const DriverModel = model('drivers', DriverSchema)
export default DriverModel
