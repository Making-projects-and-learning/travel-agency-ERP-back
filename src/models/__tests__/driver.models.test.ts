import { test, describe, expect, beforeAll, afterAll } from '@jest/globals'
import DriverModel from '../driver.models'
import CarModel from '../car.models'
import { dbConnect, dbDisconnect } from '../../config'
import Driver from '../../interfaces/driver.interface'
import Car from '../../interfaces/car.interface'

describe('Driver', () => {
  const driverData = {
    name: 'teletubbies',
    location: 'lat:51.507351,long:-0.127758',
    phone_number: '+21200000000',
    address: 'jhon fenson 1523st another land',
  }

  beforeAll(async () => {
    await dbConnect()
  }, 10000)

  afterAll(async () => {
    await CarModel.deleteMany({})
    await DriverModel.deleteMany({})
    await dbDisconnect()
  }, 20000)

  test('create', async () => {
    const driver = new DriverModel(driverData)
    const createDriver = async () => await driver.save()
    await expect(createDriver()).resolves.not.toThrow()
  })

  test('duplicate phone number', async () => {
    const driver = new DriverModel(driverData)
    const createDriver = async () => await driver.save()
    await expect(createDriver()).rejects.toThrow()
  }, 10000)

  test('create driver and assign a car to them', async () => {
    const currentDriverData = {
      name: 'frachaland',
      location: 'lat:51.507351,long:-0.127758',
      phone_number: '+21210001010',
      address: 'jhon fenson 1523st another land',
    }
    const driverCarData = {
      model: 'vncn-1995',
      licence: 'serialian-s12',
      color: 'black',
      register_plate: '150-BS-18',
    }
    const newCar = new CarModel(driverCarData)
    await newCar.save()
    const newDriver = new DriverModel(currentDriverData)
    newDriver.car = newCar
    const driver = await newDriver.save()
    const populatedDriver: Driver = await driver.populate('car')
    expect(populatedDriver.car).toBeDefined()
    const isCar = (car: any): car is Car => car.licenece
    isCar(populatedDriver.car) &&
      expect(populatedDriver.car.licence).toBeDefined()
    expect((populatedDriver.car as Car).licence).toEqual(driverCarData.licence)
  }, 20000)
})
