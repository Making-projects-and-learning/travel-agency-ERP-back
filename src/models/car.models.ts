import { type Document, Schema, model } from 'mongoose'
import type Car from 'interfaces/car.interface'

type CarDocument = Car & Document

const CarSchema = new Schema<CarDocument>({
  model: {
    type: String,
    required: true,
  },
  licence: {
    type: String,
    required: true,
    unique: true,
  },
  color: String,
  register_plate: {
    type: String,
    required: true,
    unique: true,
  },
})

const CarModel = model('cars', CarSchema)

export default CarModel
