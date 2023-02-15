/** Libraries */
import type mongoose from 'mongoose'

/** Interfaces */
import { type User } from './user.interface'

export interface Post {
  _id: mongoose.Types.ObjectId
  title: string
  description: string
  imageUrl: string
  owner: User
  likedBy?: User[]
  createdAt: Date
}
