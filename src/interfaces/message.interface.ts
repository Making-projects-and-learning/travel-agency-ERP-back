/** Libraries */
import type mongoose from 'mongoose'

/** Interfaces */
import { type User } from './user.interface'

export interface Message {
  _id: mongoose.Types.ObjectId
  from: User
  to: User[]
  body: string
  createdAt: Date
}
