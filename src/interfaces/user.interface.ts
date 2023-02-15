/** Libraries */
import type mongoose from 'mongoose'

/** Interfaces */
import { type Post } from './post.interface'
import { type Room } from './room.interface'

export interface User {
  _id: mongoose.Types.ObjectId
  name: string
  username: string
  email: string
  password: string
  description?: string
  posts?: Post[]
  friends?: User[]
  groups?: Room[]
  individualRooms?: Room[]
  likedPosts?: Post[]
  online: boolean
}
