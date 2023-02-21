import { type Types } from 'mongoose'
import type Car from './car.interface'

interface Driver {
  _id: Types.ObjectId
  name: string
  location: string
  car?: Car | Types.ObjectId
  phone_number: string
  address: string
  picture_url: string
}

export default Driver
