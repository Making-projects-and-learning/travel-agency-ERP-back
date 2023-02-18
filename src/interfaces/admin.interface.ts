import { type Types } from 'mongoose'
import type Driver from './driver.interface'
import type Trip from './trip.interface'

interface Admin {
  _id: Types.ObjectId
  username: string
  email: string
  password: string
  profile_url: string
  drivers: Driver[] | Types.ObjectId[]
  trips: Trip[] | Types.ObjectId[]
}
export default Admin
