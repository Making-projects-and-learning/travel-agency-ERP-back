import CarModel from '../car.models'
import { dbDisconnect, dbConnect } from '../../config'
import { test, expect, beforeAll, afterAll } from '@jest/globals'

describe('Car', () => {
  const expectedModel = 'vn-2021'
  const myCar = {
    model: expectedModel,
    licence: 'bc76rcdc21',
    color: 'black',
    register_plate: '100-FV-17',
  }

  beforeAll(async () => {
    await dbConnect()
  }, 10000)

  afterAll(async () => {
    await CarModel.deleteMany({})
    await dbDisconnect()
  }, 10000)

  test('create car', async () => {
    const car = new CarModel(myCar)
    const createdCar = await car.save()
    expect(createdCar.model).toEqual(expectedModel)
  }, 10000)

  test('duplicate car should throw an error', async () => {
    const car = new CarModel(myCar)
    const createdCar = async () => await car.save()
    await expect(createdCar()).rejects.toThrow()
  }, 10000)
})
