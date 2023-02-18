import { type Types } from 'mongoose'

interface Car {
  _id: Types.ObjectId
  model: string
  licence: string
  color: string
  register_plate: string
}
export default Car
