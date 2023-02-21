import { describe, test, beforeAll, afterAll, expect } from '@jest/globals'
import AdminModel from '../admin.models'
import TripModel from '../trip.models'
import DriverModel from '../driver.models'
import { dbConnect, dbDisconnect } from '../../config'

describe('Admin', () => {
  // common data which will be used on two tests or more
  const adminData = {
    username: 'jacksparrow',
    email: 'jack@sparrow.com',
    password: 'shhhhtitspasswordwink',
  }
  beforeAll(async () => await dbConnect())
  afterAll(async () => {
    await TripModel.deleteMany({})
    await DriverModel.deleteMany({})
    await AdminModel.deleteMany({})
    await dbDisconnect()
  }, 20000)
  test('create Admin', async () => {
    const admin = new AdminModel(adminData)

    const createAdmin = async () => await admin.save()
    await expect(createAdmin()).resolves.not.toThrow()
  }, 10000)
  test('checking duplication', async () => {
    const admin = new AdminModel(adminData)

    const createAdmin = async () => await admin.save()
    await expect(createAdmin).rejects.toThrow()
  }, 10000)
  test('create Admin with Drivers', async () => {
    const driversData = [
      {
        name: 'Lucas',
        location: 'lat:2.556,lon:-21.584',
        phone_number: '+292158657851',
        address: 'somewhere 1st down street vamo argentina',
      },
      {
        name: 'Mohamed',
        location: 'lat:2.556,lon:-21.584',
        phone_number: '+212629117470',
        address: 'casblanca b6 r51 marruecos',
      },
      {
        name: 'Jack',
        location: 'lat:2.556,lon:-21.584',
        phone_number: '+1(25)123-1234',
        address: '4th down town place',
      },
    ]
    const adminData = {
      username: 'captinjack',
      email: 'captin@sparrow.com',
      password: 'shhhhtitspasswordwink',
    }
    const drivers = await DriverModel.create(driversData)
    const admin = new AdminModel(adminData)
    admin.drivers = drivers
    const createWithDrivers = async () => await admin.save()
    await expect(createWithDrivers()).resolves.not.toThrow()
  }, 15000)
  test('create Admin with Drivers And Trips', async () => {
    const driverData = {
      name: 'Jacky',
      location: 'lat:2.556,lon:-21.584',
      phone_number: '+1(25)123-1236',
      address: '4th down town place',
    }
    const adminData = {
      username: 'rick',
      email: 'rick@morty.com',
      password: 'shhhhtitspasswordwink',
    }
    const driver = await DriverModel.create(driverData)

    const tripsData = [
      {
        client: 'Morty',
        destination: 'agadir',
        departure: 'tangier',
        driver,
      },
      {
        client: 'Rick',
        destination: 'manhatan',
        departure: 'nevada',
        driver,
      },
    ]
    const trips = await TripModel.create(tripsData)
    const admin = new AdminModel(adminData)
    admin.trips = trips
    const createAdmin = async () => await admin.save()
    await expect(createAdmin()).resolves.not.toThrow()
  }, 20000)
})
