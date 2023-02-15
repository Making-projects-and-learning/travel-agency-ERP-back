/** Libraries */
import { Schema, model, type Document, Types } from 'mongoose'

/** Interfaces */
import { type User } from '../interfaces/user.interface'

type UserDocument = User & Document

const UserSchema = new Schema<UserDocument>({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  description: String,
  posts: [
    {
      type: Types.ObjectId,
      ref: 'posts',
    },
  ],
  friends: [
    {
      type: Types.ObjectId,
      ref: 'users',
    },
  ],
  groups: [
    {
      type: Types.ObjectId,
      ref: 'rooms',
    },
  ],
  individualRooms: [
    {
      type: Types.ObjectId,
      ref: 'rooms',
    },
  ],
  likedPosts: [
    {
      type: Types.ObjectId,
      ref: 'posts',
    },
  ],
  online: {
    type: Boolean,
    default: false,
  },
})

UserSchema.methods.toJSON = function () {
  const { __v, password, ...user } = this.toObject()
  return user
}

const UserModel = model('users', UserSchema)

export default UserModel
