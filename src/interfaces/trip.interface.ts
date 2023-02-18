import { type Types } from 'mongoose'
import type Driver from './driver.interface'

interface Trip {
  _id: Types.ObjectId
  client: string
  driver: Driver | Types.ObjectId
  destination: string
  approximate_duration_time?: number
  departure: string
}

export default Trip
