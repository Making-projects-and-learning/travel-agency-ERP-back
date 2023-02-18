import { Types, type Document, Schema, model } from 'mongoose'
import type Trip from '../interfaces/trip.interface'

type TripDocument = Trip & Document

const TripSchema = new Schema<TripDocument>({
  client: {
    type: String,
    required: true,
  },
  driver: {
    type: Types.ObjectId,
    ref: 'drivers',
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  approximate_duration_time: Number,
  departure: {
    type: String,
    required: true,
  },
})

const TripModel = model('trips', TripSchema)

export default TripModel
