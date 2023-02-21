import { describe, test, beforeAll, afterAll, expect } from '@jest/globals'
import TripModel from '../trip.models'
import DriverModel from '../driver.models'

import { dbConnect, dbDisconnect } from '../../config'

describe('Trip', () => {
  beforeAll(async () => {
    await dbConnect()
  }, 20000)

  afterAll(async () => {
    await DriverModel.deleteMany({})
    await TripModel.deleteMany({})
    await dbDisconnect()
  }, 20000)

  test('create trip', async () => {
    const driverData = {
      name: 'Mickel Jackson',
      location: 'lat:1.86557,lon:0.57885',
      phone_number: '+1(25)756-120',
      address: '3rd down street walk to new York City Usa',
    }
    const tripData = {
      client: 'Abdo muwahideen age',
      destination: 'finito lamosika',
      departure: 'another land',
    }
    const driver = new DriverModel(driverData)
    const trip = new TripModel(tripData)

    const createdDriver = await driver.save()
    trip.driver = createdDriver
    const createTrip = async () => await trip.save()
    await expect(createTrip()).resolves.not.toThrow()
  }, 10000)
})
