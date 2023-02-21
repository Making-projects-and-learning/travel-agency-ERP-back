import { type Types } from 'mongoose'
import type Driver from './driver.interface'
import type Admin from './admin.interface'

interface Owner {
  _id: Types.ObjectId
  email: string
  password: string
  picture_url: string
  drivers: Driver[] | Types.ObjectId[]
  admins: Admin[] | Types.ObjectId[]
}

export default Owner
