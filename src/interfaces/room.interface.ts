/** Libraries */
import type mongoose from 'mongoose'

/** Interfaces */
import { type User } from './user.interface'
import { type Message } from './message.interface'

export interface Room {
  _id: mongoose.Types.ObjectId
  users: User[]
  messages: Message[]
}
