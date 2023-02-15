/** Libraries */
import { Types, model, Schema, type Document } from 'mongoose'

/** Interfaces */
import { type Room } from '../interfaces/room.interface'

type RoomDocument = Room & Document
const RoomSchema = new Schema<RoomDocument>({
  users: [
    {
      type: Types.ObjectId,
      ref: 'users',
    },
  ],
  messages: [
    {
      type: Types.ObjectId,
      ref: 'messages',
    },
  ],
})

const RoomModel = model('rooms', RoomSchema)

export default RoomModel
